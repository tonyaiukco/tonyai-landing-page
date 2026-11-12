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

The site runs on Azure Container Apps in Sweden Central (resource group `tonyai-site`; every resource is in `swedencentral`) and is served at `https://tonyai.io` and `https://www.tonyai.io`. The `Dockerfile` builds the static export and serves `out/` with nginx (`nginx.conf`: trailing slashes, 404 page, cache headers) on port 8080.

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the image, pushes it to `ghcr.io/tonyaiukco/tonyai-landing-page` (`:<sha>` and `:latest`), signs in to Azure with OIDC and rolls the Container App to the new image. A failed build stops before the rollout, so the live site is untouched. No secret is stored in GitHub: the workflow uses three repository variables (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) and federated credentials on the `tonyai-site-deploy` identity.

Infrastructure is Terraform in `infra/` with local state. `*.tfstate` and `infra/.terraform/` are git-ignored; never commit them (the repo is public). If the state is lost the site keeps running; bring the resources back under Terraform with `terraform import`.

### First-time setup

1. Push to `main` once so the image exists, then make the package public (GitHub → profile → Packages → `tonyai-landing-page` → Package settings → Change visibility → Public). Check:

```bash
gh api /users/tonyaiukco/packages/container/tonyai-landing-page --jq .visibility
```

2. Create the environment, the app and the deploy identity, then hand the identity to GitHub and deploy:

```bash
az login
terraform -chdir=infra init
terraform -chdir=infra apply
gh variable set AZURE_CLIENT_ID --body "$(terraform -chdir=infra output -raw deploy_client_id)"
gh variable set AZURE_TENANT_ID --body "$(terraform -chdir=infra output -raw tenant_id)"
gh variable set AZURE_SUBSCRIPTION_ID --body "$(terraform -chdir=infra output -raw subscription_id)"
gh workflow run deploy.yml
terraform -chdir=infra output   # app_fqdn, static_ip, domain_verification_id
```

3. At Namecheap (Domain List → tonyai.io → Advanced DNS) add these records. Leave the existing MX, SPF and verification TXT records alone. The CNAME must point straight at the app; if CAA records are ever added they must allow DigiCert.

| Type | Host | Value |
|---|---|---|
| CNAME | `www` | `<app_fqdn>` |
| TXT | `asuid.www` | `<domain_verification_id>` |
| A | `@` | `<static_ip>` |
| TXT | `asuid` | `<domain_verification_id>` |

4. Once the records resolve on Namecheap's servers (`dig @dns1.registrar-servers.com www.tonyai.io CNAME`), add the custom domains and their managed certificates, and wait until both certificates read `Succeeded`:

```bash
terraform -chdir=infra apply -var dns_ready=true
az containerapp env certificate list -g tonyai-site -n tonyai-site --managed-certificates-only -o table
```

5. Bind the certificates. From now on always pass `-var dns_ready=true` to Terraform; the plan must show no changes.

```bash
az containerapp hostname bind -g tonyai-site -n tonyai-site --hostname www.tonyai.io --certificate tonyai-site-www
az containerapp hostname bind -g tonyai-site -n tonyai-site --hostname tonyai.io --certificate tonyai-site-apex
terraform -chdir=infra plan -var dns_ready=true
```

### Day to day and rollback

- Content: push to `main`. To roll back, revert the commit and push, or point the app at an earlier image: `az containerapp update -n tonyai-site -g tonyai-site --image ghcr.io/tonyaiukco/tonyai-landing-page:<sha>`.
- Cost: one replica stays warm (`min_replicas = 1` in `infra/main.tf`). Set it to `0` to pay almost nothing at the price of a cold start for the first visitor.
- Remove the site: delete the four Namecheap records, then `terraform -chdir=infra destroy -var dns_ready=true`.
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
