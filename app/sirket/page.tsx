import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/PageShell";
import { Mark } from "@/components/Logo";
import { companyPage as c, copy } from "@/content/copy";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description, alternates: { canonical: "/sirket/" } };

export default function CompanyRoute() {
  return (
    <PageShell>
      <PageIntro id="sirket-baslik" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <section className="rule" aria-labelledby="hikaye">
        <div className="container grid gap-10 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:py-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{c.story.eyebrow}</p>
            <h2 id="hikaye" className="h2 mt-4">{c.story.title}</h2>
          </div>
          <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.7] text-ink">
            {c.story.paragraphs.map((p, i) => (<p key={i} className={i === 0 ? "lead text-ink" : ""} data-reveal>{p}</p>))}
          </div>
        </div>
      </section>

      <section className="rule bg-surface-2/60" aria-labelledby="ilkeler">
        <div className="container flex flex-col gap-10 py-20">
          <p className="eyebrow">{c.principles.eyebrow}</p>
          <h2 id="ilkeler" className="sr-only">{c.principles.eyebrow}</h2>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {c.principles.items.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6" data-reveal>
                <span className="figure text-[0.8rem] text-ink-3">0{i + 1}</span><h3 className="h3">{p.title}</h3><p className="text-ink-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule" aria-labelledby="ekip">
        <div className="container grid gap-10 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="eyebrow">{c.team.eyebrow}</p>
            <h2 id="ekip" className="h2 mt-4">{c.team.title}</h2>
            <p className="mt-4 text-ink-2">{c.team.body}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {c.facts.map((f) => (<div key={f.k}><dt className="text-[0.8rem] text-ink-3">{f.k}</dt><dd className="mt-1 text-[0.95rem]">{f.v}</dd></div>))}
            </dl>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {c.team.members.map((m) => (
              <li key={m.name} className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-6" data-reveal>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-tint" aria-hidden="true"><Mark size={26} /></span>
                <div><div className="font-[600]">{m.name}</div><div className="text-[0.85rem] text-ink-3">{m.role}</div></div>
                <p className="text-[0.9rem] text-ink-2">{m.field}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule">
        <div className="container flex flex-col items-start gap-5 py-20">
          <h2 className="h2 max-w-[22ch]">{copy.finalCta.title}</h2>
          <Link href={copy.finalCta.primary.href} className="btn btn-primary" data-magnetic>{copy.finalCta.primary.label}</Link>
        </div>
      </section>
    </PageShell>
  );
}
