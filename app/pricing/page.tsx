import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get unstuck without spending anything.",
    cta: "Start free",
    href: "/auth?mode=signup",
    highlight: false,
    features: [
      "20 queries per month",
      "3 specialist agents",
      "Session history (7 days)",
      "Text only",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full access. No limits. The way it should be.",
    cta: "Get Pro",
    href: "/auth?mode=signup",
    highlight: true,
    features: [
      "Unlimited queries",
      "All 6 specialist agents",
      "Full session history",
      "Voice mode",
      "Priority responses",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For teams where everyone gets stuck sometimes.",
    cta: "Contact us",
    href: "mailto:gabrielkappy@gmail.com",
    highlight: false,
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Shared session library",
      "Admin dashboard",
      "Dedicated support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F9FA]">
      <LandingNavbar />

      <main className="max-w-7xl mx-auto px-8 lg:px-14 pt-40 pb-32">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-5">
            Pricing
          </p>
          <h1
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
          >
            Simple. No surprises.
          </h1>
          <p className="text-[#6B7280] text-base max-w-md mx-auto">
            Start free. Upgrade when you need more. Cancel any time.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] mb-20 rounded-2xl overflow-hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-10 ${
                plan.highlight ? "bg-[#0D0D0D]" : "bg-[#080808]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-px bg-[#0066FF]" />
              )}
              <div className="mb-8">
                <p className="text-xs font-mono tracking-widest uppercase text-[#6B7280] mb-3">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span
                    className="font-display font-extrabold text-[#F8F9FA] tracking-[-0.02em]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[#6B7280]">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#F8F9FA]/80">
                    <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`text-center text-sm font-semibold px-6 py-3 transition-all duration-200 ${
                  plan.highlight
                    ? "bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:shadow-[0_0_50px_rgba(0,102,255,0.5)] rounded-full"
                    : "border border-white/[0.12] text-[#F8F9FA] hover:bg-white/[0.04] rounded-full"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <p className="text-center text-sm text-[#6B7280]">
          Questions?{" "}
          <Link href="/#faq" className="text-[#F8F9FA] underline underline-offset-4 hover:text-[#0066FF] transition-colors duration-200">
            See the FAQ
          </Link>{" "}
          or{" "}
          <a href="mailto:gabrielkappy@gmail.com" className="text-[#F8F9FA] underline underline-offset-4 hover:text-[#0066FF] transition-colors duration-200">
            reach out directly.
          </a>
        </p>
      </main>

      <LandingFooter />
    </div>
  );
}
