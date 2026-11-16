import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { ThanksH } from "@/components/looks/home/PagesH";
import { demoThanksPage as t } from "@/content/copy";

export const metadata: Metadata = { title: t.meta.title, description: t.meta.description, robots: { index: false }, alternates: { canonical: "/demo/tesekkurler/" } };

export default function DemoThanksRoute() {
  return <SiteShell><ThanksH id="tesekkur-baslik" page={t} /></SiteShell>;
}
