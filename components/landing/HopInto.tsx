"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";

const tools = [
  {
    name: "DART Ask",
    tag: "Text + Voice",
    description:
      "Pick your software specialist, describe the problem, and get a precise step-by-step fix. Type or speak — DART handles both.",
    cta: "Open DART Ask",
    href: "/auth?mode=signup",
    primary: false,
    comingSoon: false,
  },
  {
    name: "DART Lens",
    tag: "Coming Soon",
    description:
      "Screen share, live voice, and full screen takeover — DART sees your screen and resolves the problem directly. Phase 3.",
    cta: "Launch DART Lens",
    href: null,
    primary: true,
    comingSoon: true,
  },
];

export default function HopInto() {
  const [toast, setToast] = useState(false);

  function showComingSoon() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <section className="py-28">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#111] border border-white/10 text-xs text-[#F8F9FA] px-5 py-2.5 rounded-full shadow-lg font-mono tracking-wide pointer-events-none"
          >
            DART Lens — Coming Soon
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <FadeUp>
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-4">
            Two tools. Zero friction.
          </p>
        </FadeUp>
        <FadeUp delay={0.06}>
          <h2
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)" }}
          >
            Hop into
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[#6B7280] text-base mb-14 max-w-md pt-5">
            DART Ask for step-by-step guidance, or go straight to DART Lens for live voice and on screen help — no setup, no friction.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, i) => (
            <FadeUp key={tool.name} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`relative flex flex-col h-full rounded-2xl border p-8 overflow-hidden ${
                  tool.primary
                    ? "border-[#0066FF]/30 bg-[#0066FF]/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                {/* Glow for primary */}
                {tool.primary && (
                  <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(0,102,255,0.12) 0%, transparent 70%)",
                    }}
                  />
                )}

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p
                        className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${
                          tool.primary ? "text-[#0066FF]" : "text-[#6B7280]"
                        }`}
                      >
                        {tool.tag}
                      </p>
                      <h3 className="font-display font-extrabold text-[#F8F9FA] text-2xl tracking-tight">
                        {tool.name}
                      </h3>
                    </div>

                    {/* Icon dot */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 ${
                        tool.primary ? "bg-[#0066FF] shadow-[0_0_12px_rgba(0,102,255,0.8)]" : "bg-white/20"
                      }`}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-1">
                    {tool.description}
                  </p>

                  {/* CTA */}
                  {tool.comingSoon ? (
                    <button
                      onClick={showComingSoon}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 self-start bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_28px_rgba(0,102,255,0.3)] hover:shadow-[0_0_44px_rgba(0,102,255,0.5)]"
                    >
                      {tool.cta} →
                    </button>
                  ) : (
                    <Link
                      href={tool.href!}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 self-start border border-white/20 hover:border-white/40 text-[#F8F9FA] hover:bg-white/[0.04]"
                    >
                      {tool.cta} →
                    </Link>
                  )}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
