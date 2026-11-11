"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { gsap as GsapType } from "gsap";
import { copy, demo } from "@/content/copy";
import { formatInt, prefersReducedMotion } from "@/lib/format";

const h = copy.hero;
const scopeColors = ["var(--forest)", "var(--leaf)", "#B9D3C2"];

/**
 * Hero: six subsidiary records consolidate into one audited group total.
 * Desktop: pinned briefly, scroll position drives the consolidation (scrubbed, never snapped).
 * Mobile: plays once on entry. Reduced motion: consolidated state at rest.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current, st = stage.current;
    if (!el || !st) return;
    let ctx: ReturnType<typeof GsapType.context> | undefined;
    let cancelled = false;

    const cards = Array.from(st.querySelectorAll<HTMLElement>("[data-card]"));
    const rows = Array.from(st.querySelectorAll<HTMLElement>("[data-row]"));
    const total = st.querySelector<HTMLElement>("[data-total]")!;
    const counter = st.querySelector<HTMLElement>("[data-counter]")!;
    const segs = Array.from(st.querySelectorAll<HTMLElement>("[data-seg]"));
    const labelBefore = st.querySelector<HTMLElement>("[data-label-before]")!;
    const labelAfter = st.querySelector<HTMLElement>("[data-label-after]")!;

    if (prefersReducedMotion()) {
      cards.forEach((c) => (c.style.visibility = "hidden"));
      total.style.visibility = "visible";
      labelBefore.style.visibility = "hidden";
      labelAfter.style.visibility = "visible";
      counter.textContent = formatInt(demo.total);
      return;
    }

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        const build = (scrub: boolean) => {
          gsap.set(total, { visibility: "visible", autoAlpha: 0, scale: 0.96 });
          gsap.set(rows, { autoAlpha: 0, y: 6 });
          gsap.set(segs, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(labelAfter, { autoAlpha: 0 });
          const targets = cards.map((card, i) => {
            const c = card.getBoundingClientRect(), r = rows[i].getBoundingClientRect();
            return { dx: r.left + r.width / 2 - (c.left + c.width / 2), dy: r.top + r.height / 2 - (c.top + c.height / 2) };
          });
          const count = { v: 0 };
          const tl = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            scrollTrigger: scrub
              ? { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true }
              : { trigger: st, start: "top 70%", once: true },
          });
          cards.forEach((card, i) => {
            tl.to(card, { x: () => targets[i].dx, y: () => targets[i].dy, scale: 0.42, autoAlpha: 0, duration: 0.9 }, i * 0.12);
            tl.to(rows[i], { autoAlpha: 1, y: 0, duration: 0.3 }, i * 0.12 + 0.55);
          });
          tl.to(labelBefore, { autoAlpha: 0, duration: 0.3 }, 0.2);
          tl.to(total, { autoAlpha: 1, scale: 1, duration: 0.8 }, 0.25);
          tl.to(labelAfter, { autoAlpha: 1, duration: 0.3 }, 0.6);
          tl.to(count, { v: demo.total, duration: 1.1, ease: "power2.out", onUpdate: () => { counter.textContent = formatInt(count.v); } }, 0.35);
          tl.to(segs, { scaleX: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.7);
          return tl;
        };
        mm.add("(min-width: 1024px)", () => { const tl = build(true); return () => tl.kill(); });
        mm.add("(max-width: 1023px)", () => { const tl = build(false); return () => tl.kill(); });
      }, el);
    })();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  const scopeTotal = demo.scopes.reduce((a, s) => a + s.value, 0);
  const chip = (s: string) => `chip ${s === "ok" ? "chip-ok" : s === "warn" ? "chip-warn" : "chip-miss"}`;

  return (
    <section ref={root} className="relative overflow-hidden" aria-labelledby="hero-baslik">
      <div className="container grid items-center gap-12 py-12 lg:min-h-[calc(100vh-4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-8">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1 id="hero-baslik" className="display">{h.title}</h1>
          <p className="lead measure text-ink-2">{h.lead}</p>
          <p className="measure text-[1.05rem] leading-relaxed text-ink-3">{h.lead2}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href={h.primary.href} className="btn btn-primary" data-magnetic>{h.primary.label}</Link>
            <Link href={h.secondary.href} className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              {h.secondary.label}
            </Link>
          </div>
          <ul className="figure mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.8rem] text-ink-2" aria-label="Dayanılan standartlar">
            {h.trust.map((t) => (<li key={t} className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest" />{t}</li>))}
          </ul>
        </div>

        <div ref={stage} role="img" aria-label={h.stage.srSummary} className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <div className="relative mb-3 h-6">
            <p data-label-before className="eyebrow absolute left-0 top-0">{h.stage.before}</p>
            <p data-label-after className="eyebrow absolute left-0 top-0" style={{ visibility: "hidden" }}>{h.stage.after}</p>
          </div>
          <div className="relative min-h-[520px] lg:min-h-[500px]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:absolute lg:inset-0 lg:my-auto lg:h-fit" aria-hidden="true">
              {demo.subsidiaries.map((s) => (
                <div key={s.name} data-card className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-line bg-surface p-4 shadow-[var(--shadow-card)] will-change-transform">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[0.95rem] font-[600] leading-tight">{s.name}</div>
                      <div className="truncate text-[0.75rem] text-ink-3">{s.sector} · {s.city}</div>
                    </div>
                    <span className={chip(s.status)}>{h.stage.status[s.status]}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="figure text-[1.35rem] leading-none">{formatInt(s.value)}</div>
                    <div className="text-[0.7rem] text-ink-3">{h.stage.unit}</div>
                  </div>
                </div>
              ))}
            </div>

            <div data-total className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-[480px] -translate-y-1/2 rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-card)]" style={{ visibility: "hidden" }} aria-hidden="true">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-[0.95rem] font-[600]">{h.stage.after}</div>
                <div className="figure text-[0.75rem] text-ink-3">{demo.period}</div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span data-counter className="figure text-[2.6rem] leading-none tracking-[-0.02em] text-ink">0</span>
                <span className="text-[0.85rem] text-ink-2">{h.stage.unit}</span>
              </div>
              <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-surface-2">
                {demo.scopes.map((s, i) => (<div key={s.label} data-seg style={{ width: `${(s.value / scopeTotal) * 100}%`, background: scopeColors[i] }} />))}
              </div>
              <div className="figure mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-ink-2">
                {demo.scopes.map((s, i) => (<span key={s.label} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{ background: scopeColors[i] }} />{s.label} {formatInt(s.value)}</span>))}
              </div>
              <ul className="mt-5 flex flex-col divide-y divide-line border-t border-line">
                {demo.subsidiaries.map((s) => (
                  <li key={s.name} data-row className="flex items-center justify-between gap-3 py-2">
                    <span className="flex min-w-0 items-center gap-2"><span className="truncate text-[0.875rem]">{s.name}</span><span className={chip(s.status)}>{h.stage.status[s.status]}</span></span>
                    <span className="figure text-[0.875rem]">{formatInt(s.value)}</span>
                  </li>
                ))}
              </ul>
              <div className="figure mt-4 flex items-center justify-between gap-3 text-[0.72rem] text-ink-3">
                <span>{h.stage.footer}</span>
                <span className="flex items-center gap-1.5 text-ok-fg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                  {h.stage.approved}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="figure pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.7rem] uppercase tracking-[0.12em] text-ink-3 lg:flex" aria-hidden="true">
        {h.stage.scrollHint}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
      </div>
    </section>
  );
}
