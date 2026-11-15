import type { Metadata } from "next";
import { contactPage as c } from "@/content/copy";
import { ContactE } from "@/components/looks/e/PagesE";

export const metadata: Metadata = { title: `${c.meta.title} — Tasarım E`, description: c.meta.description };

export default function LookEContactPage() {
  return <ContactE />;
}
