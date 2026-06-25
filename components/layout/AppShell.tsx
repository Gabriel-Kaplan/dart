"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

type Session = { id: string; software: string; summary: string | null; created_at: string };

export default function AppShell({
  sessions,
  userEmail,
  children,
}: {
  sessions: Session[];
  userEmail?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-[#080808] md:p-3 md:gap-3">
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-12 flex items-center justify-between px-4 bg-[#080808] border-b border-white/[0.06]">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] hover:text-[#F8F9FA] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-display font-bold text-sm tracking-widest text-[#F8F9FA] uppercase">DART</span>
        <div className="w-8" />
      </header>

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar sessions={sessions} userEmail={userEmail} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-full"
            >
              <Sidebar
                sessions={sessions}
                userEmail={userEmail}
                onMobileClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-hidden pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
