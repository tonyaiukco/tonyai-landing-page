# Tasks

## 1. Repo hazırlığı

- [x] 1.1 `.gitignore`'a `infra/.terraform/`, `*.tfstate` ve `*.tfstate.*` ekle; `git check-ignore infra/terraform.tfstate infra/.terraform/x` iki yolu da ignore edilmiş olarak gösterir
- [x] 1.2 `content/copy.ts`'teki iki "Giriş yap" bağlantısını (`nav.login.href`, footer "Şirket" sütunu) `https://qa.tonyai.io` yap; `npm run build` sonrası `grep -r "app.tonyai.io" out/` sonuç döndürmez, `grep -rl "qa.tonyai.io" out/index.html` dosyayı bulur
- [x] 1.3 Static Web Apps'e ait `public/staticwebapp.config.json`'ı kaldır; `npm run build` sonrası `out/staticwebapp.config.json` yoktur

## 2. İmaj

- [x] 2.1 `nginx.conf`, `Dockerfile` ve `.dockerignore` ekle (design.md Decision 3); `docker build -t tonyai-site .` başarılı biter
- [x] 2.2 İmajı yerelde çalıştırıp kontrol et (`docker run -p 8080:8080 tonyai-site`): `/`, `/sirket/`, `/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/c/` 200; `/olmayan-sayfa/` 404 ve gövdesi sitenin 404 sayfası; `/sirket` 301 ile `Location: /sirket/`; `/_next/static/` altındaki bir dosyada `Cache-Control: ... immutable`

## 3. Terraform yapılandırması

- [x] 3.1 Terraform CLI'ı kur (`brew install hashicorp/tap/terraform`); `terraform version` 1.9 veya üstünü gösterir
- [x] 3.2 `infra/*.tf` dosyalarını App Service için yaz (design.md Decision 2, 4, 5, 6): RG, Linux B1 plan, web app (`ignore_changes` imaj), identity + federated credential + rol, `dns_ready` ile korunan hostname binding + managed sertifika + certificate binding, çıktılar; `terraform -chdir=infra validate` hatasız, `terraform fmt -check -recursive infra` temiz, `terraform -chdir=infra plan` bütün kaynakları `swedencentral`'da gösterir ve custom domain/sertifika içermez
- [x] 3.3 `infra/.terraform.lock.hcl` commit'e alınır, state dosyaları alınmaz; `git status --short infra` yalnızca `.tf` dosyalarını ve lock dosyasını gösterir

## 4. Dağıtım workflow'u ve doküman

- [x] 4.1 `.github/workflows/deploy.yml`'ı yaz (design.md Decision 4: GHCR build/push, `vars.AZURE_CLIENT_ID` yoksa Azure adımlarını atlayan OIDC login + `az webapp config container set`); YAML ayrıştırılır
- [x] 4.2 `README.md`'nin "Deploying" bölümünü App Service kurulumuyla değiştir (aşama A/B, Namecheap kayıtları, GitHub değişkenleri, `main` push = canlı, geri alma, maliyet); `next.config.ts` yorumunu güncelle. README'deki komutlar Grup 5'te yazıldığı gibi çalıştırılarak doğrulanır
- [x] 4.3 Değişiklikleri commit'leyip `main`'e push et; workflow imajı `ghcr.io/tonyaiukco/tonyai-landing-page`'e `:sha` ve `:latest` ile yükler, Azure adımları atlanır, çalışma yeşil biter
- [x] 4.4 GHCR paketinin public olduğunu doğrula; anonim token ile `ghcr.io/v2/tonyaiukco/tonyai-landing-page/manifests/latest` 200 döner
- [ ] 4.5 App Service'e geçişi (Terraform, workflow, README, change dosyaları) commit'leyip `main`'e push et; workflow yeşil biter, Azure adımları atlanır

## 5. Azure kurulumu ve DNS

- [ ] 5.1 (Kullanıcı onayıyla) Aşama A: `terraform -chdir=infra apply`; plan yalnızca App Service planını ve web uygulamasını ekler (RG, identity, federated credential, rol ilk denemeden state'te), `terraform -chdir=infra output` `default_hostname` ve deploy kimliği değerlerini gösterir
- [ ] 5.2 `deploy_client_id`, `tenant_id`, `subscription_id` çıktılarını `gh variable set AZURE_CLIENT_ID/AZURE_TENANT_ID/AZURE_SUBSCRIPTION_ID` ile repoya aktar ve `gh workflow run deploy.yml` çalıştır; çalışma Azure adımlarıyla birlikte yeşil biter
- [ ] 5.3 Geçici adreste kontrol et: `https://tonyai-site.azurewebsites.net` için 2.2'deki kontroller aynen geçer; `curl -sI http://tonyai-site.azurewebsites.net/` HTTPS'e yönlenir
- [ ] 5.4 (Kullanıcı, Namecheap) `CNAME www → <default_hostname>`, `TXT asuid.www → <domain_verification_id>`, `A @ → <web app IP>`, `TXT asuid → <domain_verification_id>` kayıtlarını ekle, mevcut kayıtlara dokunma; `dig @dns1.registrar-servers.com` dört kaydı da gösterir, `dig +short MX tonyai.io` hâlâ `smtp.google.com`'u ve `dig +short TXT tonyai.io` önceki SPF/doğrulama kayıtlarını gösterir
- [ ] 5.5 (Kullanıcı onayıyla) Aşama B: `terraform -chdir=infra apply -var dns_ready=true`; `az webapp config hostname list -g tonyai-site --webapp-name tonyai-site -o table` iki host'u `SniEnabled` gösterir ve `terraform -chdir=infra plan -var dns_ready=true` değişiklik göstermez

## 6. Canlı doğrulama

- [ ] 6.1 `site-hosting` senaryolarını canlıda kontrol et: `https://tonyai.io/`, `https://tonyai.io/kaynaklar/tsrs-kisa-rehber/` ve `https://www.tonyai.io/sirket/` 200 döner; `curl -sI http://tonyai.io/` HTTPS'e yönlenir; `https://tonyai.io/olmayan-sayfa/` 404 döner; iki domain de geçerli sertifika sunar (`curl` sertifika hatası vermez); `az resource list -g tonyai-site --query "[].location"` yalnızca `swedencentral` döndürür
- [ ] 6.2 `site-navigation` senaryolarını canlıda kontrol et: masaüstü menü, mobil menü ve footer'daki "Giriş yap" bağlantıları `https://qa.tonyai.io`'ya gider; `qa.tonyai.io`'nun yanıt verip vermediğini ayrıca not et
- [ ] 6.3 Otomatik dağıtımı doğrula: küçük bir içerik değişikliğini `main`'e push et, birkaç dakika içinde `https://tonyai.io`'da göründüğünü kontrol et; `git status` Terraform state dosyalarını göstermez

## Workflow follow-up

- Bütün görevler tamamlandıktan sonra change `/opsx:archive` ile arşivlenir; `site-hosting` ve `site-navigation` ana spec'lere taşınır.
- Ürün kalıcı adresine (`app.tonyai.io`) taşındığında `site-navigation` spec'i ve `content/copy.ts` birlikte güncellenir.
