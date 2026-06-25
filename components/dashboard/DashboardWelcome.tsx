"use client";

import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { useState, useRef } from "react";
import { agentList } from "@/lib/agents";
import NewSessionButton from "./NewSessionButton";

const chips = [
  "Fix my Salesforce workflow",
  "Debug a HubSpot sequence",
  "Explain a Jira permission",
  "QuickBooks reconciliation error",
  "SAP login or access issue",
];

export default function DashboardWelcome() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSend(text: string) {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ software: "General" }),
      });
      const session = await res.json();
      router.push(`/chat/${session.id}?agent=general&msg=${encodeURIComponent(text.trim())}`);
    } catch {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(value);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden rounded-2xl relative"
      style={{
        background: "#111114",
        border: "1.5px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)",
      }}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="mb-10">
            <h1
              className="pt-20 font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              What do you need solved?
            </h1>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Ask anything about Salesforce, HubSpot, Jira, QuickBooks, SAP, or any platform you&apos;re stuck on.
            </p>
          </div>

          {/* Quick-start chips */}
          <div className="mb-10">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#6B7280]/50 mb-3">
              Quick start
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setValue(chip)}
                  className="text-xs px-4 py-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.14] text-[#6B7280] hover:text-[#F8F9FA] rounded-full transition-all duration-200"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Agent selection */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#6B7280]/50 mb-3">
              Choose a specialist
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agentList.map((agent) => (
                <NewSessionButton key={agent.key} agent={agent} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed input bar */}
      <div className="px-4 py-4 border-t border-white/[0.06] shrink-0">
        <div className="max-w-2xl mx-auto flex items-end gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 focus-within:border-white/[0.14] transition-colors duration-200">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
            rows={1}
            placeholder="Describe your issue…"
            className="flex-1 bg-transparent text-sm text-[#F8F9FA] placeholder-[#6B7280] focus:outline-none resize-none overflow-hidden max-h-36 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend(value)}
            disabled={loading || !value.trim()}
            className="shrink-0 w-8 h-8 flex items-center justify-center bg-[#0066FF] hover:bg-[#0052CC] rounded-full text-white transition-all duration-200 shadow-[0_0_16px_rgba(0,102,255,0.3)] hover:shadow-[0_0_28px_rgba(0,102,255,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-[#6B7280]/40 text-center mt-2">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
