# Proposal

## Why

İlk yerel prototip, on bölümü beşe indirdi ve örnek faturayı açılışa taşıdı. Masaüstünde ziyaretçi hâlâ örneğin neyi topladığını anlamadan altı şirket rakamıyla karşılaşıyor. Yeni düzen önce grup toplamını, hemen altında bu rakama katkı yapan bir faturayı inceleme yolunu gösterecek.

## What Changes

- Anasayfayı beş bölüme indir: açılış ve kayıt, tesisten gruba, platform, yöntem ve güven, demo daveti.
- Örnek toplamın içinden seçilen şirket bloğunu kaynak belgeye dönüştür. Telefonda önce toplamı ve kayıt bağlantısını, ardından isteğe bağlı şirket dağılımını göster.
- Tekrarlanan süreç ve modül listelerini aynı kayda ait üç ürün görünümüyle birleştir. İlk okumada görünen ana içeriği 450–600 kelime aralığında hedefle.
- Canlı anasayfanın bina silüetini açılıştan grup bölümüne geçişte ve kapanışta kullan. Logo geometrisini, örnek veri etiketini, kaynağı görünen rakamları, erişilebilir denetim merceğini ve demo yolunu sürdür.

### İlk prototip üzerine tasarım revizyonu

SMC’nin beyaz açılışında geniş bir grafik, kısa ürün vaadiyle teknik veriler arasında geçiş kuruyor. TonyAI’da bu görevi mevcut bina silüeti üstlenecek. Açılışta solda başlık ve demo daveti, sağda örnek dönem, kaynaklı toplam, fatura bağlantısı ve ardından şirket dağılımı yer alacak. İlk yeşil bölüm bu iki sütunun hizasını sürdürecek. Karşılaştırma için başlangıç noktası bugünkü yerel prototiptir. [SMC tasarım kaydı](https://www.awwwards.com/sites/sustainable-metal-cloud)

## Capabilities

### New Capabilities

### Modified Capabilities

- `homepage-look` — Açılışta kayıt keşfi, mobil okuma sırası, beş bölümlük anlatı ve ürün görünümleri.
- `site-palette` — Bina silüetiyle açılan marka yeşili bantlar ve aralarındaki açık yüzeyler. Beyaz açılıştaki demo düğmesine ürünün koyu marka yeşili uygulanır.

## Impact

Uygulama alanı `app/page.tsx`, `components/looks/home/`, anasayfaya ait içerik ve demo görselleridir. Ortak metin, navigasyon ve stil tüketicileri arasında iç sayfalar ile tasarım önizlemeleri bulunduğundan değişiklikler anasayfaya kapsamlanır. Mevcut statik yayında form hedefleri ve dışarıdan gelen bölüm bağlantıları çalışmaya devam eder.
