export default function MockChat() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0D0D0D] overflow-hidden shadow-2xl shadow-[#0066FF]/5">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#080808]">
        <div className="w-5 h-5 rounded-lg bg-[#0066FF] flex items-center justify-center">
          <span className="text-white text-xs font-bold">D</span>
        </div>
        <span className="text-xs font-semibold text-white">DART</span>
        <span className="text-xs text-[#6B7280]">— Salesforce Specialist</span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-[#0066FF]/15 border border-[#0066FF]/25 rounded-2xl px-3 py-2 text-xs text-[#E0E0E0] leading-relaxed">
            My Salesforce report isn&apos;t showing any data even though I can see records in the system.
          </div>
        </div>

        {/* DART response */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-lg bg-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <div className="bg-[#080808] border border-white/[0.06] rounded-2xl px-3 py-2 text-xs text-[#E0E0E0] leading-relaxed">
            <p className="mb-2">This is almost always a <span className="text-[#0066FF]">record scope or sharing issue</span>. Here&apos;s how to fix it:</p>
            <ol className="space-y-1 text-[#AAAAAA]">
              <li>1. Open the report → click <span className="text-white font-medium">Edit</span></li>
              <li>2. Go to <span className="text-white font-medium">Filters</span> → check date range</li>
              <li>3. Click <span className="text-white font-medium">Show</span> → change from &quot;My Records&quot; to <span className="text-white font-medium">&quot;All Records&quot;</span></li>
              <li>4. Run the report again</li>
            </ol>
            <p className="mt-2 text-[#6B7280]">Does that surface the data you&apos;re expecting?</p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 rounded-lg bg-[#0066FF] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <div className="bg-[#080808] border border-white/[0.06] rounded-2xl px-3 py-2">
            <div className="flex gap-1 items-center">
              <div className="w-1 h-1 bg-[#0066FF] rounded-full animate-bounce [animation-delay:0ms]" />
              <div className="w-1 h-1 bg-[#0066FF] rounded-full animate-bounce [animation-delay:150ms]" />
              <div className="w-1 h-1 bg-[#0066FF] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <div className="flex-1 bg-[#080808] border border-white/[0.06] rounded-full px-3 py-1.5 text-xs text-[#6B7280]">
            Describe your issue...
          </div>
          <div className="bg-[#0066FF] text-white px-3 py-1.5 rounded-full text-xs font-medium">
            Send
          </div>
        </div>
      </div>
    </div>
  );
}
