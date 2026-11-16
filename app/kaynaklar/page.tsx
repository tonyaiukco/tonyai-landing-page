import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { ResourcesH } from "@/components/looks/home/PagesH";
import { resourcesPage as r } from "@/content/copy";

export const metadata: Metadata = { title: r.meta.title, description: r.meta.description, alternates: { canonical: "/kaynaklar/" } };

export default function ResourcesRoute() {
  return <SiteShell><ResourcesH /></SiteShell>;
}
