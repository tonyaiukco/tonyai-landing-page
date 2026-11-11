import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/PageShell";
import { resourcesPage as r } from "@/content/copy";

export const metadata: Metadata = { title: r.meta.title, description: r.meta.description, alternates: { canonical: "/kaynaklar/" } };

export default function ResourcesRoute() {
  return (
    <PageShell>
      <PageIntro id="kaynaklar-baslik" eyebrow={r.eyebrow} title={r.title} lead={r.lead} />
      <section className="container pb-20" aria-label="Yazılar">
        <ul className="grid gap-4 md:grid-cols-3">
          {r.articles.map((a) => (
            <li key={a.slug} data-reveal>
              <Link href={`/kaynaklar/${a.slug}/`} className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors hover:border-forest">
                <span className="figure text-[0.75rem] text-ink-3">{a.minutes} dk okuma</span>
                <h2 className="h3">{a.title}</h2>
                <p className="text-[0.95rem] text-ink-2">{a.summary}</p>
                <span className="mt-auto text-[0.9rem] font-[540] text-forest">{r.readMore} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="sozluk" className="scroll-mt-24 rule bg-surface-2/60" aria-labelledby="sozluk-baslik">
        <div className="container grid gap-10 py-20 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          <h2 id="sozluk-baslik" className="h2 lg:sticky lg:top-28 lg:self-start">{r.glossaryTitle}</h2>
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {r.glossary.map((g) => (<div key={g.term} className="grid gap-2 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"><dt className="figure text-[0.95rem]">{g.term}</dt><dd className="text-ink-2">{g.def}</dd></div>))}
          </dl>
        </div>
      </section>
    </PageShell>
  );
}
