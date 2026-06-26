import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const EFFECTIVE_DATE = "June 26, 2026";
const CONTACT_EMAIL = "contact@devtodefy.com";

export const metadata = {
  title: "Terms of Service — DART",
  description: "Terms of Service for DART, the AI-powered IT support assistant.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-[#6B7280] mb-16">
          Effective date: {EFFECTIVE_DATE}
        </p>

        <div className="space-y-12 text-[#9CA3AF] text-sm leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">1. Who We Are</h2>
            <p>
              DART is an AI-powered IT support service operated by <strong className="text-[#F8F9FA]">Dev To Defy</strong>{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), based in Israel. By accessing or using DART,
              you agree to these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">2. What DART Does</h2>
            <p>
              DART provides AI-assisted IT support through text and voice interfaces. It includes specialist agents for
              software platforms including Salesforce, HubSpot, Jira, QuickBooks, SAP, and general IT queries. DART is
              a productivity tool — it does not replace professional IT services or guarantee outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">3. Eligibility</h2>
            <p>
              You must be at least 16 years old to use DART. By using the service, you represent that you meet this
              requirement. If you are using DART on behalf of a company or organization, you represent that you have
              authority to bind that entity to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">4. Your Account</h2>
            <p className="mb-3">
              You must create an account to use DART. You are responsible for maintaining the security of your
              credentials and for all activity under your account. Notify us immediately at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0066FF] hover:underline">{CONTACT_EMAIL}</a>{" "}
              if you suspect unauthorized access.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">5. Subscription Plans and Payment</h2>
            <p className="mb-3">
              DART offers the following plans:
            </p>
            <ul className="space-y-2 mb-3 pl-4">
              <li><strong className="text-[#F8F9FA]">Starter (Free)</strong> — 20 queries per month, 3 specialist agents, 7-day session history, text only.</li>
              <li><strong className="text-[#F8F9FA]">Pro — $19/month</strong> — Unlimited queries, all 6 agents, full history, voice mode, priority responses.</li>
              <li><strong className="text-[#F8F9FA]">Team — $49/month</strong> — Everything in Pro, up to 10 seats, shared session library, admin dashboard.</li>
            </ul>
            <p className="mb-3">
              Paid plans are billed monthly through <strong className="text-[#F8F9FA]">Lemon Squeezy</strong>, our payment processor.
              By subscribing, you authorize recurring charges on your selected billing cycle. All prices are in USD.
            </p>
            <p>
              Subscriptions renew automatically unless cancelled before the renewal date. We may change pricing with
              30 days&apos; notice to your registered email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">6. Cancellation and Refunds</h2>
            <p className="mb-3">
              You may cancel your subscription at any time through your account settings or by contacting us. Cancellation
              takes effect at the end of your current billing period — you retain access until then.
            </p>
            <p>
              We do not offer refunds for partial months. If you experience a technical issue that prevents you from
              using the service, contact us and we will assess on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">7. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="space-y-2 pl-4 list-disc list-inside">
              <li>Use DART for any unlawful purpose or in violation of any applicable law</li>
              <li>Attempt to reverse-engineer, scrape, or extract data from the service</li>
              <li>Share your account credentials with others</li>
              <li>Use DART to generate content that is harmful, abusive, or deceptive</li>
              <li>Circumvent usage limits, rate limits, or access controls</li>
              <li>Use automated tools to query DART in a way that degrades service for other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">8. AI-Generated Content</h2>
            <p>
              DART uses large language models to generate responses. AI outputs may be inaccurate, incomplete, or
              outdated. Do not rely solely on DART for decisions involving security, finance, legal matters, or
              critical system changes. We are not liable for any damages resulting from actions taken based on
              AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">9. Third-Party Services</h2>
            <p>
              DART relies on third-party providers including Anthropic (AI), Supabase (infrastructure), Vapi (voice),
              and Lemon Squeezy (payments). Your use of DART is subject to those providers&apos; terms and privacy
              policies. We are not responsible for the acts or omissions of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">10. Intellectual Property</h2>
            <p className="mb-3">
              DART, including its design, branding, software, and content, is owned by Dev To Defy. You may not copy,
              reproduce, or distribute any part of the service without written permission.
            </p>
            <p>
              You retain ownership of any content you input into DART. By using the service, you grant us a limited
              license to process your inputs solely for the purpose of providing the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">11. Disclaimers</h2>
            <p>
              DART is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant
              that the service will be uninterrupted, error-free, or free of harmful components. To the fullest extent
              permitted by applicable law, we disclaim all warranties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">12. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Dev To Defy shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of DART, even if we have been advised of the
              possibility of such damages. Our total liability to you shall not exceed the amount you paid us in the
              three months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Israel, without regard to conflict of law principles.
              Disputes will be subject to the exclusive jurisdiction of the courts of Israel. If you are a consumer
              in the EU or UK, you may also have rights under your local consumer protection laws, which these Terms
              do not override.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes via email or an
              in-app notice at least 14 days before they take effect. Continued use of DART after the effective date
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[#F8F9FA] mb-3">15. Contact</h2>
            <p>
              Questions about these Terms?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0066FF] hover:underline">
                {CONTACT_EMAIL}
              </a>
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
