"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "@/components/Logo";

/** Floating pill nav. Mobile menu is a rounded sheet below the pill. */
export function NavC() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="c-nav-wrap">
      <div className="c-nav">
        <Link href="/tasarim/c/" aria-label="TonyAI ana sayfa" className="c-nav-logo"><Logo /></Link>
        <nav aria-label="Ana menü" className="c-nav-links">
          {copy.nav.items.map((item) => (<Link key={item.href} href={item.href}>{item.label}</Link>))}
        </nav>
        <div className="c-nav-right">
          <span className="c-nav-lang" title={copy.nav.langSwitch.soon}><strong>{copy.nav.langSwitch.current}</strong><span aria-hidden="true">/</span><span aria-label={copy.nav.langSwitch.soon}>{copy.nav.langSwitch.other}</span></span>
          <a href={copy.nav.login.href} className="c-nav-login">{copy.nav.login.label}</a>
          <Link href={copy.nav.cta.href} className="c-btn c-btn-primary">{copy.nav.cta.label}</Link>
        </div>
        <button type="button" className="c-nav-burger" aria-expanded={open} aria-controls="c-mobil-menu" aria-label={open ? copy.nav.menuClose : copy.nav.menuOpen} onClick={() => setOpen((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>) : (<><path d="M4 8h16" /><path d="M4 16h16" /></>)}
          </svg>
        </button>
      </div>
      <div id="c-mobil-menu" hidden={!open} className="c-nav-mobile">
        <nav aria-label="Mobil menü">
          {copy.nav.items.map((item) => (<Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>))}
          <a href={copy.nav.login.href}>{copy.nav.login.label}</a>
          <Link href={copy.nav.cta.href} onClick={() => setOpen(false)} className="c-btn c-btn-primary">{copy.nav.cta.label}</Link>
        </nav>
      </div>
    </header>
  );
}
