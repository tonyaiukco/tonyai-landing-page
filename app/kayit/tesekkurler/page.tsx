import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { ThanksH } from "@/components/looks/home/PagesH";
import { registerThanksPage as t } from "@/content/copy";

export const metadata: Metadata = { title: t.meta.title, description: t.meta.description, robots: { index: false }, alternates: { canonical: "/kayit/tesekkurler/" } };

export default function RegisterThanksRoute() {
  return <SiteShell><ThanksH id="kayit-tesekkur-baslik" page={t} /></SiteShell>;
}
