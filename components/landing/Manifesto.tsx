"use client";

import { motion } from "framer-motion";

const lines = [
  { label: "No more", text: "tickets that take 3 days to get a response", highlight: false },
  { label: "No more", text: "reading 40-minute tutorials for a 2-minute problem", highlight: false },
  { label: "No more", text: "waiting for a call with someone who might not know", highlight: false },
  { label: "Just", text: "describe the problem. Get the answer. Move on.", highlight: true },
];

export default function Manifesto() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-14"
        >
          Why DART exists
        </motion.p>

        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-8 py-7 border-b border-white/[0.06] last:border-none"
          >
            <span
              className={`text-[10px] font-mono tracking-widest uppercase shrink-0 w-14 ${
                line.highlight ? "text-[#0066FF]" : "text-white/20"
              }`}
            >
              {line.label}
            </span>
            <p
              className={`font-display font-bold leading-[1.05] tracking-[-0.01em] ${
                line.highlight ? "text-[#F8F9FA]" : "text-[#6B7280]"
              }`}
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)" }}
            >
              {line.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
