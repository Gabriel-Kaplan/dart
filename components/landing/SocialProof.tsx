"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/motion/FadeUp";

const stats = [
  { value: "< 10s", label: "First response" },
  { value: "6", label: "Specialist agents" },
  { value: "24/7", label: "Always on" },
  { value: "0", label: "Tickets needed" },
];

const quotes = [
  {
    text: "I spent 3 hours trying to figure out why my Salesforce workflow wasn't triggering. DART diagnosed it in 90 seconds.",
    role: "Sales Operations Manager",
  },
  {
    text: "We used to open a support ticket and wait two days. Now we just ask DART. It's like having a senior IT person on call.",
    role: "HubSpot Admin, SaaS Company",
  },
  {
    text: "It asked me two questions, told me exactly which permission was missing, and gave me the navigation path. Done.",
    role: "Salesforce Administrator",
  },
];

export default function SocialProof() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] mb-24 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#080808] py-12 flex flex-col items-center justify-center"
            >
              <div
                className="font-display font-extrabold text-[#F8F9FA] mb-2 tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#6B7280] font-mono tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <FadeUp className="mb-10">
          <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase">What people say</p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="text-3xl text-[#0066FF] font-serif leading-none">&ldquo;</span>
              <p className="text-sm text-[#F8F9FA]/70 leading-relaxed">{quote.text}</p>
              <p className="text-xs text-[#6B7280]">— {quote.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
