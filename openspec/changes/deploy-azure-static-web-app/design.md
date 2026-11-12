# Design

## Context

- Site Next.js static export: `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized`. `npm run build` 135 dosyalık, 3.6 MB'lık bir `out/` üretir; `out/404.html`, `robots.txt` ve `sitemap.xml` dahil. Sunucu tarafı kod, API route'u veya middleware yok.
- Kanonik adres zaten `https://tonyai.io` (`content/copy.ts` → `meta.url`; `app/layout.tsx` bunu `metadataBase` ve `alternates.canonical` için kullanır).
- **Bölge geçmişi:** Önce bütün kaynakların `swedencentral`'da olması istendi.
  - Static Web Apps yalnızca Central US, East US 2, West US 2, West Europe ve East Asia'da sunuluyor (`az provider show -n Microsoft.Web`, 2026-11-13).
  - Container Apps: abonelik bölge başına 1 ortama izin veriyor (`ManagedEnvironmentCount 1/1`) ve Sweden Central'daki ortam QA'nın; apply `MaxNumberOfRegionalEnvironmentsInSubExceeded` ile durdu.
  - App Service B1: `tonyai-site` ve `tonyai-landing` kaynak gruplarında `No available instances` (409, kapasite) hatası.
  - Kullanıcı bölgeyi `westeurope` yaptı ve Static Web Apps'e dönüldü. Bu denemelerden state'te kaynak grubu `tonyai-landing` (swedencentral), deploy identity, federated credential ve rol ataması kaldı; bölge değiştiği için Terraform bunları `westeurope`'ta yeniden kurar. GHCR'deki `tonyai-landing-page` imajı artık kullanılmıyor.
- DNS Namecheap BasicDNS'te. Apex ve `www` için kayıt yok. Apex'te korunması gereken kayıtlar: Google MX, SPF, ACS'in `ms-domain-verification` ve `google-site-verification` TXT.
- Azure: `Azure subscription 1` (`cb7efc2f-…`), `deniz@tonyai.io` abonelikte Owner.
- Repo `tonyaiukco/tonyai-landing-page` public.
- "Giriş yap" bağlantıları tek kaynaktan gelir: `copy.nav.login.href` (`components/Nav.tsx` masaüstü ve mobil) ve footer "Şirket" sütunu (`components/Footer.tsx`).

## Goals / Non-Goals

**Goals:**
- Altyapının tamamı bu repodaki Terraform'dan, `westeurope`'ta ve QA'dan bağımsız kurulsun.
- Kurulumdan sonra tek iş akışı: `main`'e push → birkaç dakika içinde canlı.
- GitHub'da sır yok: Actions Azure'a OIDC ile girer, deploy token'ını çalışma anında okur.
- En az parça: remote backend, test, politika script'i, ortam ayrımı, container yok.

**Non-Goals:**
- Namecheap kayıtlarını Terraform ile yönetmek (3 kayıt elle girilir).
- `www` → apex 301 yönlendirmesi (iki domain de aynı içeriği sunar; kanonik etiketler apex'i gösteriyor).
- PR önizleme ortamları, form backend'i, staging/production ayrımı.
- `docs/kayit-ve-davet-akisi.md` içindeki kalıcı ürün adresleri.

## Decisions

### 1. Terraform: `azurerm` provider, `infra/` klasörü, yerel state
`infra/` altında tek root: `versions.tf` (Terraform `>= 1.9`, `azurerm ~> 5.0`), `variables.tf` (`subscription_id`, `location`, `dns_ready`), `main.tf`, `outputs.tf`. State `infra/terraform.tfstate` olarak yerelde kalır ve git-ignore edilir.
- *Neden:* Kullanıcı kararı — tek bir statik site için remote backend ve kural katmanı gereksiz yük.

### 2. Kaynaklar
| Kaynak | Ad | Not |
|---|---|---|
| Resource group | `tonyai-landing` | `westeurope` |
| Static Web App | `tonyai-site` | `Free`, `westeurope`, önizleme ortamları kapalı |
| Custom domain | `tonyai.io` | `dns-txt-token`; uygulamayla birlikte oluşturulur |
| Custom domain | `www.tonyai.io` | `cname-delegation`; `dns_ready = true` olunca |
| User-assigned identity | `tonyai-site-deploy` | GitHub OIDC için, `westeurope` |

- *Neden Static Web Apps:* Ücretsiz, kapasite riski yok, apex ve `www` için ücretsiz sertifika, container gerektirmiyor. İçerik Azure'un global edge'inden sunulur; `westeurope` kaynağın metadata'sının durduğu yerdir.
- *Alternatifler:* App Service B1 Germany West Central (~13 $/ay, container gerekir); Container Apps (bölge başına ortam kotası). Kullanıcı West Europe + Static Web Apps'i seçti.

### 3. Dağıtım: GitHub Actions + OIDC, token çalışma anında
`.github/workflows/deploy.yml`: `push: main` (+ `workflow_dispatch`), `permissions: contents: read, id-token: write`, `concurrency` grubu.
1. `actions/setup-node` (Node 22) → `npm ci` → `npm run build`.
2. `azure/login` — OIDC; `client-id`, `tenant-id`, `subscription-id` repo **değişkenlerinden** (`vars.AZURE_*`; sır değil).
3. `az staticwebapp secrets list … --query properties.apiKey` → `::add-mask::` ile maskelenir, adım çıktısı olarak sonraki adıma geçer.
4. `Azure/static-web-apps-deploy@v1` (`action: upload`, `app_location: out`, `skip_app_build: true`).

Azure değişkenleri tanımlı değilse 2–4. adımlar atlanır; böylece Terraform'dan önceki push'lar yeşil kalır.

Terraform tarafı: `azurerm_user_assigned_identity` + `azurerm_federated_identity_credential` (issuer `https://token.actions.githubusercontent.com`, subject `repo:tonyaiukco/tonyai-landing-page:ref:refs/heads/main`, audience `api://AzureADTokenExchange`) + Static Web App kapsamında `Contributor` (deploy token'ını okuyan `listSecrets` dahil).
- *Neden kendi build'imiz:* SWA'nın Oryx build'i Next.js'i görünce hybrid moda girmeye çalışabilir ve Node sürümünü kendisi seçer.
- *Alternatif:* Deploy token'ını bir kez GitHub secret'ı olarak kaydetmek — daha basit ama uzun ömürlü bir sır GitHub'da durur; kullanıcı OIDC'yi seçti.
- Build başarısız olursa upload çalışmaz; canlı site değişmez.

### 4. `public/staticwebapp.config.json`
`public/` içeriği build'de `out/` köküne kopyalanır, SWA config'i oradan okur:
- `trailingSlash: "always"` — export klasör yapısıyla ve `next.config.ts`'teki `trailingSlash: true` ile uyumlu.
- `responseOverrides.404` → `/404.html` (Next'in ürettiği tasarımlı 404).
- `/_next/static/*` için `Cache-Control: public, max-age=31536000, immutable` (dosya adları içerik hash'li).

### 5. Domain kurulum sırası
| Aşama | Ne yapılır | Nerede |
|---|---|---|
| A | RG, SWA, apex custom domain (TXT token üretir), identity, rol | `terraform apply` |
| DNS | `CNAME www → <default_host_name>`, `TXT @ → <apex_validation_token>`, `ALIAS @ → <default_host_name>` | Namecheap (kullanıcı) |
| B | `www.tonyai.io` custom domain | `terraform apply -var dns_ready=true` |

- Apex `dns-txt-token` doğrulaması DNS kaydını önceden istemez; token kaynak oluşturulunca gelir. Böylece kullanıcı üç kaydı tek seferde girer.
- `www` `cname-delegation` doğrulaması, domain eklenirken CNAME'in var olmasını ister; bu yüzden `dns_ready` ile ikinci aşamada eklenir.
- Apex TXT kaydı mevcut `@` TXT kayıtlarının yanına eklenir; ALIAS apex'te MX/TXT ile çakışmaz.

### 6. Çıktılar
`default_host_name` (CNAME ve ALIAS hedefi), `apex_validation_token` (`sensitive`), `deploy_client_id`, `tenant_id`, `subscription_id` (GitHub değişkenleri).

### 7. Bağlantı ve doküman güncellemeleri
`content/copy.ts`'teki iki `https://app.tonyai.io` → `https://qa.tonyai.io`. README'nin "Deploying" bölümü bu kurulumu anlatır; `next.config.ts` yorumu güncellenir. `.gitignore`'a `infra/.terraform/`, `*.tfstate`, `*.tfstate.*` eklenir; `infra/.terraform.lock.hcl` commit'lenir.

## Risks / Trade-offs

- [State deploy token'ını düz metin içerir, repo public] → `.gitignore` kuralları; spec bunu doğrulanabilir bir senaryo olarak tutar.
- [Yerel state yalnızca bir makinede] → Kaybolursa site çalışmaya devam eder; `terraform import` ile kaynaklar geri bağlanır.
- [Apex sertifikası, ALIAS Azure'a ulaşana kadar çıkmaz] → TXT ve ALIAS aynı oturumda girilir; durum `az staticwebapp hostname list` ile izlenir.
- [Deploy token sızarsa] → `az staticwebapp secrets reset-api-key`; workflow bir sonraki çalışmada yenisini okur, GitHub'da değiştirilecek bir şey yok.
- [`qa.tonyai.io` şu an HTTPS'te zaman aşımına düşüyor] → Yayını engellemez; "Giriş yap" bağlantısının çalışması QA ortamına bağlı.
- [`www` ve apex aynı içeriği sunar] → Bütün sayfalar `canonical` olarak apex'i gösteriyor; gerekirse portaldan apex "varsayılan domain" yapılarak www yönlendirilebilir.

## Migration Plan

1. Repo değişiklikleri `main`'e girer; workflow build eder, Azure adımlarını atlar.
2. Aşama A (`terraform apply`), GitHub değişkenleri (`gh variable set`), workflow yeniden çalıştırılır; site `*.azurestaticapps.net` adresinde kontrol edilir.
3. Namecheap kayıtları, aşama B, iki domain `Ready`.
4. Spec senaryoları `https://tonyai.io` ve `https://www.tonyai.io` üzerinde kontrol edilir.

**Geri alma:** İçerik için hatalı commit revert edilip push edilir. Altyapı için Namecheap'teki üç kayıt silinir; `terraform destroy -var dns_ready=true` kaynak grubunu kaldırır. Mevcut e-posta kayıtlarına ve QA kaynaklarına hiçbir adımda dokunulmaz.
