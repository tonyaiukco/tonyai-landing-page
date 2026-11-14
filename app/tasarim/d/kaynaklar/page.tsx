import type { Metadata } from "next";
import { resourcesPage as r } from "@/content/copy";
import { ResourcesD } from "@/components/looks/d/PagesD";

export const metadata: Metadata = { title: `${r.meta.title} — Tasarım D`, description: r.meta.description };

export default function LookDResourcesPage() {
  return <ResourcesD />;
}
