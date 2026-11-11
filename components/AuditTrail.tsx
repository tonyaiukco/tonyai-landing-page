"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/format";

/** One record moves Taslak → İncelemede → Onaylandı as the section passes; its sources appear line by line. Scrubbed, no pin. */
const stages = ["Taslak", "İncelemede", "Onaylandı"];
const trail = [
  { k: "Kayıt", v: "Elektrik · Ç1 2026 · Üretim A.Ş." },
  { k: "Giren", v: "Veri sorumlusu · 14 Nis 2026 10:42" },
  { k: "Kaynak belge", v: "Fatura 2026-03-ELK-0417.pdf" },
  { k: "Emisyon faktörü", v: "0,442 tCO₂e/MWh · Türkiye şebeke, 2024" },
  { k: "İnceleyen", v: "Grup sürdürülebilirlik · 16 Nis 2026" },
  { k: "Sonuç", v: "19,89 tCO₂e · Kapsam 2" },
];

export function AuditTrail() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-stage]"));
    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;
    if (prefersReducedMotion()) {
      pills.forEach((p) => p.setAttribute("data-on", "true")); lines.forEach((l) => (l.style.opacity = "1")); bar.style.transform = "scaleX(1)"; return;
    }
    let cancelled = false; let cleanup: (() => void) | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.set(lines, { opacity: 0, y: 6 });
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.5,
            onUpdate: (self) => {
              const reached = Math.floor(self.progress * 3 + 0.35);
              pills.forEach((p, i) => (i < reached ? p.setAttribute("data-on", "true") : p.removeAttribute("data-on")));
            },
          },
          defaults: { ease: "none" },
        });
        tl.to(bar, { scaleX: 1, duration: 1 }, 0);
        lines.forEach((l, i) => tl.to(l, { opacity: 1, y: 0, duration: 0.12 }, 0.08 + i * 0.14));
      }, el);
      cleanup = () => ctx.revert();
    })();
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div ref={root} className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8" aria-label="Bir kaydın denetim izi: taslak, inceleme, onay ve kaynakları">
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-[0.95rem] font-[600]">Denetim izi</div>
        <div className="figure text-[0.75rem] text-ink-3">Örnek kayıt · 6 alan</div>
      </div>
      <div className="relative mt-5">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" aria-hidden="true" />
        <div data-bar className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-forest" aria-hidden="true" />
        <ol className="relative grid grid-cols-3 gap-2">
          {stages.map((s) => (
            <li key={s} className="flex justify-center">
              <span data-stage className="chip border border-line bg-surface text-ink-2 transition-colors data-[on=true]:border-forest data-[on=true]:bg-forest data-[on=true]:text-on-forest">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <dl className="mt-6 flex flex-col divide-y divide-line border-t border-line">
        {trail.map((t) => (
          <div key={t.k} data-line className="ledger-row py-2.5 text-[0.875rem]"><dt className="text-ink-3">{t.k}</dt><dd className="figure text-right">{t.v}</dd></div>
        ))}
      </dl>
    </div>
  );
}
