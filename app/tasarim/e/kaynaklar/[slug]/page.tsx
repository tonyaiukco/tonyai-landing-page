import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcesPage as r } from "@/content/copy";
import { ArticleE } from "@/components/looks/e/PagesE";

export function generateStaticParams() { return r.articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const a = r.articles.find((x) => x.slug === slug);
  return a ? { title: `${a.title} — TonyAI — Tasarım E`, description: a.summary } : {};
}

export default async function LookEArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!r.articles.some((x) => x.slug === slug)) notFound();
  return <ArticleE slug={slug} />;
}
