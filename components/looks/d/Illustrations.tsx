import type { ReactNode } from "react";

/**
 * Look D line art. Every stroke is 1.5 px in currentColor, so one drawing works on teal and on white.
 * Paths carry pathLength=1 so `.d-draw` can draw them on with stroke-dashoffset.
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
    <svg className={`d-ico ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <Paths name={name} />
      {name === "forecast" && <path className="d-nodraw" d="M33 18l8-9" strokeDasharray="2.5 3.5" />}
    </svg>
  );
}

export const Arrow = () => (
  <svg className="d-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h17" /><path d="m14 6 6 6-6 6" /></svg>
);
export const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16" /><path d="M4 12h16" /></svg>
);
export const Play = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
);

/** Filled map pin with a number, for the journey route. */
export function Pin({ children }: { children: ReactNode }) {
  return (
    <span className="d-pin" aria-hidden="true">
      <svg width="44" height="54" viewBox="0 0 44 54"><path d="M22 53C22 53 3 33.5 3 21a19 19 0 0 1 38 0c0 12.5-19 32-19 32z" fill="currentColor" /></svg>
      <b>{children}</b>
    </span>
  );
}

const CLOUD = "M9 24h36a9 9 0 0 0 1.5-17.9A13 13 0 0 0 22 3.5 10.5 10.5 0 0 0 9 24z";
const BIRD = "M0 5q4.5-6 9 0q4.5-6 9 0";

function Sky({ clouds, birds }: { clouds: Array<[number, number, number]>; birds: Array<[number, number, number]> }) {
  return (
    <>
      {clouds.map(([x, y, s]) => (<path key={`c${x}`} pathLength={1} d={CLOUD} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={1.5 / s} />))}
      {birds.map(([x, y, s]) => (<path key={`b${x}`} pathLength={1} d={BIRD} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={1.5 / s} />))}
    </>
  );
}

/** Outlined conifer, base centre at (x, b), scaled by s. */
const lineTree = (x: number, b: number, s: number) =>
  `M${x} ${b}v${-9 * s}M${x - 15 * s} ${b - 9 * s}h${30 * s}l${-10 * s} ${-15 * s}h${5 * s}l${-9 * s} ${-14 * s}h${4 * s}l${-5 * s} ${-13 * s}l${-5 * s} ${13 * s}h${4 * s}l${-9 * s} ${14 * s}h${5 * s}z`;

/**
 * Hero: three dashed groups overlap; six facilities sit in them and the shared middle is the consolidated total.
 * `labels` are the six sector names, in subsidiary order.
 */
export function HeroDrawing({ labels }: { labels: string[] }) {
  const spots: Array<[GlyphName, number, number]> = [
    ["factory", 95, 200], ["energy", 196, 128], ["truck", 440, 122], ["warehouse", 548, 200], ["crates", 128, 330], ["shop", 218, 382],
  ];
  const groups = [{ cx: 220, cy: 200, rx: 200, ry: 110 }, { cx: 420, cy: 190, rx: 200, ry: 110 }, { cx: 320, cy: 320, rx: 210, ry: 115 }];
  return (
    <svg className="d-hero-svg d-draw" viewBox="0 0 640 450" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <clipPath id="d-hero-b"><ellipse {...groups[1]} /></clipPath>
        <clipPath id="d-hero-c"><ellipse {...groups[2]} /></clipPath>
      </defs>
      {groups.map((g) => (<ellipse key={g.cx} className="d-hero-zone" {...g} />))}
      <g clipPath="url(#d-hero-c)"><ellipse className="d-hero-core" {...groups[0]} clipPath="url(#d-hero-b)" /></g>
      <g className="d-hero-total">
        <path className="d-nodraw" d="M298 228v30a22 8.5 0 0 0 44 0v-30z" />
        <ellipse cx="320" cy="228" rx="22" ry="8.5" />
      </g>
      <g className="d-hero-sky"><Sky clouds={[[548, 28, 1.25], [10, 50, 0.9]]} birds={[[330, 40, 1], [356, 54, 0.75]]} /></g>
      {spots.map(([name, x, y], i) => (
        <g key={name}>
          <g transform={`translate(${x - 24} ${y - 24})`}><Paths name={name} /></g>
          <text className="d-hero-tag" x={x} y={y + 37} textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
}

/** "TonyAI farkı": a head office wired to three subsidiaries, with trees, clouds and birds. */
export function GroupDrawing() {
  return (
    <svg className="d-group-svg d-draw" viewBox="0 0 520 350" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <Sky clouds={[[392, 14, 1.5], [330, 0, 0.9]]} birds={[[40, 58, 1.1], [72, 78, 0.8], [118, 50, 0.9]]} />
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
      <path pathLength={1} d={lineTree(24, 320, 1.7)} /><path pathLength={1} d={lineTree(486, 320, 2.4)} /><path pathLength={1} d={lineTree(182, 320, 1.1)} />
    </svg>
  );
}

/** Final CTA: sun, clouds and a few trees on the horizon. */
export function HorizonDrawing() {
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = (Math.PI * (200 + i * 20)) / 180;
    const p = (r: number) => `${(160 + Math.cos(a) * r).toFixed(1)} ${(150 + Math.sin(a) * r).toFixed(1)}`;
    return `M${p(58)}L${p(i % 2 ? 78 : 92)}`;
  });
  return (
    <svg className="d-horizon-svg d-draw" viewBox="0 0 420 260" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path pathLength={1} d="M116 150a44 44 0 0 1 88 0" />
      {rays.map((d) => (<path key={d} pathLength={1} d={d} />))}
      <Sky clouds={[[238, 118, 1.9], [18, 30, 1.2]]} birds={[[300, 40, 1.2], [334, 60, 0.85]]} />
      <path pathLength={1} d="M0 236h420" /><path pathLength={1} d="M40 250h110" /><path pathLength={1} d="M250 250h60" />
      <path pathLength={1} d={lineTree(352, 236, 2.2)} /><path pathLength={1} d={lineTree(60, 236, 1.2)} /><path pathLength={1} d={lineTree(396, 236, 1.2)} />
    </svg>
  );
}

/* ---------- Treeline: layered conifer silhouettes standing in for the reference's forest photograph ---------- */

/** Small deterministic generator so the forest is the same on every build. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function conifer(x: number, base: number, h: number, w: number) {
  const tiers = 6;
  const step = (h * 0.9) / tiers;
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i < tiers; i++) {
    const y = base - h * 0.1 - step * i;
    const wi = w * (1 - (i / tiers) * 0.82);
    left.push(`L${(x - wi).toFixed(1)} ${y.toFixed(1)}L${(x - wi * 0.36).toFixed(1)} ${(y - step).toFixed(1)}`);
    right.unshift(`L${(x + wi * 0.36).toFixed(1)} ${(y - step).toFixed(1)}L${(x + wi).toFixed(1)} ${y.toFixed(1)}`);
  }
  const trunk = w * 0.07;
  return `M${(x - trunk).toFixed(1)} ${base}V${(base - h * 0.1).toFixed(1)}${left.join("")}L${x.toFixed(1)} ${(base - h).toFixed(1)}${right.join("")}L${(x + trunk).toFixed(1)} ${(base - h * 0.1).toFixed(1)}V${base}z`;
}

function forest(seed: number, count: number, hMin: number, hMax: number) {
  const rnd = seeded(seed);
  const W = 1600, H = 320;
  return Array.from({ length: count }, (_, i) => {
    const x = (i + 0.5 + (rnd() - 0.5) * 0.9) * (W / count);
    const h = hMin + rnd() * (hMax - hMin);
    return conifer(x, H, h, h * (0.2 + rnd() * 0.06));
  }).join("");
}

const TREES = { back: forest(7, 30, 150, 285), mid: forest(19, 24, 110, 220), front: forest(31, 19, 60, 150) };

/** Sits at the top of a teal band. The band above shows through as mist. */
export function Treeline() {
  return (
    <div className="d-trees" aria-hidden="true">
      <svg viewBox="0 0 1600 320" preserveAspectRatio="xMidYMax slice">
        <path className="d-trees-back" d={TREES.back} />
        <path className="d-trees-mid" d={TREES.mid} />
        <path className="d-trees-front" d={TREES.front} />
      </svg>
    </div>
  );
}
