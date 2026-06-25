import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const beliefs = [
  "Support shouldn't take days. It should take seconds.",
  "The person stuck on a Salesforce error at 11pm deserves a real expert, not a ticket number.",
  "Deep knowledge shouldn't live inside one person's head — it should be on demand.",
  "The best answer isn't the fastest one. It's the right one, explained clearly.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F9FA]">
      <LandingNavbar />

      <main className="max-w-7xl mx-auto px-8 lg:px-14 pt-40 pb-32">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-6">
            About
          </p>
          <h1
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
          >
            Built for the moment no one is picking up.
          </h1>
          <p className="text-[#6B7280] text-base leading-relaxed max-w-xl">
            DART started from a simple frustration: being stuck on software you&apos;re
            paying for, with no one around who actually knows how to fix it.
            Not a chatbot. Not a documentation page. A real expert — available now.
          </p>
        </div>

        {/* Mission block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06] mb-24 rounded-2xl overflow-hidden">
          <div className="bg-[#080808] p-10">
            <p className="text-xs font-mono tracking-widest uppercase text-[#0066FF] mb-6">
              The problem
            </p>
            <p className="font-display font-bold text-[#F8F9FA] leading-[1.1] tracking-[-0.01em] mb-6"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
            >
              Enterprise software is complex. Support is broken.
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Salesforce, SAP, Jira, HubSpot — these tools run entire businesses.
              But when something breaks, you&apos;re on hold, in a ticket queue, or
              watching a 40-minute tutorial that doesn&apos;t cover your exact version.
              The cost isn&apos;t just frustration. It&apos;s hours of lost productivity, every week.
            </p>
          </div>
          <div className="bg-[#0D0D0D] p-10">
            <p className="text-xs font-mono tracking-widest uppercase text-[#0066FF] mb-6">
              The fix
            </p>
            <p className="font-display font-bold text-[#F8F9FA] leading-[1.1] tracking-[-0.01em] mb-6"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
            >
              A specialist who knows your exact platform, at depth.
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              DART gives you an AI agent that knows Salesforce the way a
              certified architect does — not a generalist with surface knowledge,
              but a specialist who&apos;s seen every error message, every permission edge case,
              every admin gotcha. For each platform you use.
            </p>
          </div>
        </div>

        {/* Beliefs */}
        <div className="mb-24">
          <p className="text-xs font-mono tracking-widest uppercase text-[#0066FF] mb-12">
            What we believe
          </p>
          {beliefs.map((belief, i) => (
            <div
              key={i}
              className="flex items-baseline gap-8 py-7 border-b border-white/[0.06] last:border-none"
            >
              <span className="text-[10px] font-mono text-white/20 shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="font-display font-bold text-[#F8F9FA] leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
              >
                {belief}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 font-semibold text-sm transition-all duration-200 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] rounded-full"
          >
            Try DART free →
          </Link>
          <a
            href="mailto:gabrielkappy@gmail.com"
            className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200"
          >
            Or get in touch
          </a>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
