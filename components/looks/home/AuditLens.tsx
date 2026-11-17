"use client";

import { useRef, useState } from "react";
import { copy, demo } from "@/content/copy";

const trail = demo.auditTrail;
const last = trail.length - 1;
const lens = copy.compliance.audit.lens;

/**
 * One record laid out as a chain from entry to result. The base layer shows only the two ends;
 * a round lens, dragged sideways or stepped with the arrow keys, shows what is kept in between.
 * The component only sets --t (0–1); look.css places the lens, the clip and, on narrow screens,
 * slides the strip under it. Under 900 px, without JS or under reduced motion the CSS shows the full list instead.
 */
export function AuditLens() {
  const stage = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [t, setT] = useState(0.4);
  const idx = Math.round(t * last);

  const fromPointer = (clientX: number) => {
    const box = stage.current?.getBoundingClientRect();
    const r = (handle.current?.offsetWidth ?? 0) / 2;
    if (!box || box.width <= r * 2) return;
    setT(Math.min(1, Math.max(0, (clientX - box.left - r) / (box.width - r * 2))));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const next = { ArrowRight: idx + 1, ArrowUp: idx + 1, ArrowLeft: idx - 1, ArrowDown: idx - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setT(Math.min(last, Math.max(0, next)) / last);
  };

  return (
    <div className="h-lens" style={{ "--t": t } as React.CSSProperties}>
      <div
        ref={stage}
        className="h-lens-stage"
        onPointerDown={(e) => { if (e.pointerType === "mouse" && e.button !== 0) return; dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) fromPointer(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <div className="h-lens-strip">
          <div className="h-lens-base" aria-hidden="true">
            {trail.map((row, i) => (
              <div key={row.k} className="h-lens-cell">
                <span className="h-lens-k">{row.k}</span>
                {i === 0 || i === last ? <span className="h-lens-v">{row.v}</span> : <span className="h-lens-bars"><i /><i /><i /></span>}
              </div>
            ))}
          </div>
          <dl className="h-lens-detail">
            {trail.map((row) => (
              <div key={row.k} className="h-lens-cell">
                <dt className="h-lens-k">{row.k}</dt>
                <dd className="h-lens-v">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          ref={handle}
          className="h-lens-handle"
          role="slider"
          tabIndex={0}
          aria-label={lens.label}
          aria-orientation="horizontal"
          aria-valuemin={1}
          aria-valuemax={trail.length}
          aria-valuenow={idx + 1}
          aria-valuetext={`${trail[idx].k}: ${trail[idx].v}`}
          onKeyDown={onKey}
        >
          <span className="h-lens-grip" aria-hidden="true">{lens.label}</span>
        </div>
      </div>
      <p className="h-lens-hint">{lens.hint}</p>
    </div>
  );
}
