"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/format";

/** [data-reveal] fades in on first view (class added by JS only); [data-magnetic] buttons lean toward a fine pointer. Both off under reduced motion. */
export function Interactions() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const fine = window.matchMedia("(pointer: fine)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;
    if (!reduced && "IntersectionObserver" in window) {
      items.forEach((el) => el.classList.add("reveal"));
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("is-in"); io?.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
      items.forEach((el) => io!.observe(el));
    }
    const handlers: Array<() => void> = [];
    if (!reduced && fine) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(ev.clientX - (r.left + r.width / 2)) * 0.18}px, ${(ev.clientY - (r.top + r.height / 2)) * 0.22}px)`;
        };
        const leave = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
        handlers.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
      });
    }
    return () => { io?.disconnect(); handlers.forEach((h) => h()); };
  }, []);
  return null;
}
