const steps = [
  {
    number: "01",
    title: "Launch DART Ask",
    description: "Sign in and describe your problem in plain language — type or speak. No ticket, no queue, no hold music.",
  },
  {
    number: "02",
    title: "AI diagnoses instantly",
    description: "DART identifies your software — Salesforce, HubSpot, Jira, QuickBooks, SAP — and walks you through the fix step by step.",
  },
  {
    number: "03",
    title: "Escalate to DART Lens",
    description: "Need hands-on help? DART Lens takes over your screen and resolves it directly. Ask gets you 80% there — Lens gets you the rest.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#1E1E2E] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs text-[#0066FF] font-medium tracking-widest uppercase mb-4 text-center">
          How It Works
        </p>
        <h2 className="text-3xl font-bold text-white text-center mb-14">
          From stuck to solved in seconds
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[calc(100%+1px)] w-full h-px bg-gradient-to-r from-[#1E1E2E] to-transparent -z-0" />
              )}
              <div className="relative z-10">
                <span className="text-4xl font-black text-[#0066FF]/20 leading-none">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-white mt-2 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
