# Spec Delta

## Purpose

Pazarlama sitesinin hangi adreslerde, hangi güvenlik koşullarıyla yayınlandığını ve `main` dalındaki içeriğin canlıya nasıl ulaştığını tanımlar.

## ADDED Requirements

### Requirement: Site serves on the apex domain
Site `https://tonyai.io` adresinde SHALL yayınlanmalı ve `main` dalındaki son başarılı build'in içeriğini sunmalıdır.

#### Scenario: Ana sayfa apex domain'de açılır
- **WHEN** bir ziyaretçi `https://tonyai.io/` adresini açar
- **THEN** site 200 durum koduyla ana sayfayı sunar

#### Scenario: Alt sayfa apex domain'de açılır
- **WHEN** bir ziyaretçi `https://tonyai.io/kaynaklar/tsrs-kisa-rehber/` adresini açar
- **THEN** site 200 durum koduyla o makaleyi sunar

### Requirement: Site serves the same content on www
Site `https://www.tonyai.io` adresinde de SHALL yayınlanmalı ve apex domain ile aynı içeriği aynı yollar altında sunmalıdır.

#### Scenario: www adresi aynı sayfayı gösterir
- **WHEN** bir ziyaretçi `https://www.tonyai.io/sirket/` adresini açar
- **THEN** site 200 durum koduyla `https://tonyai.io/sirket/` ile aynı sayfayı sunar

### Requirement: HTTPS with a valid certificate
Her iki domain de tarayıcıların güvendiği geçerli bir TLS sertifikasıyla SHALL sunulmalı; HTTP istekleri HTTPS'e yönlendirilmelidir.

#### Scenario: Geçerli sertifika
- **WHEN** bir tarayıcı `https://tonyai.io` veya `https://www.tonyai.io` adresine bağlanır
- **THEN** bağlantı sertifika uyarısı olmadan kurulur

#### Scenario: HTTP isteği HTTPS'e yönlenir
- **WHEN** bir ziyaretçi `http://tonyai.io/` adresini açar
- **THEN** HTTPS adresine yönlendirilir

### Requirement: Unknown paths show the site's 404 page
Sitede karşılığı olmayan bir yol istendiğinde site 404 durum koduyla kendi 404 sayfasını SHALL göstermelidir.

#### Scenario: Var olmayan sayfa
- **WHEN** bir ziyaretçi `https://tonyai.io/olmayan-sayfa/` adresini açar
- **THEN** site 404 durum koduyla sitenin kendi tasarımındaki 404 sayfasını gösterir

### Requirement: Automatic deployment from main
`main` dalına yapılan her push, ek bir elle müdahale gerekmeden siteyi yeniden build edip canlıya SHALL almalıdır. Build başarısız olursa canlıdaki önceki sürüm değişmeden kalmalıdır.

#### Scenario: Başarılı push canlıya çıkar
- **WHEN** `main` dalına içerik değişikliği içeren bir commit push edilir
- **THEN** değişiklik birkaç dakika içinde `https://tonyai.io` adresinde görünür

#### Scenario: Başarısız build canlıyı bozmaz
- **WHEN** `main` dalına build'i kıran bir commit push edilir
- **THEN** dağıtım başarısız olarak işaretlenir ve canlı site önceki sürümü sunmaya devam eder

### Requirement: Existing mail records remain intact
Site için yapılan DNS değişiklikleri `tonyai.io` domain'inin mevcut e-posta ve doğrulama kayıtlarını (MX, SPF ve doğrulama TXT kayıtları) SHALL korumalıdır.

#### Scenario: E-posta kayıtları değişmez
- **WHEN** site DNS kayıtları eklendikten sonra `tonyai.io` için MX ve TXT kayıtları sorgulanır
- **THEN** önceki MX kaydı ve SPF ile doğrulama TXT kayıtları aynen yerinde durur

### Requirement: Hosting resources stay in West Europe
Siteyi barındıran bütün Azure kaynakları `westeurope` bölgesinde SHALL bulunmalıdır.

#### Scenario: Kaynakların bölgesi
- **WHEN** sitenin kaynak grubundaki kaynaklar bölgeleriyle listelenir
- **THEN** kaynak grubu dahil her kaynağın bölgesi `westeurope`'tur

### Requirement: Deployment secrets stay out of the repository
Siteyi yayınlamaya yetki veren hiçbir sır (deploy kimlik bilgisi, Terraform state) public repoya SHALL commit'lenmemelidir.

#### Scenario: State dosyası git'te görünmez
- **WHEN** Terraform yerelde çalıştırıldıktan sonra `git status` çalıştırılır
- **THEN** state dosyaları ve Terraform çalışma klasörü takip edilmeyen dosyalar arasında görünmez
