"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Agent } from "@/lib/agents";
import { ArrowLeft, ArrowUp, Square, RotateCcw } from "lucide-react";
import VoiceToggle from "./VoiceToggle";

const mdComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#F8F9FA]">{children}</strong>,
  em: ({ children }) => <em className="italic opacity-80">{children}</em>,
  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  h1: ({ children }) => <h1 className="text-base font-bold mb-1.5 mt-3 first:mt-0 text-[#F8F9FA]">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-bold mb-1.5 mt-2.5 first:mt-0 text-[#F8F9FA]">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0 text-[#F8F9FA]/90">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#0066FF]/60 pl-3 my-2 text-[#6B7280] italic">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#3385FF] underline underline-offset-2 hover:text-[#0066FF]">
      {children}
    </a>
  ),
  hr: () => <hr className="my-3 border-white/[0.08]" />,
  pre: ({ children }) => (
    <pre className="my-3 p-3 rounded-xl bg-black/40 overflow-x-auto border border-white/[0.08]">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isBlock = String(children).endsWith("\n");
    if (isBlock) {
      return <code className="text-xs font-mono text-[#93C5FD]">{String(children).replace(/\n$/, "")}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded text-[11px] bg-white/[0.08] font-mono text-[#93C5FD]">
        {children}
      </code>
    );
  },
};

function buildDM(dark: boolean) {
  return {
    card:        dark ? "#111114" : "#FFFFFF",
    cardBorder:  dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    cardShadow:  dark ? "0 2px 8px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)" : "0 1px 3px rgba(0,0,0,0.08)",
    divider:     dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    divider2:    dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    textPrimary: dark ? "#F8F9FA" : "#111114",
    textMuted:   dark ? "#6B7280" : "#9CA3AF",
    inputBg:     dark ? "#0d0d10" : "#F3F4F6",
    inputBorder: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    hoverBg:     dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    accent:      "#0066FF",
  };
}

const dm = buildDM(true);

type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  sessionId: string;
  agent: Agent;
  initialMessage?: string;
};

function ThinkingDots() {
  return (
    <div className="flex items-end gap-3 mb-5">
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: 28, height: 28, borderRadius: "50%", background: dm.accent }}
      >
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>D</span>
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: dm.inputBg, border: `1px solid ${dm.divider2}` }}
      >
        <div className="flex gap-1 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:0ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:150ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({ sessionId, agent, initialMessage }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialSentRef = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    async function loadMessages() {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });
      setMessages(data ?? []);
      setInitialized(true);
    }
    loadMessages();
  }, [sessionId, supabase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (!streaming && textareaRef.current) textareaRef.current.focus();
  }, [streaming]);

  const saveMessage = useCallback(
    async (role: "user" | "assistant", content: string) => {
      const { data } = await supabase
        .from("messages")
        .insert({ session_id: sessionId, role, content })
        .select()
        .single();
      return data;
    },
    [sessionId, supabase]
  );

  const generateSummary = useCallback(
    async (msgs: Message[]) => {
      if (msgs.length < 2) return;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentKey: "general",
            messages: [
              {
                role: "user",
                content: `Summarize this support conversation in one short sentence (under 10 words): ${msgs.map((m) => `${m.role}: ${m.content}`).join("\n")}`,
              },
            ],
          }),
        });
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let summary = "";
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            summary += decoder.decode(value);
          }
        }
        await fetch("/api/session", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, summary: summary.trim() }),
        });
      } catch {
        // best-effort
      }
    },
    [sessionId]
  );

  const streamAssistantReply = useCallback(
    async (contextMessages: Message[]) => {
      const controller = new AbortController();
      abortRef.current = controller;
      setStreaming(true);
      setStreamingContent("");
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentKey: agent.key,
            messages: contextMessages.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });
        if (!res.body) throw new Error("No response body");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullContent += decoder.decode(value);
          setStreamingContent(fullContent);
        }
        const assistantMessage: Message = { role: "assistant", content: fullContent };
        const finalMessages = [...contextMessages, assistantMessage];
        setMessages(finalMessages);
        setStreamingContent("");
        await saveMessage("assistant", fullContent);
        if (finalMessages.length === 2) generateSummary(finalMessages);
      } catch (err) {
        const aborted = err instanceof Error && err.name === "AbortError";
        setStreamingContent("");
        if (!aborted) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Something went wrong. Please try again." },
          ]);
        }
      } finally {
        abortRef.current = null;
        setStreaming(false);
      }
    },
    [agent.key, saveMessage, generateSummary]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (streaming) return;
      const userMessage: Message = { role: "user", content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      await saveMessage("user", content);
      await streamAssistantReply(updatedMessages);
    },
    [messages, streaming, saveMessage, streamAssistantReply]
  );

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const regenerate = useCallback(async () => {
    if (streaming) return;
    // Find the last user message and re-run from there
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIdx === -1) return;
    const cutIdx = messages.length - lastUserIdx;
    // Remove the last assistant message(s) after the last user message
    const contextMessages = messages.slice(0, cutIdx);
    // Delete the last assistant message from DB if it exists
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.id && lastMsg.role === "assistant") {
      await supabase.from("messages").delete().eq("id", lastMsg.id);
    }
    setMessages(contextMessages);
    await streamAssistantReply(contextMessages);
  }, [messages, streaming, supabase, streamAssistantReply]);

  useEffect(() => {
    if (initialized && messages.length === 0 && initialMessage && !initialSentRef.current) {
      initialSentRef.current = true;
      sendMessage(initialMessage);
    }
  }, [initialized, messages.length, initialMessage, sendMessage]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || streaming) return;
    sendMessage(trimmed);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  const lastIsAssistant =
    !streaming && messages.length > 0 && messages[messages.length - 1].role === "assistant";

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: dm.card,
        border: `1.5px solid ${dm.cardBorder}`,
        boxShadow: dm.cardShadow,
        borderRadius: "1rem",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0 px-4"
        style={{ height: 48, borderBottom: `1px solid ${dm.divider}` }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-md transition-colors hover:bg-white/[0.06]"
            style={{ color: dm.textMuted, padding: 4 }}
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 28, height: 28, borderRadius: "50%", background: dm.accent }}
          >
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>D</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: dm.textPrimary }}>
            {agent.softwareName} Specialist
          </span>
        </div>
        <VoiceToggle agentSystemPrompt={agent.systemPrompt} />
      </div>

      {/* Messages feed */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-8 md:py-8">
        <div className="max-w-3xl mx-auto">
          {/* Empty state */}
          {initialized && messages.length === 0 && !streaming && (
            <div className="flex flex-col items-center justify-center pt-16 text-center">
              <p className="text-xl font-semibold mb-2" style={{ color: dm.textPrimary }}>
                What do you need solved?
              </p>
              <p className="text-sm mb-8" style={{ color: dm.textMuted }}>
                Describe your issue or pick a common topic below
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {agent.commonIssues.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => sendMessage(issue)}
                    className="text-xs px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/[0.08] hover:text-[#F8F9FA]"
                    style={{
                      background: dm.hoverBg,
                      border: `1px solid ${dm.inputBorder}`,
                      color: dm.textMuted,
                    }}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id ?? i}
                className={`flex items-end gap-3 mb-5 ${isUser ? "flex-row-reverse" : ""}`}
              >
                {!isUser && (
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 28, height: 28, borderRadius: "50%", background: dm.accent }}
                  >
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>D</span>
                  </div>
                )}
                <div
                  className="max-w-[88%] md:max-w-[78%] px-4 py-3 text-sm leading-relaxed"
                  style={
                    isUser
                      ? {
                          background: "rgba(0,102,255,0.15)",
                          border: "1px solid rgba(0,102,255,0.3)",
                          borderRadius: "1rem",
                          borderBottomRightRadius: "0.125rem",
                          color: dm.textPrimary,
                        }
                      : {
                          background: dm.inputBg,
                          border: `1px solid ${dm.divider2}`,
                          borderRadius: "1rem",
                          borderBottomLeftRadius: "0.125rem",
                          color: dm.textPrimary,
                        }
                  }
                >
                  {isUser ? (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}

          {/* Streaming */}
          {streaming &&
            (streamingContent ? (
              <div className="flex items-end gap-3 mb-5">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 28, height: 28, borderRadius: "50%", background: dm.accent }}
                >
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>D</span>
                </div>
                <div
                  className="max-w-[88%] md:max-w-[78%] px-4 py-3 text-sm leading-relaxed"
                  style={{
                    background: dm.inputBg,
                    border: `1px solid ${dm.divider2}`,
                    borderRadius: "1rem",
                    borderBottomLeftRadius: "0.125rem",
                    color: dm.textPrimary,
                  }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {streamingContent}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <ThinkingDots />
            ))}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div
        className="shrink-0 px-4 py-4"
        style={{ borderTop: `1px solid ${dm.divider}` }}
      >
        {/* Regenerate button — shown after last assistant message */}
        {lastIsAssistant && (
          <div className="max-w-3xl mx-auto mb-2 flex justify-center">
            <button
              onClick={regenerate}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/[0.06]"
              style={{ color: dm.textMuted, border: `1px solid ${dm.divider2}` }}
            >
              <RotateCcw className="w-3 h-3" />
              Regenerate
            </button>
          </div>
        )}

        <div className="max-w-3xl mx-auto flex items-end gap-3 bg-[#0d0d10] border border-white/[0.08] focus-within:border-white/[0.14] rounded-2xl px-4 py-3 transition-colors duration-200">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            rows={1}
            placeholder="Describe your issue…"
            className="flex-1 bg-transparent text-sm text-[#F8F9FA] placeholder-[#6B7280] focus:outline-none resize-none overflow-hidden max-h-36 disabled:opacity-50"
          />
          {streaming ? (
            <button
              onClick={stopGeneration}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-all duration-200 bg-white/[0.10] hover:bg-white/[0.16] border border-white/[0.12]"
              aria-label="Stop generation"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all duration-200 shadow-[0_0_16px_rgba(0,102,255,0.3)] hover:shadow-[0_0_28px_rgba(0,102,255,0.5)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-[10px] text-[#6B7280]/40 text-center mt-2">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
