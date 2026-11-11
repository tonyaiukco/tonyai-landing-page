"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/format";

/** Lenis smooths wheel scrolling and feeds ScrollTrigger. Loaded after hydration; off under reduced motion. Never blocks or snaps. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
      const update = () => ScrollTrigger.update();
      lenis.on("scroll", update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { lenis.off("scroll", update); gsap.ticker.remove(tick); lenis.destroy(); };
    })();
    return () => { cancelled = true; cleanup?.(); };
  }, []);
  return <>{children}</>;
}
