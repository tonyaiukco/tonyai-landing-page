import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/dm-sans/wght.css";
import "@/components/looks/home/look.css";
import { NavH } from "@/components/looks/home/NavH";
import { HeroH } from "@/components/looks/home/HeroH";
import { StripH, DifferenceH, PlatformH, DemoH, JourneyH, ComplianceH, ProofH, FaqH, FinalCtaH, FooterH } from "@/components/looks/home/SectionsH";
import { RevealH } from "@/components/looks/home/RevealH";

export default function Home() {
  return (
    <div className="look-h">
      <NavH />
      <main id="icerik">
        <HeroH />
        <StripH />
        <DifferenceH />
        <PlatformH />
        <DemoH />
        <JourneyH />
        <ComplianceH />
        <ProofH />
        <FaqH />
        <FinalCtaH />
      </main>
      <FooterH />
      <RevealH />
    </div>
  );
}
