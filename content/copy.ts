/**
 * All site copy lives here. Turkish is the launch language; `en` follows once
 * the Turkish is approved. Components import from this file and never
 * hard-code a sentence.
 *
 * Structure and register follow the enterprise carbon-software pattern Emre
 * chose as the template (short, assertive, second person, benefit first),
 * written for TonyAI: every business, groups consolidated just as easily, audit trail, TSRS, AI-assisted import and forecasting ("öngörü") as work in progress.
 *
 * Demo figures are illustrative and consistent across the site:
 * six subsidiaries, 164.700 tCO₂e consolidated, 2026 Ç1.
 */

export type Status = "ok" | "warn" | "miss";

export const demo = {
  period: "2026 · Ç1",
  subsidiaries: [
    { name: "Üretim A.Ş.", sector: "İmalat", city: "Kocaeli", value: 52600, status: "ok" as Status },
    { name: "Enerji A.Ş.", sector: "Enerji", city: "İstanbul", value: 41300, status: "ok" as Status },
    { name: "Lojistik A.Ş.", sector: "Taşımacılık", city: "İzmir", value: 31900, status: "ok" as Status },
    { name: "Dağıtım A.Ş.", sector: "Dağıtım", city: "Ankara", value: 19400, status: "warn" as Status },
    { name: "Ticaret A.Ş.", sector: "Toptan", city: "Bursa", value: 11200, status: "ok" as Status },
    { name: "Perakende A.Ş.", sector: "Perakende", city: "Antalya", value: 8300, status: "ok" as Status },
  ],
  total: 164700,
  scopes: [
    { label: "Kapsam 1", value: 77400 },
    { label: "Kapsam 2", value: 63500 },
    { label: "Kapsam 3", value: 23800 },
  ],
  locations: 14,
  categories: 11,
};

export const copy = {
  meta: {
    title: "TonyAI — İşletmeler için karbon yönetimi yazılımı",
    description:
      "Kapsam 1, 2 ve 3 emisyonlarınızı tek platformda toplayın, hesaplayın, onaylayın ve TSRS'ye uygun raporlayın. İşiniz için karbon muhasebesi: her sektöre özel, size göre uyarlanmış yaklaşım.",
    siteName: "TonyAI",
    url: "https://tonyai.io",
    locale: "tr_TR",
  },

  nav: {
    items: [
      { label: "Platform", href: "/#platform" },
      { label: "Yöntem", href: "/#yontem" },
      { label: "Kaynaklar", href: "/kaynaklar/" },
      { label: "Şirket", href: "/sirket/" },
      { label: "Bize Ulaşın", href: "/bize-ulasin/" },
    ],
    login: { label: "Giriş yap", href: "https://qa.tonyai.io" },
    register: { label: "Kayıt ol", href: "https://qa.tonyai.io/register" },
    cta: { label: "Demo talep edin", href: "/demo/" },
    langSwitch: { current: "TR", other: "EN", soon: "İngilizce sürüm yakında" },
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    skip: "İçeriğe geç",
  },

  hero: {
    eyebrow: "Karbon yönetimi yazılımı",
    title: "Her işletme için karbon yönetimi yazılımı.",
    lead:
      "Kapsam 1, 2 ve 3 emisyonlarınızı tek platformda toplayın, hesaplayın, onaylayın ve TSRS'ye uygun raporlayın. Tek şirket için sade; çok şirketli gruplar için aynı kolaylıkla konsolide.",
    lead2:
      "Yalnızca hesaplamak için değil; iklim ve sürdürülebilirlik hedefleriniz doğrultusunda dekarbonizasyon çalışmalarınız için yapay zekâ destekli bir araç. Karbon öngörüsü ve dekarbonizasyon önerileri aynı platformda.",
    primary: { label: "Bugün demo talep edin", href: "/demo/" },
    secondary: { label: "Demoyu izleyin", href: "/#demo" },
    trust: ["ISO 14064-1", "GHG Protokolü", "TSRS", "IFRS S2"],
    flow: {
      label: "TonyAI ile akış",
      steps: [
        { verb: "Topla", keywords: ["Mevcut tablolar", "Kanıt dokümanlar", "Tek entegre sistem"] },
        { verb: "Hesapla", keywords: ["ISO 14064-1", "IPCC AR6", "GHG Protokolü"] },
        { verb: "Onayla", keywords: ["İnceleme", "Onay", "Değişiklik geçmişi"] },
        { verb: "Raporla", keywords: ["GRI", "TSRS", "IFRS S2"] },
        { verb: "Öngör", keywords: ["Hedef", "Senaryo", "Dekarbonizasyon"] },
      ],
      caption: "Her adım aynı yerde, her rakam kaynağıyla.",
    },
    stage: {
      before: "Bağlı ortaklıklar",
      after: "Konsolide toplam",
      unit: "tCO₂e",
      status: { ok: "Onaylandı", warn: "İncelemede", miss: "Eksik" },
      footer: "6 şirket · 14 lokasyon · 11 kategori",
      approved: "Onay akışından geçti",
      scrollHint: "Kaydırın",
      srSummary:
        "TonyAI ile akış: topla, hesapla, onayla, raporla, öngör. Her adım aynı platformda, her rakam kaynağıyla.",
    },
  },

  strip: {
    label: "Dayandığı standartlar ve kapsam",
    standards: ["ISO 14064-1", "GHG Protokolü", "TSRS", "IFRS S2"],
    facts: [
      { value: "3", label: "kapsam, tek platformda" },
    ],
  },

  difference: {
    eyebrow: "TonyAI farkı",
    title: "Tek şirket için sade. Grup için bir o kadar kolay.",
    lead: "Tek lokasyonlu bir işletmeye de, yirmi şirketli bir holdinge de en sade ve verimli akışı öneriyoruz. TonyAI yapınızı olduğu gibi modeller ve her rakamı kaynağına bağlar; şirket sayısı arttıkça iş zorlaşmaz, yalnızca toplam büyür. Yapay zekâ destekli öngörü teknikleriyle strateji geliştirmenize yardımcı olur.",
    cards: [
      {
        title: "Veriyi tek tek girmezsiniz; TonyAI aktarır",
        body: "Halıhazırda kullandığınız tablolar ve veri formları platforma doğrudan aktarılır ve tek yerde saklanır. Yapay zekâ destekli analitik motoru eksikleri, tutarsız birimleri ve olağan dışı değerleri aktarım sırasında işaretler; sürdürülebilirlik ekipleriniz veri girmekle uğraşmaz, sonuçları değerlendirir.",
      },
      {
        title: "Grup yapınızın birebir modeli",
        body: "Şirketler, alt şirketler ve lokasyonlar NACE kodlarıyla tek yapıda tanımlanır. Emisyonlar şirket bazında da, grubun tamamı için de aynı veriden hesaplanır.",
      },
      {
        title: "Denetime hazır, satır satır",
        body: "Her veri noktası kaynağına, yöntemine, giren kişiye, onayına ve değişiklik geçmişine bağlıdır. Denetçinin sorusu rapordan sonra değil, veri girilirken cevaplanır.",
      },
      {
        title: "Tek platform, tek yöntem",
        body: "Hesaplama, onay ve raporlama aynı yerde, aynı emisyon faktörü kütüphanesiyle yürür. Şirketler arası karşılaştırma anlamını korur; konsolide rakam tartışmasızdır.",
      },
      {
        title: "Bugünü ölçün, yarını planlayın",
        body: "Aynı veri tabanı üzerinde karbon öngörüsü: hedef yıla giden yolu, yatırım ve verimlilik senaryolarının etkisini ve hedeften sapmayı önceden görürsünüz. Yapay zekâ destekli dekarbonizasyon önerileri, iklim ve sürdürülebilirlik hedeflerinizi raporlama yükünden eyleme dönüştürür.",
      },
    ],
  },

  platform: {
    eyebrow: "Platform",
    title: "Karbon yönetiminizin tamamını kapsar.",
    lead: "Faaliyet verisinin toplanmasından TSRS raporuna kadar her adım TonyAI'da. Verilerinizi ve kanıt belgelerinizi tek bir sisteme taşıyın: güvenli, pratik, denetime hazır.",
    modules: [
      {
        name: "Kurumsal karbon muhasebesi",
        body: "Kapsam 1, 2 ve 3 emisyonlarını ISO 14064-1 ve GHG Protokolü'ne göre hesaplar. Elektrikten iş seyahatine tüm faaliyet kategorileri; dönem, lokasyon ve sektör profilinize göre.",
        cta: "Yöntemi inceleyin",
        href: "/#yontem",
      },
      {
        name: "Konsolidasyon ve bağlı ortaklık yönetimi",
        body: "Grup yapısını tanımlayın, şirketlerin tamamlanma durumunu tek panoda izleyin, grup içi işlemleri çifte saymadan konsolide edin.",
        cta: "Demo talep edin",
        href: "/demo/",
      },
      {
        name: "Onay akışı ve denetim izi",
        body: "Taslak, inceleme, onay. Yorumlar, kaynak belgeler ve değişiklik geçmişi kayıtla birlikte saklanır; kim, ne zaman, neyi değiştirdi bellidir.",
        cta: "Demo talep edin",
        href: "/demo/",
      },
      {
        name: "Raporlama ve analitik",
        body: "TSRS ile uyumlu rapor şablonları, yöntem notları ve kanıt bağlantıları. Kapsam, kategori ve şirket bazında dağılım; PDF ve Excel çıktısı.",
        cta: "Demo talep edin",
        href: "/demo/",
      },
      {
        name: "Akıllı veri aktarımı ve yapay zekâ kontrolleri",
        body: "Mevcut tablolar ve faturalar doğrudan okunup faaliyet verisine dönüştürülür. Eksik, tutarsız veya olağan dışı kayıtlar aktarım sırasında işaretlenir; kaynak eşlemesinde öneri alırsınız.",
        cta: "Demo talep edin",
        href: "/demo/",
      },
      {
        name: "Öngörü ve dekarbonizasyon",
        body: "Azaltım hedeflerinizi ve dekarbonizasyon yolunuzu şirket ve grup bazında modelleyin; yatırım ve verimlilik senaryolarının etkisini ve hedeften sapmayı önceden görün. Yapay zekâ destekli öneriler eyleme yön verir.",
        cta: "Demo talep edin",
        href: "/demo/",
      },
    ],
    ui: {
      entryTitle: "Veri girişi",
      categories: [
        ["Elektrik", "warn"],
        ["Doğal gaz", "miss"],
        ["Yakıt", "ok"],
        ["Soğutucu gazlar", "miss"],
        ["Atık", "ok"],
        ["İş seyahati", "ok"],
      ] as Array<[string, Status]>,
      consumption: "Toplam tüketim",
      grid: "Şebeke bölgesi",
      gridValue: "Türkiye · Ulusal şebeke",
      completion: "Tamamlanma",
      completionNote: "4 zorunlu alandan 2'si dolu",
      approvalSteps: ["Taslak", "İncelemede", "Onaylandı"],
      reviewer: "İnceleyen",
      reviewNote: "Fatura dönemi bitiş tarihi eksik; tamamlanınca onaylayacağım.",
      exports: ["PDF indir", "Excel'e aktar", "Paylaş"],
      done: "Tamam",
    },
  },

  demoSection: {
    eyebrow: "Demo",
    title: "TonyAI'ı iş başında görün.",
    body: "Veri girişinden konsolide rapora kadar platformu iki dakikada gezin. Kendi yapınızla görmek için demo talep edin.",
    videoLabel: "Ürün demosu · yakında",
    primary: { label: "Bugün demo talep edin", href: "/demo/" },
  },

  journey: {
    eyebrow: "Nasıl çalışır",
    title: "Planla, topla, hesapla, doğrula, raporla, harekete geç.",
    lead: "Altı adım; yanında tek bir elektrik faturasının TonyAI'daki yolculuğu.",
    exampleLabel: "Örnek",
    steps: [
      { n: "01", name: "Planla", body: "Yapınızı, raporlama sınırını ve dönemi tanımlayın. Hangi şirket hangi kategoriyi girecek, baştan belli olsun.", example: "Kocaeli tesisi · 2026 Ç1 · Elektrik kategorisi açıldı." },
      { n: "02", name: "Topla", body: "Mevcut tablolarınız ve faturalarınız aktarılır; zorunlu alanlar, birimler ve eksikler anında görünür.", example: "Mart faturası okundu: 45.000 kWh." },
      { n: "03", name: "Hesapla", body: "Emisyonlar ISO 14064-1 ve GHG Protokolü'ne göre, tek emisyon faktörü kütüphanesiyle hesaplanır.", example: "45.000 kWh × 0,442 = 19,89 tCO₂e · Kapsam 2." },
      { n: "04", name: "Doğrula", body: "Kayıtlar incelemeden ve onaydan geçer; her değerin kaynağı ve geçmişi yanında durur.", example: "Veri sorumlusu girdi, grup sürdürülebilirlik onayladı." },
      { n: "05", name: "Raporla", body: "TSRS ile uyumlu raporu yöntem notları ve kanıt bağlantılarıyla üretin; PDF ve Excel olarak paylaşın.", example: "Satır, faturasına bağlı olarak TSRS raporunda." },
      { n: "06", name: "Harekete geç", body: "Emisyonun nereden geldiğini görün, senaryoları karşılaştırın, azaltım önceliklerinizi belirleyin.", example: "LED dönüşümü −%6, güneş çatısı −%14: 2030 hedefine uzaklık güncellendi." },
    ],
    note: "Örnek kayıt temsilidir.",
  },

  proof: {
    eyebrow: "Önce ve sonra",
    title: "Dönem sonu nasıl görünür?",
    lead: "Çoğu ekip için karbon raporu bir tablo yığınıdır. TonyAI'da tek bir ekrandır.",
    before: {
      label: "Önce",
      items: ["Farklı sunucu ve sürücülerde dağınık tablolar", "Karmaşık, elle yürüyen iş akışları", "Uzayan e-posta zincirleri", "Konsolidasyon ve raporlama için uzun süreler"],
    },
    after: {
      label: "Sonra",
      title: "TonyAI'da aynı dönem",
      items: ["Veriler tek sistemde, kaynağıyla", "Tek faktör kütüphanesi", "Onay akışı ve değişiklik geçmişi", "Rapor tek seferde, yöntem notlarıyla"],
      metric: { value: "164.700", unit: "tCO₂e", label: "konsolide toplam · onaylandı" },
    },
    disclaimer: "Temsili bir dönemdir; gerçek müşteri verisi değildir.",
  },

  compliance: {
    eyebrow: "Yöntem ve güvence",
    title: "Her rakamın arkasında açık bir yöntem var.",
    body:
      "TonyAI hesaplamaları ISO 14064-1 ve GHG Protokolü Kurumsal Standardı'na dayanır. Çıktılar TSRS ile uyumlu raporlamayı destekler. Her değerin yanında kullanılan emisyon faktörü ve kaynağı yer alır.",
    standards: [
      { name: "ISO 14064-1", role: "Hesaplama yöntemi", body: "Kuruluş düzeyinde sera gazı envanterinin hesaplanması ve raporlanması için uluslararası standart." },
      { name: "GHG Protokolü", role: "Hesaplama yöntemi", body: "Emisyonların Kapsam 1, 2 ve 3 olarak sınıflandırılmasında dünya genelinde kullanılan kurumsal standart." },
      { name: "TSRS", role: "Raporlama", body: "Türkiye Sürdürülebilirlik Raporlama Standartları. TonyAI çıktıları TSRS ile uyumlu raporlamayı destekler." },
      { name: "IFRS S2", role: "Raporlama", body: "ISSB'nin iklimle ilgili açıklama standardı; TSRS 2'nin esas aldığı metin. Uluslararası yatırımcı ve grup raporlamasında ortak dil." },
    ],
    audit: {
      title: "Denetim izi",
      items: [
        "Her kayıtta: giren kişi, tarih, kaynak belge, kullanılan emisyon faktörü",
        "Onay akışı: taslak, inceleme, onay; yorumlar ve değişiklik geçmişiyle",
        "Raporda: yöntem notları ve kanıt bağlantıları, denetçiyle paylaşıma hazır",
      ],
    },
    security: {
      title: "Veri güvenliği",
      body: "Verileriniz şifreli saklanır ve yalnızca yetkilendirdiğiniz kullanıcılar erişir.",
      note: "[Barındırma konumu ve sertifikalar: teyit bekliyor]",
    },
  },

  faq: {
    eyebrow: "Sık sorulan sorular",
    title: "Kısa cevaplar",
    items: [
      {
        q: "Karbon yönetimi yazılımı nedir, kim ihtiyaç duyar?",
        a: "Sera gazı emisyonlarını ölçen, raporlayan ve yöneten yazılımdır. Veri birden fazla lokasyona ve ekibe dağıldığında tablo mantığıyla tutarlı ve denetlenebilir bir konsolide rakam üretmek her dönem zorlaşır. TonyAI bu dağınıklığı tek sistemde toplar.",
      },
      {
        q: "TonyAI'ın karbon muhasebesi Excel'den nasıl farklı?",
        a: "Tek yöntem, tek emisyon faktörü kütüphanesi ve her kayıtta kaynak. Onay akışı ve değişiklik geçmişi yerleşiktir. Excel'de hata ayıklamakla geçen dönem sonu, TonyAI'da raporu üretmekle geçer.",
      },
      {
        q: "Kapsam 1, 2 ve 3 emisyonlarının tamamını hesaplıyor mu?",
        a: "Evet. Üç kapsam da aynı platformda hesaplanır. Satın alınan mallar, iş seyahatleri, çalışan ulaşımı ve lojistik gibi değer zinciri kategorileri için veri girebilir, raporunuza Kapsam 3'ü dahil edebilirsiniz.",
      },
      {
        q: "TSRS raporlaması ve denetim için hazır mı?",
        a: "Çıktılar TSRS ile uyumlu raporlamayı destekler. Yöntem notları, kanıt bağlantıları ve her değerin kaynağı raporla birlikte gelir; denetçiye verecek ayrı bir dosya hazırlamanız gerekmez.",
      },
      {
        q: "Grup içi işlemlerde çifte sayımı nasıl önlüyorsunuz?",
        a: "Grup yapısı ve raporlama sınırı en başta tanımlanır. Bir şirketin Kapsam 1'i olan taşıma, aynı grubun başka bir şirketinde Kapsam 3 olarak göründüğünde konsolide envanterde tek kez sayılır.",
      },
      {
        q: "Verilerimiz nerede saklanıyor, fiyatlandırma nasıl?",
        a: "Verileriniz şifreli saklanır ve yalnızca yetkilendirdiğiniz kullanıcılar erişir. [Barındırma konumu ve sertifikalar: teyit bekliyor] Fiyat, yapınıza ve şirket sayınıza göre teklif olarak hazırlanır.",
      },
    ],
  },

  finalCta: {
    title: "Karbon yönetiminizi dönüştürmeye hazır mısınız?",
    body: "Yapınızı ve raporlama takviminizi dinleyelim; TonyAI'ı kendi verinizle görün.",
    primary: { label: "Bugün demo talep edin", href: "/demo/" },
    secondary: { label: "Demoyu izleyin", href: "/#demo" },
  },

  footer: {
    tagline: "Her işletme için karbon yönetimi yazılımı.",
    email: "hello@tonyai.io",
    bases: "İstanbul",
    columns: [
      { title: "Platform", links: [{ label: "Özellikler", href: "/#platform" }, { label: "Yöntem", href: "/#yontem" }, { label: "Demo", href: "/#demo" }] },
      { title: "Kaynaklar", links: [{ label: "Yazılar", href: "/kaynaklar/" }, { label: "TSRS rehberi", href: "/kaynaklar/tsrs-kisa-rehber/" }, { label: "Sözlük", href: "/kaynaklar/#sozluk" }] },
      { title: "Şirket", links: [{ label: "Hakkımızda", href: "/sirket/" }, { label: "Demo talep edin", href: "/demo/" }, { label: "Bize Ulaşın", href: "/bize-ulasin/" }, { label: "Giriş yap", href: "https://qa.tonyai.io" }, { label: "Kayıt ol", href: "https://qa.tonyai.io/register" }] },
    ],
    legal: [
      { label: "KVKK Aydınlatma Metni", href: "/kvkk/" },
      { label: "Gizlilik Politikası", href: "/gizlilik/" },
      { label: "Çerez Politikası", href: "/cerez/" },
      { label: "Kullanım Koşulları", href: "/kosullar/" },
    ],
    copyright: "© 2026 TonyAI",
  },
};

/* ---------- Secondary pages ---------- */

export const contactPage = {
  meta: { title: "Bize Ulaşın — TonyAI", description: "Demo talebi, teklif, geri bildirim veya destek için TonyAI ekibine yazın." },
  eyebrow: "Bize ulaşın",
  title: "Uzmanla görüşün, demoyu kendi verinizle izleyin.",
  lead: "Yapınızı ve raporlama takviminizi kısaca anlatın; en kısa sürede dönelim.",
  panel: {
    eyebrow: "Demo talebi",
    title: "TonyAI'ı iş başında görün.",
    body: "Kısa bir görüşmede yapınızı dinleyelim; ardından örnek bir yapı üzerinde platformu birlikte gezelim.",
    steps: ["Formu doldurun; konu olarak demoyu seçin.", "Takvim davetini e-postayla gönderelim.", "30 dakikalık görüşmede platformu birlikte inceleyelim."],
    responseNote: "Birkaç iş saati içinde dönüyoruz.",
    directLabel: "Doğrudan yazmak isterseniz",
    email: "hello@tonyai.io",
  },
  form: {
    name: "Ad Soyad",
    company: "Şirket",
    email: "İş e-postası",
    phone: "Telefon",
    phoneHint: "isteğe bağlı",
    topic: "Konu",
    topics: ["Demo talebi", "Teklif almak istiyorum", "Geri bildirim", "Destek", "İş birliği", "Diğer"],
    size: "Şirket sayısı",
    sizes: ["Seçin", "1", "2–5", "6–20", "20'den fazla"],
    message: "Mesajınız",
    consent: "KVKK Aydınlatma Metni'ni okudum; bilgilerimin talebimi yanıtlamak amacıyla işlenmesini kabul ediyorum.",
    consentLink: { label: "KVKK Aydınlatma Metni", href: "/kvkk/" },
    submit: "Gönder",
    submitDemo: "Bugün demo talep edin",
    sending: "Gönderiliyor…",
    privacy: "Bilgileriniz yalnızca size dönüş yapmak için kullanılır.",
    success: { title: "Teşekkürler, mesajınız ulaştı.", body: "En kısa sürede e-postayla döneceğiz." },
    error: { title: "Mesaj gönderilemedi.", body: "Lütfen tekrar deneyin veya doğrudan hello@tonyai.io adresine yazın." },
    required: "Bu alan zorunlu.",
    invalidEmail: "Geçerli bir e-posta adresi yazın.",
  },
};

export const companyPage = {
  meta: { title: "Şirket — TonyAI", description: "TonyAI'ı kimler, neden kurdu: üç arkadaş, üç ilke ve karbonla başlayan bir ESG vizyonu." },
  eyebrow: "Şirket",
  title: "Karbonla başladık. Bütünsel bir ESG sistemine doğru gidiyoruz.",
  lead: "TonyAI; karbon muhasebesini şeffaf, hatasız ve açıklanabilir kılmak için kurulmuş, İstanbul merkezli bir ekip.",
  story: {
    eyebrow: "Hikâyemiz",
    title: "Üç arkadaş, bir eksik, bir fikir.",
    paragraphs: [
      "Hikâyemiz, birlikte çalışmaktan olduğu kadar iş dışında vakit geçirmekten de keyif alan üç arkadaşla başladı. 2026'da, karbon muhasebesi uygulamalarında her gün karşılaştığımız eksikler üzerine konuşurken aynı noktada buluştuk: elle girilen tablolar, kopuk sistemler ve kimsenin açıklayamadığı rakamlar. Bu iş, şirketlerin halıhazırda kullandığı verilere entegre olan ve yapay zekâ desteğiyle hatayı kaynağında yakalayan bir araçla çok daha iyi yapılabilirdi.",
      "Üç ilkeyi tavizsiz biçimde temelimize alarak başladık: şeffaflık, hatasızlık ve açıklanabilirlik. Bir rakam ancak nereden geldiği bilindiğinde, hatasız hesaplandığında ve bir denetçiye anlatılabildiğinde değerlidir; TonyAI'ın her ekranı bu üç ilkeye göre tasarlandı. Ancak daha fazlasını da istedik.",
      "Yalnızca muhasebe yapan değil, ileriye bakan bir araç hayal ettik: şirketlerin sürdürülebilirlik stratejilerini ve dekarbonizasyon hedeflerini daha net ve isabetli kurabilmeleri için karbon öngörüsü yapan, yapay zekâ desteğiyle öneri üreten bir platform.",
      "Ortaya TonyAI çıktı. Çalışmalarımızı İstanbul'dan yürütüyoruz; ekibimizin bir ayağı Birleşik Krallık'ta. Önce Türkiye'deki işletmeler, ardından Birleşik Krallık ve Avrupa Birliği için.",
      "Vizyonumuz açık: karbonla başlayan hikâyemizin, çok katmanlı, fonksiyonel ve kullanıcı dostu bütünsel bir ESG sistemi olarak devam etmesi. Bunu gerçekleştireceğimize inanıyoruz.",
    ],
  },
  principles: {
    eyebrow: "İlkelerimiz",
    items: [
      { title: "Şeffaflık", body: "Her değerin yanında kaynağı, emisyon faktörü ve yöntemi durur. Kara kutu yok." },
      { title: "Hatasızlık", body: "Tek yöntem, tek faktör kütüphanesi, yerleşik kontroller. Hata dönem sonunda değil, veri girilirken yakalanır." },
      { title: "Açıklanabilirlik", body: "Bir denetçiye, bir yönetim kuruluna veya bir müşteriye anlatılamayan rakam, rakam değildir." },
      { title: "Önce Türkiye, sonra Avrupa", body: "TSRS, SKDM ve yerel uygulamalar için tasarlandı; aynı zemin üzerinde Birleşik Krallık ve AB'ye büyür." },
    ],
  },
  team: {
    eyebrow: "Kurucu ekip",
    title: "Üç kurucu ortak, üç disiplin.",
    body: "Yönetim, operasyon ve teknoloji aynı masada: karbon muhasebesini uçtan uca birlikte kuruyoruz.",
    members: [
      { name: "Nebil Arda Gökceviz", role: "Kurucu Ortak", field: "CEO" },
      { name: "Emre Can Kapusuz", role: "Kurucu Ortak", field: "COO" },
      { name: "Deniz Bektaş", role: "Kurucu Ortak", field: "CTO" },
    ],
  },
  facts: [
    { k: "Merkez", v: "İstanbul" },
    { k: "Kuruluş", v: "2026" },
    { k: "Odak", v: "Her ölçekte işletme için karbon yönetimi; gruplar için konsolidasyon" },
    { k: "Pazarlar", v: "Türkiye; ardından Birleşik Krallık ve AB" },
  ],
};

export const resourcesPage = {
  meta: { title: "Kaynaklar — TonyAI", description: "TSRS, Kapsam 1-2-3 ve karbon muhasebesi üzerine kısa, sade yazılar ve bir sözlük." },
  eyebrow: "Kaynaklar",
  title: "Karbon muhasebesi üzerine kısa ve sade yazılar.",
  lead: "Mevzuat dilini günlük dile çeviriyoruz. Her yazı birkaç dakikada okunur.",
  readMore: "Yazıyı oku",
  glossaryTitle: "Sözlük",
  glossary: [
    { term: "tCO₂e", def: "Ton karbondioksit eşdeğeri. Farklı sera gazlarının ısınma etkisini tek birimde toplamak için kullanılır." },
    { term: "Kapsam 1", def: "Şirketin kendi kontrolündeki kaynaklardan doğrudan çıkan emisyonlar: kazanlar, araçlar, soğutucu gaz kaçakları." },
    { term: "Kapsam 2", def: "Satın alınan elektrik, ısı ve buharın üretiminden kaynaklanan dolaylı emisyonlar." },
    { term: "Kapsam 3", def: "Değer zincirindeki diğer dolaylı emisyonlar: satın alınan mallar, iş seyahati, lojistik, çalışan ulaşımı." },
    { term: "Emisyon faktörü", def: "Bir faaliyet birimini (örneğin 1 kWh elektrik) emisyona çeviren katsayı. Kaynağı ve yılı her zaman belirtilir." },
    { term: "Konsolidasyon", def: "Grup şirketlerinin emisyonlarının, belirlenen yaklaşıma göre tek bir grup envanterinde birleştirilmesi." },
    { term: "TSRS", def: "Türkiye Sürdürülebilirlik Raporlama Standartları. Kamu Gözetimi Kurumu tarafından yayımlanır; uluslararası ISSB standartlarını esas alır." },
    { term: "SKDM", def: "Sınırda Karbon Düzenleme Mekanizması (CBAM). AB'ye ihracatta belirli ürünlerin gömülü emisyonlarının beyanını gerektirir." },
  ],
  articles: [
    {
      slug: "kapsam-1-2-3-nedir",
      title: "Kapsam 1, 2 ve 3 nedir? Beş dakikada temel ayrım",
      summary: "Emisyonların neden üçe ayrıldığı, hangi faaliyetin hangi kapsama girdiği ve grup şirketlerinde en sık karışan noktalar.",
      minutes: 5,
      body: [
        "Sera gazı envanteri, emisyonları kaynağına göre üç kapsama ayırır. Ayrımın amacı çifte sayımı önlemek ve şirketin hangi emisyon üzerinde ne kadar kontrolü olduğunu göstermektir.",
        "Kapsam 1, şirketin sahip olduğu veya kontrol ettiği kaynaklardan doğrudan çıkan emisyonlardır: doğal gaz kazanları, şirket araçları, üretim prosesleri ve soğutucu gaz kaçakları bu gruba girer.",
        "Kapsam 2, satın alınan elektrik, ısı ve buharın üretiminden kaynaklanan emisyonlardır. Emisyon başka bir tesiste oluşur ama tüketim sizin olduğu için size yazılır. Şebeke emisyon faktörü burada belirleyicidir.",
        "Kapsam 3, değer zincirindeki diğer tüm dolaylı emisyonlardır: satın alınan mal ve hizmetler, iş seyahatleri, çalışan ulaşımı, lojistik, satılan ürünlerin kullanımı. Çoğu şirkette toplamın en büyük payı buradadır ve veri toplaması en zor olan da budur.",
        "Grup şirketlerinde en sık karışan nokta, bir şirketin Kapsam 1'inin başka bir grup şirketinin Kapsam 3'ü olmasıdır. Örneğin grubun lojistik şirketinin yakıt tüketimi onun Kapsam 1'idir; aynı taşımayı satın alan üretim şirketi için Kapsam 3'tür. Konsolide grup envanterinde bu ikisi tek bir kez sayılmalıdır.",
      ],
    },
    {
      slug: "tsrs-kisa-rehber",
      title: "TSRS nedir? Grup şirketleri için kısa rehber",
      summary: "Türkiye Sürdürülebilirlik Raporlama Standartları'nın ne istediği, kimleri kapsadığı ve karbon verisinin raporda nerede durduğu.",
      minutes: 6,
      body: [
        "TSRS, Türkiye Sürdürülebilirlik Raporlama Standartları'nın kısaltmasıdır. Kamu Gözetimi, Muhasebe ve Denetim Standartları Kurumu (KGK) tarafından yayımlanır ve uluslararası ISSB standartlarını (IFRS S1 ve S2) esas alır.",
        "İki temel standart vardır. TSRS 1 sürdürülebilirlikle ilgili finansal bilgilerin genel açıklama ilkelerini, TSRS 2 ise iklimle ilgili açıklamaları düzenler. Sera gazı emisyonları TSRS 2'nin merkezindedir ve Kapsam 1, 2 ve 3 olarak raporlanması beklenir.",
        "Hangi şirketlerin kapsamda olduğu KGK'nın belirlediği eşiklere bağlıdır; eşikler ve geçiş hükümleri zaman içinde güncellenebilir, bu yüzden güncel KGK duyurularına bakılmalıdır. Kapsamdaki şirketler için raporlama, finansal raporlama takvimiyle birlikte yürür.",
        "Grup şirketleri için pratik sonuç şudur: konsolide finansal tablo hazırlayan bir ana şirket, sürdürülebilirlik verisini de aynı sınırlar içinde toplamak zorundadır. Bu da bağlı ortaklıkların verisinin aynı yöntemle, aynı dönemde ve izlenebilir biçimde toplanmasını gerektirir.",
        "Denetim açısından en çok sorulan şey, bir rakamın nereden geldiğidir: hangi faaliyet verisi, hangi emisyon faktörü, kim girdi, kim onayladı. Bu sorulara rapor bittikten sonra değil, veri girilirken cevap verebilmek raporlama dönemini kısaltır.",
      ],
    },
    {
      slug: "grup-konsolidasyonu-uc-hata",
      title: "Grup emisyon envanterinde en sık yapılan üç hata",
      summary: "Çifte sayım, farklı emisyon faktörleri ve dönem uyumsuzluğu: holdinglerde konsolide toplamı bozan üç alışkanlık ve çözümleri.",
      minutes: 4,
      body: [
        "Birinci hata çifte sayımdır. Grup içi alım satım ve taşımacılık, taraflardan birinde Kapsam 1 veya 2, diğerinde Kapsam 3 olarak görünür. Konsolide envanterde grup içi işlemler elenmezse toplam olduğundan büyük çıkar.",
        "İkinci hata, şirketlerin farklı emisyon faktörü kaynakları kullanmasıdır. Bir şirket güncel ulusal şebeke faktörünü, diğeri birkaç yıl önceki uluslararası bir değeri kullandığında aynı kWh farklı emisyona dönüşür ve şirketler arası karşılaştırma anlamını yitirir.",
        "Üçüncü hata dönem uyumsuzluğudur. Fatura dönemleri raporlama dönemiyle örtüşmez; bir şirket takvim yılını, diğeri fatura tarihlerini esas alır. Sonuç, birbirine eklenmemesi gereken sayıların toplanmasıdır.",
        "Üçünün de çözümü aynıdır: tek yöntem, tek faktör kütüphanesi, tek dönem tanımı ve her kayıtta kaynak. Bu kurallar bir tabloda değil, verinin girildiği yerde uygulanmalıdır.",
      ],
    },
  ],
};

export const demoPage = {
  meta: { title: "Demo talep edin — TonyAI", description: "TonyAI'ı kendi verinizle görün. Bugün talep edin; en kısa sürede dönüyoruz." },
  eyebrow: "Demo",
  title: "Bugün demo talep edin.",
  lead: "Kısa formu doldurun; talebinizi hemen inceleyip birkaç iş saati içinde size dönüyoruz. Görüşmede platformu kendi yapınız üzerinden birlikte gezeriz.",
  points: [
    { title: "30 dakika", body: "Veri aktarımından konsolide rapora kadar uçtan uca akış, sorularınızla birlikte." },
    { title: "Kendi yapınızla", body: "Şirket, lokasyon ve kategori yapınızı anlatın; demoyu ona göre kuralım." },
    { title: "Satış baskısı yok", body: "Görüşme sonunda ne yaptığımızı ve size uyup uymadığını net biçimde söyleriz." },
  ],
  successHref: "/demo/tesekkurler/",
};

export const demoThanksPage = {
  meta: { title: "Talebiniz alındı — TonyAI", description: "Demo talebiniz ulaştı; en kısa sürede dönüyoruz." },
  eyebrow: "Talebiniz alındı",
  title: "Teşekkürler, demo talebiniz bize ulaştı.",
  lead: "Talebinizi şimdiden incelemeye aldık. Takvim önerisiyle birkaç iş saati içinde e-postayla döneceğiz.",
  next: [
    "Yapınıza göre örnek bir demo ortamı hazırlıyoruz.",
    "Size uygun saat için takvim davetini e-postayla gönderiyoruz.",
    "Bu arada Kaynaklar bölümünden TSRS ve kapsam rehberlerine göz atabilirsiniz.",
  ],
  primary: { label: "Kaynaklara göz atın", href: "/kaynaklar/" },
  secondary: { label: "Ana sayfaya dön", href: "/" },
};

export const registerPage = {
  meta: { title: "Kayıt olun — TonyAI", description: "TonyAI'a standart kullanıcı olarak kaydolun; davet e-postanız birkaç dakika içinde gelsin." },
  eyebrow: "Kayıt",
  title: "TonyAI'a kaydolun.",
  lead: "Beş alan, bir dakika. Bilgilerinizi bırakın; platform davetinizi e-postanıza gönderelim.",
  points: [
    { title: "Davet e-postası", body: "Kaydınız alındığında TonyAI'dan bir davet bağlantısı gelir; şifrenizi oradan belirlersiniz." },
    { title: "Kurumsal e-posta", body: "Şirket e-posta adresinizle kaydolun; aynı şirketten gelen ekip arkadaşlarınızı sizinle eşleştirelim." },
    { title: "Yardım bir mesaj uzakta", body: "Takıldığınız yerde hello@tonyai.io adresine yazın; birkaç iş saati içinde dönüyoruz." },
  ],
  form: {
    firstName: "Ad",
    lastName: "Soyad",
    company: "Şirket",
    title: "Unvan",
    email: "İş e-postası",
    emailHint: "Davet bu adrese gelir.",
    consent: "KVKK Aydınlatma Metni'ni okudum; bilgilerimin hesabımı oluşturmak ve benimle iletişim kurmak amacıyla işlenmesini kabul ediyorum.",
    consentLink: { label: "KVKK Aydınlatma Metni", href: "/kvkk/" },
    submit: "Davetimi gönder",
    sending: "Gönderiliyor…",
    privacy: "Bilgileriniz yalnızca hesabınızı oluşturmak için kullanılır.",
    required: "Bu alan zorunlu.",
    invalidEmail: "Geçerli bir e-posta adresi yazın.",
    freeMail: "Lütfen şirket e-posta adresinizi kullanın.",
    error: { title: "Kayıt gönderilemedi.", body: "Lütfen tekrar deneyin veya hello@tonyai.io adresine yazın." },
  },
  successHref: "/kayit/tesekkurler/",
};

export const registerThanksPage = {
  meta: { title: "Davetiniz yolda — TonyAI", description: "Kaydınız alındı; davet e-postanız birkaç dakika içinde gelir." },
  eyebrow: "Kaydınız alındı",
  title: "Teşekkürler. Davetiniz yolda.",
  lead: "Birkaç dakika içinde TonyAI'dan bir e-posta alacaksınız. İçindeki bağlantıyla şifrenizi belirleyip giriş yapabilirsiniz.",
  next: [
    "E-posta gelmediyse önce gereksiz klasörüne bakın; göndericimiz hello@tonyai.io.",
    "Bağlantı 48 saat geçerlidir; süresi dolarsa aynı sayfadan yeniden kaydolmanız yeterli.",
    "Ekibinizden başkaları da katılacaksa aynı şirket e-postasıyla kaydolmaları yeter; sizinle eşleşirler.",
  ],
  primary: { label: "Ana sayfaya dön", href: "/" },
  secondary: { label: "Kaynaklara göz atın", href: "/kaynaklar/" },
};

export const legalPages = {
  banner: "Taslak metin. Yayından önce hukuk danışmanı incelemesi gerekir.",
  pages: {
    kvkk: {
      title: "KVKK Aydınlatma Metni",
      sections: [
        { h: "Veri sorumlusu", p: "[Şirket unvanı], [adres]. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusudur." },
        { h: "İşlenen veriler ve amaç", p: "İletişim formu üzerinden paylaştığınız ad, soyad, e-posta, telefon ve şirket bilgileri; talebinizi yanıtlamak, demo veya teklif süreçlerini yürütmek amacıyla işlenir." },
        { h: "Hukuki sebep ve saklama", p: "Veriler, sözleşmenin kurulması ve meşru menfaat hukuki sebeplerine dayanılarak işlenir ve amaç için gerekli süre boyunca saklanır." },
        { h: "Haklarınız", p: "KVKK'nın 11. maddesi kapsamındaki haklarınızı hello@tonyai.io adresine yazarak kullanabilirsiniz." },
      ],
    },
    gizlilik: {
      title: "Gizlilik Politikası",
      sections: [
        { h: "Topladığımız bilgiler", p: "Web sitesinde yalnızca iletişim formuyla gönderdiğiniz bilgileri ve temel kullanım istatistiklerini toplarız." },
        { h: "Kullanım", p: "Bilgiler talebinizi yanıtlamak ve siteyi iyileştirmek için kullanılır; üçüncü taraflara satılmaz." },
        { h: "Güvenlik", p: "Veriler şifreli bağlantıyla iletilir ve yetkisiz erişime karşı korunur." },
      ],
    },
    cerez: {
      title: "Çerez Politikası",
      sections: [
        { h: "Zorunlu çerezler", p: "Sitenin çalışması için gereken çerezler kullanılır; bunlar kapatılamaz." },
        { h: "İstatistik çerezleri", p: "Site kullanımını anlamak için anonim istatistik çerezleri yalnızca onayınızla kullanılır." },
        { h: "Tercihleriniz", p: "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz." },
      ],
    },
    kosullar: {
      title: "Kullanım Koşulları",
      sections: [
        { h: "Kapsam", p: "Bu koşullar tonyai.io web sitesinin kullanımını düzenler. TonyAI uygulamasının kullanımı ayrı bir sözleşmeye tabidir." },
        { h: "İçerik", p: "Sitedeki içerik bilgilendirme amaçlıdır; hukuki veya mali danışmanlık yerine geçmez. Örnek veriler temsilidir." },
        { h: "Fikri mülkiyet", p: "Site içeriği ve markalar TonyAI'a aittir; izinsiz kopyalanamaz." },
      ],
    },
  },
};

export const notFoundPage = {
  title: "Sayfa bulunamadı",
  body: "Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.",
  back: "Ana sayfaya dön",
};
