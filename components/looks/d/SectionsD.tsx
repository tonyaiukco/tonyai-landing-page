import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Logo } from "@/components/Logo";
import { AuditLens } from "./AuditLens";
import { Arrow, Glyph, GroupDrawing, HorizonDrawing, Pin, Play, Plus, Treeline, type GlyphName } from "./Illustrations";
import { Meter, segments } from "./Meter";
import { Noted, Title, here } from "./parts";

export function StripD() {
  const s = copy.strip;
  return (
    <section className="d-strip" aria-label={s.label}>
      <div className="d-wrap d-strip-inner">
        <p className="d-cap">{s.label}</p>
        <ul>{s.standards.map((st) => (<li key={st}>{st}</li>))}</ul>
        {s.facts.map((f) => (<p key={f.label} className="d-strip-fact"><b>{f.value}</b>{f.label}</p>))}
      </div>
    </section>
  );
}

const diffGlyphs: GlyphName[] = ["import", "group", "audit", "layers", "forecast"];

export function DifferenceD() {
  const d = copy.difference;
  const stage = copy.hero.stage;
  return (
    <section className="d-teal d-diff" aria-labelledby="d-fark-baslik">
      <Treeline />
      <div className="d-wrap">
        <div className="d-two">
          <div data-reveal>
            <p className="d-eyebrow">{d.eyebrow}</p>
            <Title id="d-fark-baslik" text={d.title} at={4} />
            <p className="d-lead">{d.lead}</p>
          </div>
          <div className="d-diff-art" data-reveal><GroupDrawing /></div>
        </div>
        <ol className="d-diff-grid">
          {d.cards.map((c, i) => (
            <li key={c.title} className="d-draw" data-reveal style={{ "--d": i % 3 } as React.CSSProperties}>
              <Glyph name={diffGlyphs[i]} />
              <h3 className="d-h3">{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="d-split d-diff-foot">
        <div className="d-main" data-reveal>
          <h3 className="d-h3 d-h3-lg">{stage.after}<span>{demo.period}</span></h3>
          <div className="d-meters">
            {demo.scopes.map((sc) => (<Meter key={sc.label} filled={segments(sc.value, demo.total)} label={sc.label} sub={`${formatInt(sc.value)} ${stage.unit}`} />))}
          </div>
        </div>
        <div className="d-panel d-mist">
          <div className="d-panel-in" data-reveal>
            <p className="d-lead">{stage.footer}</p>
            <Noted note={stage.approved}><Link href={copy.hero.primary.href} className="d-btn">{copy.hero.primary.label}<Arrow /></Link></Noted>
          </div>
        </div>
      </div>
    </section>
  );
}

const moduleGlyphs: GlyphName[] = ["calc", "merge", "shield", "report", "spark", "target"];
const statusFill = { ok: 3, warn: 2, miss: 0 };

export function PlatformD() {
  const p = copy.platform;
  const ui = p.ui;
  return (
    <section id="platform" className="d-mist d-split d-platform" aria-labelledby="d-platform-baslik">
      <div className="d-main">
        <div data-reveal>
          <p className="d-eyebrow">{p.eyebrow}</p>
          <Title id="d-platform-baslik" text={p.title} at={2} />
          <p className="d-lead">{p.lead}</p>
        </div>
        <ol className="d-modules">
          {p.modules.map((m, i) => (
            <li key={m.name} className="d-draw" data-reveal style={{ "--d": i % 2 } as React.CSSProperties}>
              <Glyph name={moduleGlyphs[i]} size={44} />
              <h3 className="d-h3">{m.name}</h3>
              <p>{m.body}</p>
              <Link href={here(m.href)} className="d-link">{m.cta}<Arrow /></Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="d-panel d-white d-ui">
        <div className="d-panel-in" data-reveal>
          <h3 className="d-h3">{ui.entryTitle}</h3>
          <ul className="d-ui-list">
            {ui.categories.map(([name, st]) => (
              <li key={name}>
                <span>{name}</span>
                <span className="d-ui-status">{copy.hero.stage.status[st]}<span className="d-ui-bar" aria-hidden="true">{[0, 1, 2].map((k) => (<i key={k} data-on={k < statusFill[st] ? "" : undefined} />))}</span></span>
              </li>
            ))}
          </ul>
          <dl className="d-ui-facts">
            <div><dt>{ui.grid}</dt><dd>{ui.gridValue}</dd></div>
            <div>
              <dt>{ui.completion}</dt>
              <dd>{ui.completionNote}<span className="d-ui-bar d-ui-bar-wide" aria-hidden="true">{[0, 1, 2, 3].map((k) => (<i key={k} data-on={k < 2 ? "" : undefined} />))}</span></dd>
            </div>
          </dl>
          <blockquote className="d-ui-note"><span className="d-cap">{ui.reviewer}</span>{ui.reviewNote}</blockquote>
        </div>
      </div>
    </section>
  );
}

export function DemoD() {
  const d = copy.demoSection;
  return (
    <section id="demo" className="d-white d-split d-demo" aria-labelledby="d-demo-baslik">
      <div className="d-main" data-reveal>
        <div className="d-video" role="img" aria-label={d.videoLabel}>
          <span className="d-video-play" aria-hidden="true"><Play size={22} /></span>
          <span className="d-video-label" aria-hidden="true">{d.videoLabel}</span>
        </div>
      </div>
      <div className="d-panel">
        <div className="d-panel-in" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <p className="d-eyebrow">{d.eyebrow}</p>
          <Title id="d-demo-baslik" text={d.title} at={1} className="d-h2 d-h2-sm" />
          <p>{d.body}</p>
          <Link href={d.primary.href} className="d-btn">{d.primary.label}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

/** Pin centres alternate across the rail so the route zigzags like a path on a map. */
const railX = (i: number) => (i % 2 ? 62 : 22);

export function JourneyD() {
  const j = copy.journey;
  return (
    <section id="yontem" className="d-mist d-journey" aria-labelledby="d-nasil-baslik">
      <div className="d-split">
        <div className="d-main d-journey-head" data-reveal>
          <p className="d-eyebrow">{j.eyebrow}</p>
          <Title id="d-nasil-baslik" text={j.title} at={3} accent={1} />
          <p className="d-lead">{j.lead}</p>
        </div>
        <ol className="d-steps">
          {j.steps.map((s, i) => (
            <li key={s.n}>
              <div className="d-step" data-reveal>
                <div className="d-rail" aria-hidden="true">
                  {i < j.steps.length - 1 && (
                    <svg viewBox="0 0 84 100" preserveAspectRatio="none"><path d={`M${railX(i)} 0L${railX(i + 1)} 100`} vectorEffect="non-scaling-stroke" /></svg>
                  )}
                  <span style={{ left: `${railX(i) - 22}px` }}><Pin>{s.n}</Pin></span>
                </div>
                <div>
                  <h3 className="d-h3">{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
              <p className="d-step-ex"><span data-reveal style={{ "--d": 1 } as React.CSSProperties}><span className="d-cap">{j.exampleLabel}</span>{s.example}</span></p>
            </li>
          ))}
        </ol>
        <p className="d-main d-disclaimer">{j.note}</p>
      </div>
    </section>
  );
}

export function ComplianceD() {
  const c = copy.compliance;
  return (
    <section className="d-teal d-band d-comp" aria-labelledby="d-yontem-baslik">
      <div className="d-wrap">
        <div className="d-two d-two-top">
          <div data-reveal>
            <p className="d-eyebrow">{c.eyebrow}</p>
            <Title id="d-yontem-baslik" text={c.title} at={3} />
          </div>
          <p className="d-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{c.body}</p>
        </div>
        <AuditLens />
        <ul className="d-standards">
          {c.standards.map((s, i) => (
            <li key={s.name} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <span className="d-cap">{s.role}</span>
              <h3 className="d-h3">{s.name}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="d-comp-cols">
          <div data-reveal>
            <h3 className="d-h3">{c.audit.title}</h3>
            <ul className="d-ticks">{c.audit.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="d-h3">{c.security.title}</h3>
            <p>{c.security.body}</p>
            <p className="d-note">{c.security.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofD() {
  const p = copy.proof;
  return (
    <section className="d-white d-proof" aria-labelledby="d-ornek-baslik">
      <div className="d-wrap d-proof-top">
        <div className="d-two d-two-top">
          <div data-reveal>
            <p className="d-eyebrow">{p.eyebrow}</p>
            <Title id="d-ornek-baslik" text={p.title} at={2} />
          </div>
          <p className="d-lead" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{p.lead}</p>
        </div>
        <div className="d-ba">
          <div data-reveal>
            <h3 className="d-cap">{p.before.label}</h3>
            <ul className="d-ticks d-ticks-x">{p.before.items.map((it) => (<li key={it}><Glyph name="cross" size={20} />{it}</li>))}</ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h3 className="d-cap">{p.after.label}</h3>
            <ul className="d-ticks">{p.after.items.map((it) => (<li key={it}><Glyph name="check" size={20} />{it}</li>))}</ul>
          </div>
        </div>
      </div>
      <div className="d-split d-proof-foot">
        <div className="d-teal d-proof-said">
          <p className="d-lead">{p.after.title}</p>
          <p className="d-disclaimer">{p.disclaimer}</p>
        </div>
        <p className="d-proof-figure">
          <span className="d-proof-num">{p.after.metric.value}</span>
          <span className="d-proof-unit">{p.after.metric.unit}</span>
          <span className="d-proof-label">{p.after.metric.label}</span>
        </p>
      </div>
    </section>
  );
}

export function FaqD() {
  const f = copy.faq;
  return (
    <section className="d-mist d-split d-faq" aria-labelledby="d-sss-baslik">
      <div className="d-main" data-reveal>
        <p className="d-eyebrow">{f.eyebrow}</p>
        <Title id="d-sss-baslik" text={f.title} at={1} />
      </div>
      <div className="d-panel d-white">
        <div className="d-faq-list">
          {f.items.map((it, i) => (
            <details key={it.q} open={i === 0}>
              <summary><span>{it.q}</span><span className="d-faq-icon" aria-hidden="true"><Plus /></span></summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaD() {
  const f = copy.finalCta;
  return (
    <section className="d-teal d-final" aria-labelledby="d-son-baslik">
      <Treeline />
      <div className="d-wrap d-two">
        <div data-reveal>
          <Title id="d-son-baslik" text={f.title} at={2} />
          <p className="d-lead">{f.body}</p>
          <div className="d-final-actions">
            <Link href={f.primary.href} className="d-btn">{f.primary.label}<Arrow /></Link>
            <Link href={here(f.secondary.href)} className="d-btn d-btn-line">{f.secondary.label}</Link>
          </div>
        </div>
        <div className="d-final-art" data-reveal><HorizonDrawing /></div>
      </div>
    </section>
  );
}

export function FooterD() {
  const f = copy.footer;
  return (
    <footer className="d-teal d-footer">
      <div className="d-wrap">
        <div className="d-footer-top">
          <div className="d-footer-brand">
            <Logo dark />
            <p>{f.tagline}</p>
            <a href={`mailto:${f.email}`}>{f.email}</a>
            <span>{f.bases}</span>
          </div>
          <div className="d-footer-cols">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>{col.links.map((l) => (<li key={l.href}><Link href={here(l.href)}>{l.label}</Link></li>))}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="d-footer-bottom">
          <ul>{f.legal.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          <span>{f.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
