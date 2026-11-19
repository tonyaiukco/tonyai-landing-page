# Design

## Context

`app/page.tsx` bölümleri sıralıyor. `HeroH` altı şirketin toplamını, `InvoiceRecord` aynı veri kümesindeki mart kaydını, `AuditLens` kaydın geçmişini sunuyor. `SiteShell`, `content/copy.ts` ve bazı stiller iç sayfalarda da kullanılıyor. Next.js çıktısı statik HTML olarak yayınlanıyor.

## Goals / Non-Goals

İlk prototipin amacı, telefonda ve masaüstünde bir ziyaretçinin 19,89 tCO₂e sonucunun kaynağını yardım almadan bulabilmesi. Ticari hedef olarak mevcut demo talebi esas alındı. Tasarımın sınırı pazarlama anasayfası ve burada gösterilen ürün görselleridir. Form işleme, ürün uygulaması ve barındırma ayrı iş alanlarıdır.

## Decisions

1. **Açılışın odak noktası.** Canlı sürümün “Her işletme için karbon yönetimi yazılımı.” başlığını, kısa açıklamayı ve “Demo talep edin” butonunu kullan. Masaüstünde iki sütun aynı üst çizgiden başlar. Solda başlık, açıklama ve demo düğmesi bulunur. Sağda örnek dönem etiketi, büyük 164.700 tCO₂e toplamı, kaynağı ve “Bir kaydın izini sür” denetimi tek bir dikey grup oluşturur. Altı şirketin daha küçük blokları bu grubun altında okunur. Üretim A.Ş. bloğu ile kayıt denetimi aynı faturayı açar. “Bir kaydın izini sür” seçilince fatura grup toplamının altında açılır; başlık, toplam ve açma denetimi yerini korur. Telefonda toplam ve bağlantı, kapalı şirket dağılımından önce gelir. Etkileşim kullanıcının bulunduğu yerde açılır. Yalnızca ekran görüntülerinden oluşan editoryal yön daha hızlı üretilebilir, ancak bir rakamın kaynağını bulma eylemini göstermez. Grup haritası seçeneği ise tek tesisli ziyaretçiyi ikinci plana iter.
2. **Tek veri kaynağı ve doğal gezinme.** Mevcut `demo`, `invoiceExample`, `Sourced` ve fatura detaylarını kullan. Üretim A.Ş.’nin toplamı ile tek bir faturanın katkısını ayrı etiketle. Kaynak → hesap → onay sırası statik HTML’de okunur. Yerel açılır alanlar ve gerçek bağlantılar temel davranışı sağlar. Hareketi bu yapıya ekle, tam sayfa istemci uygulaması veya kaydırma denetimi kurma. Doğrudan `#demo` açılışında hedefi kapalı bir panel içinde bırakma.
3. **Bölüm ve metin düzeni.** Platformda aynı kaydın veri girişi, inceleme ve rapor kırpımları birer cümleyle gösterilir. Ölçek bölümünde Tesis A1 kaydı yerinde dururken etrafındaki yapı tesis ile grup arasında değişir. Yöntemde mevcut başlığı, dört standardı ve merceği kullan, SSS yanıtlarını burada açılır tut. Ana anlatıda ilk okuma hedefi 450–600 kelime. Önce ve sonra 390 ve 1440 px’de aynı yöntemle ölç: sayfa açılışında ana içerikte okunan başlıkları, metinleri, butonları ve veri etiketlerini say; kapalı alanları, gizli görünümleri, menü ve altbilgiyi dışarıda bırak. Önceki 1.405 sayımı kapalı detayları da içerir.
4. **Grafik dil.** Schibsted Grotesk başlık ve gövdede, IBM Plex Mono belge kimliği, dönem ve hesap satırında kullanılır. Dolu marka blokları ve boşluk hiyerarşiyi kurar. Canlı sürümün katmanlı bina silüeti açılışın altında grup bölümüne bağlanır ve kapanışta tekrarlanır. Bu görsel bağ statik görünümde de okunur. Beyaz açılışta demo düğmesi #1C5E3A zemin üzerinde beyazdır. Başlıkta #141318, toplamda #1B5B38 kullanılır. Silüetin hemen üstündeki beyaz boşluk veri bloğunun bitişini işaretler. İlk koyu yeşil bölümde başlık soldaki metinle, Tesis/Grup denetimi sağdaki veri sütunuyla hizalanır. Telefonda başlık, açıklama ve ölçek seçimi tek sütuna iner. Mercek masaüstünde klavyeyle ve sürüklemeyle çalışır; dar ekranda, azaltılmış harekette veya betiksiz açılışta altı alan doğrudan gösterilir.

## Risks / Trade-offs

- **Ürün ekranlarının temini** → Demo veri setinden üç okunur kırpım gerekir. Ürün ekibinden alınana kadar bileşim prototipinde basit yer tutucular kullanılır; teslim görsellerinde kayıt, dönem ve birim eşleşmesi kontrol edilir.
- **Mobilde veri yoğunluğu** → 360×640 ve 390×844 tasarımlarını ilk prototipte karşılaştır. Dar ekranda görsel kırpımının yanında okunabilir HTML özeti sun.
- **Görsellerin yükü** → Boyutları tanımlı, ekran genişliğine uygun sıkıştırılmış kırpımlar kullan. İlk ekran altındaki görselleri ertelenmiş yükle. Aynı cihaz profilinde önceki ve yeni statik çıktının ilk yükünü ve LCP ölçümlerini karşılaştır.
- **Ortak içerikte yan etki** → Anasayfa düzenini yerel bileşenlerde değiştir. Ortak bağlantılar ve formlar için iç sayfaları, C/D önizlemeleri için karşılaştırma görüntülerini kontrol et.

## Yerel prototip üzerinde uygulama sınırı

Açılışı HeroH ve InvoiceRecord ile, ilk yeşil bölümü ScaleH ile düzenle. Stilleri bu bölümlere özel seçicilerle trace.css içinde tanımla. Ortak gezinme, altbilgi, iç sayfalar ve kalan üç bölüm karşılaştırma için referans kalır. Mevcut HTML ürün görünümleriyle açılış karşılaştırması yapılabilir. Üç gerçek ürün kırpımı önceki kapsamın ayrı teslimidir.

## Migration Plan

Önce 390 ve 1440 px prototipini test et. Önerilen çalışma beş hedef kullanıcıya “19,89 tCO₂e hangi kayıttan geliyor?” görevini vermek; hedef en az dört yardımsız tamamlamadır. Bulgularla açılışı düzeltip kalan bölümleri statik önizlemeye taşı. Yayından önce bölüm bağlantılarını, özellikle eski süreç bağlantısını platformun ilgili kısmına yönlendir. Sürüm geri alınırsa önceki statik çıktıyı mevcut yayın süreciyle geri yüklemek yeterlidir. Yayın sonrası mevcut ölçümler elveriyorsa eşdeğer dönemlerde anasayfadan gelen demo formu tamamlama oranını karşılaştır.
