type Props = {
  muted: boolean;
  onToggleMute: () => void;
  onEnd: () => void;
  onSwitchToChat: () => void;
  ending: boolean;
};

export default function LiveBottomBar({
  muted,
  onToggleMute,
  onEnd,
  onSwitchToChat,
  ending,
}: Props) {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-8 flex items-center justify-center px-4 pointer-events-none">
      <div className="flex items-center gap-2 sm:gap-3 bg-[#0f0f0f]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-3 pointer-events-auto">
        {/* Mute */}
        <button
          onClick={onToggleMute}
          title={muted ? "Unmute microphone" : "Mute microphone"}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            muted
              ? "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20"
              : "bg-white/[0.04] text-[#6B7280] hover:text-white border border-white/[0.08] hover:border-white/20"
          }`}
        >
          <MicIcon muted={muted} />
          {muted ? "Unmute" : "Mute"}
        </button>

        <div className="w-px h-5 bg-white/[0.08]" />

        {/* Switch to chat */}
        <button
          onClick={onSwitchToChat}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-[#6B7280] hover:text-white border border-white/[0.08] hover:border-white/20 bg-white/[0.04] transition-all duration-200"
        >
          <ChatIcon />
          Switch to Chat
        </button>

        <div className="w-px h-5 bg-white/[0.08]" />

        {/* End session */}
        <button
          onClick={onEnd}
          disabled={ending}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <EndIcon />
          {ending ? "Saving..." : "End Session"}
        </button>
      </div>
    </div>
  );
}

function MicIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23M12 19v4m0 0H8m4 0h4" />
      </svg>
    );
  }
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function EndIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
