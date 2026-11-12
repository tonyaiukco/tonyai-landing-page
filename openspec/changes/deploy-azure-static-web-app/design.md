# Design

## Context

- Site Next.js static export: `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized`. `npm run build` 135 dosyalık, 3.6 MB'lık bir `out/` üretir; `out/404.html`, `robots.txt` ve `sitemap.xml` dahil. Sunucu tarafı kod, API route'u veya middleware yok.
- Kanonik adres zaten `https://tonyai.io` (`content/copy.ts` → `meta.url`; `app/layout.tsx` bunu `metadataBase` ve `alternates.canonical` için kullanır).
- **Bölge şartı:** bütün kaynaklar `swedencentral`'da.
  - Azure Static Web Apps yalnızca Central US, East US 2, West US 2, West Europe ve East Asia'da sunuluyor (`az provider show -n Microsoft.Web`, 2026-11-13) ve içeriği her durumda global edge'e dağıtıyor.
  - Container Apps `swedencentral`'da var ama abonelik bölge başına en fazla 1 ortama izin veriyor (`ManagedEnvironmentCount 1/1`) ve o ortam QA'nın (`tonyaiqt-staging-env`, `tonyai-qatmp-apps`). İlk apply `MaxNumberOfRegionalEnvironmentsInSubExceeded` ile durdu.
  - App Service planı ilk denemede `tonyai-site` kaynak grubunda `No available instances` (409, kapasite) hatası aldı. Microsoft'un önerdiği çözümle kaynaklar yeni bir kaynak grubuna (`tonyai-landing`) taşındı; yeni grup App Service'e farklı bir kapasite birimine yerleşme şansı verir.
- DNS Namecheap BasicDNS'te. Apex ve `www` için kayıt yok. Apex'te korunması gereken kayıtlar: Google MX, SPF, ACS'in `ms-domain-verification` ve `google-site-verification` TXT.
- Azure: `Azure subscription 1` (`cb7efc2f-…`), `deniz@tonyai.io` abonelikte Owner.
- Repo `tonyaiukco/tonyai-landing-page` public; ilk push'tan sonra GHCR paketi anonim olarak çekilebiliyor (public).
- "Giriş yap" bağlantıları tek kaynaktan gelir: `copy.nav.login.href` (`components/Nav.tsx` masaüstü ve mobil) ve footer "Şirket" sütunu (`components/Footer.tsx`).

## Goals / Non-Goals

**Goals:**
- Altyapının tamamı bu repodaki Terraform'dan, tamamen `swedencentral`'da ve QA'dan bağımsız kurulsun.
- Kurulumdan sonra tek iş akışı: `main`'e push → birkaç dakika içinde canlı.
- Uzun ömürlü sır yok: GitHub Actions Azure'a OIDC ile girer.
- En az parça: remote backend, test, politika script'i, ortam ayrımı yok.

**Non-Goals:**
- Namecheap kayıtlarını Terraform ile yönetmek (4 kayıt elle girilir).
- `www` → apex 301 yönlendirmesi (iki domain de aynı içeriği sunar; kanonik etiketler apex'i gösteriyor).
- İzleme, staging slot'ları, form backend'i, staging/production ayrımı.
- `docs/kayit-ve-davet-akisi.md` içindeki kalıcı ürün adresleri.

## Decisions

### 1. Terraform: `azurerm` provider, `infra/` klasörü, yerel state
`infra/` altında tek root: `versions.tf` (Terraform `>= 1.9`, `azurerm ~> 5.0`), `variables.tf`, `main.tf`, `outputs.tf`. State `infra/terraform.tfstate` olarak yerelde kalır ve git-ignore edilir.
- *Neden:* Kullanıcı kararı — tek bir statik site için remote backend ve kural katmanı gereksiz yük.

### 2. Barındırma: Azure App Service (Linux, B1) + container
| Kaynak | Ad | Not |
|---|---|---|
| Resource group | `tonyai-landing` | `swedencentral` |
| App Service plan | `tonyai-site-plan` | Linux, `B1` |
| Linux web app | `tonyai-site` | GHCR imajı, `WEBSITES_PORT=8080`, `always_on`, `https_only`, FTP/WebDeploy basic auth kapalı |
| User-assigned identity | `tonyai-site-deploy` | GitHub OIDC için |

- *Neden App Service:* `swedencentral`'da, Container Apps ortam kotasına takılmıyor, QA ortamından bağımsız; B1 custom domain, ücretsiz managed sertifika ve `always_on` veriyor. Aynı Docker imajını çalıştırdığı için imaj ve nginx yapılandırması değişmiyor.
- *Alternatifler:* Container Apps kota artışı (onay süresi belirsiz); QA'nın Container Apps ortamını paylaşmak (site geçici QA ortamının yaşam döngüsüne bağlanır, deploy identity'ye QA kaynak grubunda yetki gerekir); Storage static website (custom domain'de HTTPS için global Front Door gerekir); Static Web Apps (bölge şartını ihlal eder). Kullanıcı App Service'i seçti.
- *Maliyet:* B1 Linux Sweden Central'da $0.018/saat, ayda ~13 $ (Azure Retail Prices API, 2026-11-13). Free (F1) plan custom domain desteklemiyor.
- `https_only = true`: HTTP istekleri HTTPS'e yönlendirilir (spec: HTTP → HTTPS).
- Web uygulamasının imajı GitHub Actions tarafından değiştirilir; Terraform `site_config[0].application_stack[0].docker_image_name` için `ignore_changes` kullanır, ilk değer `:latest` etiketidir.

### 3. İmaj: `Dockerfile` + `nginx.conf`, GHCR'de public paket
Çok aşamalı `Dockerfile`: `node:22-alpine` içinde `npm ci && npm run build`, ardından `nginxinc/nginx-unprivileged:alpine` (root olmayan, `8080`'i dinler) içine `out/` ve `nginx.conf`. `.dockerignore` `node_modules`, `.next`, `out`, `.git`, `infra` ve `openspec`'i dışarıda bırakır.

`nginx.conf`:
- `try_files $uri $uri/ =404;` + `index index.html;` — `/sirket/` → `/sirket/index.html`; `/sirket` → 301 `/sirket/`.
- `absolute_redirect off;` — yönlendirmeler göreli kalır; container içindeki `8080` portu ya da HTTP şeması sızmaz.
- `error_page 404 /404.html;` — Next'in tasarımlı 404 sayfası, 404 durum koduyla.
- `/_next/static/` için `Cache-Control: public, max-age=31536000, immutable`; `gzip` açık.

İmaj `ghcr.io/tonyaiukco/tonyai-landing-page`'e `:<commit sha>` ve `:latest` etiketleriyle gider.
- *Neden GHCR + public paket:* Ücretsiz, `GITHUB_TOKEN` ile push edilir, web uygulamasının çekmesi için kayıt kimlik bilgisi gerekmez (site içeriği zaten public).
- *Alternatif:* Azure Container Registry — ek kaynak, ek maliyet ve rol ataması; reddedildi.

### 4. Dağıtım: GitHub Actions + OIDC
`.github/workflows/deploy.yml`: `push: main` (+ `workflow_dispatch`), `permissions: contents: read, packages: write, id-token: write`, `concurrency` grubu.
1. `docker/login-action` (GHCR, `GITHUB_TOKEN`) → `docker/build-push-action` (`:sha`, `:latest`).
2. `azure/login` — OIDC; `client-id`, `tenant-id`, `subscription-id` repo **değişkenlerinden** (`vars.AZURE_*`; sır değil).
3. `az webapp config container set --container-image-name ghcr.io/…:<sha>` — App Service yeni imajı çekip yeniden başlar.

Azure değişkenleri tanımlı değilse 2. ve 3. adımlar atlanır; böylece Terraform'dan önce yapılan push yalnızca imajı yayınlar.

Terraform tarafı: `azurerm_user_assigned_identity` + `azurerm_federated_identity_credential` (issuer `https://token.actions.githubusercontent.com`, subject `repo:tonyaiukco/tonyai-landing-page:ref:refs/heads/main`, audience `api://AzureADTokenExchange`) + `tonyai-landing` kaynak grubu kapsamında `Contributor`.
- *Alternatif:* Service principal sırrı ya da publish profile GitHub secret'ında — uzun ömürlü sır; reddedildi.
- Build başarısız olursa push ve rollout adımları çalışmaz; canlı imaj değişmez.

### 5. Custom domain'ler ve sertifikalar: iki aşama
App Service bir hostname'i ancak DNS doğrulandıktan sonra ekler (`asuid` TXT + CNAME/A). Managed sertifika eklenmiş bir hostname için çıkar ve Terraform'da ayrı bir binding kaynağıyla bağlanır.

| Aşama | Ne yapılır | Nerede |
|---|---|---|
| A | RG, plan, web app, identity, rol | `terraform apply` (`dns_ready = false`) |
| DNS | `CNAME www → <default_hostname>`, `TXT asuid.www → <verification id>`, `A @ → <web app IP>`, `TXT asuid → <verification id>` | Namecheap (kullanıcı) |
| B | `azurerm_app_service_custom_hostname_binding` ×2 → `azurerm_app_service_managed_certificate` ×2 → `azurerm_app_service_certificate_binding` ×2 (`SniEnabled`) | `terraform apply -var dns_ready=true` |

- Hostname binding'de `ssl_state` ve `thumbprint`, certificate binding kaynağı tarafından değiştirildiği için `ignore_changes`'tadır; aşama B'den sonraki plan değişiklik göstermemelidir.
- Apex CNAME alamadığı için `A` kaydı web uygulamasının gelen IP'sine gider; provider bu IP'yi dışarı vermediği için `default_hostname` üzerinde `dig` ile okunur. `asuid` değeri web uygulamasının `custom_domain_verification_id`'sidir (iki host için aynı, provider'da hassas işaretli).

### 6. Çıktılar
`default_hostname` (www CNAME hedefi, apex IP'si için `dig`), `domain_verification_id` (iki `asuid` TXT; `sensitive`), `deploy_client_id`, `tenant_id`, `subscription_id` (GitHub değişkenleri).

### 7. Bağlantı ve doküman güncellemeleri
`content/copy.ts`'teki iki `https://app.tonyai.io` → `https://qa.tonyai.io`. README'nin "Deploying" bölümü bu kurulumu anlatır; `next.config.ts` yorumu güncellenir. `.gitignore`'a `infra/.terraform/`, `*.tfstate`, `*.tfstate.*` eklenir; `infra/.terraform.lock.hcl` commit'lenir.

## Risks / Trade-offs

- [Yerel state yalnızca bir makinede] → Kaybolursa site çalışmaya devam eder; `terraform import` ile kaynaklar geri bağlanır.
- [Managed sertifika DNS yayılmadan çıkmaz; apex için A kaydının doğrudan uygulamayı göstermesi gerekir] → Aşama B, kayıtlar Namecheap'in kendi sunucularında (`dig @dns1.registrar-servers.com`) görüldükten sonra çalıştırılır. CAA eklenirse DigiCert'e izin vermeli.
- [Web uygulamasının gelen IP'si nadiren değişebilir (ör. plan farklı bir ölçek birimine taşınırsa)] → Site düşerse `dig` ile yeni IP okunup Namecheap'teki `A` kaydı güncellenir.
- [Sweden Central'da B1 kapasitesi yine yetmeyebilir] → Önce birkaç saat sonra yeniden denenir; olmazsa aynı bölgede daha yeni donanımlı bir SKU (Premium v3) değerlendirilir.
- [Sabit aylık maliyet] → B1 en küçük uygun plan; site trafiği artarsa ölçek planı değiştirilir.
- [`az webapp config container set` uygulamayı yeniden başlatır; birkaç saniyelik kesinti olabilir] → Tek örnekli küçük bir pazarlama sitesi için kabul edilir; gerekirse ileride staging slot + swap.
- [`qa.tonyai.io` şu an HTTPS'te zaman aşımına düşüyor] → Yayını engellemez; "Giriş yap" bağlantısının çalışması QA ortamına bağlı.
- [`www` ve apex aynı içeriği sunar] → Bütün sayfalar `canonical` olarak apex'i gösteriyor.

## Migration Plan

1. Repo değişiklikleri `main`'e girer; workflow imajı GHCR'ye yayınlar, Azure adımlarını atlar.
2. Aşama A (`terraform apply`; ilk Container Apps denemesinden kalan RG, identity, federated credential ve rol ataması state'te, yeniden kullanılır), GitHub değişkenleri, workflow yeniden çalıştırılır; site `tonyai-site.azurewebsites.net` adresinde kontrol edilir.
3. Namecheap kayıtları, aşama B.
4. Spec senaryoları `https://tonyai.io` ve `https://www.tonyai.io` üzerinde kontrol edilir.

**Geri alma:** İçerik için hatalı commit revert edilip push edilir (ya da `az webapp config container set` ile önceki `:<sha>` imajı). Altyapı için Namecheap'teki dört kayıt silinir; `terraform destroy -var dns_ready=true` kaynak grubunu kaldırır. Mevcut e-posta kayıtlarına ve QA ortamına hiçbir adımda dokunulmaz.
