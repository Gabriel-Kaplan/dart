"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What does DART stand for? ",
    a: "Direct Assistant for Real-Time help",
  },
  {
    q: "How is DART different from just asking ChatGPT?",
    a: "ChatGPT is a generalist. DART is a specialist. Each agent has deep knowledge of a specific platform — the exact menus, error patterns, admin workflows, permission models, and edge cases that come from years of hands-on experience. When you ask DART a Salesforce question, you get the same answer a certified Salesforce architect would give you.",
  },
  {
    q: "What software does DART know?",
    a: "Current specialists: Salesforce, HubSpot, QuickBooks, Jira, and SAP. DART also has a General agent for anything else — an expert-level IT troubleshooter that works across any software by asking the right diagnostic questions. More specialists are being added continuously.",
  },
  {
    q: "What if DART can't solve my problem?",
    a: "DART will tell you. If a problem requires a production-level intervention, vendor support, or a certified consultant, DART says so and tells you exactly what information to have ready. It doesn't guess. It knows when to escalate.",
  },
  {
    q: "Can I use voice instead of typing?",
    a: "Yes — two ways. In DART Ask, toggle voice mid-session and describe your problem out loud. Or open DART Lens for a full-screen voice + screen takeover session where DART activates immediately, sees your screen, and resolves the problem directly. No typing required.",
  },
  {
    q: "What is DART Lens?",
    a: "DART Lens is live voice with screen takeover — DART sees your screen and resolves the problem directly, hands-on. The moment you open it, DART activates, asks what software you're in and what's wrong, then guides you or takes action on screen in real time. Think of it as a senior IT engineer sitting next to you. Coming in Phase 3.",
  },
  {
    q: "Is my data secure?",
    a: "Your sessions are stored securely in your account and are never used to train AI models. Only you can access your history. DART never asks for passwords, credentials, or sensitive account information.",
  },
  {
    q: "Can my company license DART for the whole team?",
    a: "Yes — B2B licensing is coming. Companies will be able to embed DART as a white-labeled support layer for their employees or customers. If you're interested in early access, reach out.",
  },
  {
    q: "Does DART work on mobile?",
    a: "Yes. Fully responsive across all devices. The chat interface, software selector, and session history all work on mobile browsers.",
  },
  {
    q: "Is DART a real person?",
    a: "No — DART is AI. But it behaves like a senior expert, not a customer service bot. It asks smart questions, gives real answers, and walks you through exact steps. It won't tell you to 'check the documentation.'",
  },
  
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28">
      <div className="max-w-4xl mx-auto px-8 lg:px-14">
        <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-6">
          FAQ
        </p>
        <h2
          className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-16"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
        >
          Questions you probably have
        </h2>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-8"
              >
                <span className="text-base font-medium text-[#F8F9FA]/80">{faq.q}</span>
                {open === i
                  ? <Minus className="w-4 h-4 text-[#0066FF] shrink-0" />
                  : <Plus className="w-4 h-4 text-[#6B7280] shrink-0" />
                }
              </button>
              {open === i && (
                <p className="text-sm text-[#6B7280] leading-relaxed pb-7 pr-12">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
