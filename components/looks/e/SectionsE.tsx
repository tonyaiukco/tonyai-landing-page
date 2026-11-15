import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Logo } from "@/components/Logo";
import { AuditLens } from "./AuditLens";
import { DotGrid, tenths } from "./DotGrid";
import { Arrow, Glyph, GroupDrawing, HorizonDrawing, Play, Plus, Skyline, type GlyphName } from "./Illustrations";
import { Title, here } from "./parts";

export function StripE() {
  const s = copy.strip;
  return (
    <section className="e-strip" aria-label={s.label}>
      <div className="e-wrap e-strip-inner">
        <p className="e-cap">{s.label}</p>
        <ul>{s.standards.map((st) => (<li key={st}>{st}</li>))}</ul>
        {s.facts.map((f) => (<p key={f.label} className="e-strip-fact"><b>{f.value}</b>{f.label}</p>))}
      </div>
    </section>
  );
}

const diffGlyphs: GlyphName[] = ["import", "group", "audit", "layers", "forecast"];

export function DifferenceE() {
  const d = copy.difference;
  const stage = copy.hero.stage;
  return (
    <section className="e-ink e-diff" aria-labelledby="e-fark-baslik">
      <Skyline />
      <div className="e-wrap">
        <div className="e-two">
          <div data-reveal>
            <p className="e-eyebrow">{d.eyebrow}</p>
            <Title id="e-fark-baslik" text={d.title} mark={4} />
            <p className="e-lead">{d.lead}</p>
          </div>
          <div className="e-diff-art" data-reveal><GroupDrawing /></div>
        </div>
        <ol className="e-diff-grid">
          {d.cards.map((c, i) => (
            <li key={c.title} className="e-draw" data-reveal style={{ "--d": i % 3 } as React.CSSProperties}>
              <Glyph name={diffGlyphs[i]} />
              <h3 className="e-h3">{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="e-split e-diff-foot">
        <div className="e-main" data-reveal>
          <h3 className="e-h3 e-h3-lg">{stage.after}<span>{demo.period}</span></h3>
          <div className="e-scopes">
            {demo.scopes.map((sc) => (<DotGrid key={sc.label} filled={tenths(sc.value, demo.total)} label={sc.label} sub={`${formatInt(sc.value)} ${stage.unit}`} />))}
          </div>
        </div>
        <div className="e-panel e-tint">
          <div className="e-panel-in" data-reveal>
            <p className="e-chip"><Glyph name="check" size={16} />{stage.approved}</p>
            <p className="e-lead">{stage.footer}</p>
            <Link href={copy.hero.primary.href} className="e-btn">{copy.hero.primary.label}<Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const moduleGlyphs: GlyphName[] = ["calc", "merge", "shield", "report", "spark", "target"];
const statusFill = { ok: 3, warn: 2, miss: 0 };

export function PlatformE() {
  const p = copy.platform;
  const ui = p.ui;
  return (
    <section id="platform" className="e-paper e-split e-platform" aria-labelledby="e-platform-baslik">
      <div className="e-main">
        <div data-reveal>
          <p className="e-eyebrow">{p.eyebrow}</p>
          <Title id="e-platform-baslik" text={p.title} mark={2} />
          <p className="e-lead">{p.lead}</p>
        </div>
        <ol className="e-modules">
          {p.modules.map((m, i) => (
            <li key={m.name} className="e-draw" data-reveal style={{ "--d": i % 2 } as React.CSSProperties}>
              <Glyph name={moduleGlyphs[i]} size={44} />
              <h3 className="e-h3">{m.name}</h3>
              <p>{m.body}</p>
              <Link href={here(m.href)} className="e-link">{m.cta}<Arrow /></Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="e-panel e-white e-ui">
        <div className="e-panel-in" data-reveal>
          <h3 className="e-h3">{ui.entryTitle}</h3>
          <ul className="e-ui-list">
            {ui.categories.map(([name, st]) => (
              <li key={name}>
                <span>{name}</span>
                <span className="e-ui-status">{copy.hero.stage.status[st]}<span className="e-ui-bar" aria-hidden="true">{[0, 1, 2].map((k) => (<i key={k} data-on={k < statusFill[st] ? "" : undefined} />))}</span></span>
              </li>
            ))}
          </ul>
          <dl className="e-ui-facts">
            <div><dt>{ui.grid}</dt><dd>{ui.gridValue}</dd></div>
            <div>
              <dt>{ui.completion}</dt>
              <dd>{ui.completionNote}<span className="e-ui-track" aria-hidden="true"><i /></span></dd>
            </div>
          </dl>
          <blockquote className="e-ui-note"><span className="e-cap">{ui.reviewer}</span>{ui.reviewNote}</blockquote>
        </div>
      </div>
    </section>
  );
}

export function DemoE() {
  const d = copy.demoSection;
  return (
    <section id="demo" className="e-white e-split e-demo" aria-labelledby="e-demo-baslik">
      <div className="e-main" data-reveal>
        <div className="e-video" role="img" aria-label={d.videoLabel}>
          <span className="e-video-play" aria-hidden="true"><Play size={22} /></span>
          <span className="e-video-label" aria-hidden="true">{d.videoLabel}</span>
        </div>
      </div>
      <div className="e-panel">
        <div className="e-panel-in" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <p className="e-eyebrow">{d.eyebrow}</p>
          <Title id="e-demo-baslik" text={d.title} mark={3} className="e-h2 e-h2-sm" />
          <p>{d.body}</p>
          <Link href={d.primary.href} className="e-btn">{d.primary.label}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function JourneyE() {
  const j = copy.journey;
  return (
    <section id="yontem" className="e-paper e-journey" aria-labelledby="e-nasil-baslik">
      <div className="e-split">
        <div className="e-main e-journey-head" data-reveal>
          <p className="e-eyebrow">{j.eyebrow}</p>
          <Title id="e-nasil-baslik" text={j.title} mark={3} />
          <p className="e-lead">{j.lead}</p>
        </div>
        <ol className="e-steps">
          {j.steps.map((s) => (
            <li key={s.n}>
              <div className="e-step" data-reveal>
                <span className="e-num" aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="e-h3">{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
              <p className="e-step-ex"><span data-reveal style={{ "--d": 1 } as React.CSSProperties}><span className="e-cap">{j.exampleLabel}</span>{s.example}</span></p>
            </li>
          ))}
        </ol>
        <p className="e-main e-disclaimer">{j.note}</p>
      </div>
    </section>
  );
}

export function ComplianceE() {
  const c = copy.compliance;
  return (
    <section className="e-ink e-band e-comp" aria-labelledby="e-yontem-baslik">
      <div className="e-wrap">
        <div className="e-two e-two-top">
          <div data-reveal>
            <p className="e-eyebrow">{c.eyebrow}</p>
            <Title id="e-yontem-baslik" text={c.title} mark={3} />
          </div>
          <p className="e-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{c.body}</p>
        </div>
        <AuditLens />
        <ul className="e-standards">
          {c.standards.map((s, i) => (
            <li key={s.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <span className="e-cap">{s.role}</span>
              <h3 className="e-h3">{s.name}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="e-comp-cols">
          <div data-reveal>
            <h3 className="e-h3">{c.audit.title}</h3>
            <ul className="e-ticks">{c.audit.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="e-h3">{c.security.title}</h3>
            <p>{c.security.body}</p>
            <p className="e-note">{c.security.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofE() {
  const p = copy.proof;
  return (
    <section className="e-white e-band e-proof" aria-labelledby="e-ornek-baslik">
      <div className="e-wrap">
        <div className="e-two e-two-top">
          <div data-reveal>
            <p className="e-eyebrow">{p.eyebrow}</p>
            <Title id="e-ornek-baslik" text={p.title} mark={2} />
          </div>
          <p className="e-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{p.lead}</p>
        </div>
        <div className="e-ba">
          <div data-reveal>
            <h3 className="e-cap">{p.before.label}</h3>
            <ul className="e-ticks e-ticks-x">{p.before.items.map((it) => (<li key={it}><Glyph name="cross" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="e-cap">{p.after.label}</h3>
            <ul className="e-ticks">{p.after.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
          <div className="e-ink e-leafblock e-proof-block" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            <p className="e-lead">{p.after.title}</p>
            <p className="e-proof-figure">
              <span className="e-proof-num">{p.after.metric.value}</span>
              <span className="e-proof-unit">{p.after.metric.unit}</span>
            </p>
            <p className="e-proof-label">{p.after.metric.label}</p>
            <p className="e-disclaimer">{p.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqE() {
  const f = copy.faq;
  return (
    <section className="e-paper e-split e-faq" aria-labelledby="e-sss-baslik">
      <div className="e-main" data-reveal>
        <p className="e-eyebrow">{f.eyebrow}</p>
        <Title id="e-sss-baslik" text={f.title} mark={0} />
      </div>
      <div className="e-panel e-white">
        <div className="e-faq-list">
          {f.items.map((it, i) => (
            <details key={it.q} open={i === 0}>
              <summary><span>{it.q}</span><span className="e-faq-icon" aria-hidden="true"><Plus /></span></summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaE() {
  const f = copy.finalCta;
  return (
    <section className="e-ink e-final" aria-labelledby="e-son-baslik">
      <Skyline />
      <div className="e-wrap e-two">
        <div data-reveal>
          <Title id="e-son-baslik" text={f.title} mark={3} />
          <p className="e-lead">{f.body}</p>
          <div className="e-final-actions">
            <Link href={f.primary.href} className="e-btn">{f.primary.label}<Arrow /></Link>
            <Link href={here(f.secondary.href)} className="e-btn e-btn-line">{f.secondary.label}</Link>
          </div>
        </div>
        <div className="e-final-art" data-reveal><HorizonDrawing /></div>
      </div>
    </section>
  );
}

export function FooterE() {
  const f = copy.footer;
  return (
    <footer className="e-ink e-footer">
      <div className="e-wrap">
        <div className="e-footer-top">
          <div className="e-footer-brand">
            <Logo dark />
            <p>{f.tagline}</p>
            <a href={`mailto:${f.email}`}>{f.email}</a>
            <span>{f.bases}</span>
          </div>
          <div className="e-footer-cols">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>{col.links.map((l) => (<li key={l.href}><Link href={here(l.href)}>{l.label}</Link></li>))}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="e-footer-bottom">
          <ul>{f.legal.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          <span>{f.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
