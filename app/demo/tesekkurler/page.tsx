import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/PageShell";
import { demoThanksPage as t } from "@/content/copy";

export const metadata: Metadata = { title: t.meta.title, description: t.meta.description, robots: { index: false }, alternates: { canonical: "/demo/tesekkurler/" } };

export default function DemoThanksRoute() {
  return (
    <PageShell>
      <PageIntro id="tesekkur-baslik" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="container flex flex-col gap-10 pb-24 lg:pb-32">
        <ol className="grid gap-4 md:grid-cols-3">
          {t.next.map((n, i) => (
            <li key={n} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
              <span className="figure text-[0.8rem] text-ink-3">0{i + 1}</span>
              <p className="text-ink-2">{n}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          <Link href={t.primary.href} className="btn btn-primary">{t.primary.label}</Link>
          <Link href={t.secondary.href} className="btn btn-secondary">{t.secondary.label}</Link>
        </div>
      </div>
    </PageShell>
  );
}
