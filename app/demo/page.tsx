import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { FormPageH } from "@/components/looks/home/PagesH";
import { demoPage as d } from "@/content/copy";

export const metadata: Metadata = { title: d.meta.title, description: d.meta.description, alternates: { canonical: "/demo/" } };

export default function DemoRoute() {
  return <SiteShell><FormPageH id="demo-baslik" page={d} form="demo" /></SiteShell>;
}
