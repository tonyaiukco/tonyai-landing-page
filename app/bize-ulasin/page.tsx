import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { ContactH } from "@/components/looks/home/PagesH";
import { contactPage as c } from "@/content/copy";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description, alternates: { canonical: "/bize-ulasin/" } };

export default function ContactRoute() {
  return <SiteShell><ContactH /></SiteShell>;
}
