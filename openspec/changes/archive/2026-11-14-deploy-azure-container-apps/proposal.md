# Proposal

## Why

The marketing site builds to a static export but is not hosted anywhere: `tonyai.io` and `www.tonyai.io` have no DNS records, and the previous hosting attempts were reverted (`00552c3`) so deployment could be planned again. The site has to run in Azure Sweden Central next to the other TonyAI resources, and Static Web Apps is not offered in that region, so it will be served from Azure Container Apps.

## What Changes

- Package the static export as a container image: a multi-stage `Dockerfile` (Node build, unprivileged nginx runtime on port 8080) and an `nginx.conf` that serves trailing-slash URLs, the custom 404 page, cache headers and security headers, redirects `www.tonyai.io` to `tonyai.io`, and marks the default Azure hostname as not indexable.
- Add Terraform in `infra/` for a new resource group `tonyai-landing` in `swedencentral`: a dedicated Container Apps environment, the `tonyai-landing` Container App (one warm replica), a Log Analytics workspace, a pull identity (AcrPull on the existing `tonyaiacr`), a GitHub OIDC deploy identity, and the custom domains with managed certificates. State is stored remotely in the existing `tonyaiqtqabe` storage account.
- Add a GitHub Actions workflow that checks pull requests (lint and build) and, on every push to `main`, builds the image, pushes it to `tonyaiacr` and rolls the Container App, signing in with OIDC and no stored secret.
- Bind `tonyai.io` and `www.tonyai.io` to the app with free managed certificates once the Namecheap records exist.
- Document setup, DNS records, deploy and rollback in `README.md`, replacing the generic "Deploying next to the app" section.

Out of scope: the production launch decisions (the application domain, the form endpoints, rolling the Atmosfer design out to `/`, the legal page drafts), a CDN or Front Door, and redirects from the other TonyAI domains. The "Giriş yap" links already point to `https://qa.tonyai.io`; that edit to `content/copy.ts` was made separately and ships with the first deploy.

## Capabilities

### New Capabilities

- `site-hosting`: how the public site is served — region, hostnames and HTTPS, URL and error behavior, caching and security headers, availability.
- `site-deployment`: how a change on `main` reaches the live site — checks, image publishing, rollout, credentials and rollback.

### Modified Capabilities

None.

## Impact

- New files: `Dockerfile`, `nginx.conf`, `.dockerignore`, `infra/*.tf`, `.github/workflows/deploy.yml`. Changed: `README.md`, `.gitignore` (Terraform working files).
- No change to the application code or to `next.config.ts`; the site stays a static export.
- Azure (subscription `cb7efc2f-37a7-4672-b62c-93c207bcd33d`): a new resource group with five resources in `swedencentral`, two role assignments on the existing `tonyaiacr` registry (AcrPull, AcrPush), a new `tonyai/landing` repository in that registry, and a new `landing` state container in `tonyaiqtqabe`. Expected running cost is a few dollars per month.
- GitHub (`tonyaiukco/tonyai-landing-page`, public): three repository variables (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) and the workflow's `id-token: write` permission.
- DNS (Namecheap): four new records for `tonyai.io`; the existing MX and TXT records are untouched.
