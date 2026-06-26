"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

export default function LandingNavbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);

  function showComingSoon() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(link: (typeof NAV_LINKS)[number]) {
    if (link.exact) return pathname === "/" && !hash;
    return pathname === link.href;
  }

  return (
    <>
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

      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 lg:px-14 pt-5">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-sm tracking-widest text-[#F8F9FA] uppercase"
        >
          DART
        </Link>

        {/* Floating island — desktop only */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${isActive(link)
                  ? "bg-white/10 text-[#F8F9FA]"
                  : "text-[#6B7280] hover:text-[#F8F9FA]"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions — desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="text-sm border border-white/20 hover:border-white/40 text-[#F8F9FA] px-4 py-1.5 rounded-full font-medium transition-all duration-200"
          >
            DART Ask
          </Link>
          <button
            onClick={showComingSoon}
            className="text-sm bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-1.5 rounded-full font-medium transition-colors duration-200 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
          >
            DART Lens
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-[#F8F9FA] origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-px bg-[#F8F9FA]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-[#F8F9FA] origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-md flex flex-col items-center justify-center gap-2 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.07, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-3xl font-display font-bold tracking-tight py-2 transition-colors duration-200 ${
                    isActive(link) ? "text-[#F8F9FA]" : "text-[#6B7280] hover:text-[#F8F9FA]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.27, duration: 0.3 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <button
                onClick={() => { showComingSoon(); setMenuOpen(false); }}
                className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-200 shadow-[0_0_28px_rgba(0,102,255,0.35)]"
              >
                DART Lens
              </button>
              <Link
                href="/auth"
                onClick={() => setMenuOpen(false)}
                className="text-sm border border-white/20 text-[#F8F9FA] px-8 py-3 rounded-full font-medium transition-colors duration-200"
              >
                DART Ask
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
