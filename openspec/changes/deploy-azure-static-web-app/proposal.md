# Proposal

> Not: Barındırma bölgesi için önce Sweden Central denendi. Static Web Apps orada sunulmuyor; Container Apps'te abonelik bölgede tek ortama izin veriyor ve o ortam QA'nın; App Service B1 için iki kaynak grubunda da `No available instances` kapasite hatası alındı. Kullanıcı bölgeyi West Europe olarak değiştirdi ve barındırma, ilk plandaki gibi Azure Static Web Apps (Free) oldu.

## Why

Site bugün yalnızca yerelde çalışıyor; `tonyai.io` ve `www.tonyai.io` için DNS kaydı yok. Pazarlama sitesini canlıya almak ve her `main` push'unda kendiliğinden güncellenmesini sağlamak için bir barındırma ve dağıtım düzenine ihtiyaç var. Ürün henüz `app.tonyai.io`'da yayında olmadığından, "Giriş yap" bağlantıları şimdilik çalışan QA ortamına (`qa.tonyai.io`) yönlenmeli.

## What Changes

- Bu repoya `infra/` altında sade bir Terraform yapılandırması eklenir (azurerm provider, yerel state, remote backend/test/politika yok). Bütün kaynaklar `westeurope`'ta: kaynak grubu `tonyai-landing`, Azure Static Web App (Free), `tonyai.io` + `www.tonyai.io` custom domain'leri ve GitHub Actions'ın sırsız (OIDC) dağıtım yapması için bir managed identity.
- `main`'e her push'ta siteyi build edip (`npm run build` → `out/`), Azure'a OIDC ile girip deploy token'ını çalışma anında okuyan ve Static Web App'e yükleyen bir GitHub Actions workflow'u eklenir.
- `public/staticwebapp.config.json` eklenir; bilinmeyen adresler sitenin kendi `404.html` sayfasını gösterir.
- Namecheap'te girilecek DNS kayıtları (`www` CNAME, `@` TXT doğrulama + ALIAS) ve kurulum sırası belgelenir; mevcut MX/SPF/doğrulama TXT kayıtlarına dokunulmaz.
- `.gitignore`'a Terraform state ve çalışma dosyaları eklenir (repo public; state deploy token'ını içerir).
- Üst menü ve footer'daki "Giriş yap" bağlantıları `https://app.tonyai.io` yerine geçici olarak `https://qa.tonyai.io`'ya yönlenir.
- `README.md` ve `next.config.ts` içindeki barındırma/ürün adresi anlatımı güncellenir. `docs/kayit-ve-davet-akisi.md` kalıcı ürün adresini (`app.tonyai.io`) tarif ettiği için değişmez.

## Capabilities

### New Capabilities
- `site-hosting`: Sitenin nerede ve hangi adreslerde yayınlandığı, HTTPS, bilinmeyen adreslerin davranışı, barındırma bölgesi ve `main`'den otomatik dağıtım.
- `site-navigation`: Sitenin üst menü ve footer'ında ürün uygulamasına giden "Giriş yap" bağlantısının hedefi.

### Modified Capabilities
<!-- Projede henüz spec yok. -->

## Impact

- **Yeni dosyalar:** `infra/*.tf`, `.github/workflows/deploy.yml`, `public/staticwebapp.config.json`.
- **Değişen dosyalar:** `content/copy.ts` (2 bağlantı), `README.md`, `next.config.ts` (yorum), `.gitignore`.
- **Azure (`westeurope`):** `Azure subscription 1` aboneliğinde kaynak grubu `tonyai-landing`, Static Web App (Free, ücretsiz), managed identity ve Static Web App üzerinde rol ataması. QA kaynaklarına dokunulmaz.
- **GitHub:** repoya üç Actions değişkeni (client/tenant/subscription ID; sır değil). Container Apps/App Service denemelerinden kalan `ghcr.io/tonyaiukco/tonyai-landing-page` imaj paketi artık kullanılmıyor.
- **DNS (Namecheap, elle):** `www` CNAME, `@` TXT doğrulama ve `@` ALIAS kayıtları.
- **Yerel araç:** Terraform CLI.
- **Bağımlılık:** "Giriş yap" bağlantısının çalışması `qa.tonyai.io`'nun HTTPS üzerinden yanıt vermesine bağlıdır; şu an zaman aşımına düşüyor.
