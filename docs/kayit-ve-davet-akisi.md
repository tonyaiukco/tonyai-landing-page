# TonyAI — Kayıt sayfası, davet e-postası ve demo talebi akışı

*Geliştirici için teknik not. Sürüm 1, 10 Kasım 2026. Sahibi: Emre (COO). Sorular: hello@tonyai.io*

Bu belge üç şeyi tarif eder: (1) tonyai.io'daki **Kayıt** sayfasının ne gönderdiği ve karşılığında ne beklediği, (2) kayıt sonrası otomatik **davet e-postası**, (3) **demo taleplerinin** ekip içinde nasıl ele alındığı. Site statik (Next.js export); sunucu tarafındaki her şey uygulama (app.tonyai.io) tarafında yazılır.

---

## 1. Kayıt sayfası (`tonyai.io/kayit/`)

### 1.1 Form alanları

| Alan | `name` | Zorunlu | Doğrulama (istemci) |
| --- | --- | --- | --- |
| Ad | `firstName` | evet | boş olamaz |
| Soyad | `lastName` | evet | boş olamaz |
| Şirket | `company` | evet | boş olamaz |
| Unvan | `title` | evet | boş olamaz |
| İş e-postası | `email` | evet | e-posta biçimi; gmail/hotmail/outlook/yahoo/icloud/yandex/protonmail/live/msn reddedilir ("Lütfen şirket e-posta adresinizi kullanın.") |
| KVKK onayı | `consent` | evet | işaretli olmalı |
| Bal küpü | `website` | — | doluysa gönderilmez (bot) |

Form, sayfa yüklendiğinde JavaScript ile çalışır; `NEXT_PUBLIC_REGISTER_ENDPOINT` tanımlı değilse hello@tonyai.io'ya önceden doldurulmuş bir e-posta açar (geçici çözüm).

### 1.2 İstek

```
POST {NEXT_PUBLIC_REGISTER_ENDPOINT}
Content-Type: application/json

{
  "firstName": "Ayşe",
  "lastName": "Yılmaz",
  "company": "Örnek Sanayi A.Ş.",
  "title": "Sürdürülebilirlik Müdürü",
  "email": "ayse.yilmaz@orneksanayi.com.tr",
  "consent": "on",
  "source": "tonyai.io/kayit",
  "lang": "tr"
}
```

Önerilen uç nokta: `https://app.tonyai.io/api/public/register` (CORS: yalnızca `https://tonyai.io` ve `https://www.tonyai.io`).

### 1.3 Yanıtlar

| Durum | Ne zaman | Site ne yapar |
| --- | --- | --- |
| `202 Accepted` | Kayıt kuyruğa alındı, davet gönderilecek | `/kayit/tesekkurler/` sayfasına yönlendirir |
| `200 OK` | Aynı e-posta zaten kayıtlı ve aktif | Yine teşekkür sayfası; gövde `{"status":"exists"}` olsun, e-postada "zaten hesabınız var, giriş yapın" varyantı gider (bkz. 2.3) |
| `400` | Doğrulama hatası | Hata kutusu: "Kayıt gönderilemedi…" |
| `429` | Hız sınırı | Aynı hata kutusu |

**Hiçbir durumda** yanıt, e-postanın kayıtlı olup olmadığını sayfada açık etmesin (hesap keşfi). Teşekkür sayfası iki durumda da aynıdır.

### 1.4 Sunucu tarafı kurallar

1. Tekrar doğrula (boş alan, e-posta biçimi, ücretsiz posta alan adları, `consent`).
2. Hız sınırı: IP başına 5 istek / 10 dk; e-posta başına 3 davet / 24 saat.
3. Bal küpü dolu → `202` döndür ama hiçbir şey yapma.
4. **Standart kullanıcı** kaydı oluştur: `status = invited`, rol `standard_user`, `company` metnini normalize et (büyük/küçük harf, "A.Ş."/"AŞ" vb.) ve aynı e-posta alan adına sahip mevcut bir şirket kaydı varsa ona bağla; yoksa yeni şirket oluştur ve ilk kullanıcıyı `company_admin_candidate` olarak işaretle (biz onaylayana kadar yetkisi standart kalır).
5. Tek kullanımlık davet jetonu üret (en az 32 bayt rastgele, 48 saat geçerli, hash'lenerek saklanır).
6. Davet e-postasını gönder (bölüm 2). Gönderici: `TonyAI <hello@tonyai.io>`; Reply-To aynı. SPF/DKIM/DMARC zaten tonyai.io için ayarlı (Google Workspace).
7. `hello@tonyai.io` grubuna iç bildirim gönder (bölüm 3.2'deki şablon). Böylece üç kurucu her yeni kaydı görür.
8. KVKK: onay zamanı, IP ve metin sürümünü kaydet; kayıt tamamlanmazsa 30 gün sonra sil.
9. Davet bağlantısı tıklanınca: şifre belirleme ekranı → hesap `active` → uygulamaya giriş. Jeton süresi dolmuşsa "Bağlantının süresi dolmuş; yeniden kaydolun" sayfası (tonyai.io/kayit/ bağlantısıyla).

### 1.5 Ortam değişkeni (site)

`.env.production` içinde `NEXT_PUBLIC_REGISTER_ENDPOINT=https://app.tonyai.io/api/public/register` → `npm run build`.

---

## 2. Davet e-postası

### 2.1 Tasarım kuralları

- Tek sütun, en fazla 600 px, beyaz zemin, TonyAI yeşili `#2B5A3E` yalnızca düğme ve küçük vurgular için; marka kiti renkleri.
- Logo: `https://tonyai.io/imza-logo.png` (120×32) üstte solda. Site yayına girene kadar aynı dosyayı uygulamanın kendi alan adından sunun.
- Yazı tipi: sistem yazı tipi (Arial/Helvetica); e-posta istemcileri web yazı tiplerini yüklemez.
- Tek bir birincil eylem: **Şifremi belirle ve giriş yap**. Bağlantı düğmenin altında düz metin olarak da yazılır (kopyalanabilsin).
- Kısa, samimi, kurumsal. "Merhaba Ayşe," ile başlar. Emoji yok.
- Alt bilgi: neden bu e-postayı aldığı, bağlantının 48 saat geçerli olduğu, TonyAI · İstanbul · tonyai.io, KVKK bağlantısı.
- Türkçe karakterler UTF-8; konu satırı 50 karakterin altında.

### 2.2 Konu ve ön izleme

Konu: `TonyAI daveti: hesabınızı tamamlayın`
Ön izleme metni (preheader): `Ayşe, şifrenizi belirleyin ve ilk kaydınızı girin. Bağlantı 48 saat geçerli.`

### 2.3 HTML şablonu

Yer tutucular: `{{firstName}}`, `{{company}}`, `{{inviteUrl}}`, `{{expiresAt}}` (ör. "12 Kasım 2026, 14:05").

```html
<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>TonyAI daveti</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#1b211e;">
<span style="display:none;font-size:1px;color:#f4f6f3;max-height:0;overflow:hidden;">{{firstName}}, şifrenizi belirleyin ve ilk kaydınızı girin. Bağlantı 48 saat geçerli.</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f3;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;border:1px solid #d8ddd8;">
      <tr><td style="padding:28px 32px 8px;">
        <a href="https://tonyai.io" style="text-decoration:none;"><img src="https://tonyai.io/imza-logo.png" width="120" height="32" alt="TonyAI" style="display:block;border:0;"></a>
      </td></tr>
      <tr><td style="padding:16px 32px 0;font-size:22px;line-height:30px;font-weight:bold;">
        Merhaba {{firstName}}, TonyAI'a hoş geldiniz.
      </td></tr>
      <tr><td style="padding:12px 32px 0;font-size:16px;line-height:25px;color:#4a5550;">
        {{company}} için TonyAI hesabınız hazır. Şifrenizi belirleyin; birkaç dakika içinde ilk faaliyet verinizi girebilir ya da mevcut tablonuzu yükleyebilirsiniz.
      </td></tr>
      <tr><td style="padding:24px 32px 8px;">
        <a href="{{inviteUrl}}" style="display:inline-block;background:#2b5a3e;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;line-height:48px;padding:0 24px;border-radius:999px;">Şifremi belirle ve giriş yap</a>
      </td></tr>
      <tr><td style="padding:0 32px 8px;font-size:13px;line-height:20px;color:#5f6963;">
        Düğme çalışmazsa bu bağlantıyı tarayıcınıza yapıştırın:<br>
        <a href="{{inviteUrl}}" style="color:#2b5a3e;word-break:break-all;">{{inviteUrl}}</a>
      </td></tr>
      <tr><td style="padding:16px 32px 0;font-size:15px;line-height:24px;color:#4a5550;">
        Girişten sonra sizi üç kısa adım karşılar: şirket bilgileriniz, ilk dönem ve ilk kayıt. Her adımda yanınızdayız; takıldığınız yerde bu e-postayı yanıtlamanız yeter.
      </td></tr>
      <tr><td style="padding:24px 32px 28px;font-size:15px;line-height:24px;color:#4a5550;">
        İyi çalışmalar,<br><strong style="color:#1b211e;">TonyAI ekibi</strong><br>Arda, Emre ve Deniz
      </td></tr>
      <tr><td style="padding:16px 32px 24px;border-top:1px solid #e9ede8;font-size:12px;line-height:18px;color:#5f6963;">
        Bu e-postayı tonyai.io/kayit üzerinden yapılan kayıt nedeniyle aldınız. Bağlantı {{expiresAt}} tarihine kadar geçerlidir; kaydı siz yapmadıysanız bu e-postayı yok sayabilirsiniz, hesap oluşturulmaz.<br><br>
        TonyAI · İstanbul · <a href="https://tonyai.io" style="color:#2b5a3e;">tonyai.io</a> · <a href="https://tonyai.io/kvkk/" style="color:#2b5a3e;">KVKK Aydınlatma Metni</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>
```

Düz metin sürümü (her zaman birlikte gönderin):

```
Merhaba {{firstName}}, TonyAI'a hoş geldiniz.

{{company}} için TonyAI hesabınız hazır. Şifrenizi belirlemek ve giriş yapmak için:
{{inviteUrl}}

Bağlantı {{expiresAt}} tarihine kadar geçerli. Kaydı siz yapmadıysanız bu e-postayı yok sayabilirsiniz; hesap oluşturulmaz.

İyi çalışmalar,
TonyAI ekibi — Arda, Emre ve Deniz
TonyAI · İstanbul · tonyai.io · KVKK: tonyai.io/kvkk
```

**"Zaten kayıtlı" varyantı** (`status: exists`): aynı şablon; başlık "Hesabınız zaten var." gövde "Bu adresle bir TonyAI hesabı bulunuyor. Giriş yapmak için düğmeyi kullanın; şifrenizi unuttuysanız giriş ekranından sıfırlayabilirsiniz." düğme "Giriş yap" → `https://app.tonyai.io/giris`.

### 2.4 Test listesi

Gmail web ve iOS, Outlook (Windows ve web), Apple Mail; koyu modda logo ve düğme okunur mu; bağlantı tek kullanımlık mı; süresi dolmuş jeton; aynı e-postayla ikinci kayıt; ücretsiz posta adresi reddi; Türkçe karakterler konu satırında.

---

## 3. Demo talebi akışı (tonyai.io/demo/)

Form şu an `NEXT_PUBLIC_FORM_ENDPOINT`'e JSON gönderir (`name, company, email, phone, topic="Demo talebi", size, message, consent, page, lang`); uç nokta yoksa hello@'ya e-posta açar. Sayfadaki söz: **"Birkaç iş saati içinde dönüyoruz."** Akış bu sözü tutacak şekilde kurulur.

### 3.1 Akış

```
Form gönderildi
  └─► Sunucu: kaydet (demo_requests), 202 döndür
        ├─► Talep sahibine otomatik "aldık" e-postası (3.3)
        └─► hello@tonyai.io grubuna iç bildirim (3.2) ── Google Grup "Ortak Gelen Kutusu"
                └─► Nöbetçi kurucu talebi kendine atar (Grup'ta "Bana ata")
                      ├─► 1 iş saati içinde kişisel yanıt: 2 takvim önerisi + 2 kısa soru (yapı, dönem)
                      ├─► Görüşme (30 dk): ekran paylaşımıyla platform, mümkünse talep sahibinin yapısıyla
                      └─► Görüşme sonrası aynı gün:
                            ├─► Standart kullanıcı daveti (bölüm 2) → 14 gün deneme erişimi, örnek veri yüklü
                            └─► Teklif: şirket sayısı + lokasyon + kullanıcı sayısına göre standart teklif şablonu (PDF)
                                  └─► 7. gün ve 13. gün hatırlatma; kapanış ya da "sonra" olarak işaretle
```

**Nöbet**: haftalık dönüşüm, Pazartesi 09:00'da başlar: Emre → Arda → Deniz. Nöbetçi müsait değilse Grup'ta yeniden atar. Hedef: ilk yanıt ≤ 4 iş saati, ortalama ≤ 2.

**Niteleme (formdan otomatik)**: `size = 6–20` veya `20'den fazla` → "öncelikli" etiketi; `topic = Teklif almak istiyorum` → teklif şablonu görüşmeden önce hazırlanır; ücretsiz e-posta alan adı → yine yanıtlanır ama deneme erişimi görüşme sonrasına bırakılır.

### 3.2 İç bildirim (hello@ grubuna)

Konu: `[Demo] {{company}} · {{size}} şirket · {{name}}`

```
Yeni demo talebi — {{receivedAt}}

Kim:      {{name}} · {{email}} · {{phone}}
Şirket:   {{company}} ({{size}} şirket)
Konu:     {{topic}}
Mesaj:    {{message}}
Sayfa:    {{page}}

Nöbetçi: {{onCall}} — ilk yanıt hedefi {{dueAt}}
Yanıtla: bu e-postayı Grup'ta kendine ata, sonra talep sahibine yaz.
```

### 3.3 Talep sahibine otomatik "aldık" e-postası

Aynı görsel şablon (2.3). Konu: `Demo talebinizi aldık`. Gövde:

> Merhaba {{firstName}},
> Talebiniz bize ulaştı ve şimdiden incelemeye aldık. Birkaç iş saati içinde {{onCallFirstName}} size takvim önerisiyle dönecek. Bu arada bir sorunuz olursa bu e-postayı yanıtlamanız yeter.
> İyi çalışmalar, TonyAI ekibi

Düğme yok; bu e-posta bir söz verir, bir şey istemez.

### 3.4 Kayıt tutma

Tek tablo yeter: `demo_requests (id, received_at, name, company, email, phone, size, topic, message, page, assigned_to, first_reply_at, meeting_at, trial_invited_at, quote_sent_at, outcome, notes)`. Haftalık bakış: açık talepler, ilk yanıt süresi, görüşmeye dönüşme, teklife dönüşme. İlk üç ay için bir Google Sheet de olur; önemli olan `first_reply_at` alanının dolması.

---

## 4. Sitede yapılacaklar (Claude)

- `/kayit/` ve `/kayit/tesekkurler/` sayfaları eklendi (10 Kasım). Menüye ve "Giriş yap" yanına "Kayıt ol" bağlantısı, Atmosfer tasarımı tüm siteye uygulanırken eklenecek.
- Geliştirici uç noktaları verdiğinde `.env.production`'a `NEXT_PUBLIC_REGISTER_ENDPOINT` ve `NEXT_PUBLIC_FORM_ENDPOINT` yazılıp site yeniden derlenecek.
