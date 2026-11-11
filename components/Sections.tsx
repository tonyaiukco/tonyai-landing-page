import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { AuditTrail } from "./AuditTrail";
import { Mark } from "./Logo";

const chip = (s: string) => `chip ${s === "ok" ? "chip-ok" : s === "warn" ? "chip-warn" : "chip-miss"}`;
const scopeColors = ["var(--forest)", "var(--leaf)", "#B9D3C2"];

/* 1. Standards + coverage strip (the template's trust strip, with facts instead of borrowed logos) */
export function Strip() {
  const s = copy.strip;
  return (
    <section className="rule bg-surface-2/60" aria-label={s.label}>
      <div className="container flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="figure text-[0.75rem] uppercase tracking-[0.08em] text-ink-3">{s.label}</span>
          {s.standards.map((x) => (<span key={x} className="rounded-[var(--radius-sm)] border border-line bg-surface px-3 py-1.5 text-[0.9rem] font-[600]">{x}</span>))}
        </div>
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {s.facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-2">
              <dt className="figure text-[1.6rem] leading-none text-forest">{f.value}</dt>
              <dd className="text-[0.85rem] text-ink-2">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 2. The TonyAI difference: four cards */
export function Difference() {
  const d = copy.difference;
  return (
    <section className="rule" aria-labelledby="fark-baslik">
      <div className="container flex flex-col gap-12 py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20" data-reveal>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{d.eyebrow}</p>
            <h2 id="fark-baslik" className="h2">{d.title}</h2>
          </div>
          <p className="lead self-end text-ink-2">{d.lead}</p>
        </div>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {d.cards.map((c, i) => (
            <li key={c.title} className={`flex flex-col gap-3 rounded-[var(--radius-lg)] border p-7 sm:p-8 ${i === 4 ? "border-forest bg-forest-tint lg:col-span-6 lg:flex-row lg:items-start lg:gap-10" : "border-line bg-surface lg:col-span-3"}`} data-reveal>
              <span className="flex items-center gap-3 lg:shrink-0 lg:flex-col lg:items-start">
                <span className="figure text-[0.8rem] text-ink-3">0{i + 1}</span>
              </span>
              <div className="flex flex-col gap-3">
              <h3 className="h3">{c.title}</h3>
              <p className="text-ink-2">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Small, honest product fragments shared by the platform section */
function EntryFragment() {
  const u = copy.platform.ui;
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" aria-hidden="true">
      <ul className="flex flex-col gap-1.5">
        {u.categories.map(([c, s], i) => (
          <li key={c} className={`ledger-row rounded-[var(--radius-sm)] px-3 py-2 text-[0.85rem] ${i === 0 ? "bg-forest-tint" : ""}`}>
            <span className={i === 0 ? "font-[600]" : ""}>{c}</span>
            <span className={chip(s)}>{s === "ok" ? u.done : copy.hero.stage.status[s]}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-line bg-paper p-4">
        <div>
          <div className="text-[0.75rem] font-[520] text-ink-2">{u.consumption}</div>
          <div className="ledger-row mt-1 h-11 rounded-[var(--radius-sm)] border border-line-2 bg-surface px-3"><span className="figure text-[0.95rem]">45.000</span><span className="text-[0.75rem] text-ink-3">kWh</span></div>
        </div>
        <div>
          <div className="text-[0.75rem] font-[520] text-ink-2">{u.grid}</div>
          <div className="mt-1 flex h-11 items-center rounded-[var(--radius-sm)] border border-line-2 bg-surface px-3 text-[0.9rem]">{u.gridValue}</div>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-surface-2 p-3">
          <div className="ledger-row text-[0.8rem]"><span className="font-[600]">{u.completion}</span><span className="figure text-warn-fg">%50</span></div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-line"><div className="h-1.5 w-1/2 rounded-full bg-warn-fg" /></div>
          <div className="mt-1.5 text-[0.72rem] text-ink-3">{u.completionNote}</div>
        </div>
      </div>
    </div>
  );
}

function ApprovalFragment() {
  const u = copy.platform.ui;
  const state = ["done", "now", "next"];
  return (
    <div className="mt-6 flex flex-col gap-3" aria-hidden="true">
      <div className="grid grid-cols-3 gap-2">
        {u.approvalSteps.map((s, i) => (
          <div key={s} className={`rounded-[var(--radius-sm)] p-3 ${state[i] === "done" ? "bg-ok-bg text-ok-fg" : state[i] === "now" ? "border-2 border-forest bg-surface" : "border border-dashed border-line-2 text-ink-3"}`}>
            <div className="figure text-[0.65rem]">{i + 1}</div>
            <div className="text-[0.85rem] font-[600]">{s}</div>
          </div>
        ))}
      </div>
      <div className="rounded-[var(--radius-sm)] bg-paper p-3 text-[0.82rem]"><div className="text-[0.7rem] text-ink-3">{u.reviewer}</div>{u.reviewNote}</div>
    </div>
  );
}

function ScopesFragment() {
  const total = demo.scopes.reduce((a, s) => a + s.value, 0);
  return (
    <div className="mt-6 flex flex-col gap-3" aria-hidden="true">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-2">
        {demo.scopes.map((s, i) => (<div key={s.label} style={{ width: `${(s.value / total) * 100}%`, background: scopeColors[i] }} />))}
      </div>
      <ul className="flex flex-col divide-y divide-line">
        {demo.scopes.map((s, i) => (
          <li key={s.label} className="ledger-row py-1.5 text-[0.85rem]"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-sm" style={{ background: scopeColors[i] }} />{s.label}</span><span className="figure">{formatInt(s.value)}</span></li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {copy.platform.ui.exports.map((b, i) => (<span key={b} className={`inline-flex h-9 items-center rounded-[var(--radius-sm)] px-3 text-[0.8rem] ${i === 0 ? "bg-forest text-on-forest" : "border border-line-2"}`}>{b}</span>))}
      </div>
    </div>
  );
}

function SubsFragment() {
  return (
    <ul className="mt-6 flex flex-col divide-y divide-line text-[0.85rem]" aria-hidden="true">
      {demo.subsidiaries.slice(0, 4).map((s) => (
        <li key={s.name} className="ledger-row py-1.5">
          <span className="flex items-center gap-2"><span className="truncate">{s.name} <span className="text-ink-3">· {s.city}</span></span><span className={chip(s.status)}>{copy.hero.stage.status[s.status]}</span></span>
          <span className="figure text-ink-2">{formatInt(s.value)}</span>
        </li>
      ))}
    </ul>
  );
}

/* 3. Platform: complete coverage, four modules */
export function Platform() {
  const p = copy.platform;
  const frags = [<EntryFragment key="e" />, <SubsFragment key="s" />, <ApprovalFragment key="a" />, <ScopesFragment key="r" />];
  return (
    <section id="platform" className="scroll-mt-24 rule bg-surface-2/60" aria-labelledby="platform-baslik">
      <div className="container flex flex-col gap-12 py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20" data-reveal>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 id="platform-baslik" className="h2">{p.title}</h2>
          </div>
          <p className="lead self-end text-ink-2">{p.lead}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {p.modules.map((m, i) => (
            <article key={m.name} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-7" data-reveal>
              <h3 className="h3">{m.name}</h3>
              <p className="mt-2 text-ink-2">{m.body}</p>
              {frags[i]}
              <Link href={m.href} className="mt-6 inline-flex min-h-11 items-center self-start text-[0.9rem] font-[540] text-forest hover:text-forest-ink">{m.cta} →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. Demo */
export function DemoSection() {
  const d = copy.demoSection;
  return (
    <section id="demo" className="scroll-mt-24 rule" aria-labelledby="demo-baslik">
      <div className="container grid gap-10 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:py-32">
        <div className="flex flex-col gap-5" data-reveal>
          <p className="eyebrow">{d.eyebrow}</p>
          <h2 id="demo-baslik" className="h2">{d.title}</h2>
          <p className="lead text-ink-2">{d.body}</p>
          <Link href={d.primary.href} className="btn btn-primary self-start" data-magnetic>{d.primary.label}</Link>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ink" data-reveal aria-label={d.videoLabel}>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ink)" aria-hidden="true"><polygon points="7 4 20 12 7 20 7 4" /></svg>
              </span>
              <span className="figure text-[0.75rem] uppercase tracking-[0.1em] text-leaf-light">{d.videoLabel}</span>
            </div>
          </div>
          <div className="absolute left-6 top-6 flex items-center gap-2 text-paper"><Mark size={20} dark />TonyAI</div>
        </div>
      </div>
    </section>
  );
}

/* 6. Six-step journey */
export function Journey() {
  const j = copy.journey;
  return (
    <section className="rule" aria-labelledby="nasil-baslik">
      <div className="container flex flex-col gap-12 py-24 lg:py-32">
        <div className="flex flex-col gap-4" data-reveal>
          <p className="eyebrow">{j.eyebrow}</p>
          <h2 id="nasil-baslik" className="h2 max-w-[26ch]">{j.title}</h2>
        </div>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {j.steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-3 border-t-2 border-forest pt-5" data-reveal>
              <span className="figure text-[0.8rem] text-forest">{s.n}</span>
              <h3 className="h3">{s.name}</h3>
              <p className="text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Compliance() {
  const c = copy.compliance;
  return (
    <section id="yontem" className="scroll-mt-24 rule" aria-labelledby="yontem-baslik">
      <div className="container flex flex-col gap-14 py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20" data-reveal>
          <div className="flex flex-col gap-4"><p className="eyebrow">{c.eyebrow}</p><h2 id="yontem-baslik" className="h2">{c.title}</h2></div>
          <p className="lead self-end text-ink-2">{c.body}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {c.standards.map((s) => (
            <article key={s.name} className="rounded-[var(--radius-lg)] bg-forest p-7 text-on-forest" data-reveal>
              <div className="text-[1.35rem] font-[600] tracking-[-0.01em]">{s.name}</div>
              <div className="eyebrow eyebrow-light mt-1">{s.role}</div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-on-forest-2">{s.body}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="flex flex-col gap-8" data-reveal>
            <div>
              <h3 className="h3">{c.audit.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {c.audit.items.map((it) => (<li key={it} className="flex gap-3 text-ink-2"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" /><span>{it}</span></li>))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
              <h3 className="h3">{c.security.title}</h3>
              <p className="mt-2 text-ink-2">{c.security.body}</p>
              <p className="figure mt-3 rounded-[var(--radius-sm)] border border-dashed border-line-2 px-3 py-2 text-[0.78rem] text-ink-2">{c.security.note}</p>
            </div>
          </div>
          <div data-reveal><AuditTrail /></div>
        </div>
      </div>
    </section>
  );
}

/* 9. FAQ */
export function Faq() {
  const f = copy.faq;
  return (
    <section className="rule bg-surface-2/60" aria-labelledby="sss-baslik">
      <div className="container grid gap-10 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start" data-reveal><p className="eyebrow">{f.eyebrow}</p><h2 id="sss-baslik" className="h2 mt-4">{f.title}</h2></div>
        <div className="faq flex flex-col divide-y divide-line border-y border-line" data-reveal>
          {f.items.map((it, i) => (
            <details key={it.q} open={i === 0} className="group">
              <summary className="flex min-h-14 items-center justify-between gap-6 py-4 text-[1.05rem] font-[540]">
                <span>{it.q}</span>
                <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 text-ink" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                </span>
              </summary>
              <p className="measure pb-6 text-ink-2">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 10. Closing CTA */
export function FinalCta() {
  const c = copy.finalCta;
  return (
    <section className="rule" aria-labelledby="son-baslik">
      <div className="container py-24 lg:py-32">
        <div className="grid gap-8 rounded-[var(--radius-lg)] bg-ink px-7 py-10 text-paper sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-center lg:gap-16" data-reveal>
          <div className="flex flex-col gap-4"><h2 id="son-baslik" className="h2">{c.title}</h2><p className="lead max-w-[48ch]" style={{ color: "#C9D3CC" }}>{c.body}</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href={c.primary.href} className="btn btn-primary" data-magnetic>{c.primary.label}</Link>
            <Link href={c.secondary.href} className="btn btn-on-dark">{c.secondary.label}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
