import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { demoPage as d } from "@/content/copy";

export const metadata: Metadata = { title: d.meta.title, description: d.meta.description, alternates: { canonical: "/demo/" } };

export default function DemoRoute() {
  return (
    <PageShell>
      <PageIntro id="demo-baslik" eyebrow={d.eyebrow} title={d.title} lead={d.lead} />
      <div className="container grid gap-8 pb-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:pb-32">
        <aside className="flex flex-col gap-6 lg:self-start">
          {d.points.map((p, i) => (
            <div key={p.title} className="flex gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
              <span className="figure flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-tint text-[0.8rem] text-forest">{i + 1}</span>
              <div className="flex flex-col gap-1"><h2 className="h3">{p.title}</h2><p className="text-ink-2">{p.body}</p></div>
            </div>
          ))}
        </aside>
        <ContactForm variant="demo" successHref={d.successHref} />
      </div>
    </PageShell>
  );
}
