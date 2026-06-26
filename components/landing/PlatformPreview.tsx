"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MockChat from "./MockChat";
import FadeUp from "@/components/motion/FadeUp";

const agents = [
  { name: "Salesforce", label: "SF" },
  { name: "HubSpot", label: "HS" },
  { name: "QuickBooks", label: "QB" },
  { name: "Jira", label: "JR" },
  { name: "SAP", label: "SAP" },
  { name: "General", label: "GEN" },
];

export default function PlatformPreview() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const chatY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <FadeUp>
              <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-5">
                DART Ask
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display font-extrabold text-[#F8F9FA] leading-[1.1] tracking-[-0.02em] mb-5"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
              >
                Six deep-knowledge agents. One for whatever&apos;s broken.
              </h2>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-10 max-w-sm">
                Each agent knows the exact terminology, error patterns, admin workflows,
                and edge cases for its platform at senior-expert depth. Not generic AI — a specialist.
              </p>
            </FadeUp>
            <div className="grid grid-cols-2 gap-2">
              {agents.map((agent, i) => (
                <FadeUp key={agent.name} delay={0.08 + i * 0.05}>
                  <div className="flex items-center gap-3 px-3 py-2.5 border border-white/[0.08] bg-white/[0.02] rounded-xl">
                    <div className="w-7 h-7 bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 rounded-lg">
                      <span className="text-[10px] font-bold text-[#0066FF] font-mono">{agent.label}</span>
                    </div>
                    <span className="text-sm text-[#F8F9FA]/80">{agent.name}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end w-full relative">
            <motion.div
              className="absolute -inset-20 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,102,255,0.06) 0%, transparent 70%)" }}
            />
            <motion.div style={{ y: chatY }} className="relative z-10">
              <MockChat />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
