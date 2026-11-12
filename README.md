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

The site runs on Azure App Service (Linux, plan `B1`) in Sweden Central (resource group `tonyai-site`; every resource is in `swedencentral`) and is served at `https://tonyai.io` and `https://www.tonyai.io`. The `Dockerfile` builds the static export and serves `out/` with nginx (`nginx.conf`: trailing slashes, 404 page, cache headers) on port 8080; the web app runs that image.

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the image, pushes it to `ghcr.io/tonyaiukco/tonyai-landing-page` (`:<sha>` and `:latest`, public package), signs in to Azure with OIDC and points the web app at the new image. A failed build stops before the rollout, so the live site is untouched. No secret is stored in GitHub: the workflow uses three repository variables (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) and federated credentials on the `tonyai-site-deploy` identity.

Infrastructure is Terraform in `infra/` with local state. `*.tfstate` and `infra/.terraform/` are git-ignored; never commit them (the repo is public). If the state is lost the site keeps running; bring the resources back under Terraform with `terraform import`.

### First-time setup

1. Create the plan, the web app and the deploy identity, then hand the identity to GitHub and deploy:

```bash
az login
terraform -chdir=infra init
terraform -chdir=infra apply
gh variable set AZURE_CLIENT_ID --body "$(terraform -chdir=infra output -raw deploy_client_id)"
gh variable set AZURE_TENANT_ID --body "$(terraform -chdir=infra output -raw tenant_id)"
gh variable set AZURE_SUBSCRIPTION_ID --body "$(terraform -chdir=infra output -raw subscription_id)"
gh workflow run deploy.yml
```

2. Read the values for DNS:

```bash
terraform -chdir=infra output -raw default_hostname          # www CNAME target
dig +short "$(terraform -chdir=infra output -raw default_hostname)" | tail -1   # @ A value
terraform -chdir=infra output -raw domain_verification_id    # both asuid TXT values
```

3. At Namecheap (Domain List → tonyai.io → Advanced DNS) add these records. Leave the existing MX, SPF and verification TXT records alone. If CAA records are ever added they must allow DigiCert.

| Type | Host | Value |
|---|---|---|
| CNAME | `www` | `<default_hostname>` |
| TXT | `asuid.www` | `<domain_verification_id>` |
| A | `@` | `<IP from dig>` |
| TXT | `asuid` | `<domain_verification_id>` |

4. Once the records resolve on Namecheap's servers (`dig @dns1.registrar-servers.com www.tonyai.io CNAME`), add the custom domains, issue the free managed certificates and bind them in one apply. From now on always pass `-var dns_ready=true`; a second plan must show no changes.

```bash
terraform -chdir=infra apply -var dns_ready=true
terraform -chdir=infra plan -var dns_ready=true
```

### Day to day and rollback

- Content: push to `main`. To roll back, revert the commit and push, or point the app at an earlier image: `az webapp config container set -n tonyai-site -g tonyai-site --container-image-name ghcr.io/tonyaiukco/tonyai-landing-page:<sha>`.
- Cost: the `B1` plan is a fixed monthly price (about 13 USD in Sweden Central).
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
