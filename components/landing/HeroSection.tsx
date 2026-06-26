"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LiquidEther from "@/components/landing/LiquidEther";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgWordY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
    >

      {/* LAYER 0 — Liquid fluid background */}
      <div className="absolute inset-0 pointer-events-none">
        <LiquidEther
          colors={["#0066FF", "#0044CC", "#001F66"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

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


      {/* LAYER 2 — Foreground content (1x) */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-20 w-full max-w-7xl mx-auto px-8 lg:px-14 pt-24 pb-16 flex flex-col items-center"
      >
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

          {/* Headline */}
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
              href="/live"
              className="group rounded-full inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3 font-semibold text-sm transition-all duration-200 shadow-[0_0_32px_rgba(0,102,255,0.28)] hover:shadow-[0_0_52px_rgba(0,102,255,0.5)]"
            >
              Try DART Lens
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/auth?mode=signup"
              className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200 underline underline-offset-4 decoration-white/20"
            >
              Try DART Ask
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
