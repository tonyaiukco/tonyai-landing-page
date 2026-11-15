import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { HeroE } from "@/components/looks/e/HeroE";
import { StripE, DifferenceE, PlatformE, DemoE, JourneyE, ComplianceE, ProofE, FaqE, FinalCtaE } from "@/components/looks/e/SectionsE";

export const metadata: Metadata = { title: `${copy.meta.title} — Tasarım E · Blok`, description: copy.meta.description };

export default function LookEPage() {
  return (
    <>
      <HeroE />
      <StripE />
      <DifferenceE />
      <PlatformE />
      <DemoE />
      <JourneyE />
      <ComplianceE />
      <ProofE />
      <FaqE />
      <FinalCtaE />
    </>
  );
}
