"use client";

import { useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";

type Props = {
  agentSystemPrompt: string;
};

let vapiInstance: Vapi | null = null;

function getVapi() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "");
  }
  return vapiInstance;
}

export default function VoiceToggle({ agentSystemPrompt }: Props) {
  const [active, setActive] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const startVoice = useCallback(async () => {
    setConnecting(true);
    const vapi = getVapi();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vapiConfig: any = {
        transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
        model: {
          provider: "anthropic",
          model: "claude-sonnet-4-6",
          messages: [{ role: "system", content: agentSystemPrompt }],
        },
        voice: { provider: "playht", voiceId: "jennifer" },
      };
      await vapi.start(vapiConfig);
      setActive(true);
    } catch {
      // Voice not available — fail silently
    } finally {
      setConnecting(false);
    }
  }, [agentSystemPrompt]);

  const stopVoice = useCallback(() => {
    const vapi = getVapi();
    vapi.stop();
    setActive(false);
  }, []);

  return (
    <button
      onClick={active ? stopVoice : startVoice}
      disabled={connecting}
      title={active ? "Stop voice mode" : "Start voice mode"}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium transition-colors border ${
        active
          ? "bg-danger/10 border-danger/40 text-danger hover:bg-danger/20"
          : "bg-surface border-border text-muted hover:text-foreground hover:border-accent/40"
      } disabled:opacity-50`}
    >
      {connecting ? (
        <span className="animate-pulse">Connecting...</span>
      ) : active ? (
        <>
          <span className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse" />
          Stop Voice
        </>
      ) : (
        <>
          <MicIcon />
          Voice
        </>
      )}
    </button>
  );
}

function MicIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}
