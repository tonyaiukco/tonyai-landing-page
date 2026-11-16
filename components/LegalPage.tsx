import { SiteShell } from "@/components/looks/home/Shell";
import { LegalH } from "@/components/looks/home/PagesH";

export function LegalPage({ page }: { page: { title: string; sections: { h: string; p: string }[] } }) {
  return <SiteShell><LegalH page={page} /></SiteShell>;
}
