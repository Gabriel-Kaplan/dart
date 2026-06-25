"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function LandingNavbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function isActive(link: (typeof NAV_LINKS)[number]) {

    if (link.exact) return pathname === "/" && !hash;
    return pathname === link.href;
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 lg:px-14 pt-5">
      {/* Logo */}
      <Link
        href="/"
        className="font-display font-bold text-sm tracking-widest text-[#F8F9FA] uppercase"
      >
        DART
      </Link>

      {/* Floating island */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
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

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/auth"
          className="text-sm text-[#6B7280] hover:text-[#F8F9FA] transition-colors duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/auth?mode=signup"
          className="text-sm bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-1.5 rounded-full font-medium transition-colors duration-200 shadow-[0_0_20px_rgba(0,102,255,0.3)]"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
