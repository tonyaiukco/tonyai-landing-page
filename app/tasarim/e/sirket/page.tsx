import type { Metadata } from "next";
import { companyPage as c } from "@/content/copy";
import { CompanyE } from "@/components/looks/e/PagesE";

export const metadata: Metadata = { title: `${c.meta.title} — Tasarım E`, description: c.meta.description };

export default function LookECompanyPage() {
  return <CompanyE />;
}
