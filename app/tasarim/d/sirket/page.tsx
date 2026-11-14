import type { Metadata } from "next";
import { companyPage as c } from "@/content/copy";
import { CompanyD } from "@/components/looks/d/PagesD";

export const metadata: Metadata = { title: `${c.meta.title} — Tasarım D`, description: c.meta.description };

export default function LookDCompanyPage() {
  return <CompanyD />;
}
