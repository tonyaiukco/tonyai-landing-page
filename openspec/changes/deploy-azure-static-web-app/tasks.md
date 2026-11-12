# Tasks

## 1. Repo hazırlığı

- [x] 1.1 `.gitignore`'a `infra/.terraform/`, `*.tfstate` ve `*.tfstate.*` ekle; `git check-ignore infra/terraform.tfstate infra/.terraform/x` iki yolu da ignore edilmiş olarak gösterir
- [x] 1.2 `content/copy.ts`'teki iki "Giriş yap" bağlantısını (`nav.login.href`, footer "Şirket" sütunu) `https://qa.tonyai.io` yap; `npm run build` sonrası `grep -r "app.tonyai.io" out/` sonuç döndürmez, `grep -rl "qa.tonyai.io" out/index.html` dosyayı bulur
- [x] 1.3 `public/staticwebapp.config.json` ekle (`trailingSlash: "always"`, 404 → `/404.html`, `/_next/static/*` için immutable cache) ve Container Apps/App Service denemesinden kalan `Dockerfile`, `nginx.conf`, `.dockerignore`'u kaldır; `npm run build` sonrası `out/staticwebapp.config.json` geçerli JSON'dur

## 2. Terraform yapılandırması

- [x] 2.1 Terraform CLI'ı kur (`brew install hashicorp/tap/terraform`); `terraform version` 1.9 veya üstünü gösterir
- [x] 2.2 `infra/*.tf` dosyalarını design.md Decision 1, 2, 3, 5, 6'ya göre yaz (RG `tonyai-landing`, SWA `tonyai-site` Free, apex domain, `dns_ready` ile korunan www domain, identity + federated credential + rol, çıktılar; hepsi `westeurope`); `terraform -chdir=infra validate` hatasız, `terraform fmt -check -recursive infra` temiz, `terraform -chdir=infra plan` bütün bölgeli kaynakları `westeurope`'ta gösterir ve www domain'i içermez
- [x] 2.3 `infra/.terraform.lock.hcl` commit'e alınır, state dosyaları alınmaz; `git status --short infra` yalnızca `.tf` dosyalarını ve lock dosyasını gösterir

## 3. Dağıtım workflow'u ve doküman

- [x] 3.1 `.github/workflows/deploy.yml`'ı yaz (design.md Decision 3: Node 22 build, `vars.AZURE_CLIENT_ID` yoksa atlanan OIDC login + maskelenmiş token okuma + `Azure/static-web-apps-deploy@v1` upload); YAML ayrıştırılır
- [x] 3.2 `README.md`'nin "Deploying" bölümünü bu kurulumla değiştir (aşama A/B, Namecheap kayıtları, GitHub değişkenleri, `main` push = canlı, geri alma) ve `next.config.ts` yorumunu güncelle. README'deki komutlar Grup 4'te yazıldığı gibi çalıştırılarak doğrulanır
- [ ] 3.3 Değişiklikleri commit'leyip `main`'e push et; workflow build adımlarıyla yeşil biter, Azure adımları atlanır

## 4. Azure kurulumu ve DNS

- [ ] 4.1 (Kullanıcı onayıyla) Aşama A: `terraform -chdir=infra apply`; `terraform -chdir=infra output -raw default_host_name` bir `*.azurestaticapps.net` adresi, `output -raw apex_validation_token` bir değer döndürür
- [ ] 4.2 `deploy_client_id`, `tenant_id`, `subscription_id` çıktılarını `gh variable set AZURE_CLIENT_ID/AZURE_TENANT_ID/AZURE_SUBSCRIPTION_ID` ile repoya aktar ve `gh workflow run deploy.yml` çalıştır; çalışma Azure adımlarıyla birlikte yeşil biter
- [ ] 4.3 Geçici adreste kontrol et: `/`, `/sirket/`, `/kaynaklar/tsrs-kisa-rehber/`, `/tasarim/c/` 200 döner; `/olmayan-sayfa/` 404 döner ve gövdesi sitenin "Sayfa bulunamadı" sayfasıdır; `/sirket` `/sirket/`'e yönlenir; `/_next/static/` altındaki bir dosyada `Cache-Control: ... immutable`
- [ ] 4.4 (Kullanıcı, Namecheap) `CNAME www → <default_host_name>`, `TXT @ → <apex_validation_token>`, `ALIAS @ → <default_host_name>` kayıtlarını ekle, mevcut kayıtlara dokunma; `dig @dns1.registrar-servers.com` üç kaydı da gösterir, `dig +short MX tonyai.io` hâlâ `smtp.google.com`'u ve `dig +short TXT tonyai.io` önceki SPF/doğrulama kayıtlarını gösterir
- [ ] 4.5 (Kullanıcı onayıyla) Aşama B: `terraform -chdir=infra apply -var dns_ready=true`; ikinci `terraform -chdir=infra plan -var dns_ready=true` değişiklik göstermez
- [ ] 4.6 Domain doğrulaması ve sertifikaları bekle; `az staticwebapp hostname list -n tonyai-site -g tonyai-landing -o table` iki domain'i de `Ready` gösterir

## 5. Canlı doğrulama

- [ ] 5.1 `site-hosting` senaryolarını canlıda kontrol et: `https://tonyai.io/`, `https://tonyai.io/kaynaklar/tsrs-kisa-rehber/` ve `https://www.tonyai.io/sirket/` 200 döner; `curl -sI http://tonyai.io/` HTTPS'e yönlenir; `https://tonyai.io/olmayan-sayfa/` 404 döner; iki domain de geçerli sertifika sunar; `az resource list -g tonyai-landing --query "[].location"` yalnızca `westeurope` döndürür
- [ ] 5.2 `site-navigation` senaryolarını canlıda kontrol et: masaüstü menü, mobil menü ve footer'daki "Giriş yap" bağlantıları `https://qa.tonyai.io`'ya gider; `qa.tonyai.io`'nun yanıt verip vermediğini ayrıca not et
- [ ] 5.3 Otomatik dağıtımı doğrula: küçük bir içerik değişikliğini `main`'e push et, birkaç dakika içinde `https://tonyai.io`'da göründüğünü kontrol et; `git status` Terraform state dosyalarını göstermez

## Workflow follow-up

- Bütün görevler tamamlandıktan sonra change `/opsx:archive` ile arşivlenir; `site-hosting` ve `site-navigation` ana spec'lere taşınır.
- Ürün kalıcı adresine (`app.tonyai.io`) taşındığında `site-navigation` spec'i ve `content/copy.ts` birlikte güncellenir.
- İstenirse kullanılmayan `ghcr.io/tonyaiukco/tonyai-landing-page` paketi GitHub'dan silinir.
