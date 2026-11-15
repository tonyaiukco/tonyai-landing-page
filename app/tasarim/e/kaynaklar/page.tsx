import type { Metadata } from "next";
import { resourcesPage as r } from "@/content/copy";
import { ResourcesE } from "@/components/looks/e/PagesE";

export const metadata: Metadata = { title: `${r.meta.title} — Tasarım E`, description: r.meta.description };

export default function LookEResourcesPage() {
  return <ResourcesE />;
}
