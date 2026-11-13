# TonyAI marketing site

> **Status (10 Nov 2026):** the chosen design is **Atmosfer**, served at `/tasarim/c/` while the other routes still use the first light design. Next step is rolling Atmosfer out to every page and making it `/`. Design history, brand files and decisions: see `docs/`.

Static marketing site for tonyai.io, built with Next.js (App Router, static export), TypeScript and Tailwind. The product lives separately at app.tonyai.io; this site only links to it.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the finished site to ./out
```

`out/` is plain HTML, CSS, JS and fonts. No Node process is needed in production; nginx serves the folder (see `nginx.conf`).

## Hosting and deployment

The site runs on Azure Container Apps in Sweden Central as an nginx image that serves `out/`.

| What | Where |
| --- | --- |
| Resource group | `tonyai-landing` (environment `tonyai-landing-env`, app `tonyai-landing`, logs `tonyai-landing-logs`) |
| Image | `tonyaiacr.azurecr.io/tonyai/landing:<commit sha>` (registry shared with the QA application) |
| Infrastructure | Terraform in `infra/`; state in the `landing` container of storage account `tonyaiqtqabe` |
| Pipeline | `.github/workflows/deploy.yml` |

**Deploying.** Every push to `main` runs lint and build, pushes the image, rolls the app and smoke-tests it. Pull requests only run lint and build. The workflow signs in to Azure with GitHub OIDC (identity `tonyai-landing-deploy`, `main` branch only); there are no stored secrets, only the repository variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_SUBSCRIPTION_ID`. To set the form endpoints, add the repository variables `NEXT_PUBLIC_FORM_ENDPOINT` and `NEXT_PUBLIC_REGISTER_ENDPOINT` and re-run the workflow.

**Rolling back.** Point the app at an earlier commit's image; nothing is rebuilt:

```bash
az containerapp update --name tonyai-landing --resource-group tonyai-landing \
  --image tonyaiacr.azurecr.io/tonyai/landing:<commit sha>
```

**Checking it locally.**

```bash
docker build -t tonyai-landing:local .
docker run --rm -p 8080:8080 tonyai-landing:local   # http://localhost:8080
```

### Changing the infrastructure

You need the Azure CLI signed in (`az login`) with access to the subscription, and Terraform 1.9 or newer. The state storage account only admits listed IP addresses; if `terraform init` is refused, add your address to the firewall of `tonyaiqtqabe`.

```bash
cd infra
terraform init
terraform plan
terraform apply
```

Terraform creates the app with the image in `var.image` and ignores the image afterwards, because the workflow owns it.

### Setting up from scratch

1. Build the first image in Azure (the app cannot be created without one):

   ```bash
   az acr build --registry tonyaiacr --image tonyai/landing:bootstrap .
   ```

2. `terraform apply -var dns_ready=false` in `infra/` (the domains come in step 5).
3. Copy the three values of `terraform output github_variables` into repository variables with `gh variable set`.
4. Push to `main`; from here the workflow deploys.
5. Add the DNS records below, run `terraform apply` again without the `-var`, then bind the two certificates it issued:

   ```bash
   az containerapp hostname bind --hostname tonyai.io --certificate tonyai-landing-apex --validation-method HTTP \
     --name tonyai-landing --resource-group tonyai-landing --environment tonyai-landing-env
   az containerapp hostname bind --hostname www.tonyai.io --certificate tonyai-landing-www --validation-method CNAME \
     --name tonyai-landing --resource-group tonyai-landing --environment tonyai-landing-env
   ```

   Terraform adds the domains and certificates but cannot bind them, so this step is by hand; the certificates renew on their own afterwards.

### DNS (Namecheap)

| Host | Type | Value |
| --- | --- | --- |
| `@` | A | `terraform output -raw static_ip` |
| `asuid` | TXT | `terraform output -raw domain_verification_id` |
| `www` | CNAME | `terraform output -raw app_fqdn` |
| `asuid.www` | TXT | `terraform output -raw domain_verification_id` |

The apex uses an A record because it also carries the mail (MX, SPF) records. The IP belongs to the Container Apps environment and changes only if the environment is recreated; update the A record if that ever happens. `www.tonyai.io` answers with a 301 to `https://tonyai.io`, and the default `azurecontainerapps.io` hostname is served with `X-Robots-Tag: noindex`.

## The contact form

The site has no backend. Provide an HTTPS endpoint that accepts `POST` with a JSON body (`name, company, email, phone, topic, size, message, consent, page, lang`) and returns 2xx, then set the repository variable `NEXT_PUBLIC_FORM_ENDPOINT=https://...` and re-run the deploy workflow (locally: `.env.production` and rebuild). Without it, the form opens the visitor's mail program pre-filled to hello@tonyai.io. Drop any submission where the honeypot field `website` is filled.

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
