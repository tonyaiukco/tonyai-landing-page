import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { HeroD } from "@/components/looks/d/HeroD";
import { StripD, DifferenceD, PlatformD, DemoD, JourneyD, ComplianceD, ProofD, FaqD, FinalCtaD } from "@/components/looks/d/SectionsD";

export const metadata: Metadata = { title: `${copy.meta.title} — Tasarım D · Orman`, description: copy.meta.description };

export default function LookDPage() {
  return (
    <>
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
    </>
  );
}
