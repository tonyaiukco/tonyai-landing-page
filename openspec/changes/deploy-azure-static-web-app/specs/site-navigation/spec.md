# Spec Delta

## Purpose

Sitenin ziyaretçiyi ürün uygulamasına götüren bağlantılarını tanımlar; ürün adresi değiştiğinde hangi bağlantıların güncelleneceğinin tek kaynağıdır.

## ADDED Requirements

### Requirement: Login links point to the current product environment
Üst menüdeki ve footer'daki "Giriş yap" bağlantıları ürün uygulamasının şu an kullanılan adresine, `https://qa.tonyai.io` adresine SHALL yönlenmelidir. Bu adres geçicidir; ürün kalıcı adresine taşındığında bütün "Giriş yap" bağlantıları birlikte güncellenir.

#### Scenario: Üst menüdeki bağlantı
- **WHEN** bir ziyaretçi herhangi bir sayfada üst menüdeki "Giriş yap" bağlantısına tıklar
- **THEN** tarayıcı `https://qa.tonyai.io` adresine gider

#### Scenario: Mobil menüdeki bağlantı
- **WHEN** bir ziyaretçi dar ekranda menüyü açıp "Giriş yap" bağlantısına tıklar
- **THEN** tarayıcı `https://qa.tonyai.io` adresine gider

#### Scenario: Footer'daki bağlantı
- **WHEN** bir ziyaretçi footer'ın "Şirket" sütunundaki "Giriş yap" bağlantısına tıklar
- **THEN** tarayıcı `https://qa.tonyai.io` adresine gider

#### Scenario: Eski adres sitede kalmaz
- **WHEN** build edilmiş sitenin HTML dosyalarında `app.tonyai.io` aranır
- **THEN** hiçbir sayfada `app.tonyai.io` adresine giden bir bağlantı bulunmaz
