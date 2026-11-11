"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/format";

/** Adds .is-in to [data-reveal] elements inside .look-c as they enter. Reduced motion: CSS shows everything at rest. */
export function RevealC() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".look-c [data-reveal]"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
