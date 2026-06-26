import Link from "next/link";

const INTEGRATIONS = ["Salesforce", "HubSpot", "Jira", "QuickBooks", "SAP", "General"];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#080808]">

      {/* Ghost DART — wide, very faint, bleeds off the bottom */}
      <div
        className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none select-none"
        style={{ overflow: "hidden" }}
      >
        <span
          className="font-display font-extrabold leading-none text-white"
          style={{
            opacity: 0.018,
            fontSize: "46vw",
            letterSpacing: "-0.03em",
            lineHeight: 0.85,
            marginBottom: "-6vw",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          DART
        </span>
      </div>

      {/* ── Top border ── */}
      <div className="border-t border-white/[0.06]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-14">

        {/* ── Brand header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 pt-14 pb-14">
          <div>
            <span
              className="font-display font-extrabold text-[#F8F9FA] tracking-[-0.03em] block leading-none mb-2"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              DART
            </span>
            <p className="text-sm text-[#4B5563] tracking-wide">
              Stuck? Solved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth?mode=signup"
              className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.1] text-[#9CA3AF] hover:text-[#F8F9FA] hover:border-white/[0.2] transition-all duration-200"
            >
              DART Ask
            </Link>
            <Link
              href="/live"
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white transition-all duration-200 shadow-[0_0_24px_rgba(0,102,255,0.2)] hover:shadow-[0_0_36px_rgba(0,102,255,0.35)]"
            >
              DART Lens →
            </Link>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/[0.06]" />

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 py-14">

          {/* Product */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#3B4255] mb-6">
              Product
            </p>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/auth?mode=signup"
                  className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200"
                >
                  DART Ask
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-sm text-[#3B4255]">DART Lens</span>
                <span className="text-[8px] font-mono tracking-widest uppercase text-[#0066FF] border border-[#0066FF]/25 px-1.5 py-0.5 rounded-full leading-none">
                  Soon
                </span>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Agents */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#3B4255] mb-6">
              AI Agents
            </p>
            <ul className="space-y-4">
              {INTEGRATIONS.map((name) => (
                <li key={name}>
                  <span className="text-sm text-[#6B7280]">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#3B4255] mb-6">
              Company
            </p>
            <ul className="space-y-4">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/[0.06]" />

        {/* ── Copyright strip ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-6">
          <p className="text-xs text-[#3B4255]">© 2026 DART. All rights reserved.</p>
          <p className="text-xs text-[#3B4255]">Built by Dev To Defy</p>
        </div>

      </div>

      {/* Space that lets the ghost text breathe below the copyright */}
      <div className="relative z-10" style={{ height: "14vw" }} />

    </footer>
  );
}
