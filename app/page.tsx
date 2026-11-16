import { SiteShell } from "@/components/looks/home/Shell";
import { HeroH } from "@/components/looks/home/HeroH";
import { StripH, DifferenceH, PlatformH, DemoH, JourneyH, ComplianceH, ProofH, FaqH, FinalCtaH } from "@/components/looks/home/SectionsH";

export default function Home() {
  return (
    <SiteShell>
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
    </SiteShell>
  );
}
