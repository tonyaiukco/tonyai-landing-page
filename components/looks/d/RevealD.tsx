"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/format";

/**
 * Adds .is-in to [data-reveal] elements inside .look-d as they enter: blocks fade up, line drawings draw on,
 * meters fill in sequence. The hidden states live behind a scripting + motion media query in look.css,
 * so without JS or under reduced motion everything is already at rest.
 */
export function RevealD() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".look-d [data-reveal]"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
