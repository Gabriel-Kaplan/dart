"use client";

import { ArrowRight, Mic, Search, Zap } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    number: "01",
    title: "Pick your specialist",
    body: "Select from six deep-knowledge agents — Salesforce, HubSpot, Jira, QuickBooks, SAP — or let the General agent handle anything else. The right expert loads instantly.",
    icon: Search,
    color: "rgba(0,102,255,0.06)",
    accent: "#0066FF",
  },
  {
    number: "02",
    title: "Describe the problem",
    body: "Type it or say it out loud. Give DART the error message, what you were doing, what broke. No ticket form. No dropdown categories. No template. Just describe it.",
    icon: Mic,
    color: "rgba(0,102,255,0.04)",
    accent: "#0066FF",
  },
  {
    number: "03",
    title: "Get a real answer",
    body: "Not a link to documentation. Not 'have you tried turning it off and on.' A precise, step-by-step diagnosis with exact navigation paths — and an explanation of why it happened.",
    icon: Zap,
    color: "rgba(0,102,255,0.03)",
    accent: "#0066FF",
  },
  {
    number: "04",
    title: "Move on",
    body: "Fixed in minutes. Not days. DART doesn't drop you — it walks you through until the problem is gone. Then you close the tab and get back to work.",
    icon: ArrowRight,
    color: "rgba(0,102,255,0.02)",
    accent: "#0066FF",
  },
];

export default function StackingCards() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            From stuck to solved in four steps.
          </h2>
        </div>

        {/* Stacking sticky cards */}
        <div className="relative">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="sticky"
                style={{ top: `${80 + i * 16}px`, zIndex: i + 1 }}
              >
                <div
                  className="rounded-2xl border border-white/[0.08] p-8 sm:p-10 mb-3 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, #0D0D0D 0%, #080808 100%)` }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-8">
                    {/* Number */}
                    <div className="shrink-0">
                      <span className="font-display font-extrabold text-[#F8F9FA]/10 text-7xl leading-none tracking-tight select-none">
                        {card.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-4 h-4 text-[#0066FF]" strokeWidth={1.5} />
                        <h3 className="font-display font-bold text-[#F8F9FA] text-xl tracking-tight">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-[#6B7280] text-sm leading-relaxed max-w-xl">
                        {card.body}
                      </p>
                    </div>

                    {/* CTA on last card */}
                    {i === cards.length - 1 && (
                      <div className="shrink-0 self-center">
                        <Link
                          href="/auth?mode=signup"
                          className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-full"
                        >
                          Try it now →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
