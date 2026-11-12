# Proposal

> Not: Change'in adı ilk plandan (Azure Static Web Apps) kaldı. Static Web Apps Sweden Central'da sunulmadığı ve bütün kaynakların Sweden Central'da olması şart olduğu için barındırma Azure Container Apps'e taşındı.

## Why

Site bugün yalnızca yerelde çalışıyor; `tonyai.io` ve `www.tonyai.io` için DNS kaydı yok. Pazarlama sitesini canlıya almak ve her `main` push'unda kendiliğinden güncellenmesini sağlamak için bir barındırma ve dağıtım düzenine ihtiyaç var. Bütün altyapı, diğer TonyAI kaynakları gibi Sweden Central'da durmalı. Ürün henüz `app.tonyai.io`'da yayında olmadığından, "Giriş yap" bağlantıları şimdilik çalışan QA ortamına (`qa.tonyai.io`) yönlenmeli.

## What Changes

- Bu repoya `infra/` altında sade bir Terraform yapılandırması eklenir (azurerm provider, yerel state, remote backend/test/politika yok). Bütün kaynaklar `swedencentral`'da: kaynak grubu, Container Apps ortamı, site için bir Container App, `tonyai.io` + `www.tonyai.io` custom domain'leri ve managed sertifikaları, GitHub Actions'ın sırsız (OIDC) dağıtım yapması için bir managed identity.
- Siteyi build edip nginx ile sunan bir `Dockerfile` ve nginx yapılandırması eklenir; bilinmeyen adresler sitenin kendi `404.html` sayfasını gösterir.
- `main`'e her push'ta imajı build edip GitHub Container Registry'ye (GHCR) yükleyen ve Container App'i yeni imaja geçiren bir GitHub Actions workflow'u eklenir.
- Namecheap'te girilecek DNS kayıtları (`www` CNAME, `@` A, iki `asuid` TXT) ve kurulum sırası belgelenir; mevcut MX/SPF/doğrulama TXT kayıtlarına dokunulmaz.
- `.gitignore`'a Terraform state ve çalışma dosyaları eklenir (repo public).
- Üst menü ve footer'daki "Giriş yap" bağlantıları `https://app.tonyai.io` yerine geçici olarak `https://qa.tonyai.io`'ya yönlenir.
- `README.md` ve `next.config.ts` içindeki barındırma/ürün adresi anlatımı güncellenir. `docs/kayit-ve-davet-akisi.md` kalıcı ürün adresini (`app.tonyai.io`) tarif ettiği için değişmez.

## Capabilities

### New Capabilities
- `site-hosting`: Sitenin nerede ve hangi adreslerde yayınlandığı, HTTPS, bilinmeyen adreslerin davranışı, barındırma bölgesi ve `main`'den otomatik dağıtım.
- `site-navigation`: Sitenin üst menü ve footer'ında ürün uygulamasına giden "Giriş yap" bağlantısının hedefi.

### Modified Capabilities
<!-- Projede henüz spec yok. -->

## Impact

- **Yeni dosyalar:** `infra/*.tf`, `Dockerfile`, `.dockerignore`, `nginx.conf`, `.github/workflows/deploy.yml`.
- **Değişen dosyalar:** `content/copy.ts` (2 bağlantı), `README.md`, `next.config.ts` (yorum), `.gitignore`.
- **Azure (`swedencentral`):** `Azure subscription 1` aboneliğinde yeni kaynak grubu `tonyai-site`, Container Apps ortamı ve uygulaması, managed identity ve kaynak grubu üzerinde rol ataması. Tek replika sürekli açık olduğundan küçük bir aylık tüketim maliyeti doğar.
- **GitHub:** GHCR'de `tonyai-landing-page` imaj paketi (public); repoya üç Actions değişkeni (client/tenant/subscription ID; sır değil).
- **DNS (Namecheap, elle):** `www` CNAME, `@` A, `asuid` ve `asuid.www` TXT kayıtları.
- **Yerel araç:** Terraform CLI.
- **Bağımlılık:** "Giriş yap" bağlantısının çalışması `qa.tonyai.io`'nun HTTPS üzerinden yanıt vermesine bağlıdır; şu an zaman aşımına düşüyor.
