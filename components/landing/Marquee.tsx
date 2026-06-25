const ITEMS = [
  "Stuck? Solved.",
  "No tickets.",
  "Instant answers.",
  "Salesforce.",
  "HubSpot.",
  "Jira.",
  "QuickBooks.",
  "SAP.",
  "Expert help.",
  "No waiting.",
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-6 mx-6">
      <span className="text-[#F8F9FA]/70 font-display font-bold text-2xl tracking-[-0.02em] whitespace-nowrap">
        {text}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
    </span>
  );
}

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="py-6 overflow-hidden border-y border-white/[0.06]">
      <div className="flex animate-marquee w-max">
        {doubled.map((item, i) => (
          <MarqueeItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
}
