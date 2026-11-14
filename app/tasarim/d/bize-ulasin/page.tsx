import type { Metadata } from "next";
import { contactPage as c } from "@/content/copy";
import { ContactD } from "@/components/looks/d/PagesD";

export const metadata: Metadata = { title: `${c.meta.title} — Tasarım D`, description: c.meta.description };

export default function LookDContactPage() {
  return <ContactD />;
}
