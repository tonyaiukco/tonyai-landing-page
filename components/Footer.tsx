import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "./Logo";

const f = copy.footer;
const link = "flex min-h-11 items-center text-[0.95rem] text-ink-2 hover:text-ink";

export function Footer() {
  return (
    <footer className="rule bg-surface-2/60">
      <div className="container flex flex-col gap-12 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[36ch] text-ink-2">{f.tagline}</p>
            <span className="figure select-all text-[0.9rem]">{f.email}</span>
            <span className="figure text-[0.8rem] text-ink-3">{f.bases}</span>
          </div>
          {f.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-1">
              <div className="mb-2 text-[0.9rem] font-[600]">{col.title}</div>
              {col.links.map((l) => l.href.startsWith("http")
                ? (<a key={l.label} href={l.href} className={link}>{l.label}</a>)
                : (<Link key={l.label} href={l.href} className={link}>{l.label}</Link>))}
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 text-[0.85rem] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span>{f.copyright}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {f.legal.map((l) => (<li key={l.label}><Link href={l.href} className="flex min-h-11 items-center hover:text-ink">{l.label}</Link></li>))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
