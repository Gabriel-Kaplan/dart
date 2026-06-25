"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
  prefill?: string;
};

export default function InputBar({ onSend, disabled, prefill }: Props) {
  const [value, setValue] = useState(prefill ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefill) setValue(prefill);
  }, [prefill]);

  useEffect(() => {
    if (!disabled && textareaRef.current) textareaRef.current.focus();
  }, [disabled]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  return (
    <div className="px-4 py-4 bg-[#080808] border-t border-white/[0.06] shrink-0">
      <div className="max-w-3xl mx-auto flex items-end gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 focus-within:border-white/[0.14] transition-colors duration-200">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Describe your issue…"
          className="flex-1 bg-transparent text-sm text-[#F8F9FA] placeholder-[#6B7280] focus:outline-none resize-none overflow-hidden max-h-36 disabled:opacity-50"
        />
        <button
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="shrink-0 w-8 h-8 flex items-center justify-center bg-[#0066FF] hover:bg-[#0052CC] rounded-full text-white transition-all duration-200 shadow-[0_0_16px_rgba(0,102,255,0.3)] hover:shadow-[0_0_28px_rgba(0,102,255,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] text-[#6B7280]/40 text-center mt-2">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
