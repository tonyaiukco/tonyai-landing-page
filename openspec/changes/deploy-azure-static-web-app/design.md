# Design

## Context

- Site Next.js static export: `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images.unoptimized`. `npm run build` 135 dosyalık, 3.6 MB'lık bir `out/` üretir; `out/404.html`, `robots.txt` ve `sitemap.xml` dahil. Sunucu tarafı kod, API route'u veya middleware yok.
- Kanonik adres zaten `https://tonyai.io` (`content/copy.ts` → `meta.url`; `app/layout.tsx` bunu `metadataBase` ve `alternates.canonical` için kullanır). Sitemap ve robots da apex'i gösterir.
- DNS Namecheap BasicDNS'te (`dns1/dns2.registrar-servers.com`). Apex ve `www` için kayıt yok. Apex'te korunması gereken kayıtlar: Google MX, Google + M365 SPF, `ms-domain-verification` ve `google-site-verification` TXT.
- Azure: `Azure subscription 1` (`cb7efc2f-…`), `deniz@tonyai.io` ile `az` oturumu açık. `Microsoft.Web` provider kayıtlı değil. Static Web App yok.
- Repo `tonyaiukco/tonyai-landing-page` **public**; `gh` `tonyaiukco` hesabıyla oturum açmış. Repoda henüz workflow yok.
- Yerelde Terraform kurulu değil.
- "Giriş yap" bağlantıları tek kaynaktan gelir: `copy.nav.login.href` (`components/Nav.tsx` masaüstü ve mobil menü) ve `copy.footer.columns[2].links[3].href` (`components/Footer.tsx`). `/tasarim/c/` dahil başka yerde sabit yazılmış ürün adresi yok.

## Goals / Non-Goals

**Goals:**
- Altyapının tamamı (kaynak grubu, Static Web App, iki custom domain) bu repodaki Terraform'dan kurulabilsin.
- Kurulumdan sonra tek iş akışı: `main`'e push → birkaç dakika içinde canlı.
- En az parça: remote backend, test, politika script'i, ortam ayrımı yok.

**Non-Goals:**
- Namecheap kayıtlarını Terraform ile yönetmek (Namecheap API IP whitelist ister; 3 kayıt elle girilir).
- `www` → apex 301 yönlendirmesi (iki domain de aynı içeriği sunar; kanonik etiketler zaten apex'i gösteriyor).
- PR önizleme ortamları, form backend'i (`NEXT_PUBLIC_*` endpoint'leri), staging/production ayrımı.
- `docs/kayit-ve-davet-akisi.md` içindeki kalıcı ürün adresleri.

## Decisions

### 1. Terraform: `azurerm` provider, `infra/` klasörü, yerel state
`infra/` altında tek root: `versions.tf` (Terraform `>= 1.9`, `azurerm ~> 5.0`, uygulama sırasındaki güncel ana sürüm), `main.tf` (RG, SWA, custom domain'ler), `variables.tf` (`subscription_id`, `location`), `outputs.tf`. State `infra/terraform.tfstate` olarak yerelde kalır.
- *Neden:* Kullanıcı kararı — tek bir statik site için remote backend ve kural katmanı gereksiz yük. `azurerm`'ün hazır `azurerm_static_web_app` ve `azurerm_static_web_app_custom_domain` kaynakları en kısa yapılandırmayı verir.
- *Alternatifler:* Mono-repo'daki `azapi` + remote state düzeni (reddedildi: kullanıcı ayrı ve sade istedi); `az` CLI ile elle kurulum (reddedildi: kullanıcı Terraform istedi).
- Abonelik `variables.tf`'de varsayılan değer olarak verilir. Provider, kayıtlı olmayan `Microsoft.Web`'i `resource_providers_to_register` ile kendisi kaydeder; ayrıca `az provider register` gerekmez.

### 2. Kaynaklar
| Kaynak | Ad | Not |
|---|---|---|
| Resource group | `tonyai-site` | `westeurope` |
| Static Web App | `tonyai-site` | `sku_tier`/`sku_size` = `Free`, `westeurope` |
| Custom domain | `www.tonyai.io` | `validation_type = "cname-delegation"` |
| Custom domain | `tonyai.io` | `validation_type = "dns-txt-token"` |

- *Neden `westeurope`:* SWA mono-repo'nun kullandığı `swedencentral`'da kurulamıyor; içerik zaten global edge'den sunuluyor, bölge yalnızca kaynağın metadata'sının durduğu yer.
- *Neden Free:* 2 custom domain ve ücretsiz yönetilen sertifika tam ihtiyaç; 3.6 MB'lık site kota sınırlarının çok altında. SLA gerekirse ileride tek satırla Standard'a geçilir.

### 3. Çıktılar
`default_host_name` (CNAME/ALIAS hedefi), `apex_validation_token` (TXT değeri) ve `api_key` (`sensitive = true`, deploy token). Deploy token GitHub'a doğrudan aktarılır: `terraform output -raw api_key | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN`.
- *Alternatif:* GitHub OIDC + deploy anında token çekmek — daha güvenli ama federated identity, rol ataması ve ek adımlar gerektirir; sadelik kararıyla reddedildi.

### 4. Kurulum sırası: iki aşamalı apply
`www` için `cname-delegation` doğrulaması, domain eklenirken CNAME'in zaten var olmasını ister; CNAME'in hedefi ise SWA oluşunca belli olur. Bu yüzden ilk kurulum:
1. `terraform apply -target=azurerm_static_web_app.site` → SWA ve `default_host_name`.
2. Namecheap: `CNAME www → <default_host_name>`.
3. `terraform apply` → iki custom domain; apex için TXT token çıktı olarak gelir.
4. Namecheap: `TXT @ → <token>` ve `ALIAS @ → <default_host_name>`.
- *Alternatif:* `custom_domains_enabled` gibi bir değişken — tek seferlik bir bootstrap için kalıcı bir anahtar eklemek gereksiz; `-target` yalnızca ilk kurulumda kullanılır ve README'de belgelenir.
- Apex TXT kaydı yeni bir kayıttır; mevcut `@` TXT kayıtlarının yanına eklenir, onların yerine geçmez. ALIAS apex'te MX/TXT ile çakışmaz.

### 5. Dağıtım: build GitHub Actions'ta, yükleme hazır `out/` ile
`.github/workflows/deploy.yml`: `push: main` (+ `workflow_dispatch`) → `actions/checkout` → `actions/setup-node` (Node 22, npm cache) → `npm ci` → `npm run build` → `Azure/static-web-apps-deploy@v1` (`action: upload`, `app_location: out`, `skip_app_build: true`, `skip_api_build: true`). Aynı anda tek dağıtım için `concurrency` grubu.
- *Neden kendi build'imiz:* SWA'nın Oryx build'i Next.js'i görünce hybrid moda girmeye çalışabilir ve Node sürümünü kendisi seçer. Build'i Actions'ta yapmak, yerelde çalışanla aynı komutu çalıştırır.
- Build başarısız olursa upload adımı hiç çalışmaz; canlı site değişmez (spec: başarısız build canlıyı bozmaz).
- PR tetikleyicisi yok, dolayısıyla Free plandaki önizleme ortamları da kullanılmaz.

### 6. `public/staticwebapp.config.json`
`public/` içeriği build'de `out/` köküne kopyalanır, SWA config'i oradan okur:
- `trailingSlash: "always"` — export klasör yapısıyla (`/sirket/index.html`) ve `next.config.ts`'teki `trailingSlash: true` ile uyumlu.
- `responseOverrides.404` → `/404.html` (Next'in ürettiği tasarımlı 404).
- `/_next/static/*` için `Cache-Control: public, max-age=31536000, immutable` (dosya adları içerik hash'li; README'deki Nginx önerisinin karşılığı).

### 7. Bağlantı ve doküman güncellemeleri
`content/copy.ts`'teki iki `https://app.tonyai.io` → `https://qa.tonyai.io`. README'nin "Deploying" bölümü Nginx örneği yerine bu kurulumu anlatır; `next.config.ts` yorumu güncellenir. `.gitignore`'a `infra/.terraform/`, `*.tfstate`, `*.tfstate.*` eklenir. `infra/.terraform.lock.hcl` commit'lenir (provider sürümünü sabitler, sır içermez).

## Risks / Trade-offs

- [State deploy token'ı düz metin içerir, repo public] → `.gitignore` kuralları ilk Terraform komutundan önce eklenir; spec bunu doğrulanabilir bir senaryo olarak tutar.
- [Yerel state yalnızca bir makinede] → Kaybolursa site çalışmaya devam eder; `terraform import` ile kaynaklar geri bağlanır. Tek bir statik site için kabul edilen risk.
- [Apex sertifikası, ALIAS Azure'a ulaşana kadar çıkmaz; azurerm apex domain için doğrulama tamamlanana kadar bekleyebilir] → TXT ve ALIAS aynı oturumda girilir. Apply zaman aşımına düşerse kayıtlar yayıldıktan sonra `terraform apply` tekrar çalıştırılır.
- [`qa.tonyai.io` şu an HTTPS'te zaman aşımına düşüyor] → Sitenin yayına çıkmasını engellemez; "Giriş yap" bağlantısının çalışması QA ortamının ayağa kalkmasına bağlıdır. Doğrulama adımında ayrıca kontrol edilir.
- [`www` ve apex aynı içeriği sunar, arama motorları iki kopya görebilir] → Bütün sayfalar `canonical` olarak apex'i gösteriyor; gerekirse portaldan apex "varsayılan domain" yapılarak www yönlendirilebilir.
- [Deploy token uzun ömürlü bir GitHub secret'ı] → Sızarsa `az staticwebapp secrets reset-api-key` ile yenilenir ve secret güncellenir.

## Migration Plan

1. Repo değişiklikleri (Terraform, workflow, config, bağlantılar, `.gitignore`, README) bir commit'te `main`'e girer. Secret henüz yokken workflow'un ilk çalışması upload adımında başarısız olur; bu beklenen bir durumdur ve canlı bir site olmadığı için zararsızdır.
2. Terraform kurulur, Decision 4'teki iki aşamalı apply ve Namecheap kayıtları yapılır.
3. Deploy token GitHub secret'ı olarak eklenir, workflow elle (`workflow_dispatch`) yeniden çalıştırılır.
4. `*.azurestaticapps.net`, ardından `https://www.tonyai.io` ve `https://tonyai.io` üzerinde spec senaryoları kontrol edilir.

**Geri alma:** İçerik için hatalı commit revert edilip push edilir. Altyapı için Namecheap'teki üç kayıt silinir; gerekirse `terraform destroy` kaynak grubunu kaldırır. Mevcut e-posta kayıtlarına hiçbir adımda dokunulmadığından geri alma e-postayı etkilemez.
