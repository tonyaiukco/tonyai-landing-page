import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/looks/home/Shell";
import { ArticleH } from "@/components/looks/home/PagesH";
import { resourcesPage as r } from "@/content/copy";

export function generateStaticParams() { return r.articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const a = r.articles.find((x) => x.slug === slug);
  return a ? { title: `${a.title} — TonyAI`, description: a.summary, alternates: { canonical: `/kaynaklar/${a.slug}/` } } : {};
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = r.articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return <SiteShell><ArticleH slug={slug} /></SiteShell>;
}
