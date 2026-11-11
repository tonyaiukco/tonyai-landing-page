"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";
import { prefersReducedMotion } from "@/lib/format";

const f = copy.hero.flow;

/**
 * Hero stage "TonyAI ile akış": the five verbs of the headline copy as a short vertical flow,
 * each with three keywords. Rows appear one by one the first time the stage is seen;
 * all rows are visible at rest and under reduced motion.
 */
export function FlowStage() {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => f.steps.length);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setShown(0);
    const el = root.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      f.steps.forEach((_, i) => { timers.push(window.setTimeout(() => setShown(i + 1), 300 + i * 320)); });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div ref={root} className="c-flow" role="img" aria-label={copy.hero.stage.srSummary}>
      <p className="c-eyebrow c-flow-label">{f.label}</p>
      <ol className="c-flow-list">
        {f.steps.map((s, i) => (
          <li key={s.verb} className="c-flow-row" data-shown={i < shown || undefined}>
            <span className="c-flow-n" aria-hidden="true">{i + 1}</span>
            <span className="c-flow-verb">{s.verb}</span>
            <span className="c-flow-keys">
              {s.keywords.map((k) => (<span key={k} className="c-flow-key">{k}</span>))}
            </span>
          </li>
        ))}
      </ol>
      <p className="c-flow-caption">{f.caption}</p>
    </div>
  );
}
