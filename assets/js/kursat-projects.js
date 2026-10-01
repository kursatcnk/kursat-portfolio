// Proje verisi: ana sayfa, işler sayfası ve vaka çalışması bu tek dosyadan besleniyor.
// featured: true olanlar büyük vaka çalışması olarak, diğerleri arşiv listesinde görünür.
window.KURSAT_PROJECTS = [
  {
    slug: "promptforge",
    featured: true,
    title: "PromptForge",
    sceneTitle: "PromptForge",
    scene: { shots: ["assets/media/work/promptforge/landing-lg.webp", "assets/media/work/promptforge/forge-dark-lg.webp"] },
    headline: "Prompt yazmayı kolaylaştıran bir çalışma alanı.",
    summary: "Yazdığınız promptu seçtiğiniz modele göre yeniden düzenliyor ve neyi neden değiştirdiğini tek tek gösteriyor. Fikir, tasarım ve kod benim.",
    year: "2026",
    type: "Web uygulaması · SaaS",
    role: "Ürün, tasarım ve full-stack geliştirme",
    stack: ["ASP.NET Core 8", "EF Core 8", "SQL Server", "JWT · TOTP", "Claude · OpenAI · Gemini · DeepSeek", "Vanilla JS"],
    links: { github: "https://github.com/kursatcnk/prompt-forge" },
    stage: "#d9d2c5",
    cover: { main: "assets/media/work/promptforge/landing-lg.webp", side: "assets/media/work/promptforge/forge-dark-lg.webp" },
    intro: [
      "Yapay zekâ araçlarında kötü sonuçların çoğu modelden değil, yarım yamalak yazılmış istekten geliyor: bağlam yok, kural yok, çıktının nasıl görüneceği belli değil.",
      "PromptForge promptu okuyup eksik bağlamı ve belirsiz ifadeleri buluyor, sonra seçilen modelin en iyi anladığı biçimde yeniden yazıyor. Her değişikliğin yanında kısa bir açıklama var; birkaç kullanımdan sonra aynı eksikleri zaten bırakmamaya başlıyorsunuz."
    ],
    features: [
      { title: "Modele özel biçim", text: "İçerik aynı kalıyor, biçim değişiyor: GPT için Markdown başlıkları, Claude için XML etiketleri, Gemini için etiketli satırlar, DeepSeek için sade paragraflar." },
      { title: "Canlı kalite kontrolü", text: "Yazarken 0–100 arası puan, eksik bölümler (amaç, bağlam, çıktı, kısıt) ve tek tıkla eksikleri ekleme." },
      { title: "6 ölçütlü analiz", text: "Netlik, bağlam, özgüllük, kısıtlar, çıktı biçimi ve verimlilik. Her geri bildirim promptun kendi cümlesine atıf yapıyor ve somut bir düzeltme öneriyor." },
      { title: "Şablon, atölye, akış", text: "6 kategoride 24 şablon; elde prompt yoksa birkaç soruyla, çok adımlı işler için de düzenlenebilir planla prompt oluşturma." },
      { title: "Geçmiş ve karşılaştırma", text: "Her optimizasyon kaydediliyor; iki sürüm yan yana konup puan ve metin farkı görülebiliyor." },
      { title: "Yedek motor", text: "AI anahtarı yoksa ya da sağlayıcı hata verirse kural motoru devreye giriyor; kullanıcı boş ekran görmüyor." }
    ],
    engineering: [
      { title: "Yarışmayan kota", text: "Aylık kota SQL Server sp_getapplock ile kullanıcı başına kilitlenerek sayılıyor; son hakta paralel istekler kotayı aşamıyor." },
      { title: "Hesap güvenliği", text: "BCrypt şifreler, SHA-256 ile saklanan tek kullanımlık kodlar, şifreli TOTP secret'ları, e-posta doğrulama ve şifre sıfırlama akışı." },
      { title: "Sınırlar ve temizlik", text: "Giriş ve kayıt IP başına, AI istekleri kullanıcı başına dakikalık sınırlı. Arka plan servisi eski kodları ve yarım kalan kota rezervasyonlarını temizliyor." },
      { title: "Sağlayıcı adaptörleri", text: "Anthropic SDK, OpenAI/DeepSeek chat completions ve Gemini REST tek bir arayüzün arkasında; Gemini'de kota dolarsa istek sıradaki modele geçiyor." }
    ],
    gallery: [
      { src: "assets/media/work/promptforge/forge-lg.webp", caption: "Optimize ekranı: editör, canlı kalite kontrolü ve sonuç özeti.", wide: true },
      { src: "assets/media/work/promptforge/analysis-lg.webp", caption: "Prompt analizi: 6 ölçüt, her biri için somut düzeltme." },
      { src: "assets/media/work/promptforge/templates-lg.webp", caption: "Şablon kütüphanesi." },
      { src: "assets/media/work/promptforge/landing-dark-lg.webp", caption: "Tanıtım sayfası, koyu tema.", wide: true },
      { src: "assets/media/work/promptforge/landing-mobile.webp", caption: "Telefonda tanıtım sayfası.", pad: true },
      { src: "assets/media/work/promptforge/forge-mobile.webp", caption: "Telefonda çalışma alanı.", pad: true }
    ]
  },
  {
    slug: "cards-rumble",
    featured: true,
    title: "OnPixel — Cards Rumble",
    sceneTitle: "Cards Rumble",
    scene: { shots: ["assets/media/work/cards-rumble/home-lg.webp", "assets/media/work/cards-rumble/home-mobile.webp"], phone: true },
    headline: "Kuralları okutmak yerine oynatan bir oyun sitesi.",
    summary: "Kendi oyun stüdyom OnPixel'in ilk oyunu Cards Rumble'ın sitesi. Ziyaretçi kuralları uzun bir metinden değil, tarayıcıda kısa bir maç oynayarak öğreniyor.",
    year: "2026",
    type: "Stüdyo & oyun sitesi",
    role: "Stüdyo kurucusu · tasarım ve geliştirme",
    stack: ["HTML", "CSS", "JavaScript", "GSAP · ScrollTrigger", "PHP"],
    links: {},
    stage: "#170d09",
    cover: { main: "assets/media/work/cards-rumble/home-lg.webp", side: "assets/media/work/cards-rumble/home-mobile.webp" },
    intro: [
      "Cards Rumble: Clash of Elements, OnPixel'in geliştirdiği 1'e 1 strateji kart oyunu. Üç element, otuz kart ve iki ayrı zafer yolu var; oyunun derinliği kurallarda saklı.",
      "Sitede bu kuralları uzun bir metinle anlatmak istemedim. Bir kartın nelerden oluştuğu, elementlerin birbirini nasıl yendiği ve oyun modları kaydırdıkça açılan bölümlerde anlatılıyor; isteyen tarayıcıda kısa bir maç oynayıp kuralları deneyerek öğreniyor."
    ],
    features: [
      { title: "Anlatan sahneler", text: "GSAP ScrollTrigger ile kaydırdıkça ilerleyen hero ve bölüm geçişleri; hareket azaltma tercihi olan kullanıcıda sade sürüm." },
      { title: "Kart anatomisi", text: "Bir kartın değer, element ve zafer yolu katmanlarını kendi kendine oynayan, durdurulabilen etkileşimli bir anlatım." },
      { title: "Tarayıcıda düello", text: "Oyunun element ve değer kurallarını uygulayan kural motoruyla kısa bir deneme maçı." },
      { title: "Stüdyo sayfaları", text: "OnPixel tanıtımı, dünya sıralaması ve devlog sayfaları; devlog için RSS, sitemap ve robots dosyaları hazır." },
      { title: "Çok yakında sayfası", text: "Lansman öncesi için ayrı, tek ekranlık bir tanıtım sayfası: ateş, buz ve zehir temalı varyasyonlar." },
      { title: "İletişim", text: "Sunucu tarafında PHP ile çalışan, spam önlemli iletişim formu." }
    ],
    engineering: [
      { title: "Kural motoru", text: "Element üstünlüğü (Ateş > Zehir > Buz > Ateş), aynı elementte değer karşılaştırması ve beraberlik kuralları ayrı bir modülde; düello ve anlatım sahneleri aynı kuralları kullanıyor." },
      { title: "Görsel performans", text: "Kart ve sahne görselleri WebP; ağır animasyonlar sadece görünür alanda çalışıyor." }
    ],
    gallery: [
      { src: "assets/media/work/cards-rumble/home-2-lg.webp", caption: "Nasıl oynanır: kart anatomisi.", wide: true },
      { src: "assets/media/work/cards-rumble/home-3-lg.webp", caption: "Element döngüsü." },
      { src: "assets/media/work/cards-rumble/game-lg.webp", caption: "Oyun sayfası." },
      { src: "assets/media/work/cards-rumble/soon-lg.webp", caption: "Lansman öncesi “çok yakında” sayfası.", wide: true },
      { src: "assets/media/work/cards-rumble/home-mobile.webp", caption: "Telefonda ana sayfa.", pad: true },
      { src: "assets/media/work/cards-rumble/soon-mobile.webp", caption: "Telefonda “çok yakında”.", pad: true }
    ]
  },
  {
    slug: "gorev-takip",
    featured: true,
    title: "ESN Görev Takip",
    sceneTitle: "Görev Takip",
    scene: { shots: ["assets/media/work/gorev-takip/main.webp", "assets/media/work/gorev-takip/alarm.webp"] },
    headline: "“Şu gün tekrar yazarım” notları için küçük bir uygulama.",
    summary: "Müşteri takibini kaçırmamak için kendime yazdım. Kurulum istemiyor, USB'den çalışıyor; zamanı gelince ekrana sesli bir hatırlatma çıkarıyor.",
    year: "2026",
    type: "Masaüstü uygulama",
    role: "Tasarım ve geliştirme",
    stack: [".NET 10", "WPF", "JSON depolama", "Tek dosya yayın"],
    links: { github: "https://github.com/kursatcnk/work-tracker" },
    stage: "#15191f",
    cover: { main: "assets/media/work/gorev-takip/main.webp", side: "assets/media/work/gorev-takip/alarm.webp" },
    intro: [
      "İşim gereği her gün birçok müşteriyle yazışıyorum. Bu yoğunlukta en kolay kaybolan şey “şu gün tekrar dönmem lazım” notları oluyor. Denediğim hazır araçlar ya fazla ağır geldi ya da kurulum ve hesap istedi.",
      "ESN Görev Takip çift tıkla açılan, saatin yanındaki simgeye inip arka planda bekleyen küçük bir uygulama. Zamanı gelince ekranın en önüne sesli bir uyarı çıkarıyor; tüm veriler exe'nin yanındaki tek bir dosyada, USB ile birlikte taşınıyor."
    ],
    features: [
      { title: "Hatırlatıcı", text: "Sesli ve yanıp sönen uyarı; 10 dk, 30 dk, 1 saat ya da yarın 09:00 olarak ertelenebiliyor. Program kapalıyken kaçırılanlar açılışta gösteriliyor." },
      { title: "Aşamalar", text: "Bir iş adımlara bölünüyor; kartta ilerleme çubuğu ve sıradaki adım görünüyor." },
      { title: "Müşteri etiketleri", text: "Her göreve müşteri ya da kategori; çiplerle tek tıkta o müşterinin işlerine filtreleme." },
      { title: "Toplu işlem", text: "Ctrl/Shift ile çoklu seçim; topluca tamamla, geri al ya da sil. Silme sonrası 10 saniye geri alma." },
      { title: "Klavye öncelikli", text: "Ctrl+N, Ctrl+F, Ctrl+E, Del, Esc… Günlük kullanım fareye dokunmadan ilerliyor." },
      { title: "Türkçe arama", text: "Başlık, not, etiket ve aşamalarda Türkçe karakter duyarlı arama." }
    ],
    engineering: [
      { title: "Bozulmayan kayıt", text: "JSON önce geçici dosyaya yazılıp atomik olarak yer değiştiriyor; her kayıtta yedek tutuluyor, bozuk dosya ayrı adla saklanıp hata günlüğe yazılıyor." },
      { title: "Taşınabilirlik", text: "Exe'nin klasörü yazılabilir değilse veri otomatik olarak kullanıcı klasörüne geçiyor. Yayın tek dosya ve .NET kurulumu gerektirmiyor." },
      { title: "Tek örnek", text: "Uygulama ikinci kez açılırsa yeni pencere açmak yerine mevcut pencereyi öne getiriyor." }
    ],
    gallery: [
      { src: "assets/media/work/gorev-takip/main.webp", caption: "Ana liste: öncelik şeritleri, aşama ilerlemesi ve müşteri etiketleri.", pad: true, wide: true },
      { src: "assets/media/work/gorev-takip/alarm.webp", caption: "Kaçırılan hatırlatma uyarısı ve erteleme seçenekleri.", pad: true },
      { src: "assets/media/work/gorev-takip/stages.webp", caption: "Aşamalar penceresi.", pad: true }
    ]
  },

  // Arşiv — daha önceki işler, yeniden eskiye
  {
    slug: "eticaret-analiz",
    title: "E-Ticaret Analiz",
    subtitle: "Satış ve kampanya raporlama",
    summary: "E-ticaret verisinden satış, kategori ve sepet raporları çıkaran bir analiz çalışması.",
    year: "2025",
    type: "Veri / dashboard",
    stack: ["C#", "Entity Framework", "SQL"],
    intro: ["Entity Framework Core ve LINQ ile e-ticaret verisini rapora çeviren bir çalışma. Satış trendleri, kategori ve ürün performansı ve kampanyaların etkisi dönemler arasında karşılaştırılıyor."],
    highlights: ["Satış trendleri ve dönem karşılaştırması", "Kategori/ürün performansı ve kârlılık", "Sepet dönüşümü ve kampanya etkisi", "Sunuma hazır tablo/PDF çıktısı"]
  },
  {
    slug: "advancedai",
    title: "AdvancedAI",
    subtitle: "17 yapay zekâ API entegrasyonu",
    summary: "ASP.NET Core üzerinde görsel, ses, metin ve sohbet servislerini tek tek bağladığım entegrasyon çalışmaları.",
    year: "2025",
    type: "AI entegrasyonları",
    stack: ["ASP.NET Core", "C#", "Azure AI", "OpenAI", "Claude", "Gemini", "Hugging Face"],
    intro: ["Farklı yapay zekâ sağlayıcılarının API'lerini aynı ASP.NET Core iskeletinde tek tek bağladığım küçük uygulamalar. Her servisin nasıl cevap verdiğini, nasıl hata verdiğini ve ne kadara mal olduğunu kodla görmek istedim. PromptForge'daki sağlayıcı bağlantıları bu çalışmanın üzerine kurulu."],
    items: [
      ["Görsel analiz", "Azure AI Vision"], ["Detaylı nesne tespiti", "Azure AI Vision"], ["Kod asistanı", "OpenAI"],
      ["Görsel üretimi", "Replicate"], ["Text-to-image", "Stability AI"], ["Ses → yazı", "Deepgram"],
      ["Metinden sese", "Azure Speech"], ["Sohbet botu", "Claude"], ["PDF özetleyici", "Claude"],
      ["İş başvurusu e-postası", "Claude"], ["Sohbet botu", "Gemini"], ["Otomatik prompt zinciri", "Gemini"],
      ["Rol bazlı simülasyon", "Gemini"], ["Toksik içerik tespiti", "Hugging Face"], ["Duygu analizi", "Hugging Face"],
      ["Soru–cevap (RoBERTa)", "Hugging Face"], ["Varlık çıkarma (NER)", "Hugging Face"]
    ]
  },
  {
    slug: "ceviri",
    title: "Çeviri Uygulaması",
    subtitle: "API tabanlı hızlı çeviri arayüzü",
    summary: "Dil değiştirme, kopyalama, geçmiş ve favorileri olan sade bir çeviri arayüzü.",
    year: "2025",
    type: "Web uygulaması",
    stack: ["ASP.NET Core", "C#", "REST API"],
    intro: ["Bir çeviri servisine API ile bağlanan küçük bir web uygulaması. Siz yazmayı bırakınca çeviri geliyor, aynı metin için servise tekrar gidilmiyor. Dil değiştirme, kopyalama, geçmiş ve favoriler de var."],
    highlights: ["Kaynak/hedef dil seçimi ve tek tıkla değiştirme", "Debounce + önbellek ile düşük maliyetli istek", "Geçmiş ve favoriler", "Mobilde rahat kullanım"]
  },
  {
    slug: "kutuphane",
    title: "Kütüphane Yönetimi",
    subtitle: "Katalog, üye ve ödünç akışı",
    summary: "Kitapları, üyeleri ve ödünç/iade işlerini takip eden bir MVC uygulaması.",
    year: "2024",
    type: "Web uygulaması",
    stack: ["ASP.NET MVC", "C#", "SQL"],
    intro: ["Kitap kataloğunu, üyeleri ve ödünç/iade akışını yöneten bir ASP.NET MVC uygulaması. ISBN, kategori ve yazara göre arama yapılabiliyor; teslim tarihi geçen kitaplar ayrı bir listede görünüyor."],
    highlights: ["ISBN/kategori/yazar ile katalog ve hızlı arama", "Ödünç/iade akışı ve teslim tarihi kontrolü", "Gecikenler listesi ve durum filtreleri", "Popüler kitap ve aktif üye raporları"]
  },
  {
    slug: "stok-takip",
    title: "Stok & Ürün Takip",
    subtitle: "Depo ve stok yönetimi",
    summary: "Ürünleri, depoları ve stok hareketlerini takip eden, stok azalınca uyaran bir MVC uygulaması.",
    year: "2024",
    type: "Web uygulaması",
    stack: ["ASP.NET MVC", "C#", "SQL"],
    intro: ["Ürünleri, depoları, tedarikçileri ve stok hareketlerini tek yerden takip etmek için yazdığım bir ASP.NET MVC uygulaması. Bir ürün belirlenen minimum miktarın altına düşünce uyarı veriyor."],
    highlights: ["Ürün, kategori ve depo yönetimi", "Stok giriş/çıkış ve hareket geçmişi", "Kritik stok uyarıları ve minimum eşikler", "En çok hareket edenler ve düşük stok raporları"]
  },
  {
    slug: "cnk-fitness",
    title: "CNK Fitness",
    subtitle: "Spor salonu yönetim sistemi",
    summary: "Üyelikleri, paketleri, ödemeleri ve ders programını tek yerde tutan bir masaüstü uygulaması.",
    year: "2024",
    type: "Masaüstü uygulama",
    stack: ["C# / .NET", "Masaüstü arayüz", "SQL", "Raporlama"],
    intro: ["CNK Fitness için yazdığım masaüstü uygulaması. Üye kayıtları, paketler, ödeme geçmişi ve ders programı aynı yerde; salondaki görevli günlük işleri arama ve filtrelerle kısa sürede hallediyor."],
    highlights: ["Üye kartı ve paket/abonelik tanımları", "Ödeme geçmişi, borç ve bitiş uyarıları", "Ders/randevu takvimi ve yoklama akışı", "Raporlar: aktif üye, tahsilat, paket dağılımı"]
  },
  {
    slug: "rafael-guzellik",
    title: "Rafael Güzellik Merkezi",
    subtitle: "Randevu odaklı tanıtım sitesi",
    summary: "Hizmetleri, galeriyi ve randevu için WhatsApp bağlantısını tek sayfada toplayan, telefonda hızlı açılan bir site.",
    year: "2024",
    type: "Landing / kurumsal web",
    stack: ["HTML", "CSS", "JavaScript", "Responsive"],
    intro: ["Rafael Güzellik Merkezi için yaptığım tek sayfalık site. Hizmetler kısa kartlarla anlatılıyor, galeri ve konum bilgisi hemen altında; ziyaretçi tek dokunuşla WhatsApp'tan ya da telefonla randevu isteyebiliyor."],
    highlights: ["Güçlü ilk ekran ve randevu/WhatsApp çağrısı", "Hizmet kartları ve net içerik hiyerarşisi", "Galeri, konum ve iletişim blokları", "Görsel sıkıştırma, lazy-load ve temel SEO"]
  },
  {
    slug: "eray-genc",
    title: "Eray Genç",
    subtitle: "Kişisel portfolyo sitesi",
    summary: "Projeleri, yetenekleri ve iletişim bilgilerini tek sayfada toplayan sade bir kişisel site.",
    year: "2024",
    type: "Kişisel site",
    stack: ["HTML", "CSS", "JavaScript"],
    intro: ["Eray Genç için hazırladığım kişisel portfolyo. Projeler, deneyim ve iletişim bilgileri tek sayfada; telefonda rahat okunsun diye tek sütuna iniyor. Bölümler ayrı ayrı güncellenebiliyor."],
    highlights: ["Etiket/kategori mantıklı proje ızgarası", "CV indirme ve sosyal bağlantılar", "Kaydırma geçişleri", "Mobilde tek sütun, yüksek okunabilirlik"]
  }
];
