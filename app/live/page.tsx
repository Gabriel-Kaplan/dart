"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Vapi from "@vapi-ai/web";
import { createSupabaseClient } from "@/lib/supabase/client";
import LiveOrb from "@/components/live/LiveOrb";
import LiveTranscript, { TranscriptEntry } from "@/components/live/LiveTranscript";
import LiveBottomBar from "@/components/live/LiveBottomBar";

const SOFTWARE_KEYWORDS = ["salesforce", "hubspot", "quickbooks", "jira", "sap"];

let vapiSingleton: Vapi | null = null;

function getVapi() {
  if (!vapiSingleton) {
    vapiSingleton = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ?? "");
  }
  return vapiSingleton;
}

export default function LivePage() {
  const router = useRouter();

  const [orbState, setOrbState] = useState<"idle" | "listening" | "speaking">("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [muted, setMuted] = useState(false);
  const [detectedSoftware, setDetectedSoftware] = useState<string | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const sessionIdRef = useRef<string | null>(null);
  const transcriptRef = useRef<TranscriptEntry[]>([]);
  const endingRef = useRef(false);
  const switchToChatRef = useRef(false);
  const detectedRef = useRef<string | null>(null);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  }

  async function generateAndSaveSummary(sid: string, entries: TranscriptEntry[]) {
    if (entries.length === 0) return;
    const text = entries
      .map((e) => `${e.role === "assistant" ? "DART" : "User"}: ${e.content}`)
      .join("\n");
    try {
      const res = await fetch("/api/chat/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });
      if (res.ok) {
        const { summary } = await res.json();
        await fetch("/api/session", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid, summary }),
        });
      }
    } catch (err) {
      console.error("[DART] Summary generation failed", err);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      const supabase = createSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth?returnUrl=/live");
        return;
      }

      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ software: "unknown" }),
      });

      if (!res.ok || !mounted) {
        if (mounted) setError("Failed to create session.");
        return;
      }

      const session = await res.json();
      sessionIdRef.current = session.id;

      const vapi = getVapi();

      vapi.on("call-start", () => {
        if (!mounted) return;
        setCallActive(true);
        setOrbState("listening");
      });

      vapi.on("speech-start", () => {
        if (!mounted) return;
        setOrbState("speaking");
      });

      vapi.on("speech-end", () => {
        if (!mounted) return;
        setOrbState("listening");
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vapi.on("message", (msg: any) => {
        if (!mounted) return;
        if (msg?.type !== "transcript" || msg.transcriptType !== "final") return;

        const entry: TranscriptEntry = {
          id: `${Date.now()}-${Math.random()}`,
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.transcript,
        };

        setTranscript((prev) => [...prev, entry]);

        const lower = (msg.transcript as string).toLowerCase();
        for (const sw of SOFTWARE_KEYWORDS) {
          if (lower.includes(sw) && !detectedRef.current) {
            const display = sw.charAt(0).toUpperCase() + sw.slice(1);
            detectedRef.current = display;
            setDetectedSoftware(display);
            const sid = sessionIdRef.current;
            if (sid) {
              fetch("/api/session", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: sid, software: sw }),
              });
              console.log(`[DART] Software detected: ${sw}`);
            }
            break;
          }
        }

        const sid = sessionIdRef.current;
        if (sid) {
          fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sid,
              role: entry.role,
              content: entry.content,
            }),
          });
        }
      });

      vapi.on("call-end", async () => {
        if (!mounted) return;
        setCallActive(false);
        setOrbState("idle");

        if (switchToChatRef.current) {
          const sid = sessionIdRef.current;
          router.push(sid ? `/chat/${sid}` : "/dashboard");
          return;
        }

        if (!endingRef.current) return;

        const sid = sessionIdRef.current;
        if (sid) {
          await generateAndSaveSummary(sid, transcriptRef.current);
        }
        router.push("/dashboard");
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vapi.on("error", (err: any) => {
        if (!mounted) return;
        console.error("[DART Vapi]", err);
        showToast("Voice connection issue — please check your microphone.");
      });

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const assistantConfig: any = {
          firstMessage: "Hey, I'm DART. What software are you working with and what's the problem?",
          transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
          model: {
            provider: "anthropic",
            model: "claude-sonnet-4-6",
            messages: [
              {
                role: "system",
                content:
                  "You are DART, an AI IT support expert. The user needs help with business software — Salesforce, HubSpot, Jira, QuickBooks, SAP, or similar tools. Identify what software they are using and diagnose their problem. Be concise, direct, and actionable. No filler.",
              },
            ],
          },
          voice: { provider: "playht", voiceId: "jennifer" },
        };
        await vapi.start(assistantConfig);
      } catch {
        if (mounted) setError("Could not start voice session. Check your connection and try again.");
      }
    }

    init();

    return () => {
      mounted = false;
      vapiSingleton?.removeAllListeners();
    };
  }, [router]);

  function handleToggleMute() {
    const vapi = getVapi();
    const next = !muted;
    vapi.setMuted(next);
    setMuted(next);
  }

  function handleEnd() {
    if (endingRef.current) return;
    endingRef.current = true;
    setEnding(true);
    getVapi().stop();
  }

  function handleSwitchToChat() {
    switchToChatRef.current = true;
    getVapi().stop();
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* Error toast */}
      {toastMsg && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 text-xs text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-5 py-2.5 rounded-full font-mono max-w-xs text-center">
          {toastMsg}
        </div>
      )}

      {/* Top left — logo */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="font-display font-bold text-sm tracking-widest text-[#F8F9FA] uppercase opacity-40 hover:opacity-80 transition-opacity duration-200"
        >
          DART
        </Link>
      </div>

      {/* Top right — detected software */}
      <div className="absolute top-6 right-6 z-10">
        {detectedSoftware ? (
          <div className="flex items-center gap-2 text-xs font-mono text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
            {detectedSoftware}
          </div>
        ) : (
          <p className="text-[10px] font-mono text-[#2a2a2a] tracking-wider uppercase">
            Detecting software...
          </p>
        )}
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 pb-28 px-4 w-full">
        <LiveOrb state={orbState} />

        {!callActive && !error && (
          <p className="text-xs font-mono text-[#333] animate-pulse tracking-wider">
            Connecting to DART...
          </p>
        )}

        {error && (
          <p className="text-xs text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-5 py-2.5 rounded-full max-w-xs text-center">
            {error}
          </p>
        )}

        {callActive && <LiveTranscript entries={transcript} />}
      </div>

      {/* Bottom bar */}
      <LiveBottomBar
        muted={muted}
        onToggleMute={handleToggleMute}
        onEnd={handleEnd}
        onSwitchToChat={handleSwitchToChat}
        ending={ending}
      />
    </div>
  );
}
