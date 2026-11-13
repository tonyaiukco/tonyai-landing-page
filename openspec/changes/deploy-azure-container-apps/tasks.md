# Tasks

## 1. Container image

- [x] 1.1 Add `.dockerignore` (node_modules, .next, out, infra, docs, .git, openspec) and verify `docker build` sends a context of a few MB
- [x] 1.2 Add the multi-stage `Dockerfile` (node:22-alpine build with `NEXT_PUBLIC_FORM_ENDPOINT` / `NEXT_PUBLIC_REGISTER_ENDPOINT` build args, nginx-unprivileged runtime on 8080) and verify `docker build -t tonyai-landing:local .` succeeds
- [x] 1.3 Add `nginx.conf` per design decision 3 (www redirect server, default server, headers set once at `http` level, host-based `X-Robots-Tag`) and verify `nginx -t` passes inside the image
- [x] 1.4 Run the image locally and verify with `curl`: `/` 200, `/sirket/` 200, `/sirket` redirects to a relative `/sirket/`, unknown path 404 with the site's page, `/_next/static/*` immutable cache, HTML `no-cache`, three security headers on pages and assets, gzip on CSS, `Host: www.tonyai.io` gives 301 to `https://tonyai.io/...` with the query kept, `Host: tonyai.io` has no `X-Robots-Tag` and any other host has `noindex`

## 2. Terraform

- [x] 2.1 Create the `landing` state container in `tonyaiqtqabe` and grant the operator `Storage Blob Data Contributor` on it; verify `az storage container show --auth-mode login` succeeds
- [x] 2.2 Add `infra/versions.tf` (pinned azurerm 5.x, azurerm backend with Entra ID auth) and extend `.gitignore` with `.terraform/`, `*.tfstate*`, `*.tfvars`; verify `terraform init` succeeds and `git status` shows only the lock file and `.tf` files
- [x] 2.3 Add `infra/main.tf` and `infra/variables.tf`: resource group, Log Analytics workspace (30 days), environment, pull and deploy identities, federated credential for `refs/heads/main`, AcrPull / AcrPush / Contributor role assignments, Container App (0.25 vCPU, 0.5 GiB, min 1, max 2, HTTP rule 100, port 8080, registry via pull identity, image ignored after create); verify `terraform validate` passes
- [x] 2.4 Add the `dns_ready`-gated custom domains and managed certificates and `infra/outputs.tf` (app FQDN, static IP, verification ID, client / tenant / subscription IDs); verify `terraform plan` with `dns_ready=false` shows no domain or certificate resources and no errors

## 3. First deployment

- [x] 3.1 Build the bootstrap image with `az acr build -r tonyaiacr -t tonyai/landing:bootstrap .` and verify the tag appears in `az acr repository show-tags`
- [x] 3.2 Run `terraform apply` (operator confirms the plan first); if environment creation is rejected for quota, switch to the fallback in design decision 1 and re-plan; verify every resource in `tonyai-landing` reports `swedencentral`
- [x] 3.3 Verify the app's default FQDN serves the site: repeat the status and header checks from 1.4 over HTTPS, confirm `http://` redirects to `https://`, and confirm `X-Robots-Tag: noindex` is present
- [x] 3.4 Verify the role assignments match the spec: pull identity has only AcrPull on `tonyaiacr`; deploy identity has only AcrPush on `tonyaiacr` and Contributor on `tonyai-landing`
- [x] 3.5 Verify a second `terraform plan` reports no changes

## 4. Deploy workflow

- [x] 4.1 Add `.github/workflows/deploy.yml` with the `check` job (npm ci, lint, build; no `id-token`) and the `deploy` job (OIDC login, `az acr login`, Buildx build and push tagged with the SHA, `az containerapp update`, curl smoke test for `/` 200, `/sirket/` 200, unknown path 404; skipped while `vars.AZURE_CLIENT_ID` is empty); verify the file passes `actionlint` or a dry parse with `gh workflow view` after push
- [x] 4.2 Set the repository variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` from the Terraform outputs and verify `gh variable list` shows the three and `gh secret list` shows no Azure or registry secret
- [ ] 4.3 Push to `main` (operator confirms) and verify the run succeeds, the app's image tag equals the pushed commit SHA, and the live default FQDN serves that commit
- [ ] 4.4 Verify the rollback command: run `az containerapp update` with the `bootstrap` tag, confirm the previous content is served, then re-run the workflow to return to the latest commit
- [ ] 4.5 Replace the README "Deploying next to the app" section with setup, bootstrap, DNS table, deploy, rollback and the static-IP note; verify each documented command matches the one actually used in 3.x and 4.x

## 5. Custom domains

- [ ] 5.1 Hand the operator the four Namecheap records (values from the Terraform outputs) and verify with `dig` that `@` A, `asuid` TXT, `www` CNAME and `asuid.www` TXT resolve and the existing MX and SPF records are unchanged
- [ ] 5.2 Check whether the pinned azurerm provider binds managed certificates in the same apply; implement that, or fall back to unbound domains plus `az containerapp hostname bind` and document the command in the README; verify `terraform validate` passes
- [ ] 5.3 Apply with `dns_ready=true` (operator confirms the plan) and verify both hostnames show a bound managed certificate in `az containerapp hostname list`

## 6. Live verification

- [ ] 6.1 Verify `https://tonyai.io/` returns 200 with a valid certificate and no `X-Robots-Tag`, and `http://tonyai.io/sirket/` redirects to HTTPS
- [ ] 6.2 Verify `https://tonyai.io/sitemap.xml` and `/robots.txt` are served and a page under `/kaynaklar/<slug>/` returns 200
- [ ] 6.3 Verify `https://www.tonyai.io/demo/?utm_source=x` returns 301 to `https://tonyai.io/demo/?utm_source=x` with a valid certificate
- [ ] 6.4 Verify a request made in 6.1 is queryable in the Log Analytics workspace and that `qa.tonyai.io` and `api.qa.tonyai.io` still respond
- [ ] 6.5 Verify a final `terraform plan` reports no changes

## Workflow follow-up

- Archive the change once the site is verified live.
