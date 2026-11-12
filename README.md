# TonyAI marketing site

> **Status (10 Nov 2026):** the chosen design is **Atmosfer**, served at `/tasarim/c/` while the other routes still use the first light design. Next step is rolling Atmosfer out to every page and making it `/`. Design history, brand files and decisions: see `docs/`.

Static marketing site for tonyai.io, built with Next.js (App Router, static export), TypeScript and Tailwind. The product lives separately (for now at qa.tonyai.io, later app.tonyai.io); this site only links to it via the "Giriş yap" links in `content/copy.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the finished site to ./out
```

`out/` is plain HTML, CSS, JS and fonts. Serve it from any web server or CDN. No Node process is needed in production.

## Deploying

The site runs on Azure Static Web Apps (Free plan, resource group `tonyai-site`) and is served at `https://tonyai.io` and `https://www.tonyai.io`. Every push to `main` builds the site in GitHub Actions (`.github/workflows/deploy.yml`) and uploads `out/`; a failed build leaves the live site unchanged. Hosting rules (trailing slashes, 404 page, cache headers) live in `public/staticwebapp.config.json`.

Infrastructure is Terraform in `infra/` with local state. The state holds the deploy token and the repo is public, so `*.tfstate` and `infra/.terraform/` are git-ignored; never commit them. If the state is lost the site keeps running; bring the resources back under Terraform with `terraform import`.

### First-time setup

DNS is at Namecheap (Domain List → tonyai.io → Advanced DNS). Leave the existing MX, SPF and verification TXT records alone.

```bash
az login
terraform -chdir=infra init
terraform -chdir=infra apply -target=azurerm_static_web_app.site   # 1. create the Static Web App
terraform -chdir=infra output default_host_name                    # e.g. xxxx.azurestaticapps.net
```

2. At Namecheap add `CNAME  www  →  <default_host_name>`.

```bash
terraform -chdir=infra apply                                       # 3. add both custom domains
terraform -chdir=infra output -raw apex_validation_token
```

4. At Namecheap add `TXT  @  →  <apex_validation_token>` and `ALIAS  @  →  <default_host_name>`.
5. Wait until both domains show `Ready` (certificates are issued automatically; minutes to a few hours). If the apply timed out while waiting, run `terraform -chdir=infra apply` again once the records resolve.

```bash
az staticwebapp hostname list -n tonyai-site -g tonyai-site -o table
```

6. Hand the deploy token to GitHub and run the first deployment:

```bash
terraform -chdir=infra output -raw api_key | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN
gh workflow run deploy.yml
```

### Day to day and rollback

- Content: push to `main`. To roll back, revert the commit and push.
- Deploy token leaked: `az staticwebapp secrets reset-api-key -n tonyai-site -g tonyai-site`, then repeat the `gh secret set` line above.
- Remove the site: delete the three Namecheap records, then `terraform -chdir=infra destroy`.
- Other domains (`tonyai.com`, `tonyai.com.tr`, `tonyai.co.uk`) should 301 to `https://tonyai.io` at the registrar.

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
