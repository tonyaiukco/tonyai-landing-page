import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { resourcesPage as r } from "@/content/copy";

export function generateStaticParams() { return r.articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const a = r.articles.find((x) => x.slug === slug);
  return a ? { title: `${a.title} — TonyAI`, description: a.summary, alternates: { canonical: `/kaynaklar/${a.slug}/` } } : {};
}

export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = r.articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <PageShell>
      <article className="container max-w-[48rem] py-16 lg:py-24">
        <Link href="/kaynaklar/" className="figure inline-flex min-h-11 items-center text-[0.8rem] text-ink-2 hover:text-ink">← {r.eyebrow}</Link>
        <p className="eyebrow mt-8">{a.minutes} dk okuma</p>
        <h1 className="h2 mt-4">{a.title}</h1>
        <p className="lead mt-5 text-ink-2">{a.summary}</p>
        <div className="mt-10 flex flex-col gap-5 text-[1.05rem] leading-[1.7] text-ink">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      </article>
    </PageShell>
  );
}
