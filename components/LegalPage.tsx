import { PageShell } from "./PageShell";
import { legalPages } from "@/content/copy";

export function LegalPage({ page }: { page: { title: string; sections: { h: string; p: string }[] } }) {
  return (
    <PageShell>
      <article className="container max-w-[48rem] py-16 lg:py-24">
        <p className="figure rounded-[var(--radius-sm)] border border-dashed border-line-2 px-3 py-2 text-[0.8rem] text-ink-2">{legalPages.banner}</p>
        <h1 className="h2 mt-8">{page.title}</h1>
        <div className="mt-8 flex flex-col gap-8">{page.sections.map((s) => (<section key={s.h}><h2 className="h3">{s.h}</h2><p className="mt-2 text-ink-2">{s.p}</p></section>))}</div>
      </article>
    </PageShell>
  );
}
