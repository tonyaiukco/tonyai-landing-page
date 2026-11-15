import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow, Play } from "./Illustrations";
import { Treemap } from "./Treemap";
import { Title, here } from "./parts";

const h = copy.hero;

/**
 * Hero: six tiles sized by each subsidiary's emissions close up into one square.
 * The block beneath, cut with the logo's leaf, states their consolidated total and holds the page's primary action.
 */
export function HeroE() {
  return (
    <section className="e-hero" aria-labelledby="e-hero-baslik">
      <div className="e-wrap e-hero-grid">
        <div className="e-hero-text">
          <p className="e-eyebrow">{h.eyebrow}</p>
          <Title as="h1" id="e-hero-baslik" className="e-h1" text={h.title} mark={3} />
          <p className="e-lead">{h.lead}</p>
          <p className="e-hero-lead2">{h.lead2}</p>
          <Link href={here(h.secondary.href)} className="e-link"><span className="e-link-play"><Play size={11} /></span>{h.secondary.label}</Link>
          <ul className="e-hero-trust" aria-label="Dayanılan standartlar">
            {h.trust.map((t) => (<li key={t}>{t}</li>))}
          </ul>
        </div>
        <div className="e-hero-art">
          <Treemap />
          <div className="e-total e-leafblock">
            <p className="e-cap">{h.stage.after} · {demo.period}</p>
            <p className="e-total-figure">{formatInt(demo.total)}<small>{h.stage.unit}</small></p>
            <p className="e-total-note">{h.stage.footer}</p>
            <p className="e-total-said">{h.flow.caption}</p>
            <Link href={h.primary.href} className="e-btn">{h.primary.label}<Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
