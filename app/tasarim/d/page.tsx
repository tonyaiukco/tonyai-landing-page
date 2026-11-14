import type { Metadata } from "next";
import "@fontsource-variable/outfit/wght.css";
import "@/components/looks/d/look.css";
import { copy } from "@/content/copy";
import { NavD } from "@/components/looks/d/NavD";
import { HeroD } from "@/components/looks/d/HeroD";
import { RevealD } from "@/components/looks/d/RevealD";
import { StripD, DifferenceD, PlatformD, DemoD, JourneyD, ComplianceD, ProofD, FaqD, FinalCtaD, FooterD } from "@/components/looks/d/SectionsD";

export const metadata: Metadata = {
  title: `${copy.meta.title} — Tasarım D · Orman`,
  description: copy.meta.description,
  robots: { index: false, follow: false },
};

export default function LookDPage() {
  return (
    <div className="look-d">
      <NavD />
      <main id="icerik">
        <HeroD />
        <StripD />
        <DifferenceD />
        <PlatformD />
        <DemoD />
        <JourneyD />
        <ComplianceD />
        <ProofD />
        <FaqD />
        <FinalCtaD />
      </main>
      <FooterD />
      <RevealD />
    </div>
  );
}
