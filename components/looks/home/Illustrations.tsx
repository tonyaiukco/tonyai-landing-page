import type { CSSProperties } from "react";

/**
 * The homepage's drawings. Glyphs are 1.5 px line icons in currentColor, with pathLength=1 so they draw on as their block is revealed.
 * Everything else is built from the logo's two shapes, the rounded block and the leaf, as flat fills (`.h-blk-1/2/3`).
 */

const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

/** 48 × 48 glyphs, each a list of path data. */
const GLYPHS = {
  // Platform modules
  calc: ["M12 6h24v36H12z", "M17 11h14v8H17z", "M18 26h2M23 26h2M28 26h2M18 31h2M23 31h2M28 31h2M18 36h2M23 36h7"],
  merge: ["M6 10h10l9 14", "M6 38h10l9-14", "M6 24h35", "M35 18l6 6-6 6"],
  shield: ["M24 5l15 5v12c0 9-6 15.5-15 21-9-5.5-15-12-15-21V10z", "M17 24l5 5 9-10"],
  report: ["M11 5h17l9 9v29H11z", "M28 5v9h9", "M18 36v-6M24 36V23M30 36v-9"],
  spark: ["M22 6l3.4 10.6L36 20l-10.6 3.4L22 34l-3.4-10.6L8 20l10.6-3.4z", "M37 30l1.6 4.4L43 36l-4.4 1.6L37 42l-1.6-4.4L31 36l4.4-1.6z"],
  target: [circ(21, 27, 15), circ(21, 27, 8), "M21 27L41 7", "M33 7h8v8"],
  // Small UI marks
  check: ["M10 25l9 9 19-21"],
  cross: ["M12 12l24 24M36 12L12 36"],
} satisfies Record<string, string[]>;

export type GlyphName = keyof typeof GLYPHS;

export function Glyph({ name, size = 48, className = "" }: { name: GlyphName; size?: number; className?: string }) {
  return (
    <svg className={`h-ico ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {GLYPHS[name].map((d) => (<path key={d} pathLength={1} d={d} />))}
    </svg>
  );
}

export const Arrow = () => (
  <svg className="h-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h17" /><path d="m14 6 6 6-6 6" /></svg>
);
export const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16" /><path d="M4 12h16" /></svg>
);
export const Play = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
);

/* ---------- Block drawings ---------- */

type Tone = 1 | 2 | 3;

/** The logo's block: corner radius 24% of the shorter side unless `r` is given. */
function Block({ x, y, w, h = w, r, tone }: { x: number; y: number; w: number; h?: number; r?: number; tone: Tone }) {
  return <rect className={`h-blk-${tone}`} x={x} y={y} width={w} height={h} rx={r ?? Math.min(w, h) * 0.24} />;
}

/** Where each subsidiary's block stands: left edge, baseline and tone, in subsidiary order. */
const HERO_SPOTS: Array<[number, number, Tone]> = [[30, 150, 1], [225, 150, 3], [410, 150, 1], [120, 300, 3], [310, 300, 2], [515, 300, 1]];
const HERO_BUS = 345;
const HERO_MAX = 110;

/**
 * Hero: one block per subsidiary, its side scaled to the square root of its emissions so areas compare,
 * each wired down to a bus that drops into the total card overlapping the foot of the drawing.
 */
export function HeroDrawing({ items, label }: { items: Array<{ sector: string; value: number }>; label: string }) {
  const top = Math.max(...items.map((it) => it.value));
  const blocks = items.map((it, i) => {
    const [x, base, tone] = HERO_SPOTS[i];
    const side = Math.round(HERO_MAX * Math.sqrt(it.value / top));
    return { ...it, x, base, tone, side, cx: x + side / 2 };
  });
  const first = blocks[0];
  return (
    <svg className="h-hero-svg" viewBox="0 0 640 450" role="img" aria-label={label}>
      <path className="h-blk-line" d={`${blocks.map((b) => `M${b.cx} ${b.base + 34}V${HERO_BUS}`).join("")}M${Math.min(...blocks.map((b) => b.cx))} ${HERO_BUS}H${Math.max(...blocks.map((b) => b.cx))}M400 ${HERO_BUS}V450`} />
      {blocks.map((b) => (
        <g key={b.sector}>
          <Block x={b.x} y={b.base - b.side} w={b.side} tone={b.tone} />
          <text className="h-hero-tag" x={b.cx} y={b.base + 22} textAnchor="middle">{b.sector}</text>
        </g>
      ))}
      <path className="h-blk-2" d={leaf(first.x + first.side + 12, first.base, 58)} />
    </svg>
  );
}

const GROUP_COMPANIES = [{ x: 25, rows: 3 }, { x: 185, rows: 2 }, { x: 345, rows: 2 }];
const GROUP_FOOT = 255;

/** "TonyAI farkı": a holding block holding three company blocks, which hold fourteen location blocks. */
export function GroupDrawing({ label }: { label: string }) {
  return (
    <svg className="h-group-svg" viewBox="0 0 520 280" role="img" aria-label={label}>
      <Block x={0} y={0} w={520} h={280} r={40} tone={3} />
      {GROUP_COMPANIES.map((c) => {
        const h = c.rows * 60 + 30;
        return (
          <g key={c.x}>
            <Block x={c.x} y={GROUP_FOOT - h} w={150} h={h} r={20} tone={1} />
            {Array.from({ length: c.rows * 2 }, (_, k) => (
              <Block key={k} x={c.x + 22 + (k % 2) * 60} y={GROUP_FOOT - h + 22 + Math.floor(k / 2) * 60} w={46} tone={2} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Where the "before" windows lie: left as a share of the free width (0 to 100), top %, tilt in degrees, and the row that holds a missing cell (0 for none). */
const WINDOWS: Array<[number, number, number, number]> = [
  [0, 8, -4, 2], [23, 34, 3, 0], [12, 58, -2, 3], [45, 4, 2, 0], [55, 44, -3, 1], [76, 18, 4, 3], [85, 56, -1, 0], [100, 2, -3, 2], [95, 36, 2, 0],
];

/** "Önce": spreadsheet windows piled on one another. Decorative; the list beside it says the same in words. */
export function Windows() {
  return (
    <div className="h-wins" aria-hidden="true">
      {WINDOWS.map(([left, top, tilt, miss], i) => (
        <span key={i} className="h-win" style={{ "--x": left / 100, top: `${top}%`, "--tilt": `${tilt}deg` } as CSSProperties}>
          <span className="h-win-bar"><i /><i /><i /></span>
          <span className="h-win-grid">{miss > 0 && <i style={{ gridRow: miss + 1 }} />}</span>
        </span>
      ))}
    </div>
  );
}

/** The logo's leaf: two quarter-circle arcs between its lower-left point (x, y) and a point `s` up and to the right. */
const leaf = (x: number, y: number, s: number) => `M${x} ${y}a${s} ${s} 0 0 1 ${s} ${-s}a${s} ${s} 0 0 1 ${-s} ${s}z`;

/* ---------- Skyline: rows of rounded blocks of uneven height, the live site's skyline, in place of look D's treeline ---------- */

/** Small deterministic generator so the skyline is the same on every build. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SKY_W = 1600;
const SKY_H = 200;

function row(seed: number, wMin: number, wMax: number, hMin: number, hMax: number) {
  const rnd = seeded(seed);
  const out: Array<{ x: number; w: number; h: number }> = [];
  let x = -rnd() * wMin;
  while (x < SKY_W) {
    const w = Math.round(wMin + rnd() * (wMax - wMin));
    out.push({ x: Math.round(x), w, h: Math.round(hMin + rnd() * (hMax - hMin)) });
    x += w + 8 + rnd() * 14;
  }
  return out;
}

const ROWS = { back: row(11, 70, 130, 96, 176), mid: row(23, 56, 108, 60, 128), front: row(37, 44, 92, 24, 84) };
/** One front block carries the logo's leaf above it. */
const LEAF_ON = ROWS.front[Math.floor(ROWS.front.length * 0.62)];

/** Sits at the top of a brand green band. The band above shows through as the ground. */
export function Skyline() {
  return (
    <div className="h-sky" aria-hidden="true">
      <svg viewBox={`0 0 ${SKY_W} ${SKY_H}`} preserveAspectRatio="xMidYMax slice">
        {(["back", "mid", "front"] as const).map((layer) => (
          <g key={layer} className={`h-sky-${layer}`}>
            {/* Each block runs past the foot of the drawing, so only its top corners show. */}
            {ROWS[layer].map((b) => (<rect key={b.x} x={b.x} y={SKY_H - b.h} width={b.w} height={b.h + b.w} rx={b.w / 4} />))}
          </g>
        ))}
        <path className="h-sky-leaf" d={leaf(LEAF_ON.x, SKY_H - LEAF_ON.h - 8, LEAF_ON.w)} />
      </svg>
    </div>
  );
}
