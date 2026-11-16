import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow, HeroDrawing, Play } from "./Illustrations";
import { Title, here } from "./parts";

const h = copy.hero;

/**
 * Hero: six facilities in three overlapping groups, the shared middle is the consolidated total.
 * The light terracotta card states that total; its moss base holds the page's primary call to action. No pin.
 * Beneath both columns, the five verbs of the headline copy as one ruled row, each with its keywords.
 */
export function HeroH() {
  return (
    <section className="h-hero" aria-labelledby="h-hero-baslik">
      <div className="h-wrap h-hero-grid">
        <div className="h-hero-text">
          <p className="h-eyebrow">{h.eyebrow}</p>
          <Title as="h1" id="h-hero-baslik" className="h-h1" text={h.title} at={3} accent={2} />
          <p className="h-lead">{h.lead}</p>
          <p className="h-hero-lead2">{h.lead2}</p>
          <Link href={here(h.secondary.href)} className="h-link"><span className="h-link-play"><Play size={11} /></span>{h.secondary.label}</Link>
          <ul className="h-hero-trust" aria-label="Dayanılan standartlar">
            {h.trust.map((t) => (<li key={t}>{t}</li>))}
          </ul>
        </div>
        <div className="h-hero-art">
          <HeroDrawing labels={demo.subsidiaries.map((s) => s.sector)} />
          <div className="h-cert">
            <div className="h-cert-top">
              <p className="h-cert-label">{h.stage.after} · {demo.period}</p>
              <p className="h-cert-figure">{formatInt(demo.total)}<small>{h.stage.unit}</small></p>
              <p className="h-cert-note">{h.stage.footer}</p>
            </div>
            <div className="h-cert-base">
              <p>{h.flow.caption}</p>
              <Link href={h.primary.href} className="h-btn">{h.primary.label}<Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-wrap">
        <div className="h-flow" data-reveal>
          <p className="h-cap">{h.flow.label}</p>
          <ol>
            {h.flow.steps.map((st, i) => (
              <li key={st.verb}>
                <span className="h-flow-n" aria-hidden="true">{i + 1}</span>
                <b>{st.verb}</b>
                <span className="h-flow-keys">{st.keywords.join(" · ")}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
