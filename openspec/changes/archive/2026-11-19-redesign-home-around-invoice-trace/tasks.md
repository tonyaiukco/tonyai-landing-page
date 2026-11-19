# Tasks

## 1. İçerik ve kompozisyon · 1–2 gün

- [x] 1.1 Mevcut statik anasayfada 390 ve 1440 px için görünür kelime sayısını, ekran görüntülerini, ilk yük boyutunu ve mobil LCP değerini kaydet. Yeni ölçümün aynı profil ve sayım kapsamıyla tekrarlanabildiğini doğrula.
- [x] 1.2 On bölümün içeriğini beş bölümle eşleştir. Metin taslağında ilk okuma için 450–600 kelimeyi hedefle; standartların, soruların ve kaynak gösterimlerinin yeni yerini işaretle.
- [x] 1.3 İki açılış kompozisyonu hazırla. 390 px’de toplamın ve kaynak bağlantısının dağılımdan önce geldiğini, 1440 px’de altı katkının grup toplamıyla ilişkisini kontrol et.

## 2. Fatura prototipi · 2–3 gün

- [x] 2.1 Mevcut örnek veriden toplam → şirket → fatura → hesap → onaylı satır yolunu kur. 45.000 kWh, 45 MWh × 0,442 ve 19,89 tCO₂e değerlerini, dönem ve belge kimliğini kaynakla karşılaştır.
- [x] 2.2 Seçilen bloğun belgeye dönüşmesini ve mobilde yerinde açılıp kapanmasını prototiple. Dokunma, klavye, azaltılmış hareket ve JavaScript kapalıyken aynı kanıta ulaşılabildiğini; kapanışta odağın geri geldiğini doğrula.
- [x] 2.3 Prototipte kaynağı bulma görevini dene. Beş hedef kullanıcıyla test yapılabildiğinde yardımsız tamamlamaları kaydet (hedef 4/5); kullanıcı erişimi yoksa yalnızca gerçekleştirilen kontrolleri bildir. Tespit edilen gezinme sorunlarını ikinci geçişte doğrula.

## 3. Sayfa ve ürün görselleri · 3–5 gün

- [ ] 3.1 Aynı demo kaydının veri girişi, inceleme ve rapor ekranlarından üç gerçek kırpım hazırla. Dönemi, şirketi ve gizlenmesi gereken alanları kontrol et; seçili görünümü ve metin karşılığını 390 px’de oku.
- [x] 3.2 Çalışan açılışı ve beş bölümü anasayfaya yerleştir. Tesis/grup geçişinde aynı mart kaydının bağlamını koruduğunu, dört standardın, SSS’nin, altı denetim alanının ve kapanıştaki demo butonunun erişilebilir olduğunu doğrula.
- [x] 3.3 Açılış ve kapanışta silüeti, grup ve denetim bölümlerinde koyu yeşili ve platformda açık zemini uygula. Mevcut palet ve kontrast kontrollerini çalıştır, gerçek ekranlarda anlam taşıyan her renkli işareti metinle doğrula.
- [x] 3.4 Beş eski bölüm bağlantısını anlamlı yerlere bağla ve tasarım notlarındaki bölüm haritasını güncelle. Her URL’yi doğrudan açarak içeriğin sabit menünün altında kaldığını ve denetim merceğine klavyeyle erişildiğini doğrula.

## 4. Statik önizleme ve yayın öncesi kontrol · 1–2 gün

- [x] 4.1 Üretim çıktısını oluştur ve 360×640, 390×844, 820 px ve 1440 px’de aç. Yatay taşma, kırpılan birim ve erişilemeyen kontrol bulunmadığını; kısa telefonda ana demo butonunun alt kenarının ilk 540 px içinde kaldığını kontrol et.
- [x] 4.2 Aynı profille kelime sayısı, aktarım boyutu ve LCP karşılaştırmasını kaydet. Mobil Lighthouse erişilebilirliğinde en az 95 puan ve sıfır kontrast hatasını doğrula.
- [x] 4.3 Demo ve kayıt bağlantılarını önizlemede izle. İç sayfaları ve C/D önizlemelerini başlangıç görüntüleriyle karşılaştırarak ortak stil veya metin değişiminin etkisini kontrol et.

## 5. Açılış ve grup bölümünün yeni kompozisyonu

- [x] 5.1 Bugünkü yerel prototipin açılışını ve ilk yeşil bölümünü 390×844 ve 1440×900 boyutlarında kaydet. Aynı örnek veri, yazı tipleri ve hareket ayarıyla karşılaştırma yapılabilsin.
- [x] 5.2 Açılıştaki toplamı, kaynağı ve fatura denetimini şirket dağılımının üstüne yerleştir. Yalnızca açılıştaki demo düğmesine ürün yeşilini ve beyaz etiketi uygula. Görsel sıra ile klavye ve ekran okuyucu sırasını karşılaştır. Demo bağlantısını, doğrudan `/#demo` erişimini ve kısa telefonda düğmenin 540 px sınırını kontrol et.
- [x] 5.3 Bina silüetinin üst boşluğunu ve grup bölümünün sütunlarını açılışa göre ayarla. 1440 px’de sütun hizalarını, 390 px’de tek sütun sırasını ve Tesis/Grup geçişinde yerleşimin sabit kaldığını doğrula.
- [x] 5.4 Statik önizlemeyi 5.1 görüntüleriyle karşılaştır. Diğer bölümler ve iç sayfalar için bölüm bazlı karşılaştırma yap. 360, 390, 820 ve 1440 px’de taşmayı, klavye odağını, azaltılmış hareketi, betiksiz fatura erişimini ve yeni düğmenin kontrastını kontrol et. Açılış sırasını ve düğme rengini yerel tasarım notlarına işle.

## Workflow follow-up

- Yayından sonra mevcut ölçüm altyapısı destekliyorsa anasayfa kaynaklı demo formu tamamlama oranını karşılaştırılabilir dönemler üzerinden değerlendir.

## Local verification of the first prototype

| Viewport | Visible words, before → after | Initial transfer, before → after | Local LCP, before → after |
| --- | --- | --- | --- |
| 390 × 844 | 1,184 → 452 | 900,583 → 807,550 bytes | 116 → 80 ms |
| 1440 × 900 | 1,194 → 461 | 971,321 → 878,288 bytes | 64 → 68 ms |

Cold browser contexts, Chrome, reduced motion, localhost static export. Word counts use rendered main text. Transfer includes the navigation and resources loaded through network idle. LCP is one local observation at each size. Mobile Lighthouse accessibility scored 100 with a passing contrast audit. The palette audit passed at both widths. The demo, registration and C/D preview first-screen comparisons matched their baseline pixels at both widths.

The invoice interaction, keyboard return, three product stages, scale switch and five direct anchors passed browser checks at 360, 390, 820 and 1440 px, including a separate script-disabled phone run. No participant study was conducted. Task 3.1 awaits three actual product crops of this record. The local prototype presents its source data in HTML.
