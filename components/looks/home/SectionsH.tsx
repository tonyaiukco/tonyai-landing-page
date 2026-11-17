import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "@/components/Logo";
import { AuditLens } from "./AuditLens";
import { Arrow, Glyph, GroupDrawing, HorizonDrawing, Pin, Play, Plus, Skyline, type GlyphName } from "./Illustrations";
import { Title, here } from "./parts";

export function StripH() {
  const s = copy.strip;
  return (
    <section className="h-strip" aria-label={s.label}>
      <div className="h-wrap h-strip-inner">
        <p className="h-cap">{s.label}</p>
        <ul>{s.standards.map((st) => (<li key={st}>{st}</li>))}</ul>
      </div>
    </section>
  );
}

const diffGlyphs: GlyphName[] = ["import", "group", "audit", "layers", "forecast"];

export function DifferenceH() {
  const d = copy.difference;
  return (
    <section className="h-light h-diff" aria-labelledby="h-fark-baslik">
      <div className="h-wrap">
        <div className="h-two">
          <div data-reveal>
            <p className="h-eyebrow">{d.eyebrow}</p>
            <Title id="h-fark-baslik" text={d.title} at={4} />
            <p className="h-lead">{d.lead}</p>
          </div>
          <div className="h-diff-art" data-reveal><GroupDrawing /></div>
        </div>
        <ol className="h-diff-grid">
          {d.cards.map((c, i) => (
            <li key={c.title} className="h-draw" data-reveal style={{ "--d": i % 3 } as React.CSSProperties}>
              <Glyph name={diffGlyphs[i]} />
              <h3 className="h-h3">{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const moduleGlyphs: GlyphName[] = ["calc", "merge", "shield", "report", "spark", "target"];
const statusFill = { ok: 3, warn: 2, miss: 0 };

export function PlatformH() {
  const p = copy.platform;
  const ui = p.ui;
  return (
    <section id="platform" className="h-alt h-split h-platform" aria-labelledby="h-platform-baslik">
      <div className="h-main">
        <div data-reveal>
          <p className="h-eyebrow">{p.eyebrow}</p>
          <Title id="h-platform-baslik" text={p.title} at={2} />
          <p className="h-lead">{p.lead}</p>
        </div>
        <ol className="h-modules">
          {p.modules.map((m, i) => (
            <li key={m.name} className="h-draw" data-reveal style={{ "--d": i % 2 } as React.CSSProperties}>
              <Glyph name={moduleGlyphs[i]} size={44} />
              <h3 className="h-h3">{m.name}</h3>
              <p>{m.body}</p>
              <Link href={here(m.href)} className="h-link">{m.cta}<Arrow /></Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="h-panel h-light h-ui">
        <div className="h-panel-in" data-reveal>
          <h3 className="h-h3">{ui.entryTitle}</h3>
          <ul className="h-ui-list">
            {ui.categories.map(([name, st]) => (
              <li key={name}>
                <span>{name}</span>
                <span className="h-ui-status" data-status={st}><span className="h-pill">{copy.hero.stage.status[st]}</span><span className="h-ui-bar" aria-hidden="true">{[0, 1, 2].map((k) => (<i key={k} data-on={k < statusFill[st] ? "" : undefined} />))}</span></span>
              </li>
            ))}
          </ul>
          <dl className="h-ui-facts">
            <div><dt>{ui.grid}</dt><dd>{ui.gridValue}</dd></div>
            <div>
              <dt>{ui.completion}</dt>
              <dd>{ui.completionNote}<span className="h-ui-bar h-ui-bar-wide" aria-hidden="true">{[0, 1, 2, 3].map((k) => (<i key={k} data-on={k < 2 ? "" : undefined} />))}</span></dd>
            </div>
          </dl>
          <blockquote className="h-ui-note"><span className="h-cap">{ui.reviewer}</span>{ui.reviewNote}</blockquote>
        </div>
      </div>
    </section>
  );
}

export function DemoH() {
  const d = copy.demoSection;
  return (
    <section id="demo" className="h-light h-split h-demo" aria-labelledby="h-demo-baslik">
      <div className="h-main" data-reveal>
        <div className="h-video" role="img" aria-label={d.videoLabel}>
          <span className="h-video-play" aria-hidden="true"><Play size={22} /></span>
          <span className="h-video-label" aria-hidden="true">{d.videoLabel}</span>
        </div>
      </div>
      <div className="h-panel">
        <div className="h-panel-in" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <p className="h-eyebrow">{d.eyebrow}</p>
          <Title id="h-demo-baslik" text={d.title} at={1} className="h-h2 h-h2-sm" />
          <p>{d.body}</p>
          <Link href={d.primary.href} className="h-btn">{d.primary.label}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

/** Pin centres alternate across the rail so the route zigzags like a path on a map. */
const railX = (i: number) => (i % 2 ? 62 : 22);

export function JourneyH() {
  const j = copy.journey;
  return (
    <section id="yontem" className="h-alt h-journey" aria-labelledby="h-nasil-baslik">
      <div className="h-split">
        <div className="h-main h-journey-head" data-reveal>
          <p className="h-eyebrow">{j.eyebrow}</p>
          <Title id="h-nasil-baslik" text={j.title} at={3} accent={1} />
          <p className="h-lead">{j.lead}</p>
        </div>
        <ol className="h-steps">
          {j.steps.map((s, i) => (
            <li key={s.n}>
              <div className="h-step" data-reveal>
                <div className="h-rail" aria-hidden="true">
                  {i < j.steps.length - 1 && (
                    <svg viewBox="0 0 84 100" preserveAspectRatio="none"><path d={`M${railX(i)} 0L${railX(i + 1)} 100`} vectorEffect="non-scaling-stroke" /></svg>
                  )}
                  <span style={{ left: `${railX(i) - 22}px` }}><Pin>{s.n}</Pin></span>
                </div>
                <div>
                  <h3 className="h-h3">{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
              <p className="h-step-ex"><span data-reveal style={{ "--d": 1 } as React.CSSProperties}><span className="h-cap">{j.exampleLabel}</span>{s.example}</span></p>
            </li>
          ))}
        </ol>
        <p className="h-main h-disclaimer">{j.note}</p>
      </div>
    </section>
  );
}

export function ComplianceH() {
  const c = copy.compliance;
  return (
    <section className="h-light h-band h-comp" aria-labelledby="h-yontem-baslik">
      <div className="h-wrap">
        <div className="h-two h-two-top">
          <div data-reveal>
            <p className="h-eyebrow">{c.eyebrow}</p>
            <Title id="h-yontem-baslik" text={c.title} at={3} />
          </div>
          <p className="h-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{c.body}</p>
        </div>
        <AuditLens />
        <ul className="h-standards">
          {c.standards.map((s, i) => (
            <li key={s.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <span className="h-cap">{s.role}</span>
              <h3 className="h-h3">{s.name}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="h-comp-cols">
          <div data-reveal>
            <h3 className="h-h3">{c.audit.title}</h3>
            <ul className="h-ticks">{c.audit.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="h-h3">{c.security.title}</h3>
            <p>{c.security.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofH() {
  const p = copy.proof;
  return (
    <section className="h-alt h-proof" aria-labelledby="h-ornek-baslik">
      <div className="h-wrap h-proof-top">
        <div className="h-two h-two-top">
          <div data-reveal>
            <p className="h-eyebrow">{p.eyebrow}</p>
            <Title id="h-ornek-baslik" text={p.title} at={2} />
          </div>
          <p className="h-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{p.lead}</p>
        </div>
        <div className="h-ba">
          <div data-reveal>
            <h3 className="h-cap">{p.before.label}</h3>
            <ul className="h-ticks h-ticks-x">{p.before.items.map((it) => (<li key={it}><Glyph name="cross" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="h-cap">{p.after.label}</h3>
            <ul className="h-ticks">{p.after.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
        </div>
      </div>
      <div className="h-split h-proof-foot">
        <div className="h-light h-proof-said">
          <p className="h-lead">{p.after.title}</p>
          <p className="h-disclaimer">{p.disclaimer}</p>
        </div>
        <p className="h-proof-figure">
          <span className="h-proof-num">{p.after.metric.value}</span>
          <span className="h-proof-unit">{p.after.metric.unit}</span>
          <span className="h-proof-label">{p.after.metric.label}</span>
        </p>
      </div>
    </section>
  );
}

export function FaqH() {
  const f = copy.faq;
  return (
    <section className="h-light h-split h-faq" aria-labelledby="h-sss-baslik">
      <div className="h-main" data-reveal>
        <p className="h-eyebrow">{f.eyebrow}</p>
        <Title id="h-sss-baslik" text={f.title} at={1} />
      </div>
      <div className="h-panel h-light">
        <div className="h-faq-list">
          {f.items.map((it, i) => (
            <details key={it.q} open={i === 0}>
              <summary><span>{it.q}</span><span className="h-faq-icon" aria-hidden="true"><Plus /></span></summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaH() {
  const f = copy.finalCta;
  return (
    <section className="h-brand h-final" aria-labelledby="h-son-baslik">
      <Skyline />
      <div className="h-wrap h-two">
        <div data-reveal>
          <Title id="h-son-baslik" text={f.title} at={2} />
          <p className="h-lead">{f.body}</p>
          <div className="h-final-actions">
            <Link href={f.primary.href} className="h-btn">{f.primary.label}<Arrow /></Link>
            <Link href={here(f.secondary.href)} className="h-btn h-btn-line">{f.secondary.label}</Link>
          </div>
        </div>
        <div className="h-final-art" data-reveal><HorizonDrawing /></div>
      </div>
    </section>
  );
}

export function FooterH() {
  const f = copy.footer;
  return (
    <footer className="h-brand h-footer">
      <div className="h-wrap">
        <div className="h-footer-top">
          <div className="h-footer-brand">
            <Logo dark />
            <p>{f.tagline}</p>
            <a href={`mailto:${f.email}`}>{f.email}</a>
            <span>{f.bases}</span>
          </div>
          <div className="h-footer-cols">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>{col.links.map((l) => (<li key={l.href}><Link href={here(l.href)}>{l.label}</Link></li>))}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="h-footer-bottom">
          <ul>{f.legal.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          <span>{f.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
