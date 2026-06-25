"use client";

import { motion } from "framer-motion";
import { Zap, Target, Mic, ListOrdered, ScanSearch, Monitor } from "lucide-react";
import FadeUp from "@/components/motion/FadeUp";

const features = [
  { icon: Zap, title: "Instant answers", description: "No ticket queue. No 48-hour response window. DART answers in seconds — every time." },
  { icon: Target, title: "Specialist knowledge", description: "Each agent knows the exact menus, error codes, and quirks of its platform at senior-admin depth." },
  { icon: Mic, title: "Talk, don't type", description: "Switch to voice mid-session and describe your problem out loud. DART responds like a real expert." },
  { icon: ListOrdered, title: "Step-by-step walkthroughs", description: "Exact navigation paths. Setup → Object Manager → Fields & Relationships → New. Never vague." },
  { icon: ScanSearch, title: "Root cause diagnosis", description: "DART asks the right questions first, finds the root cause, and gives you the right fix — not a guess." },
  { icon: Monitor, title: "Screen takeover", description: "Let DART see your screen and fix it directly. Full remote session with your consent. Coming soon." },
];

export default function Features() {
  return (
    <section id="features" className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <div className="mb-14">
          <FadeUp>
            <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-4">What you get</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="font-display font-extrabold text-[#F8F9FA] leading-[1.1] tracking-[-0.02em] max-w-lg"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
            >
              Built for the moment you&apos;re stuck.
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isComingSoon = f.title === "Screen takeover";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative bg-[#080808] p-8 group hover:bg-[#0D0D0D] transition-colors duration-300"
              >
                {isComingSoon && (
                  <span className="absolute top-6 right-6 text-[10px] bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 px-2 py-0.5 font-mono tracking-wider uppercase rounded-full">
                    Soon
                  </span>
                )}
                <Icon className="w-4 h-4 text-[#0066FF] mb-6" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-[#F8F9FA] text-base mb-2 tracking-tight">{f.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
