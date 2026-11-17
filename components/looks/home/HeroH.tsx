import Link from "next/link";
import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Arrow } from "./Illustrations";
import { Sourced, Title } from "./parts";

const h = copy.hero;

/** Each subsidiary's block is sized by the square root of its emissions, so the areas compare. */
const top = Math.max(...demo.subsidiaries.map((s) => s.value));
const side = (value: number) => `${Math.round(Math.sqrt(value / top) * 100)}%`;

/**
 * Hero: the pitch and the primary call to action on the left; on the right the six subsidiaries
 * gathered into one total, with the line that says what the total is the sum of.
 * The five-verb flow runs along the foot.
 */
export function HeroH() {
  return (
    <section className="h-hero" aria-labelledby="h-hero-baslik">
      <div className="h-wrap h-hero-grid">
        <div className="h-hero-text">
          <p className="h-eyebrow">{h.eyebrow}</p>
          <Title as="h1" id="h-hero-baslik" className="h-h1" text={h.title} at={3} accent={2} />
          <p className="h-lead">{h.lead}</p>
          <Link href={h.primary.href} className="h-btn">{h.primary.label}<Arrow /></Link>
          <p className="h-hero-lead2">{h.lead2}</p>
        </div>
        <div className="h-sum">
          <p className="h-cap">{h.stage.before} · {h.stage.unit}</p>
          <ul className="h-sum-parts">
            {demo.subsidiaries.map((s, i) => (
              <li key={s.name}>
                <span className="h-sum-box" aria-hidden="true"><i className={`h-b h-b-${i % 2 ? 3 : 1}`} style={{ width: side(s.value) }} /></span>
                <span className="h-sum-name">{s.sector}</span>
                <span>{formatInt(s.value)}</span>
              </li>
            ))}
          </ul>
          <div className="h-sum-join" aria-hidden="true" />
          <div className="h-sum-total">
            <p className="h-cap">{h.stage.after} · {demo.period}</p>
            <p><Sourced className="h-sum-figure" value={<>{formatInt(demo.total)}<small>{h.stage.unit}</small></>} source={h.stage.source} /></p>
            <p className="h-sum-note">{h.stage.footer} · {h.stage.approved}</p>
          </div>
        </div>
      </div>
      <div className="h-wrap h-flow">
        <div className="h-flow-head">
          <p className="h-cap">{h.flow.label}</p>
          <p>{h.flow.caption}</p>
        </div>
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
