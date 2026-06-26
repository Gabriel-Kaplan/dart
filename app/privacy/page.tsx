import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const EFFECTIVE_DATE = "June 26, 2026";
const CONTACT_EMAIL = "contact@devtodefy.com";

export const metadata = {
  title: "Privacy Policy — DART",
  description: "Privacy Policy for DART, the AI-powered IT support assistant.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F9FA]">
      <LandingNavbar />

      <main className="max-w-3xl mx-auto px-8 lg:px-14 pt-40 pb-32">
        <p className="text-xs text-[#0066FF] font-mono tracking-widest uppercase mb-5">
          Legal
        </p>
        <h1
          className="font-display font-extrabold text-[#F8F9FA] leading-[1.08] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#6B7280] mb-16">
          Effective date: {EFFECTIVE_DATE}
        </p>

        <div className="space-y-12 text-[#9CA3AF] text-sm leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">1. Who We Are</h2>
            <p>
              DART is operated by <strong className="text-[#F8F9FA]">Dev To Defy</strong>, based in Israel. This
              Privacy Policy explains what personal data we collect, why we collect it, and how we handle it. If you
              have questions, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0066FF] hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">2. Data We Collect</h2>
            <p className="mb-4">We collect only what is necessary to provide the service:</p>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-[#F8F9FA] mb-1">Account information</p>
                <p>Your email address and (optionally) name when you sign up via email/password or Google OAuth.</p>
              </div>
              <div>
                <p className="font-medium text-[#F8F9FA] mb-1">Session and chat data</p>
                <p>
                  The messages you send to DART, AI responses, software category selections, and session summaries.
                  This data is stored to provide session history and continuity across conversations.
                </p>
              </div>
              <div>
                <p className="font-medium text-[#F8F9FA] mb-1">Voice data</p>
                <p>
                  If you use voice mode, audio is processed in real time by Vapi. We do not store raw audio recordings.
                  Transcripts from voice sessions are stored in the same way as text sessions.
                </p>
              </div>
              <div>
                <p className="font-medium text-[#F8F9FA] mb-1">Subscription and payment data</p>
                <p>
                  Your plan status (Free, Pro, or Team) and subscription identifiers. We do not store payment card
                  details — all payment processing is handled by Lemon Squeezy.
                </p>
              </div>
              <div>
                <p className="font-medium text-[#F8F9FA] mb-1">Usage data</p>
                <p>
                  Basic usage information such as query counts, which agents you use, and session timestamps.
                  Used to enforce plan limits and improve the service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">3. How We Use Your Data</h2>
            <ul className="space-y-2 pl-4 list-disc list-inside">
              <li>To provide, operate, and improve DART</li>
              <li>To authenticate you and maintain your account</li>
              <li>To enforce plan limits and manage subscriptions</li>
              <li>To generate AI responses to your queries (inputs are sent to Anthropic)</li>
              <li>To send transactional emails (account confirmation, subscription updates)</li>
              <li>To investigate abuse, fraud, or violations of our Terms</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data. We do not use your data for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">4. Third-Party Services</h2>
            <p className="mb-4">
              DART relies on the following third-party providers to operate. Each has its own privacy policy:
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-white/10 pl-4">
                <p className="font-medium text-[#F8F9FA]">Anthropic</p>
                <p>Processes your chat messages to generate AI responses. Your inputs are sent to Anthropic&apos;s API.</p>
              </div>
              <div className="border-l-2 border-white/10 pl-4">
                <p className="font-medium text-[#F8F9FA]">Supabase</p>
                <p>Stores your account data, session history, and chat transcripts. Acts as our database and authentication provider.</p>
              </div>
              <div className="border-l-2 border-white/10 pl-4">
                <p className="font-medium text-[#F8F9FA]">Vapi</p>
                <p>Handles real-time voice processing when you use DART&apos;s voice mode.</p>
              </div>
              <div className="border-l-2 border-white/10 pl-4">
                <p className="font-medium text-[#F8F9FA]">Lemon Squeezy</p>
                <p>Processes payments and manages subscriptions. They act as the Merchant of Record and handle all billing data.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">5. Data Retention</h2>
            <p className="mb-3">
              We retain your account and session data for as long as your account is active. Free plan session history
              is retained for 7 days; Pro and Team plan history is retained indefinitely while your account is active.
            </p>
            <p>
              When you delete your account, we delete your personal data within 30 days, except where we are required
              to retain it by law (e.g., for tax records related to paid transactions).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">6. Your Rights</h2>
            <p className="mb-3">
              Depending on where you are located, you may have rights including:
            </p>
            <ul className="space-y-2 pl-4 list-disc list-inside mb-3">
              <li><strong className="text-[#F8F9FA]">Access</strong> — request a copy of the data we hold about you</li>
              <li><strong className="text-[#F8F9FA]">Correction</strong> — ask us to correct inaccurate data</li>
              <li><strong className="text-[#F8F9FA]">Deletion</strong> — request that we delete your data</li>
              <li><strong className="text-[#F8F9FA]">Portability</strong> — receive your data in a machine-readable format</li>
              <li><strong className="text-[#F8F9FA]">Objection</strong> — object to certain processing activities</li>
            </ul>
            <p>
              EU and UK users have these rights under the GDPR and UK GDPR respectively. To exercise any of these rights,
              email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0066FF] hover:underline">{CONTACT_EMAIL}</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">7. Cookies</h2>
            <p>
              DART uses only essential cookies required for authentication and session management. We do not use
              tracking cookies, advertising cookies, or analytics cookies that identify you across websites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">8. Security</h2>
            <p>
              We use industry-standard measures to protect your data, including encrypted connections (HTTPS),
              row-level security in our database, and secure authentication. No method of transmission over the
              internet is 100% secure — if you become aware of a security issue, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">9. Children&apos;s Privacy</h2>
            <p>
              DART is not directed at children under 16. We do not knowingly collect personal data from anyone under
              16. If we become aware that we have collected data from a child under this age, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes via email
              or an in-app notice. The effective date at the top of this page will always reflect when it was last updated.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">11. Contact</h2>
            <p>
              For any privacy-related questions or requests, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0066FF] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

        </div>

        {/* Nav row */}
        <div className="mt-20 pt-10 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.12] text-[#F8F9FA] hover:bg-white/[0.04] transition-all duration-200"
          >
            ← Home
          </Link>
          <Link
            href="/auth?mode=signup"
            className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.12] text-[#F8F9FA] hover:bg-white/[0.04] transition-all duration-200"
          >
            Try DART Ask
          </Link>
          <Link
            href="/live"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_24px_rgba(0,102,255,0.25)] hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] transition-all duration-200"
          >
            Try DART Lens →
          </Link>
        </div>

      </main>

      <LandingFooter />
    </div>
  );
}
