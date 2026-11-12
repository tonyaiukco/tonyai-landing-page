# Proposal

## Why

Site bugün yalnızca yerelde çalışıyor; `tonyai.io` ve `www.tonyai.io` için DNS kaydı yok. Pazarlama sitesini canlıya almak ve her `main` push'unda kendiliğinden güncellenmesini sağlamak için bir barındırma ve dağıtım düzenine ihtiyaç var. Ürün henüz `app.tonyai.io`'da yayında olmadığından, "Giriş yap" bağlantıları şimdilik çalışan QA ortamına (`qa.tonyai.io`) yönlenmeli.

## What Changes

- Bu repoya `infra/` altında sade bir Terraform yapılandırması eklenir (azurerm provider, yerel state, remote backend/test/politika yok): kaynak grubu, Azure Static Web App (Free) ve `tonyai.io` + `www.tonyai.io` custom domain'leri.
- `main`'e her push'ta siteyi build edip (`npm run build` → `out/`) Static Web App'e yükleyen bir GitHub Actions workflow'u eklenir.
- `public/staticwebapp.config.json` eklenir; bilinmeyen adresler sitenin kendi `404.html` sayfasını gösterir.
- Namecheap'te girilecek DNS kayıtları (www CNAME, apex TXT doğrulama + ALIAS) ve kurulum sırası belgelenir; mevcut MX/SPF/doğrulama TXT kayıtlarına dokunulmaz.
- `.gitignore`'a Terraform state ve çalışma dosyaları eklenir (repo public; state deploy token'ı içerir).
- Üst menü ve footer'daki "Giriş yap" bağlantıları `https://app.tonyai.io` yerine geçici olarak `https://qa.tonyai.io`'ya yönlenir.
- `README.md` ve `next.config.ts` içindeki barındırma/ürün adresi anlatımı güncellenir. `docs/kayit-ve-davet-akisi.md` kalıcı ürün adresini (`app.tonyai.io`) tarif ettiği için değişmez.

## Capabilities

### New Capabilities
- `site-hosting`: Sitenin nerede ve hangi adreslerde yayınlandığı, HTTPS, bilinmeyen adreslerin davranışı ve `main`'den otomatik dağıtım.
- `site-navigation`: Sitenin üst menü ve footer'ında ürün uygulamasına giden "Giriş yap" bağlantısının hedefi.

### Modified Capabilities
<!-- Projede henüz spec yok. -->

## Impact

- **Yeni dosyalar:** `infra/*.tf`, `.github/workflows/deploy.yml`, `public/staticwebapp.config.json`.
- **Değişen dosyalar:** `content/copy.ts` (2 bağlantı), `README.md`, `next.config.ts` (yorum), `.gitignore`.
- **Azure:** `Azure subscription 1` aboneliğinde yeni kaynak grubu ve Static Web App (Free, ücretsiz). `Microsoft.Web` resource provider kaydedilir.
- **GitHub:** `tonyaiukco/tonyai-landing-page` reposuna deploy token secret'ı eklenir.
- **DNS (Namecheap, elle):** `www` CNAME, `@` ALIAS ve TXT doğrulama kayıtları.
- **Yerel araç:** Terraform CLI kurulumu gerekir.
- **Bağımlılık:** "Giriş yap" bağlantısının çalışması `qa.tonyai.io`'nun HTTPS üzerinden yanıt vermesine bağlıdır; şu an zaman aşımına düşüyor.
