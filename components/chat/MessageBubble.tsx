type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  message: Message;
  isStreaming?: boolean;
};

export default function MessageBubble({ message, isStreaming }: Props) {
  const isUser = message.role === "user";

  if (isStreaming && !message.content) {
    return (
      <div className="flex items-end gap-3 mb-5">
        <div className="w-7 h-7 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold">D</span>
        </div>
        <div className="bg-white/[0.05] border border-white/[0.10] rounded-2xl px-4 py-3">
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 mb-5 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold">D</span>
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#F8F9FA]"
            : "bg-white/[0.05] border border-white/[0.08] text-[#F8F9FA]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
