"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Mic, Eye, Zap } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";

const features = [
  {
    icon: Eye,
    title: "DART sees your screen",
    body: "Share your screen and DART sees exactly what you see — errors, menus, workflows — in real time.",
  },
  {
    icon: Mic,
    title: "Full voice conversation",
    body: "Talk naturally. Describe what you're looking at and DART responds live. No typing, no forms.",
  },
  {
    icon: Monitor,
    title: "Guided step-by-step",
    body: "DART talks you through every click and navigation path while seeing the exact state of your screen.",
  },
  {
    icon: Zap,
    title: "Zero context lost",
    body: "Escalate straight from DART Ask to DART Lens and DART already knows the problem.",
  },
];

function ScreenMock() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "0 0 80px rgba(0,102,255,0.18), 0 0 160px rgba(0,102,255,0.08)",
        }}
      />

      {/* Window chrome */}
      <div className="rounded-2xl border border-white/[0.1] overflow-hidden bg-[#0D0D0D]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#111]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]/60" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]/60" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]/60" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white/[0.05] rounded-md h-5 w-full flex items-center px-2">
              <div className="w-2 h-2 rounded-full bg-[#0066FF] mr-2 shrink-0" />
              <div className="h-1.5 w-24 bg-white/10 rounded-full" />
            </div>
          </div>
          {/* DART badge */}
          <div className="flex items-center gap-1.5 border border-[#0066FF]/40 bg-[#0066FF]/10 px-2.5 py-1 rounded-full">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"
            />
            <span className="text-[9px] text-[#0066FF] font-mono tracking-widest uppercase">
              DART Active
            </span>
          </div>
        </div>

        {/* Screen content */}
        <div className="relative p-5 h-64 overflow-hidden">
          {/* Fake app UI — sidebar */}
          <div className="absolute left-5 top-5 bottom-5 w-24 rounded-lg bg-white/[0.03] border border-white/[0.05] flex flex-col gap-2 p-3">
            {[40, 60, 45, 55, 35].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-white/[0.07]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>

          {/* Fake app UI — main panel */}
          <div className="absolute left-32 right-5 top-5 bottom-5 flex flex-col gap-3">
            {/* Header bar */}
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-20 bg-white/[0.1] rounded-full" />
              <div className="h-2.5 w-12 bg-white/[0.05] rounded-full" />
              <div className="ml-auto h-6 w-16 bg-white/[0.04] rounded-md border border-white/[0.06]" />
            </div>
            {/* Content rows */}
            <div className="flex flex-col gap-2 flex-1">
              {[80, 65, 90, 55, 70].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-white/[0.05]" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>

          {/* DART highlight overlays — simulating DART analyzing the screen */}
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            className="absolute left-4 top-14 right-auto w-28 h-8 rounded-md border border-[#0066FF]/60 pointer-events-none"
            style={{ background: "rgba(0,102,255,0.05)" }}
          />
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute left-32 top-20 right-5 h-6 rounded-md border border-[#0066FF]/40 pointer-events-none"
            style={{ background: "rgba(0,102,255,0.03)" }}
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute right-5 top-5 w-16 h-6 rounded-md border border-[#0066FF]/50 pointer-events-none"
            style={{ background: "rgba(0,102,255,0.06)" }}
          />

          {/* DART annotation tooltip */}
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-32 top-8 bg-[#0066FF] text-white text-[9px] font-mono px-2 py-1 rounded-md pointer-events-none whitespace-nowrap"
          >
            Click Settings → Permissions
          </motion.div>
        </div>

        {/* Voice bar */}
        <div className="border-t border-white/[0.06] px-5 py-3 flex items-center gap-3 bg-[#0A0A0A]">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0"
          >
            <Mic className="w-3 h-3 text-[#0066FF]" />
          </motion.div>
          <div className="flex-1 flex items-center gap-0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.3, Math.random() * 0.8 + 0.4, 0.3] }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.04,
                }}
                className="flex-1 rounded-full bg-[#0066FF]/50"
                style={{ height: "16px", transformOrigin: "center" }}
              />
            ))}
          </div>
          <span className="text-[9px] text-[#6B7280] font-mono tracking-wide shrink-0">DART speaking</span>
        </div>
      </div>
    </div>
  );
}

export default function DARTRemoteSection() {
  const [toast, setToast] = useState(false);

  function showComingSoon() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "-10%",
          width: "700px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(0,102,255,0.07) 0%, transparent 65%)",
        }}
      />

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — screen mock */}
          <FadeUp delay={0.2}>
            <ScreenMock />
          </FadeUp>

          {/* Right — text */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase">
                  DART Lens
                </p>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#0066FF] border border-[#0066FF]/30 px-2 py-0.5 rounded-full leading-none">
                  Coming Soon
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h2
                className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}
              >
                DART doesn&apos;t just tell you what to do.
                <br />
                <span className="text-[#0066FF]">It shows you.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-lg">
                When typing isn&apos;t enough, DART Lens takes over. Share your screen, start talking, and
                DART walks you through the fix live — seeing exactly what you see, guiding every step in real time.
              </p>
            </FadeUp>

            <div className="space-y-7 mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <FadeUp key={f.title} delay={0.12 + i * 0.07}>
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center mt-0.5">
                        <Icon className="w-4 h-4 text-[#0066FF]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#F8F9FA] mb-0.5">{f.title}</p>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{f.body}</p>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

            <FadeUp delay={0.4}>
              <button
                onClick={showComingSoon}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-[0_0_28px_rgba(0,102,255,0.25)] hover:shadow-[0_0_48px_rgba(0,102,255,0.45)]"
              >
                Get notified at launch →
              </button>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
