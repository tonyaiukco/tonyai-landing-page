"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "@/components/Logo";
import { Arrow } from "./Illustrations";
import { here } from "./parts";

/** Flat white bar: uppercase links, square mint button. Mobile menu is a full-width sheet below the bar. */
export function NavD() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="d-nav">
      <div className="d-wrap d-nav-bar">
        <Link href="/tasarim/d/" aria-label="TonyAI ana sayfa" className="d-nav-logo"><Logo /></Link>
        <nav aria-label="Ana menü" className="d-nav-links">
          {copy.nav.items.map((item) => (<Link key={item.href} href={here(item.href)}>{item.label}</Link>))}
        </nav>
        <div className="d-nav-right">
          <a href={copy.nav.login.href}>{copy.nav.login.label}</a>
          <a href={copy.nav.register.href}>{copy.nav.register.label}</a>
          <Link href={copy.nav.cta.href} className="d-btn d-btn-sm">{copy.nav.cta.label}<Arrow /></Link>
        </div>
        <button type="button" className="d-nav-burger" aria-expanded={open} aria-controls="d-mobil-menu" aria-label={open ? copy.nav.menuClose : copy.nav.menuOpen} onClick={() => setOpen((v) => !v)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? (<><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>) : (<><path d="M3 8h18" /><path d="M3 16h18" /></>)}
          </svg>
        </button>
      </div>
      <div id="d-mobil-menu" hidden={!open} className="d-nav-mobile">
        <nav aria-label="Mobil menü">
          {copy.nav.items.map((item) => (<Link key={item.href} href={here(item.href)} onClick={() => setOpen(false)}>{item.label}</Link>))}
          <a href={copy.nav.login.href}>{copy.nav.login.label}</a>
          <a href={copy.nav.register.href}>{copy.nav.register.label}</a>
          <Link href={copy.nav.cta.href} onClick={() => setOpen(false)} className="d-btn">{copy.nav.cta.label}<Arrow /></Link>
        </nav>
      </div>
    </header>
  );
}
