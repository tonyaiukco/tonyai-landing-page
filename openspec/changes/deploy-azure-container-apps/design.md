# Design

## Context

See `proposal.md` for motivation. Facts that shape the approach, observed on 14 Nov 2026:

- `next.config.ts` sets `output: "export"` and `trailingSlash: true`; `npm run build` writes plain files to `out/`. There are no API routes, server actions or middleware. The forms read `NEXT_PUBLIC_FORM_ENDPOINT` and `NEXT_PUBLIC_REGISTER_ENDPOINT` at build time and fall back to `mailto:` when unset.
- Static Web Apps is not offered in `swedencentral`. An earlier App Service B1 attempt failed twice with 409 "No available instances".
- The subscription already runs a Container Apps environment (`tonyaiqt-staging-env`, Consumption, no VNet) for QA and a Basic registry `tonyaiacr` (admin user disabled; QA apps pull with user-assigned identities). The owner confirmed the registry and its resource group are permanent.
- The quota API reports `ManagedEnvironmentCount` 1 used of 5 in `swedencentral`, although an earlier commit note said only one environment was allowed. Only creating the environment settles it.
- `tonyai.io` is on Namecheap DNS with MX and SPF records at the apex and no CAA record. `tonyai.io` and `www.tonyai.io` have no A or CNAME record yet.
- The repository is public. The operator is Owner on the subscription.
- The earlier Container Apps attempt (`ef5a302`) holds a working Dockerfile, nginx config and Terraform that this design builds on.

## Goals / Non-Goals

**Goals:**

- Serve the static export from `swedencentral` at `https://tonyai.io` as specified in `specs/site-hosting`.
- Deploy on push to `main` with no stored secret, as specified in `specs/site-deployment`.
- Keep the stack small enough for one person to operate: one Terraform root, one workflow, one image.

**Non-Goals:**

- Edge caching, a CDN, a WAF or multi-region hosting.
- Running Terraform from CI; the operator applies it locally.
- A Content-Security-Policy header (the export uses inline scripts; needs its own pass).
- Availability tests and alerts.
- Anything listed as out of scope in the proposal.

## Decisions

### 1. Container Apps with an nginx image, in a dedicated environment

A new resource group `tonyai-landing` holds a Consumption-only environment `tonyai-landing-env` and the app `tonyai-landing`. The site shares nothing with QA except the registry.

- Alternative, reuse `tonyaiqt-staging-env`: no extra environment, but ties the public site to the QA environment's lifecycle and static IP. Kept as the fallback if environment creation is rejected for quota; only the environment reference changes.
- Alternative, Storage static website plus Front Door: better edge performance, but roughly 35 USD per month and the Front Door profile is a global resource. Can be put in front of the app later.

### 2. Image: Node build stage, unprivileged nginx runtime

`node:22-alpine` runs `npm ci` and `npm run build`; `nginxinc/nginx-unprivileged:alpine` serves `out/` on 8080 as a non-root user. `NEXT_PUBLIC_FORM_ENDPOINT` and `NEXT_PUBLIC_REGISTER_ENDPOINT` are build arguments fed from GitHub repository variables; both are empty for now, which keeps the `mailto:` fallback. A `.dockerignore` keeps `node_modules`, `.next`, `out`, `infra`, `docs` and `.git` out of the build context.

### 3. nginx behavior

One config file with two server blocks:

- `server_name www.tonyai.io` returns `301 https://tonyai.io$request_uri`.
- The default server serves the files: `try_files $uri $uri/ =404`, `error_page 404 /404.html`, `absolute_redirect off` so slash redirects stay relative behind the ingress, gzip for text types (not `woff2`, which is already compressed), `immutable` caching under `/_next/static/`, `Cache-Control: no-cache` for everything else, and the three security headers with `always`.
- A `map` on `$host` sets `X-Robots-Tag: noindex` for every host except `tonyai.io`.

nginx does not inherit `add_header` into a server or location that defines its own, so all headers are set once at `http` level and `Cache-Control` is chosen by a `map` on `$uri` instead of a per-location `add_header`. The ingress terminates TLS and redirects HTTP to HTTPS (`allow_insecure_connections = false`), so nginx never handles scheme redirects. The www redirect relies on the ingress forwarding the original `Host` header, which task 1.4 confirms locally and task 6.3 confirms live.

- Alternative, redirect www in DNS (Namecheap URL redirect): no certificate for `www` over HTTPS, so `https://www.tonyai.io` would fail.

### 4. Registry and identities

Images go to `tonyaiacr.azurecr.io/tonyai/landing`, tagged with the commit SHA. Two user-assigned identities in `tonyai-landing`:

| Identity | Used by | Roles |
|---|---|---|
| `tonyai-landing-pull` | the Container App | `AcrPull` on `tonyaiacr` |
| `tonyai-landing-deploy` | GitHub Actions (federated credential, subject `repo:tonyaiukco/tonyai-landing-page:ref:refs/heads/main`) | `AcrPush` on `tonyaiacr`, `Contributor` on resource group `tonyai-landing` |

Resource-group scope for the deploy identity is needed because updating the app also requires join rights on the environment.

- Alternative, GHCR as in `ef5a302`: no Azure role assignments, but the image would live outside Azure and outside the region.
- Alternative, one identity for both: simpler, but the running site would hold push rights.

### 5. Bootstrap order

The Container App cannot be created without a pullable image, and the workflow cannot sign in before Terraform creates the deploy identity. The operator therefore builds the first image once with `az acr build` (tag `bootstrap`), which builds in Azure for `linux/amd64` regardless of the operator's machine. One `terraform apply` then creates everything. Terraform ignores later changes to the container image, because the workflow owns it from then on.

- Alternative, a public placeholder image: avoids the manual build but serves a foreign page on the live hostname and listens on a different port.

### 6. App sizing and scaling

0.25 vCPU and 0.5 GiB, `min_replicas = 1`, `max_replicas = 2`, HTTP scale rule at 100 concurrent requests, revision mode `Single`. In single-revision mode the platform keeps the old revision serving until the new one is ready, which gives the "unhealthy versions take no traffic" behavior without extra tooling.

### 7. Logs

A Log Analytics workspace `tonyai-landing-logs` with 30-day retention receives the environment's logs. The volume of a marketing site stays within the workspace's free ingestion allowance.

- Alternative, streaming only as in `ef5a302`: no cost at all, but nothing to look at after an incident.

### 8. Terraform layout and state

One root module in `infra/` (`versions.tf`, `main.tf`, `variables.tf`, `outputs.tf`), `azurerm` provider pinned to the current 5.x release (5.14 at implementation time). State lives in a new `landing` container in the existing `tonyaiqtqabe` account (resource group `tonyai-qatmp-tfstate`), the account the QA stack's state already uses, with Entra ID authentication; the operator gets `Storage Blob Data Contributor` on that container, matching the existing state containers. The older `tonyaiqastatecb7efc2f` account was the first choice but its firewall only admits a stale address, and using it would have meant changing another stack's network rules. `.terraform/`, `*.tfstate*` and `*.tfvars` are ignored; the lock file is committed. Outputs give the values the operator needs next: app FQDN, environment static IP, domain verification ID, and the client, tenant and subscription IDs for GitHub.

- Alternative, local state as in `8b52ac0`: the repository is public and the state would exist only on one laptop.

### 9. Custom domains in two stages

A boolean variable `dns_ready` (default `false`) gates the custom domains so the first apply does not depend on DNS. After the operator adds the records, a second apply with `dns_ready = true` adds `tonyai.io` (HTTP validation) and `www.tonyai.io` (CNAME validation) with managed certificates.

| Host | Type | Value |
|---|---|---|
| `@` | A | environment static IP |
| `asuid` | TXT | domain verification ID |
| `www` | CNAME | app FQDN |
| `asuid.www` | TXT | domain verification ID |

The apex uses an A record because it already carries MX and TXT records. Whether the pinned provider can bind a managed certificate in the same apply is checked during implementation (task 5.2); if it cannot, the domains are added unbound with `ignore_changes` on the binding and bound once with `az containerapp hostname bind`, as `ef5a302` did.

### 10. Workflow

One file, `.github/workflows/deploy.yml`, two jobs:

- `check` (pull requests and pushes): `npm ci`, `npm run lint`, `npm run build`. No `id-token` permission.
- `deploy` (pushes to `main` and manual runs, needs `check`): OIDC sign-in with `azure/login`, `az acr login`, Buildx build and push with the GitHub Actions cache, `az containerapp update --image ...:<sha>`, then a smoke test with `curl` against the app's default FQDN (home 200, `/sirket/` 200, unknown path 404). `concurrency` keeps deploys in order without cancelling a running one.

The `deploy` job is skipped while `vars.AZURE_CLIENT_ID` is empty, so the workflow can be merged before the infrastructure exists. Rollback is the same `az containerapp update` with an older SHA, documented in the README.

## Risks / Trade-offs

- [Environment creation is rejected for quota] → Use the fallback in decision 1: point the app at `tonyaiqt-staging-env`; no other resource changes.
- [The environment's static IP changes if the environment is ever recreated] → The apex A record must be updated; noted in the README next to the DNS table.
- [Single region, no CDN] → Acceptable for a small static site; visitors in Türkiye reach Sweden Central with low latency. Front Door can be added later without changing the app.
- [The site depends on `tonyaiacr` in a QA-named resource group] → Confirmed permanent by the owner. A running replica does not need the registry; only restarts and scale-out do.
- [Managed certificate issuance can take several minutes or fail if DNS has not propagated] → `dns_ready` keeps it a separate apply that can be re-run; records are checked with `dig` first.
- [Public repository with deploy workflow] → The federated credential accepts only `refs/heads/main`, pull requests never get `id-token`, and there is no secret to leak.
- [nginx access logs contain visitor IP addresses] → Retention is limited to 30 days; the privacy page drafts are part of the separate launch discussion.
- [Images accumulate in a Basic registry with no retention policy] → A static-site image is small; revisit with a purge task if storage approaches the included 10 GB.

## Migration Plan

Nothing is live today, so there is no cutover. Order: image files → bootstrap image → first apply → GitHub variables and workflow → DNS records → second apply with `dns_ready = true` → live verification.

Rollback of a bad release: `az containerapp update` with the previous SHA. Rollback of the whole change: remove the four DNS records, `terraform destroy`, delete the `tonyai/landing` repository from the registry and the `landing` state container.

## Open Questions

- Whether to add a Content-Security-Policy and an availability alert; both can follow after launch without changing this design.
