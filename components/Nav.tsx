"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lang = (
    <span className="figure flex min-h-11 items-center text-[0.8rem] text-ink-3" title={copy.nav.langSwitch.soon}>
      <span className="text-ink">{copy.nav.langSwitch.current}</span>
      <span className="mx-1.5 text-line-2">/</span>
      <span aria-label={copy.nav.langSwitch.soon}>{copy.nav.langSwitch.other}</span>
    </span>
  );

  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${scrolled ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_var(--line)]" : "bg-transparent"}`}>
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="TonyAI ana sayfa" className="flex min-h-11 items-center"><Logo /></Link>
        <nav aria-label="Ana menü" className="hidden items-center gap-8 text-[0.95rem] font-[520] lg:flex">
          {copy.nav.items.map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-11 items-center text-ink transition-colors hover:text-forest">{item.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          {lang}
          <a href={copy.nav.login.href} className="flex min-h-11 items-center text-[0.95rem] font-[520] text-ink transition-colors hover:text-forest">{copy.nav.login.label}</a>
          <Link href={copy.nav.cta.href} className="btn btn-primary" data-magnetic>{copy.nav.cta.label}</Link>
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden" aria-expanded={open} aria-controls="mobil-menu" aria-label={open ? copy.nav.menuClose : copy.nav.menuOpen} onClick={() => setOpen((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>) : (<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)}
          </svg>
        </button>
      </div>
      <div id="mobil-menu" hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <nav aria-label="Mobil menü" className="container flex flex-col py-3">
          {copy.nav.items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-[1.05rem] font-[520]">{item.label}</Link>
          ))}
          <a href={copy.nav.login.href} className="flex min-h-12 items-center text-[1.05rem] font-[520]">{copy.nav.login.label}</a>
          <div className="flex items-center justify-between gap-4 py-3">
            <Link href={copy.nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary flex-1">{copy.nav.cta.label}</Link>
            {lang}
          </div>
        </nav>
      </div>
    </header>
  );
}
