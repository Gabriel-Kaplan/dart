"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";

export default function EntryGate() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.4]);

  return (
    <section ref={ref} className="relative py-36 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: glowScale, opacity: glowOpacity }}
      >
        <div
          className="w-[800px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0,102,255,0.12) 0%, transparent 65%)" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10 flex flex-col items-center text-center">
        <FadeUp>
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-6">Ready when you are</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2
            className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-5 max-w-3xl"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            Your expert is waiting.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="text-[#6B7280] mb-10 text-base max-w-sm">
            24/7. Instant. No queue. No ticket. No hold music.
          </p>
        </FadeUp>
        <FadeUp delay={0.22}>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/auth?mode=signup"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 font-semibold text-sm transition-all duration-200 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] rounded-full"
            >
              Enter DART →
            </Link>
            <p className="text-xs text-white/25">Free to start · No credit card</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
