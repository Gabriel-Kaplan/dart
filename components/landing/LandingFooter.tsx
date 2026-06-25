import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="py-8 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold tracking-widest text-[#F8F9FA] text-sm uppercase">DART</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-[#6B7280] hover:text-[#F8F9FA] transition-colors">Privacy</Link>
          <Link href="/terms" className="text-xs text-[#6B7280] hover:text-[#F8F9FA] transition-colors">Terms</Link>
        </div>
        <p className="text-xs text-[#6B7280]">Built by Dev To Defy</p>
      </div>
    </footer>
  );
}
