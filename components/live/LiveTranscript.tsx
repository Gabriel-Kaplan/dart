"use client";

import { useEffect, useRef } from "react";

export type TranscriptEntry = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  entries: TranscriptEntry[];
};

export default function LiveTranscript({ entries }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  if (entries.length === 0) {
    return (
      <p className="text-center text-[#333] text-xs font-mono mt-2">
        Listening...
      </p>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto max-h-[28vh] overflow-y-auto px-4 space-y-3 scrollbar-thin">
      {entries.map((entry) => (
        <div key={entry.id} className="flex gap-2.5 text-xs leading-relaxed">
          <span
            className={`shrink-0 font-mono font-bold pt-px ${
              entry.role === "assistant" ? "text-[#0066FF]" : "text-[#555]"
            }`}
          >
            {entry.role === "assistant" ? "DART" : "You"}
          </span>
          <span className="text-[#666]">{entry.content}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
