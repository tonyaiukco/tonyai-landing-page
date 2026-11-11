import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/dm-sans/wght.css";
import "@/components/looks/c/look.css";
import { copy } from "@/content/copy";
import { NavC } from "@/components/looks/c/NavC";
import { HeroC } from "@/components/looks/c/HeroC";
import { RevealC } from "@/components/looks/c/RevealC";
import { StripC, DifferenceC, PlatformC, DemoC, JourneyC, ComplianceC, ProofC, FaqC, FinalCtaC, FooterC } from "@/components/looks/c/SectionsC";

export const metadata: Metadata = {
  title: `${copy.meta.title} — Tasarım C · Atmosfer`,
  description: copy.meta.description,
  robots: { index: false, follow: false },
};

export default function LookCPage() {
  return (
    <div className="look-c">
      <NavC />
      <main id="icerik">
        <HeroC />
        <StripC />
        <DifferenceC />
        <PlatformC />
        <DemoC />
        <JourneyC />
        <ComplianceC />
        <ProofC />
        <FaqC />
        <FinalCtaC />
      </main>
      <FooterC />
      <RevealC />
    </div>
  );
}
