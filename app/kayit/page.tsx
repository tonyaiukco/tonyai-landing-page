import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { FormPageH } from "@/components/looks/home/PagesH";
import { registerPage as r } from "@/content/copy";

export const metadata: Metadata = { title: r.meta.title, description: r.meta.description, alternates: { canonical: "/kayit/" } };

export default function RegisterRoute() {
  return <SiteShell><FormPageH id="kayit-baslik" page={r} form="register" /></SiteShell>;
}
