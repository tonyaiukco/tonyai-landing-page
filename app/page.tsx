import { SiteShell } from "@/components/looks/home/Shell";
import { HeroH } from "@/components/looks/home/HeroH";
import { PlatformH, ScaleH, ComplianceH, FinalCtaH } from "@/components/looks/home/SectionsH";
import "@/components/looks/home/trace.css";

export default function Home() {
  return (
    <SiteShell>
      <div className="trace-home">
        <HeroH />
        <ScaleH />
        <PlatformH />
        <ComplianceH />
        <FinalCtaH />
      </div>
    </SiteShell>
  );
}
