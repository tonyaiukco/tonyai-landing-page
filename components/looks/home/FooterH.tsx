import Link from "next/link";
import { copy } from "@/content/copy";
import { Logo } from "@/components/Logo";
import { Arrow } from "./Illustrations";
import { here } from "./parts";
import "./footer.css";

export function FooterH() {
  const { columns, legal, email, tagline, copyright } = copy.footer;
  return (
    <footer id="altbilgi" className="h-footer">
      <div className="h-wrap">
        <div className="footer-main">
          <div className="footer-contact">
            <Link className="footer-wordmark" href="/" aria-label="TonyAI ana sayfa"><Logo /></Link>
            <p>{tagline}</p>
            <a className="footer-email" href={`mailto:${email}`}>{email}<Arrow /></a>
          </div>
          <div className="footer-directory">
            {columns.map(({ title, links }) => (
              <nav key={title} aria-label={title}>
                <h2>{title}</h2>
                <ul>{links.map(({ href, label }) => (
                  <li key={href}>{href.includes("#")
                    ? <a href={here(href)}>{label}</a>
                    : <Link href={here(href)}>{label}</Link>}</li>
                ))}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-colophon">
          <span>{copyright}</span>
          <ul>{legal.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
        </div>
      </div>
    </footer>
  );
}
