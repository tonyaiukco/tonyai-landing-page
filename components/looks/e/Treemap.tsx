import { copy, demo } from "@/content/copy";
import { formatInt } from "@/lib/format";
import { Glyph, type GlyphName } from "./Illustrations";

/** Gap between tiles, in hundredths of the square's side. */
const GAP = 1.4;

/**
 * Six tiles in one square, each tile's area proportional to its value even with the gaps taken out.
 * The arrangement is fixed (six values do not need a general algorithm):
 *
 *   ┌────────┬───────┐
 *   │   0    │   2   │
 *   ├────────┼───┬───┤
 *   │   1    │ 3 │ 4 │
 *   │        │   ├───┤
 *   │        │   │ 5 │
 *   └────────┴───┴───┘
 *
 * `k` is the area one unit of value gets; it is found by bisection so the right-hand column closes exactly.
 */
export function layout(values: number[], gap = GAP) {
  const S = 100;
  const [a, b, c, d, e, f] = values;
  const fit = (k: number) => {
    const wL = (k * (a + b)) / (S - gap);
    const wR = S - gap - wL;
    const hC = (k * c) / wR;
    const hX = S - gap - hC;
    const wD = (k * d) / hX;
    const wE = (k * (e + f)) / (hX - gap);
    return { wL, wR, hC, hX, wD, wE, slack: wR - (wD + gap + wE) };
  };
  let lo = 0;
  let hi = (S * S) / (a + b + c + d + e + f);
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (fit(mid).slack > 0) lo = mid; else hi = mid; }
  const k = lo;
  const { wL, wR, hC, hX, wD, wE } = fit(k);
  const hA = (k * a) / wL;
  const hE = (k * e) / wE;
  const xR = wL + gap;
  const yX = hC + gap;
  const xE = xR + wD + gap;
  return [
    { x: 0, y: 0, w: wL, h: hA },
    { x: 0, y: hA + gap, w: wL, h: S - gap - hA },
    { x: xR, y: 0, w: wR, h: hC },
    { x: xR, y: yX, w: wD, h: hX },
    { x: xE, y: yX, w: wE, h: hE },
    { x: xE, y: yX + hE + gap, w: wE, h: hX - gap - hE },
  ];
}

const glyphs: Array<GlyphName | null> = ["factory", "energy", "truck", "warehouse", null, null];
const pct = (n: number) => `${n.toFixed(3)}%`;

/**
 * Hero: the six subsidiaries as tiles sized by their emissions. On load they close up into one square.
 * Decorative for assistive technology; the sentence after it gives the same six figures and the total.
 */
export function Treemap() {
  const subs = demo.subsidiaries;
  const stage = copy.hero.stage;
  const tiles = layout(subs.map((s) => s.value));
  return (
    <>
      <div className="e-map" aria-hidden="true">
        {subs.map((s, i) => {
          const t = tiles[i];
          const style = {
            left: pct(t.x), top: pct(t.y), width: pct(t.w), height: pct(t.h),
            // Start offset: away from the centre of the square, further for tiles further out.
            "--dx": ((t.x + t.w / 2 - 50) * 0.3).toFixed(2), "--dy": ((t.y + t.h / 2 - 50) * 0.3).toFixed(2), "--i": i,
          } as React.CSSProperties;
          const glyph = glyphs[i];
          return (
            <div key={s.name} className="e-tile" data-tone={i} style={style}>
              <span className="e-tile-name">{s.sector}</span>
              {glyph && <Glyph name={glyph} size={36} />}
              <span className="e-tile-val">{formatInt(s.value)}</span>
            </div>
          );
        })}
      </div>
      <p className="e-sr">
        {subs.map((s) => `${s.sector} ${formatInt(s.value)}`).join(", ")}; {stage.after}: {formatInt(demo.total)} {stage.unit}.
      </p>
    </>
  );
}
