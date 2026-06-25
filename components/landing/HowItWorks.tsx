const steps = [
  {
    number: "01",
    title: "Pick your software",
    description: "Select from Salesforce, HubSpot, Jira, QuickBooks, SAP, or any other tool.",
  },
  {
    number: "02",
    title: "Describe your problem",
    description: "Type or speak. Tell DART exactly what's broken, stuck, or confusing.",
  },
  {
    number: "03",
    title: "Get instant expert help",
    description: "DART diagnoses the issue and walks you through the fix, step by step.",
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
