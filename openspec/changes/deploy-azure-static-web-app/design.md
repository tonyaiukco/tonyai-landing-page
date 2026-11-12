# Design

## Context

- Site Next.js static export: `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized`. `npm run build` 135 dosyalık, 3.6 MB'lık bir `out/` üretir; `out/404.html`, `robots.txt` ve `sitemap.xml` dahil. Sunucu tarafı kod, API route'u veya middleware yok.
- Kanonik adres zaten `https://tonyai.io` (`content/copy.ts` → `meta.url`; `app/layout.tsx` bunu `metadataBase` ve `alternates.canonical` için kullanır).
- **Bölge şartı:** bütün kaynaklar `swedencentral`'da. Azure Static Web Apps yalnızca Central US, East US 2, West US 2, West Europe ve East Asia'da sunuluyor (`az provider show -n Microsoft.Web`, 2026-11-13) ve içeriği her durumda global edge'e dağıtıyor; şartı karşılayamaz. Container Apps `swedencentral`'da var ve ürün uygulaması (`qa.tonyai.io`) zaten orada çalışıyor.
- DNS Namecheap BasicDNS'te. Apex ve `www` için kayıt yok. Apex'te korunması gereken kayıtlar: Google MX, SPF, ACS'in `ms-domain-verification` ve `google-site-verification` TXT.
- Azure: `Azure subscription 1` (`cb7efc2f-…`), `deniz@tonyai.io` abonelikte Owner. `Microsoft.App` ve `Microsoft.ManagedIdentity` kayıtlı.
- Repo `tonyaiukco/tonyai-landing-page` **public**; `tonyaiukco` bir kullanıcı hesabı.
- Mono-repo'nun runbook 11'i aynı Namecheap + ACA managed sertifika akışını `qa.tonyai.io` için yaşamış: hostname önce `Disabled` eklenir, sonra managed sertifika çıkar, sonra bağlanır; CNAME doğrudan uygulamanın adresini göstermeli; CAA eklenirse DigiCert'e izin vermeli.
- "Giriş yap" bağlantıları tek kaynaktan gelir: `copy.nav.login.href` (`components/Nav.tsx` masaüstü ve mobil) ve footer "Şirket" sütunu (`components/Footer.tsx`).

## Goals / Non-Goals

**Goals:**
- Altyapının tamamı bu repodaki Terraform'dan, tamamen `swedencentral`'da kurulsun.
- Kurulumdan sonra tek iş akışı: `main`'e push → birkaç dakika içinde canlı.
- Uzun ömürlü sır yok: GitHub Actions Azure'a OIDC ile girer.
- En az parça: remote backend, test, politika script'i, ortam ayrımı yok.

**Non-Goals:**
- Namecheap kayıtlarını Terraform ile yönetmek (4 kayıt elle girilir).
- `www` → apex 301 yönlendirmesi (iki domain de aynı içeriği sunar; kanonik etiketler apex'i gösteriyor).
- Log Analytics / izleme, PR önizleme ortamları, form backend'i, staging/production ayrımı.
- `docs/kayit-ve-davet-akisi.md` içindeki kalıcı ürün adresleri.

## Decisions

### 1. Terraform: `azurerm` provider, `infra/` klasörü, yerel state
`infra/` altında tek root: `versions.tf` (Terraform `>= 1.9`, `azurerm ~> 5.0`), `variables.tf`, `main.tf`, `outputs.tf`. State `infra/terraform.tfstate` olarak yerelde kalır ve git-ignore edilir.
- *Neden:* Kullanıcı kararı — tek bir statik site için remote backend ve kural katmanı gereksiz yük.
- *Alternatifler:* Mono-repo'daki `azapi` + remote state düzeni (reddedildi: kullanıcı ayrı ve sade istedi).

### 2. Barındırma: Azure Container Apps + nginx
| Kaynak | Ad | Not |
|---|---|---|
| Resource group | `tonyai-site` | `swedencentral` |
| Container Apps environment | `tonyai-site` | Consumption, log hedefi yok |
| Container App | `tonyai-site` | `0.25` vCPU / `0.5Gi`, `min_replicas = 1`, `max_replicas = 2`, ingress external, port `8080`, `allow_insecure_connections = false` |
| User-assigned identity | `tonyai-site-deploy` | GitHub OIDC için |

- *Neden Container Apps:* `swedencentral`'da var, apex ve `www` için ücretsiz managed sertifika veriyor, ekip platformu ürün uygulamasından tanıyor.
- *Alternatifler:* App Service B1 (sabit ~13 $/ay, container gerektirmez — kullanıcı Container Apps'i seçti); Storage static website (custom domain'de HTTPS için global Front Door gerekir — bölge şartını ihlal eder); Static Web Apps (bölge şartını ihlal eder).
- *Neden `min_replicas = 1`:* Bir pazarlama sitesinde ilk ziyaretçinin soğuk başlatma beklemesi kabul edilemez. Bedeli sürekli açık küçük bir replikanın tüketim ücreti; çoğu zaman "idle" fiyatlandırılır. Maliyet önemli hale gelirse `0` yapılabilir.
- `allow_insecure_connections = false`: Container Apps HTTP isteklerini HTTPS'e yönlendirir (spec: HTTP → HTTPS).
- Container App'in imajı GitHub Actions tarafından değiştirilir; Terraform `template[0].container[0].image` için `ignore_changes` kullanır, ilk değer `:latest` etiketidir.

### 3. İmaj: `Dockerfile` + `nginx.conf`, GHCR'de public paket
Çok aşamalı `Dockerfile`: `node:22-alpine` içinde `npm ci && npm run build`, ardından `nginxinc/nginx-unprivileged:alpine` (root olmayan, `8080`'i dinler) içine `out/` ve `nginx.conf`. `.dockerignore` `node_modules`, `.next`, `out`, `.git`, `infra` ve `openspec`'i dışarıda bırakır.

`nginx.conf`:
- `try_files $uri $uri/ =404;` + `index index.html;` — `/sirket/` → `/sirket/index.html`; `/sirket` → 301 `/sirket/` (klasör yapısı ve `trailingSlash: true` ile uyumlu).
- `absolute_redirect off;` — yönlendirmeler göreli kalır; nginx container içindeki `8080` portunu ya da HTTP şemasını sızdırmaz.
- `error_page 404 /404.html;` — Next'in tasarımlı 404 sayfası, 404 durum koduyla.
- `/_next/static/` için `Cache-Control: public, max-age=31536000, immutable`; `gzip` açık.

İmaj `ghcr.io/tonyaiukco/tonyai-landing-page`'e `:<commit sha>` ve `:latest` etiketleriyle gider.
- *Neden GHCR + public paket:* Ücretsiz, `GITHUB_TOKEN` ile push edilir, Container App'in çekmesi için kayıt kimlik bilgisi gerekmez (site içeriği zaten public). İlk push'tan sonra paket görünürlüğü private gelirse kullanıcı GitHub arayüzünden bir kez public yapar.
- *Alternatif:* Azure Container Registry (`swedencentral`, Basic) + managed identity ile çekme — ek kaynak, ek maliyet ve rol ataması; sadelik için reddedildi.

### 4. Dağıtım: GitHub Actions + OIDC
`.github/workflows/deploy.yml`: `push: main` (+ `workflow_dispatch`), `permissions: contents: read, packages: write, id-token: write`, `concurrency` grubu.
1. `docker/login-action` (GHCR, `GITHUB_TOKEN`) → `docker/build-push-action` (`:sha`, `:latest`).
2. `azure/login` — OIDC; `client-id`, `tenant-id`, `subscription-id` repo **değişkenlerinden** (`vars.AZURE_*`; bunlar sır değil).
3. `az containerapp update -n tonyai-site -g tonyai-site --image ghcr.io/…:<sha>`.

Azure değişkenleri henüz tanımlı değilse 2. ve 3. adımlar atlanır; böylece Terraform'dan önce yapılan ilk push yalnızca imajı yayınlar.

Terraform tarafı: `azurerm_user_assigned_identity` + `azurerm_federated_identity_credential` (issuer `https://token.actions.githubusercontent.com`, subject `repo:tonyaiukco/tonyai-landing-page:ref:refs/heads/main`, audience `api://AzureADTokenExchange`) + kaynak grubu kapsamında `Contributor` rol ataması.
- *Neden kaynak grubu kapsamı:* `az containerapp update` ortama da dokunur (`managedEnvironments/join`); kaynak grubu yalnızca site kaynaklarını içerir.
- *Alternatif:* Service principal sırrı GitHub secret'ında — uzun ömürlü sır; reddedildi.
- Build başarısız olursa push ve update adımları çalışmaz; canlı revizyon değişmez.

### 5. Custom domain'ler ve sertifikalar: üç aşama
Container Apps bir hostname'i ancak DNS doğrulandıktan sonra ekler ve managed sertifikayı ancak uygulamada var olan bir hostname için çıkarır; sertifika kendiliğinden bağlanmaz.

| Aşama | Ne yapılır | Nerede |
|---|---|---|
| A | RG, ortam, uygulama, identity, rol | `terraform apply` (`dns_ready = false`) |
| DNS | `CNAME www → <app fqdn>`, `TXT asuid.www → <verification id>`, `A @ → <static ip>`, `TXT asuid → <verification id>` | Namecheap (kullanıcı) |
| B | `azurerm_container_app_custom_domain` ×2 (`ignore_changes = [certificate_binding_type, container_app_environment_certificate_id]`) + `azurerm_container_app_environment_managed_certificate` ×2 (`www`: `CNAME`, apex: `HTTP` doğrulama) | `terraform apply -var dns_ready=true` |
| C | Sertifikaları hostname'lere bağlama | `az containerapp hostname bind --certificate <ad>` ×2 |

- `dns_ready` değişkeni varsayılan olarak `false`; aşama B'den sonra `terraform.tfvars` yerine komut satırında verilir ve README'de belgelenir. Bağlamadan sonra Terraform'un bir sonraki planı değişiklik göstermemelidir (`ignore_changes` sayesinde).
- Apex CNAME alamadığı için `A` kaydı ortamın statik IP'sine gider; `asuid` doğrulama değeri ortamın `custom_domain_verification_id`'sidir (iki host için aynı).
- *Alternatif:* Bağlamayı da Terraform'da yapmak — `certificate_binding_type` değişikliği kaynağı yeniden yaratır ve sertifikaya bağımlılık döngüsü kurar; provider dokümanı managed sertifika için `ignore_changes` + dış bağlama öneriyor.

### 6. Çıktılar
`app_fqdn` (www CNAME hedefi), `static_ip` (apex A), `domain_verification_id` (iki `asuid` TXT), `deploy_client_id`, `tenant_id`, `subscription_id` (GitHub değişkenleri). Hiçbiri sır değil.

### 7. Bağlantı ve doküman güncellemeleri
`content/copy.ts`'teki iki `https://app.tonyai.io` → `https://qa.tonyai.io`. README'nin "Deploying" bölümü bu kurulumu anlatır; `next.config.ts` yorumu güncellenir. `.gitignore`'a `infra/.terraform/`, `*.tfstate`, `*.tfstate.*` eklenir; `infra/.terraform.lock.hcl` commit'lenir.

## Risks / Trade-offs

- [Yerel state yalnızca bir makinede] → Kaybolursa site çalışmaya devam eder; `terraform import` ile kaynaklar geri bağlanır.
- [GHCR paketi private gelirse Container App imajı çekemez] → İlk push'tan sonra görünürlük kontrol edilir, gerekirse kullanıcı public yapar; aşama A bundan sonra çalıştırılır.
- [Managed sertifika DNS yayılmadan çıkmaz; apex HTTP doğrulaması A kaydının uygulamaya ulaşmasını ister] → Aşama B, kayıtlar Namecheap'in kendi sunucularında (`dig @dns1.registrar-servers.com`) görüldükten sonra çalıştırılır. Sertifika `Succeeded` olmadan aşama C'ye geçilmez.
- [Sürekli açık replika küçük bir aylık maliyet doğurur] → `min_replicas = 0` ile sıfıra yakın maliyet, karşılığında soğuk başlatma.
- [`qa.tonyai.io` şu an HTTPS'te zaman aşımına düşüyor] → Yayını engellemez; "Giriş yap" bağlantısının çalışması QA ortamına bağlı.
- [`www` ve apex aynı içeriği sunar] → Bütün sayfalar `canonical` olarak apex'i gösteriyor.
- [Statik IP ortam yeniden yaratılırsa değişir] → Ortam silinip kurulursa Namecheap'teki `A` kaydı güncellenir.

## Migration Plan

1. Repo değişiklikleri `main`'e girer; workflow imajı GHCR'ye yayınlar, Azure adımlarını atlar.
2. GHCR paketinin public olduğu doğrulanır.
3. Aşama A (`terraform apply`), GitHub değişkenleri (`gh variable set`), workflow yeniden çalıştırılır; site `*.azurecontainerapps.io` adresinde kontrol edilir.
4. Namecheap kayıtları, aşama B, sertifikaların `Succeeded` olması, aşama C.
5. Spec senaryoları `https://tonyai.io` ve `https://www.tonyai.io` üzerinde kontrol edilir.

**Geri alma:** İçerik için hatalı commit revert edilip push edilir (ya da `az containerapp update --image ghcr.io/…:<önceki sha>`). Altyapı için Namecheap'teki dört kayıt silinir; `terraform destroy` kaynak grubunu kaldırır. Mevcut e-posta kayıtlarına hiçbir adımda dokunulmaz.
