import type { MetadataRoute } from "next";
import { copy, resourcesPage } from "@/content/copy";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = copy.meta.url; const now = new Date();
  const pages = ["/", "/demo/", "/kayit/", "/bize-ulasin/", "/sirket/", "/kaynaklar/", ...resourcesPage.articles.map((a) => `/kaynaklar/${a.slug}/`)];
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.7 }));
}
