import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import Marquee from "@/components/landing/Marquee";
import StackingCards from "@/components/landing/StackingCards";
import PlatformPreview from "@/components/landing/PlatformPreview";
import Manifesto from "@/components/landing/Manifesto";
import FAQ from "@/components/landing/FAQ";
import EntryGate from "@/components/landing/EntryGate";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F9FA]">
      <LandingNavbar />
      <HeroSection />
      <Marquee />
      <StackingCards />
      <PlatformPreview />
      <Manifesto />

      <FAQ />
      <EntryGate />
      <LandingFooter />
    </div>
  );
}
