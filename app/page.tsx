import { SiteShell } from "@/components/looks/home/Shell";
import { InvoiceRecord } from "@/components/looks/home/InvoiceRecord";
import { HeroH } from "@/components/looks/home/HeroH";
import { StripH, DifferenceH, PlatformH, JourneyH, ComplianceH, ProofH, FaqH, FinalCtaH } from "@/components/looks/home/SectionsH";

export default function Home() {
  return (
    <SiteShell>
      <HeroH />
      <StripH />
      <DifferenceH />
      <PlatformH />
      <InvoiceRecord />
      <JourneyH />
      <ComplianceH />
      <ProofH />
      <FaqH />
      <FinalCtaH />
    </SiteShell>
  );
}
