import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { contactPage as c } from "@/content/copy";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description, alternates: { canonical: "/bize-ulasin/" } };

export default function ContactRoute() {
  return (
    <PageShell>
      <PageIntro id="iletisim-baslik" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <div className="container grid gap-8 pb-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:pb-32">
        <aside className="flex flex-col gap-7 rounded-[var(--radius-lg)] bg-forest p-7 text-on-forest sm:p-9 lg:self-start" aria-labelledby="demo-panel">
          <div className="flex flex-col gap-3">
            <p className="eyebrow eyebrow-light">{c.panel.eyebrow}</p>
            <h2 id="demo-panel" className="h2">{c.panel.title}</h2>
            <p className="text-on-forest-2">{c.panel.body}</p>
          </div>
          <ol className="flex flex-col gap-4">
            {c.panel.steps.map((s, i) => (<li key={s} className="flex gap-4"><span className="figure flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-leaf text-[0.8rem]">{i + 1}</span><span className="text-on-forest-2">{s}</span></li>))}
          </ol>
          <p className="figure rounded-[var(--radius-sm)] border border-leaf px-3 py-2 text-[0.78rem] text-on-forest-2">{c.panel.responseNote}</p>
          <div className="border-t pt-6" style={{ borderColor: "#3f6b50" }}>
            <div className="text-[0.85rem] text-leaf-light">{c.panel.directLabel}</div>
            <div className="figure mt-1 select-all text-[1rem]">{c.panel.email}</div>
          </div>
        </aside>
        <ContactForm />
      </div>
    </PageShell>
  );
}
