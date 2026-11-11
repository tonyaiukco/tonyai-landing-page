/** Logo D "Grup": three company blocks and a leaf. Inline SVG so it inherits size and theme. */
export function Mark({ size = 28, dark = false, className = "" }: { size?: number; dark?: boolean; className?: string }) {
  const block = dark ? "#FFFFFF" : "var(--forest)";
  const leaf = dark ? "#9CC7AC" : "var(--leaf)";
  return (
    <svg width={size} height={size} viewBox="5 5 54 54" aria-hidden="true" className={className}>
      <rect x="5" y="5" width="25" height="25" rx="6" fill={block} />
      <rect x="5" y="34" width="25" height="25" rx="6" fill={block} />
      <rect x="34" y="34" width="25" height="25" rx="6" fill={block} />
      <path d="M34 30A25 25 0 0 1 59 5A25 25 0 0 1 34 30Z" fill={leaf} />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={26} dark={dark} />
      <span className="text-[1.2rem] font-[600] tracking-[-0.01em]" style={{ color: dark ? "#fff" : "var(--ink)" }}>TonyAI</span>
    </span>
  );
}
