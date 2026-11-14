import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow, HeroDrawing, Play } from "./Illustrations";
import { Title, here } from "./parts";

const h = copy.hero;

/**
 * Hero: six facilities in three overlapping groups, the shared middle is the consolidated total.
 * The mint card states that total; its teal base holds the page's primary call to action. No pin.
 */
export function HeroD() {
  return (
    <section className="d-hero" aria-labelledby="d-hero-baslik">
      <div className="d-wrap d-hero-grid">
        <div className="d-hero-text">
          <p className="d-eyebrow">{h.eyebrow}</p>
          <Title as="h1" id="d-hero-baslik" className="d-h1" text={h.title} at={3} accent={2} />
          <p className="d-lead">{h.lead}</p>
          <p className="d-hero-lead2">{h.lead2}</p>
          <Link href={here(h.secondary.href)} className="d-link"><span className="d-link-play"><Play size={11} /></span>{h.secondary.label}</Link>
          <ul className="d-hero-trust" aria-label="Dayanılan standartlar">
            {h.trust.map((t) => (<li key={t}>{t}</li>))}
          </ul>
        </div>
        <div className="d-hero-art">
          <HeroDrawing labels={demo.subsidiaries.map((s) => s.sector)} />
          <div className="d-cert">
            <div className="d-cert-top">
              <p className="d-cert-label">{h.stage.after} · {demo.period}</p>
              <p className="d-cert-figure">{formatInt(demo.total)}<small>{h.stage.unit}</small></p>
              <p className="d-cert-note">{h.stage.footer}</p>
            </div>
            <div className="d-cert-base">
              <p>{h.flow.caption}</p>
              <Link href={h.primary.href} className="d-btn">{h.primary.label}<Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
