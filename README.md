# TonyAI marketing site

> **Status (10 Nov 2026):** the chosen design is **Atmosfer**, served at `/tasarim/c/` while the other routes still use the first light design. Next step is rolling Atmosfer out to every page and making it `/`. Design history, brand files and decisions: see `docs/`.

Static marketing site for tonyai.io, built with Next.js (App Router, static export), TypeScript and Tailwind. The product lives separately at app.tonyai.io; this site only links to it.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the finished site to ./out
```

`out/` is plain HTML, CSS, JS and fonts. Serve it from any web server or CDN. No Node process is needed in production.

## Deploying next to the app

- Point `tonyai.io` and `www.tonyai.io` at the folder or bucket that holds `out/`; keep `app.tonyai.io` for the application.
- Serve with gzip or brotli, long cache headers for `/_next/static/*` (file names are content-hashed), and `index.html` for directory URLs (`/sirket/` → `/sirket/index.html`); the build uses trailing slashes.
- Redirect `tonyai.com`, `tonyai.com.tr` and `tonyai.co.uk` to `https://tonyai.io` with a 301.

```nginx
server {
  server_name tonyai.io www.tonyai.io;
  root /var/www/tonyai-site/out;
  index index.html;
  gzip on; gzip_types text/html text/css application/javascript image/svg+xml font/woff2;
  location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location / { try_files $uri $uri/ $uri/index.html =404; }
  error_page 404 /404.html;
}
```

## The contact form

The site has no backend. Provide an HTTPS endpoint that accepts `POST` with a JSON body (`name, company, email, phone, topic, size, message, consent, page, lang`) and returns 2xx, then set `NEXT_PUBLIC_FORM_ENDPOINT=https://...` in `.env.production` and rebuild. Without it, the form opens the visitor's mail program pre-filled to hello@tonyai.io. Drop any submission where the honeypot field `website` is filled.

## Editing content

- All text: `content/copy.ts` (one object per page or section; `demo` holds the illustrative figures used across the site).
- Colours, type sizes, spacing, radii, motion: `app/tokens.css`.
- Fonts: `app/fonts/`, wired in `app/layout.tsx`. Logo: `components/Logo.tsx`. Icons and `og.png`: `public/` (regenerate with `python3 docs/qa/assets.py`).
- Articles: `resourcesPage.articles` in `content/copy.ts`; each becomes `/kaynaklar/<slug>/`.
- Legal pages are drafts with a banner; replace after legal review and remove `legalPages.banner`.

## Structure

```
app/            routes, layout, tokens, sitemap, robots
components/     Nav, Hero, Sections (Strip, Difference, Platform, Demo, Roadmap, Journey, Proof, Compliance, Faq, FinalCta), AuditTrail, Footer, ContactForm, PageShell, LegalPage
content/copy.ts all copy and demo data
docs/           research.md, qa.md, QA scripts
public/         icons, og.png
```

## Motion and accessibility rules

No scroll-jacking (the hero is pinned and scrubbed; the wheel is never captured or snapped; Lenis only smooths). `prefers-reduced-motion` turns off animation, smooth scroll and reveals. Every control is at least 44 × 44 px; colours meet WCAG 2.1 AA; one `h1` per page; visible focus rings.

## QA

`docs/qa.md` records each pass. To repeat: `npm run build`, `npx serve out -l 8081`, `python3 docs/qa/fullpage.py`, and Lighthouse against `http://localhost:8081/`.
