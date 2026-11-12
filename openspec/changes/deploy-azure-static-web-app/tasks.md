# Tasks

## 1. Repo hazırlığı

- [x] 1.1 `.gitignore`'a `infra/.terraform/`, `*.tfstate` ve `*.tfstate.*` ekle; `git check-ignore infra/terraform.tfstate infra/.terraform/x` iki yolu da ignore edilmiş olarak gösterir
- [x] 1.2 `content/copy.ts`'teki iki "Giriş yap" bağlantısını (`nav.login.href`, footer "Şirket" sütunu) `https://qa.tonyai.io` yap; `npm run build` sonrası `grep -r "app.tonyai.io" out/` sonuç döndürmez, `grep -rl "qa.tonyai.io" out/index.html` dosyayı bulur
- [x] 1.3 `public/staticwebapp.config.json` ekle (`trailingSlash: "always"`, 404 → `/404.html`, `/_next/static/*` için immutable cache); `npm run build` sonrası dosya `out/staticwebapp.config.json` olarak durur ve `python3 -m json.tool` ile geçerli JSON çıkar

## 2. Terraform yapılandırması

- [x] 2.1 Terraform CLI'ı kur (`brew install hashicorp/tap/terraform`); `terraform version` 1.9 veya üstünü gösterir
- [x] 2.2 `infra/versions.tf`, `infra/variables.tf`, `infra/main.tf`, `infra/outputs.tf` dosyalarını design.md Decision 1–3'e göre yaz (RG `tonyai-site`, SWA `tonyai-site` Free/`westeurope`, `www` cname-delegation ve apex dns-txt-token domain'leri, `default_host_name`/`apex_validation_token`/`api_key` çıktıları); `terraform -chdir=infra init` ve `terraform -chdir=infra validate` hatasız biter, `terraform fmt -check -recursive infra` temiz çıkar
- [x] 2.3 `infra/.terraform.lock.hcl` commit'e alınır, state dosyaları alınmaz; `git status --short infra` yalnızca `.tf` dosyalarını ve lock dosyasını gösterir

## 3. Dağıtım workflow'u

- [x] 3.1 `.github/workflows/deploy.yml` ekle (`push: main` + `workflow_dispatch`, Node 22, `npm ci`, `npm run build`, `Azure/static-web-apps-deploy@v1` ile `app_location: out`, `skip_app_build: true`, `skip_api_build: true`, `concurrency` grubu, token `secrets.AZURE_STATIC_WEB_APPS_API_TOKEN`); `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml'))"` hatasız biter
- [x] 3.2 `README.md`'nin "Deploying" bölümünü bu kurulumla değiştir (Terraform iki aşamalı ilk kurulum, Namecheap kayıtları, deploy token'ın GitHub'a aktarılması, `main` push = canlı, geri alma) ve ürün adresi satırını `qa.tonyai.io` (geçici) olarak güncelle; `next.config.ts` yorumunu Azure Static Web Apps'e göre düzelt. README'deki komutlar Görev 4'te yazıldığı gibi çalıştırılarak doğrulanır
- [ ] 3.3 Grup 1–3 değişikliklerini commit'leyip `main`'e push et; GitHub Actions'ta workflow tetiklenir, build adımı yeşil geçer (secret henüz olmadığından upload adımının başarısız olması beklenir)

## 4. Azure kurulumu ve DNS

- [ ] 4.1 `terraform -chdir=infra apply -target=azurerm_static_web_app.site` çalıştır; `terraform -chdir=infra output default_host_name` bir `*.azurestaticapps.net` adresi döndürür
- [ ] 4.2 Deploy token'ı GitHub'a aktar (`terraform -chdir=infra output -raw api_key | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN`) ve workflow'u `gh workflow run deploy.yml` ile yeniden çalıştır; çalışma yeşil biter ve `curl -sI https://<default_host_name>/` 200 döner
- [ ] 4.3 Geçici adreste kontrol et: `/`, `/sirket/`, `/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/c/` 200 döner; `/olmayan-sayfa/` 404 döner ve gövdesi sitenin 404 sayfasıdır; `/sirket` (sondaki `/` olmadan) `/sirket/`'e yönlenir
- [ ] 4.4 (Kullanıcı, Namecheap) `CNAME www → <default_host_name>` kaydını ekle; `dig +short CNAME www.tonyai.io` hedefi gösterir
- [ ] 4.5 `terraform -chdir=infra apply` ile iki custom domain'i ekle; `terraform -chdir=infra output apex_validation_token` bir değer döndürür
- [ ] 4.6 (Kullanıcı, Namecheap) `TXT @ → <apex_validation_token>` ve `ALIAS @ → <default_host_name>` kayıtlarını ekle, mevcut kayıtlara dokunma; `dig +short TXT tonyai.io` yeni token'ı ve önceki SPF/doğrulama kayıtlarını birlikte gösterir, `dig +short MX tonyai.io` hâlâ `smtp.google.com`'u gösterir
- [ ] 4.7 Domain doğrulaması ve sertifikaların tamamlanmasını bekle; `az staticwebapp hostname list -n tonyai-site -g tonyai-site -o table` iki domain'i de `Ready` gösterir (apply zaman aşımına düştüyse kayıtlar yayıldıktan sonra `terraform -chdir=infra apply` tekrar çalıştırılır ve değişiklik göstermez)

## 5. Canlı doğrulama

- [ ] 5.1 `site-hosting` senaryolarını canlıda kontrol et: `https://tonyai.io/`, `https://tonyai.io/kaynaklar/tsrs-kisa-rehber/` ve `https://www.tonyai.io/sirket/` 200 döner; `curl -sI http://tonyai.io/` HTTPS'e yönlenir; `https://tonyai.io/olmayan-sayfa/` 404 döner; tarayıcıda iki domain de sertifika uyarısı vermez
- [ ] 5.2 `site-navigation` senaryolarını canlıda kontrol et: masaüstü menü, mobil menü ve footer'daki "Giriş yap" bağlantıları `https://qa.tonyai.io`'ya gider; `qa.tonyai.io`'nun yanıt verip vermediğini ayrıca not et
- [ ] 5.3 Otomatik dağıtımı doğrula: küçük bir içerik değişikliğini `main`'e push et, birkaç dakika içinde `https://tonyai.io`'da göründüğünü kontrol et; `git status` Terraform state dosyalarını göstermez

## Workflow follow-up

- Bütün görevler tamamlandıktan sonra change `/opsx:archive` ile arşivlenir; `site-hosting` ve `site-navigation` ana spec'lere taşınır.
- Ürün kalıcı adresine (`app.tonyai.io`) taşındığında `site-navigation` spec'i ve `content/copy.ts` birlikte güncellenir.
