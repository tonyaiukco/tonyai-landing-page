/**
 * Look E line art. Every stroke is 1.5 px in currentColor, so one drawing works on forest ink and on paper.
 * Paths carry pathLength=1 so `.e-draw` can draw them on with stroke-dashoffset.
 */

const circ = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

/** 48 × 48 glyphs, each a list of path data. */
const GLYPHS = {
  // Six facilities, one per subsidiary sector
  factory: ["M4 40h40", "M8 40V25l9 5v-5l9 5v-5l8 4.4", "M34 40V10h6v30", "M13 35h4M22 35h4"],
  energy: ["M15 40h18", "M24 40V21", circ(24, 18.5, 2.5), "M24 16V4", "M26.2 19.8l10.4 6", "M21.8 19.8l-10.4 6"],
  truck: ["M3 40h42", "M5 14h23v20H5z", "M28 21h8l7 7v6H28", circ(13, 35, 3.5), circ(36, 35, 3.5)],
  warehouse: ["M4 40h40", "M7 40V19l17-10 17 10v21", "M16 40V26h16v14", "M16 30.7h16M16 35.3h16"],
  crates: ["M4 40h40", "M8 40V25h14v15", "M26 40V25h14v15", "M17 25V10h14v15", "M13 25v5h4v-5M31 25v5h4v-5M22 10v5h4v-5"],
  shop: ["M4 40h40", "M9 40V22M39 40V22", "M5 22l4-11h30l4 11z", "M5 22a4.75 4.75 0 0 0 9.5 0a4.75 4.75 0 0 0 9.5 0a4.75 4.75 0 0 0 9.5 0a4.75 4.75 0 0 0 9.5 0", "M20 40V29h8v11"],
  // "TonyAI farkı"
  import: ["M9 6h20v36H9z", "M14 14h10M14 20h10M14 26h10M14 32h6", "M44 24H33", "M37 19l-5 5 5 5"],
  group: ["M18 6h12v10H18z", "M24 16v7", "M12 30v-7h24v7", "M6 30h12v10H6z", "M30 30h12v10H30z"],
  audit: [circ(21, 21, 12), "M30 30l11 11", "M15.5 21.5l4 4 7-8"],
  layers: ["M24 7l18 9-18 9-18-9z", "M6 24l18 9 18-9", "M6 32l18 9 18-9"],
  forecast: ["M8 7v33h33", "M13 32l8-8 6 4 6-10"],
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

function Paths({ name }: { name: GlyphName }) {
  return <>{GLYPHS[name].map((d) => (<path key={d} pathLength={1} d={d} />))}</>;
}

export function Glyph({ name, size = 48, className = "" }: { name: GlyphName; size?: number; className?: string }) {
  return (
    <svg className={`e-ico ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <Paths name={name} />
      {name === "forecast" && <path className="e-nodraw" d="M33 18l8-9" strokeDasharray="2.5 3.5" />}
    </svg>
  );
}

export const Arrow = () => (
  <svg className="e-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h17" /><path d="m14 6 6 6-6 6" /></svg>
);
export const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16" /><path d="M4 12h16" /></svg>
);
export const Play = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
);

/** The logo's leaf: two quarter-circle arcs between its lower-left point (x, y) and a point `s` up and to the right. */
const leaf = (x: number, y: number, s: number) => `M${x} ${y}a${s} ${s} 0 0 1 ${s} ${-s}a${s} ${s} 0 0 1 ${-s} ${s}z`;

/** A sprout: a short stem carrying the logo's leaf, base at (x, b), scaled by s. */
const sprout = (x: number, b: number, s: number) => `M${x} ${b}v${-14 * s}${leaf(x, b - 14 * s, 15 * s)}`;

/** A block standing on the line y = b: rounded top corners (a quarter of the width, as in the logo), open at the foot. */
const block = (x: number, b: number, w: number, h: number) => {
  const r = w / 4;
  return `M${x} ${b}V${b - h + r}a${r} ${r} 0 0 1 ${r} ${-r}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}V${b}`;
};

/** "TonyAI farkı": a head office wired to three subsidiaries, with sprouts growing beside them. */
export function GroupDrawing() {
  return (
    <svg className="e-group-svg e-draw" viewBox="0 28 520 318" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path pathLength={1} d="M10 320h500" /><path pathLength={1} d="M48 334h120" /><path pathLength={1} d="M330 334h70" />
      {/* Head office */}
      <path pathLength={1} d="M218 62h84v104h-84z" /><path pathLength={1} d="M260 62V40h16v9h-16" />
      <path pathLength={1} d="M234 84h52M234 104h52M234 124h52M234 144h52" />
      {/* Bus */}
      <path pathLength={1} d="M260 166v38" /><path pathLength={1} d="M112 246v-42h296v42" /><path pathLength={1} d="M260 204v42" />
      {/* Factory, warehouse, office */}
      <path pathLength={1} d="M62 320v-50l26 15v-15l26 15v-15l22 12.7" /><path pathLength={1} d="M136 320v-74h12v74" />
      <path pathLength={1} d="M214 320v-52l46-22 46 22v52" /><path pathLength={1} d="M242 320v-32h36v32" /><path pathLength={1} d="M242 299h36M242 309h36" />
      <path pathLength={1} d="M372 320v-74h76v74" /><path pathLength={1} d="M372 264h76" />
      <path pathLength={1} d="M388 282h14v12h-14zM418 282h14v12h-14z" /><path pathLength={1} d="M402 320v-14h16v14" />
      <path pathLength={1} d={sprout(22, 320, 1.6)} /><path pathLength={1} d={sprout(472, 320, 2.1)} /><path pathLength={1} d={sprout(180, 320, 1)} />
    </svg>
  );
}

/** Final CTA: the sun coming up on the horizon between two groups of blocks, with one sprout. */
export function HorizonDrawing() {
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = (Math.PI * (200 + i * 17.5)) / 180;
    const p = (r: number) => `${(210 + Math.cos(a) * r).toFixed(1)} ${(236 + Math.sin(a) * r).toFixed(1)}`;
    return `M${p(62)}L${p(i % 2 ? 82 : 98)}`;
  });
  return (
    <svg className="e-horizon-svg e-draw" viewBox="0 96 420 164" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path pathLength={1} d="M162 236a48 48 0 0 1 96 0" />
      {rays.map((d) => (<path key={d} pathLength={1} d={d} />))}
      <path pathLength={1} d="M0 236h420" /><path pathLength={1} d="M40 250h110" /><path pathLength={1} d="M250 250h60" />
      <path pathLength={1} d={block(22, 236, 44, 96)} /><path pathLength={1} d={block(74, 236, 30, 54)} />
      <path pathLength={1} d={block(318, 236, 34, 66)} /><path pathLength={1} d={block(360, 236, 50, 122)} />
      <path pathLength={1} d={sprout(126, 236, 1.5)} />
    </svg>
  );
}

/* ---------- Skyline: rows of rounded blocks of uneven height, the logo's squares standing side by side ---------- */

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

/** Sits at the top of a forest-ink band. The band above shows through as the ground. */
export function Skyline() {
  return (
    <div className="e-sky" aria-hidden="true">
      <svg viewBox={`0 0 ${SKY_W} ${SKY_H}`} preserveAspectRatio="xMidYMax slice">
        {(["back", "mid", "front"] as const).map((layer) => (
          <g key={layer} className={`e-sky-${layer}`}>
            {/* Each block runs past the foot of the drawing, so only its top corners show. */}
            {ROWS[layer].map((b) => (<rect key={b.x} x={b.x} y={SKY_H - b.h} width={b.w} height={b.h + b.w} rx={b.w / 4} />))}
          </g>
        ))}
        <path className="e-sky-leaf" d={leaf(LEAF_ON.x, SKY_H - LEAF_ON.h - 8, LEAF_ON.w)} />
      </svg>
    </div>
  );
}
