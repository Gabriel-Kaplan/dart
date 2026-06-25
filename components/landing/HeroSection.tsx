"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Three scroll depths
  const bgWordY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]); // 0.7x — background

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]); // 1x — foreground
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);



  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
    >
      {/* LAYER 0 — Grid (slowest) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]),
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* LAYER 1 — Background ghost text (0.7x) */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
        style={{ y: bgWordY }}
      >
        <span
          className="font-display font-extrabold leading-none text-white select-none w-full text-center"
          style={{ opacity: 0.03, fontSize: "38vw", letterSpacing: "-0.02em", marginBottom: "-2vw" }}
        >
          DART
        </span>
      </motion.div>

      {/* Blue glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "5%",
          width: "600px",
          height: "500px",
          background: "radial-gradient(ellipse at center, rgba(0,102,255,0.09) 0%, transparent 65%)",
        }}
      />

      {/* LAYER 2 — Foreground content (1x) */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-20 w-full max-w-7xl mx-auto px-8 lg:px-14 pt-24 pb-16 flex flex-col items-center"
      >
        {/* Center — editorial text block */}
        <div className="min-w-0 flex flex-col items-center text-center">

          {/* Acronym label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-xs text-[#6B7280] tracking-[0.22em] uppercase font-mono flex items-center gap-3"
          >
            <span className="inline-block shrink-0 w-5 h-px bg-[#6B7280]/50" />
            <span><b className="text-[#F8F9FA]">D</b>irect <b className="text-[#F8F9FA]">A</b>ssistant for <b className="text-[#F8F9FA]">R</b>eal-<b className="text-[#F8F9FA]">T</b>ime help</span>
            <span className="inline-block shrink-0 w-5 h-px bg-[#6B7280]/50" />
          </motion.p>

          {/* Headline — clamp scale, Syne display font */}
          <div className="mb-10">
            {["Stuck?", "Solved."].map((word, i) => (
              <div key={word} className="overflow-hidden pb-1">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.2 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.01em] block"
                  style={{ fontSize: "clamp(3.8rem, 7.5vw, 7.5rem)" }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Terminal */}


          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-lg"
          >
            AI expert help for Salesforce, HubSpot, Jira, QuickBooks, SAP — and anything else.
            No tickets. No waiting rooms. No hold music.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/auth?mode=signup"
              className="group rounded-full inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3 font-semibold text-sm transition-all duration-200 shadow-[0_0_32px_rgba(0,102,255,0.28)] hover:shadow-[0_0_52px_rgba(0,102,255,0.5)]"
            >
              Enter DART
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/auth"
              className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200 underline underline-offset-4 decoration-white/20"
            >
              Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [0.3, 0]) }}
        className="absolute bottom-8 left-14 flex items-center gap-3 z-20"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-[#6B7280]/60 to-transparent"
        />
        <span className="text-[10px] text-[#6B7280] tracking-[0.3em] uppercase font-mono">scroll</span>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-30" />
    </section>
  );
}