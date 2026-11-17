import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow, HeroDrawing, Play } from "./Illustrations";
import { Sourced, Title, here } from "./parts";

const h = copy.hero;

/**
 * Hero: six sector blocks wired to one total. The bright green card states that total with its source;
 * its green base holds the page's primary call to action. The five-verb flow runs along the foot.
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
          <HeroDrawing items={demo.subsidiaries} label={h.drawingLabel} />
          <div className="h-cert">
            <div className="h-cert-top">
              <p className="h-cert-label">{h.stage.after} · {demo.period}</p>
              <p><Sourced className="h-cert-figure" value={<>{formatInt(demo.total)}<small>{h.stage.unit}</small></>} source={`${h.stage.footer} · ${h.stage.approved}`} /></p>
            </div>
            <div className="h-cert-base">
              <p>{h.flow.caption}</p>
              <Link href={h.primary.href} className="h-btn">{h.primary.label}<Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-wrap h-flow">
        <p className="h-cap">{h.flow.label}</p>
        <ol>
          {h.flow.steps.map((s) => (
            <li key={s.verb}>
              <span className="h-flow-verb">{s.verb}</span>
              <ul>{s.keywords.map((k) => (<li key={k}>{k}</li>))}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
