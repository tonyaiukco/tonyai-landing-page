/**
 * A column of ten square segments filled from the bottom. `filled` is 0–10.
 * Decorative: the figure itself is always given as text next to it.
 */
export function Meter({ filled, label, sub, className = "" }: { filled: number; label: string; sub?: string; className?: string }) {
  return (
    <div className={`d-meter ${className}`}>
      <span className="d-meter-col" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (<i key={i} data-on={i >= 10 - filled ? "" : undefined} style={{ "--i": 9 - i } as React.CSSProperties} />))}
      </span>
      <span className="d-meter-label">{label}</span>
      {sub && <span className="d-meter-sub">{sub}</span>}
    </div>
  );
}

/** Share of a total as 0–10 segments; anything above zero lights at least one. */
export function segments(value: number, total: number) {
  return value <= 0 ? 0 : Math.max(1, Math.round((value / total) * 10));
}
