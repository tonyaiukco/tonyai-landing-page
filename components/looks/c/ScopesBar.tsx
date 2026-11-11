import { demo } from "@/content/copy";
import { formatInt } from "@/lib/format";

/** Scopes 1/2/3 as a stacked, rounded bar with a legend. Segments carry data-seg so GSAP can grow them. */
export function ScopesBar({ animated = true }: { animated?: boolean }) {
  const total = demo.scopes.reduce((a, s) => a + s.value, 0);
  return (
    <div className="c-scopes">
      <div className="c-scopes-bar" aria-hidden="true">
        {demo.scopes.map((s) => (<span key={s.label} {...(animated ? { "data-seg": "" } : {})} style={{ width: `${(s.value / total) * 100}%` }} />))}
      </div>
      <ul className="c-scopes-legend">
        {demo.scopes.map((s) => (<li key={s.label}><i aria-hidden="true" />{s.label} <b>{formatInt(s.value)}</b></li>))}
      </ul>
    </div>
  );
}
