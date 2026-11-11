"use client";

import Link from "next/link";
import { copy } from "@/content/copy";
import { FlowStage } from "./FlowStage";

const h = copy.hero;

/**
 * Hero "Atmosfer": warm fields drift behind the headline; on the right, the five verbs of the
 * headline copy as a short flow with keywords. No pin, no scroll capture.
 */
export function HeroC() {
  const titleWords = h.title.split(" ");
  const accentIdx = titleWords.findIndex((w) => w.toLowerCase().startsWith("karbon"));

  return (
    <section className="c-hero" aria-labelledby="c-hero-baslik">
      <div className="c-fields" aria-hidden="true">
        <div className="c-field c-field-terra" style={{ width: "60vw", height: "60vw", left: "-20vw", top: "-10vw" }} />
        <div className="c-field c-field-sage" style={{ width: "55vw", height: "55vw", right: "-15vw", top: "20vh" }} />
        <div className="c-field c-field-sand" style={{ width: "50vw", height: "50vw", left: "30vw", bottom: "-25vw" }} />
      </div>
      <div className="c-wrap c-hero-inner">
        <div className="c-hero-text">
          <p className="c-eyebrow">{h.eyebrow}</p>
          <h1 id="c-hero-baslik" className="c-display">
            {titleWords.map((w, i) => (
              <span key={i}>{i === accentIdx ? <span className="c-accent">{w}</span> : w}{i < titleWords.length - 1 ? " " : ""}</span>
            ))}
          </h1>
          <p className="c-lead c-muted c-measure">{h.lead}</p>
          <p className="c-measure c-lead2" style={{ color: "var(--c-ink-3)" }}>{h.lead2}</p>
          <div className="c-hero-actions">
            <Link href={h.primary.href} className="c-btn c-btn-primary">{h.primary.label}</Link>
            <Link href={h.secondary.href} className="c-btn c-btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              {h.secondary.label}
            </Link>
          </div>
          <ul className="c-hero-trust" aria-label="Dayanılan standartlar">
            {h.trust.map((t) => (<li key={t} className="c-pill c-pill-dot">{t}</li>))}
          </ul>
        </div>
        <FlowStage />
      </div>
    </section>
  );
}
