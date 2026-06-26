"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const SECTIONS = [
  { id: "getting-started", label: "Getting Started" },
  { id: "dart-ask", label: "DART Ask" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "voice-mode", label: "Voice Mode" },
  { id: "session-history", label: "Session History" },
  { id: "dart-lens", label: "DART Lens" },
  { id: "plans", label: "Plans & Pricing" },
  { id: "security", label: "Privacy & Security" },
];

const AGENTS = [
  {
    name: "Salesforce",
    label: "SF",
    description:
      "Covers the full Salesforce ecosystem — Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Flows, Apex errors, permission sets, sharing rules, SOQL, integrations, and deployment issues. Knows the exact navigation paths inside Classic and Lightning.",
    examples: [
      "Why can't my user see the Opportunity tab?",
      "My Flow is triggering recursively — how do I stop it?",
      "I'm getting a MIXED_DML_OPERATION error. What does that mean?",
    ],
  },
  {
    name: "HubSpot",
    label: "HS",
    description:
      "Deep knowledge of HubSpot CRM, Marketing Hub, Sales Hub, Service Hub, and Operations Hub. Covers workflows, sequences, deal pipelines, contact deduplication, reporting, integrations, and API errors.",
    examples: [
      "My workflow isn't enrolling contacts — why?",
      "How do I merge duplicate companies without losing data?",
      "My email open rate dropped to 0% — what happened?",
    ],
  },
  {
    name: "Jira",
    label: "JR",
    description:
      "Covers Jira Software, Jira Service Management, and Confluence. Handles board configuration, automation rules, permission schemes, project types, Sprint management, JQL, and common integration errors.",
    examples: [
      "My automation rule runs but the linked issue isn't updating.",
      "How do I restrict a project so only certain groups can see it?",
      "What's the JQL for issues updated in the last 7 days assigned to me?",
    ],
  },
  {
    name: "QuickBooks",
    label: "QB",
    description:
      "Expert in QuickBooks Online and Desktop. Covers bank reconciliation, chart of accounts, payroll errors, P&L discrepancies, sales tax, invoicing, class tracking, and data file issues.",
    examples: [
      "My bank reconciliation is off by $12.40 — how do I find the difference?",
      "Sales tax isn't calculating on my invoices. How do I fix this?",
      "How do I run a report showing profit by project?",
    ],
  },
  {
    name: "SAP",
    label: "SAP",
    description:
      "Covers SAP ERP, SAP S/4HANA, SAP Business One, and common modules including FI, CO, MM, SD, and PP. Handles master data errors, posting period issues, transaction codes, and authorization problems.",
    examples: [
      "I'm getting 'No authorization for company code' — how do I fix it?",
      "My goods receipt isn't posting. Transaction MIGO gives error M7 026.",
      "How do I reverse a posted document in FI?",
    ],
  },
  {
    name: "General",
    label: "GEN",
    description:
      "A senior IT troubleshooter for anything not covered by the specialist agents — Windows, macOS, Microsoft 365, Google Workspace, networking, printers, browser issues, VPNs, and more. Asks smart diagnostic questions to zero in on the problem.",
    examples: [
      "My Outlook keeps disconnecting from Exchange.",
      "I can't connect to our company VPN from home.",
      "Excel is crashing every time I open a specific file.",
    ],
  },
];

export default function DocsPage() {
  const [activeId, setActiveId] = useState("getting-started");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          let topEntry = visible[0];
          for (const entry of visible) {
            if (entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
              topEntry = entry;
            }
          }
          setActiveId(topEntry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F9FA]">
      <LandingNavbar />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-32 pb-0">
        {/* Page header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-4">Documentation</p>
          <h1
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            How DART works
          </h1>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Everything you need to get the most out of DART Ask and DART Lens.
          </p>
        </div>

        <div className="flex gap-16 pb-0">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <nav className="sticky top-28">
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeId === s.id
                          ? "text-[#F8F9FA] bg-white/[0.05]"
                          : "text-[#4B5563] hover:text-[#9CA3AF]"
                      }`}
                    >
                      {activeId === s.id && (
                        <span className="w-1 h-1 rounded-full bg-[#0066FF] shrink-0" />
                      )}
                      <span className={activeId === s.id ? "" : "pl-3"}>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-24 pb-32">

              {/* ── Getting Started ── */}
              <section id="getting-started" className="scroll-mt-28">
                <SectionLabel>Getting Started</SectionLabel>
                <H2>What is DART?</H2>
                <Body>
                  DART is an AI-powered IT support assistant. Describe your problem in plain language — type or speak — and DART diagnoses it and walks you through a fix, step by step. No ticket. No queue. No hold music.
                </Body>
                <Body>
                  DART has two tools: <strong className="text-[#F8F9FA]">DART Ask</strong> for text and voice conversations, and <strong className="text-[#F8F9FA]">DART Lens</strong> for live screen share with voice guidance (coming soon).
                </Body>
                <H3>Create your account</H3>
                <Steps>
                  <Step n={1}>Go to the <InlineLink href="/auth?mode=signup">sign up page</InlineLink> and create an account with your email or Google.</Step>
                  <Step n={2}>You start on the Free plan — 20 queries per month, 3 agents, 7-day session history.</Step>
                  <Step n={3}>Upgrade to Pro anytime for unlimited queries, all 6 agents, voice mode, and full session history.</Step>
                </Steps>
              </section>

              {/* ── DART Ask ── */}
              <section id="dart-ask" className="scroll-mt-28">
                <SectionLabel>DART Ask</SectionLabel>
                <H2>Using DART Ask</H2>
                <Body>
                  DART Ask is the fastest way to get unstuck. Open it, pick the software you&apos;re having trouble with, and describe the problem. DART will diagnose it and give you exact steps — not a link to documentation, not a suggestion to restart your computer.
                </Body>
                <H3>Starting a session</H3>
                <Steps>
                  <Step n={1}>Open DART Ask and select your software from the agent list.</Step>
                  <Step n={2}>Describe your problem in plain language. Include any error messages you&apos;re seeing.</Step>
                  <Step n={3}>DART will ask follow-up questions if needed, then give you a step-by-step resolution.</Step>
                  <Step n={4}>If you&apos;re still stuck, escalate to DART Lens for live screen guidance.</Step>
                </Steps>
                <Note>
                  The more detail you give upfront — what you were doing, what the error says, what software version you&apos;re on — the faster DART can diagnose it.
                </Note>
              </section>

              {/* ── AI Agents ── */}
              <section id="ai-agents" className="scroll-mt-28">
                <SectionLabel>AI Agents</SectionLabel>
                <H2>Six specialists. One for whatever&apos;s broken.</H2>
                <Body>
                  Each DART agent is trained with deep knowledge of a specific platform — the exact error codes, admin workflows, permission models, and edge cases a senior expert would know. When you pick a specialist, you get that level of precision.
                </Body>

                <div className="mt-8 space-y-6">
                  {AGENTS.map((agent) => (
                    <div key={agent.name} className="border border-white/[0.07] rounded-2xl p-6 bg-white/[0.01]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-[#0066FF] font-mono">{agent.label}</span>
                        </div>
                        <h3 className="font-display font-bold text-[#F8F9FA] text-base">{agent.name}</h3>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{agent.description}</p>
                      <div className="space-y-1.5">
                        {agent.examples.map((ex) => (
                          <div key={ex} className="flex items-start gap-2 text-sm text-[#4B5563]">
                            <ChevronRight className="w-3.5 h-3.5 text-[#0066FF]/50 mt-0.5 shrink-0" strokeWidth={2} />
                            <span>&ldquo;{ex}&rdquo;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Voice Mode ── */}
              <section id="voice-mode" className="scroll-mt-28">
                <SectionLabel>Voice Mode</SectionLabel>
                <H2>Talk instead of type</H2>
                <Body>
                  DART Ask supports voice input mid-session. Toggle the mic button inside any chat session and describe your problem out loud — DART transcribes your speech and responds in real time.
                </Body>
                <Body>
                  Voice mode is available on <strong className="text-[#F8F9FA]">Pro and Team plans</strong>. It uses Vapi for real-time voice processing.
                </Body>
                <H3>Tips for voice</H3>
                <ul className="space-y-3 mt-4">
                  {[
                    "Read error messages aloud exactly as they appear — DART recognises error codes by voice.",
                    "Say the software name first: “In Salesforce, I’m getting…” helps DART route instantly.",
                    "If DART mishears a technical term, you can correct it by typing — sessions support mixed input.",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm text-[#6B7280]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#0066FF] shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Session History ── */}
              <section id="session-history" className="scroll-mt-28">
                <SectionLabel>Session History</SectionLabel>
                <H2>Your sessions are saved</H2>
                <Body>
                  Every DART Ask session is saved to your account so you can pick up where you left off, reference a previous fix, or share a session with a colleague.
                </Body>
                <div className="mt-6 border border-white/[0.07] rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 border-b border-white/[0.07]">
                    <div className="px-5 py-3 text-xs font-mono tracking-widest uppercase text-[#4B5563]">Plan</div>
                    <div className="px-5 py-3 text-xs font-mono tracking-widest uppercase text-[#4B5563]">History</div>
                    <div className="px-5 py-3 text-xs font-mono tracking-widest uppercase text-[#4B5563]">Queries</div>
                  </div>
                  {[
                    { plan: "Free", history: "7 days", queries: "20 / month" },
                    { plan: "Pro", history: "Unlimited", queries: "Unlimited" },
                    { plan: "Team", history: "Unlimited", queries: "Unlimited" },
                  ].map((row, i) => (
                    <div key={row.plan} className={`grid grid-cols-3 ${i < 2 ? "border-b border-white/[0.05]" : ""}`}>
                      <div className="px-5 py-4 text-sm text-[#F8F9FA] font-medium">{row.plan}</div>
                      <div className="px-5 py-4 text-sm text-[#6B7280]">{row.history}</div>
                      <div className="px-5 py-4 text-sm text-[#6B7280]">{row.queries}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── DART Lens ── */}
              <section id="dart-lens" className="scroll-mt-28">
                <SectionLabel>DART Lens</SectionLabel>
                <div className="flex items-center gap-3 mb-4">
                  <H2 noMargin>DART Lens</H2>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#0066FF] border border-[#0066FF]/30 px-2 py-1 rounded-full leading-none shrink-0">
                    Coming Soon
                  </span>
                </div>
                <Body>
                  DART Lens is the next level of support. When Chat isn&apos;t enough, open Remote: share your screen, start talking, and DART sees exactly what you see. It guides you through every step live — or takes action on screen directly.
                </Body>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Screen sharing", body: "DART sees your screen in real time — errors, menus, your exact state." },
                    { title: "Live voice", body: "Full voice conversation. No typing. Talk naturally, DART responds live." },
                    { title: "Step-by-step guidance", body: "DART talks you through every click while watching your screen." },
                    { title: "Zero context lost", body: "Escalate from Chat to Remote and DART already knows the problem." },
                  ].map((f) => (
                    <div key={f.title} className="border border-white/[0.07] rounded-xl p-5 bg-white/[0.01]">
                      <p className="text-sm font-semibold text-[#F8F9FA] mb-1.5">{f.title}</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{f.body}</p>
                    </div>
                  ))}
                </div>
                <Note>
                  DART Lens requires the DART desktop app on Windows or Mac. Browser-based screen takeover is not technically possible — the desktop app provides the system-level permissions needed.
                </Note>
              </section>

              {/* ── Plans ── */}
              <section id="plans" className="scroll-mt-28">
                <SectionLabel>Plans & Pricing</SectionLabel>
                <H2>Simple pricing. No surprises.</H2>
                <Body>
                  Start free. Upgrade when you need more. Cancel any time — no contracts.
                </Body>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Free",
                      price: "$0",
                      features: ["20 queries / month", "3 specialist agents", "7-day session history", "Text only"],
                    },
                    {
                      name: "Pro",
                      price: "$19 / mo",
                      highlight: true,
                      features: ["Unlimited queries", "All 6 agents", "Full session history", "Voice mode", "Priority responses"],
                    },
                    {
                      name: "Team",
                      price: "$49 / mo",
                      features: ["Everything in Pro", "Up to 10 seats", "Shared session library", "Admin dashboard", "Dedicated support"],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative rounded-2xl border p-6 ${
                        plan.highlight
                          ? "border-[#0066FF]/30 bg-[#0066FF]/[0.04]"
                          : "border-white/[0.07] bg-white/[0.01]"
                      }`}
                    >
                      {plan.highlight && <div className="absolute top-0 inset-x-0 h-px bg-[#0066FF] rounded-t-2xl" />}
                      <p className="text-xs font-mono tracking-widest uppercase text-[#4B5563] mb-2">{plan.name}</p>
                      <p className="font-display font-extrabold text-[#F8F9FA] text-2xl tracking-tight mb-4">{plan.price}</p>
                      <ul className="space-y-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <span className="w-1 h-1 rounded-full bg-[#0066FF] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link href="/pricing" className="text-sm text-[#0066FF] hover:underline underline-offset-4">
                    See full pricing →
                  </Link>
                </div>
              </section>

              {/* ── Security ── */}
              <section id="security" className="scroll-mt-28">
                <SectionLabel>Privacy & Security</SectionLabel>
                <H2>Your data is yours</H2>
                <Body>
                  DART stores your session history and account information securely in Supabase with row-level security. Your conversations are never used to train AI models.
                </Body>
                <div className="mt-6 space-y-4">
                  {[
                    { title: "DART never asks for passwords", body: "Do not share login credentials, API keys, or sensitive tokens in a DART session. DART can diagnose permission and access problems without needing your password." },
                    { title: "Conversations go to Anthropic", body: "Your chat messages are processed by Anthropic's API to generate responses. Anthropic's data use policies apply. We do not sell your data." },
                    { title: "Session deletion", body: "Free plan sessions are deleted after 7 days. Pro and Team sessions are retained while your account is active. Delete your account and your data is removed within 30 days." },
                    { title: "Encrypted connections", body: "All traffic between your browser and DART is encrypted over HTTPS. Database access uses row-level security so no user can access another's sessions." },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-white/[0.08] pl-5">
                      <p className="text-sm font-semibold text-[#F8F9FA] mb-1">{item.title}</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/privacy" className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.12] text-[#F8F9FA] hover:bg-white/[0.04] transition-all duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.12] text-[#F8F9FA] hover:bg-white/[0.04] transition-all duration-200">
                    Terms of Service
                  </Link>
                  <a href="mailto:contact@devtodefy.com" className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_24px_rgba(0,102,255,0.2)] transition-all duration-200">
                    Contact us →
                  </a>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-3">{children}</p>
  );
}

function H2({ children, noMargin }: { children: React.ReactNode; noMargin?: boolean }) {
  return (
    <h2 className={`font-display font-extrabold text-[#F8F9FA] leading-[1.1] tracking-[-0.02em] ${noMargin ? "" : "mb-4"}`} style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-bold text-[#F8F9FA] text-base mt-7 mb-3">{children}</h3>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{children}</p>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 flex gap-3 border border-[#0066FF]/20 bg-[#0066FF]/[0.04] rounded-xl px-4 py-3.5">
      <span className="text-[#0066FF] text-xs font-mono tracking-widest uppercase shrink-0 mt-0.5">Note</span>
      <p className="text-sm text-[#6B7280] leading-relaxed">{children}</p>
    </div>
  );
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="mt-4 space-y-3">{children}</ol>;
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#6B7280]">
      <span className="shrink-0 w-5 h-5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-bold font-mono flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[#0066FF] hover:underline underline-offset-4">
      {children}
    </Link>
  );
}
