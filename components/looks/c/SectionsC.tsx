import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Logo } from "@/components/Logo";
import { ScopesBar } from "./ScopesBar";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);

export function StripC() {
  const s = copy.strip;
  return (
    <section className="c-strip" aria-label={s.label}>
      <div className="c-wrap c-strip-inner">
        <div className="c-strip-left" data-reveal>
          <p className="c-eyebrow">{s.label}</p>
          <ul className="c-strip-pills">
            {s.standards.map((st) => (<li key={st} className="c-pill c-pill-dot">{st}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function DifferenceC() {
  const d = copy.difference;
  return (
    <section className="c-band c-band-moss" aria-labelledby="c-fark-baslik">
      <div className="c-wrap">
        <div className="c-head c-head-split">
          <div className="c-head-stack" data-reveal>
            <p className="c-eyebrow">{d.eyebrow}</p>
            <h2 id="c-fark-baslik" className="c-h2">{d.title}</h2>
          </div>
          <p className="c-lead c-muted" data-reveal data-delay="1">{d.lead}</p>
        </div>
        <ol className="c-diff-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {d.cards.map((c, i) => (
            <li key={c.title} className={`c-card ${i === 0 ? "c-card-big" : ""} ${i === 4 ? "c-card-wip" : ""}`} data-reveal data-delay={(i % 3) + 1}>
              <div className="c-card-top">
                {i !== 0 && <span className="c-num c-card-index" aria-hidden="true">0{i + 1}</span>}
              </div>
              <h3 className="c-h3">{c.title}</h3>
              <p>{c.body}</p>
              {i === 0 && <span className="c-num c-card-index" aria-hidden="true">01</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PlatformC() {
  const p = copy.platform;
  return (
    <section id="platform" className="c-band" aria-labelledby="c-platform-baslik" style={{ scrollMarginTop: "6rem" }}>
      <div className="c-wrap c-platform-inner">
        <div className="c-platform-side" data-reveal>
          <p className="c-eyebrow">{p.eyebrow}</p>
          <h2 id="c-platform-baslik" className="c-h2">{p.title}</h2>
          <p className="c-lead c-muted">{p.lead}</p>
          <div className="c-cluster" aria-hidden="true"><span /><span /><span /><span /></div>
        </div>
        <ol className="c-modules">
          {p.modules.map((m, i) => (
            <li key={m.name} className="c-module" data-reveal data-delay={(i % 2) + 1}>
              <span className="c-num c-module-n" aria-hidden="true">{i + 1}</span>
              <h3 className="c-h3">{m.name}</h3>
              <p>{m.body}</p>
              <Link href={m.href} className="c-btn-link">{m.cta}<Arrow /></Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DemoC() {
  const d = copy.demoSection;
  return (
    <section id="demo" className="c-band c-band-moss" aria-labelledby="c-demo-baslik" style={{ scrollMarginTop: "6rem" }}>
      <div className="c-wrap c-demo-inner">
        <div className="c-demo-head" data-reveal>
          <p className="c-eyebrow">{d.eyebrow}</p>
          <h2 id="c-demo-baslik" className="c-h2">{d.title}</h2>
          <p className="c-lead c-muted">{d.body}</p>
          <Link href={d.primary.href} className="c-btn c-btn-sand">{d.primary.label}</Link>
        </div>
        <div className="c-video" role="img" aria-label={d.videoLabel} data-reveal data-delay="1">
          <span className="c-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg></span>
          <span className="c-pill c-video-label" aria-hidden="true">{d.videoLabel}</span>
        </div>
      </div>
    </section>
  );
}

export function JourneyC() {
  const j = copy.journey;
  return (
    <section id="yontem" className="c-band" aria-labelledby="c-nasil-baslik" style={{ scrollMarginTop: "6rem" }}>
      <div className="c-wrap">
        <div className="c-head c-head-stack" data-reveal>
          <p className="c-eyebrow">{j.eyebrow}</p>
          <h2 id="c-nasil-baslik" className="c-h2" style={{ maxWidth: "22ch" }}>{j.title}</h2>
          <p className="c-lead c-muted">{j.lead}</p>
        </div>
        <ol className="c-steps">
          {j.steps.map((s, i) => (
            <li key={s.n} className="c-step" data-reveal data-delay={(i % 3) + 1}>
              <span className="c-num c-step-bubble" aria-hidden="true">{s.n}</span>
              <h3 className="c-h3">{s.name}</h3>
              <p>{s.body}</p>
              <p className="c-step-example"><span className="c-tiny">{j.exampleLabel}</span> {s.example}</p>
            </li>
          ))}
        </ol>
        <p className="c-disclaimer" style={{ color: "var(--c-ink-3)" }}>{j.note}</p>
      </div>
    </section>
  );
}

export function ComplianceC() {
  const c = copy.compliance;
  return (
    <section className="c-band c-band-moss" aria-labelledby="c-yontem-baslik">
      <div className="c-wrap c-comp-inner">
        <div className="c-head c-head-stack" data-reveal>
          <p className="c-eyebrow">{c.eyebrow}</p>
          <h2 id="c-yontem-baslik" className="c-h2">{c.title}</h2>
          <p className="c-lead c-muted">{c.body}</p>
        </div>
        <div style={{ display: "grid", gap: "2rem" }}>
          <ul className="c-stamps">
            {c.standards.map((s, i) => (
              <li key={s.name} className="c-stamp" data-reveal data-delay={i + 1}>
                <span className="c-stamp-circle">{s.name}</span>
                <div>
                  <span className="c-stamp-role">{s.role}</span>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="c-comp-cols">
            <div className="c-comp-box" data-reveal>
              <h3 className="c-h3">{c.audit.title}</h3>
              <ul>{c.audit.items.map((it) => (<li key={it}>{it}</li>))}</ul>
            </div>
            <div className="c-comp-box" data-reveal data-delay="1">
              <h3 className="c-h3">{c.security.title}</h3>
              <p>{c.security.body}</p>
              <p className="c-note">{c.security.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofC() {
  const p = copy.proof;
  return (
    <section className="c-band c-band-moss" aria-labelledby="c-ornek-baslik">
      <div className="c-wrap">
        <div className="c-head c-head-split">
          <div className="c-head-stack" data-reveal>
            <p className="c-eyebrow">{p.eyebrow}</p>
            <h2 id="c-ornek-baslik" className="c-h2">{p.title}</h2>
          </div>
          <p className="c-lead c-muted" data-reveal data-delay="1">{p.lead}</p>
        </div>
        <div className="c-ba2" data-reveal>
          <figure className="c-ba2-side c-ba2-before">
            <div className="c-ba2-art" aria-hidden="true">
              {Array.from({ length: 11 }).map((_, i) => (
                <span key={i} className="c-ba2-win" style={{ "--k": i } as React.CSSProperties}>
                  <span className="c-ba2-bar"><i /><i /><i /></span>
                  <span className="c-ba2-grid" />
                </span>
              ))}
            </div>
            <figcaption>
              <span className="c-tiny">{p.before.label}</span>
              <ul>{p.before.items.map((it) => (<li key={it}>{it}</li>))}</ul>
            </figcaption>
          </figure>
          <div className="c-ba2-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          </div>
          <figure className="c-ba2-side c-ba2-after">
            <div className="c-ba2-art c-ba2-screen" aria-hidden="true">
              <div className="c-ba2-screen-top"><Logo /><span className="c-ba2-period">2026 · Ç1</span></div>
              <div className="c-num c-ba2-metric">{p.after.metric.value}<small>{p.after.metric.unit}</small></div>
              <div className="c-ba2-metric-label">{p.after.metric.label}</div>
              <ScopesBar animated={false} />
              <ul className="c-ba2-rows">
                {demo.subsidiaries.map((sub) => (<li key={sub.name}><span><span className="c-okdot" />{sub.name}</span><b>{formatInt(sub.value)}</b></li>))}
              </ul>
            </div>
            <figcaption>
              <span className="c-tiny">{p.after.label}</span>
              <h3 className="c-h3">{p.after.title}</h3>
              <ul>{p.after.items.map((it) => (<li key={it}>{it}</li>))}</ul>
            </figcaption>
          </figure>
        </div>
        <p className="c-disclaimer">{p.disclaimer}</p>
      </div>
    </section>
  );
}

export function FaqC() {
  const f = copy.faq;
  return (
    <section className="c-band" aria-labelledby="c-sss-baslik">
      <div className="c-wrap c-faq-inner">
        <div className="c-head c-head-stack" data-reveal>
          <p className="c-eyebrow">{f.eyebrow}</p>
          <h2 id="c-sss-baslik" className="c-h2">{f.title}</h2>
        </div>
        <div className="c-faq-list">
          {f.items.map((it, i) => (
            <details key={it.q} className="c-faq-item" data-reveal data-delay={(i % 3) + 1} open={i === 0}>
              <summary>
                <span>{it.q}</span>
                <span className="c-faq-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg></span>
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaC() {
  const f = copy.finalCta;
  return (
    <section className="c-band c-band-moss c-final" aria-labelledby="c-son-baslik">
      <div className="c-fields" aria-hidden="true">
        <div className="c-field c-field-terra" style={{ width: "70vw", height: "70vw", left: "-25vw", top: "-20vw" }} />
        <div className="c-field c-field-sage" style={{ width: "60vw", height: "60vw", right: "-20vw", bottom: "-30vw" }} />
      </div>
      <div className="c-final-orb" aria-hidden="true" />
      <div className="c-wrap c-final-inner" data-reveal>
        <h2 id="c-son-baslik" className="c-h2">{f.title}</h2>
        <p className="c-lead c-muted">{f.body}</p>
        <div className="c-final-actions">
          <Link href={f.primary.href} className="c-btn c-btn-primary">{f.primary.label}</Link>
          <Link href={f.secondary.href} className="c-btn c-btn-ghost">{f.secondary.label}</Link>
        </div>
      </div>
    </section>
  );
}

export function FooterC() {
  const f = copy.footer;
  return (
    <footer className="c-footer">
      <div className="c-wrap">
        <div className="c-footer-top">
          <div className="c-footer-brand">
            <Logo dark />
            <p>{f.tagline}</p>
            <a href={`mailto:${f.email}`}>{f.email}</a>
            <span className="c-small" style={{ color: "var(--c-on-moss-2)" }}>{f.bases}</span>
          </div>
          <div className="c-footer-cols">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>{col.links.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="c-footer-bottom">
          <ul className="c-footer-legal">{f.legal.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          <span>{f.copyright}</span>
        </div>
        <div className="c-footer-mark" aria-hidden="true" />
      </div>
    </footer>
  );
}
