import "@/components/looks/home/company-contact.css";
import type { Metadata } from "next";
import { SiteShell } from "@/components/looks/home/Shell";
import { CompanyH } from "@/components/looks/home/PagesH";
import { companyPage as c } from "@/content/copy";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description, alternates: { canonical: "/sirket/" } };

export default function CompanyRoute() {
  return <SiteShell><CompanyH /></SiteShell>;
}
