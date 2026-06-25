import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="border-t border-[#1E1E2E] py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Stop waiting for meetings.<br />
          <span className="text-[#0066FF]">Start fixing problems.</span>
        </h2>
        <p className="text-[#6B7280] mb-8">
          DART is available instantly, 24/7. No ticket queue. No hold music.
        </p>
        <Link
          href="/auth?mode=signup"
          className="inline-block bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3 rounded-sm font-semibold text-sm transition-colors"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
