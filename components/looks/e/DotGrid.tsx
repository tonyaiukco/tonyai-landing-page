/**
 * Ten small rounded squares in two rows of five, filled from the top left. `filled` is 0–10.
 * Decorative: the figure itself is always given as text next to it.
 */
export function DotGrid({ filled, label, sub }: { filled: number; label: string; sub?: string }) {
  return (
    <div className="e-dots">
      <span className="e-dots-grid" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (<i key={i} data-on={i < filled ? "" : undefined} style={{ "--i": i } as React.CSSProperties} />))}
      </span>
      <span className="e-dots-label">{label}</span>
      {sub && <span className="e-dots-sub">{sub}</span>}
    </div>
  );
}

/** Share of a total as 0–10 squares; anything above zero lights at least one. */
export function tenths(value: number, total: number) {
  return value <= 0 ? 0 : Math.max(1, Math.round((value / total) * 10));
}
