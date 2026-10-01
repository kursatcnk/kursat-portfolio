// Proje verisi: ana sayfa, işler sayfası ve vaka çalışması bu tek dosyadan besleniyor.
// featured: true olanlar büyük vaka çalışması olarak, diğerleri arşiv listesinde görünür.
window.KURSAT_PROJECTS = [
  {
    slug: "promptforge",
    featured: true,
    title: "PromptForge",
    sceneTitle: "PromptForge",
    scene: { shots: ["assets/media/work/promptforge/landing-lg.webp", "assets/media/work/promptforge/forge-dark-lg.webp"] },
    headline: "İyi sonuç, iyi yazılmış bir istekle başlıyor.",
    summary: "Yazdığın promptu, kullanacağın modelin en iyi anladığı hâle getiren ve neden değiştiğini anlatan çalışma alanı.",
    year: "2026",
    type: "Web uygulaması · SaaS",
    role: "Ürün, tasarım ve full-stack geliştirme",
    stack: ["ASP.NET Core 8", "EF Core 8", "SQL Server", "JWT · TOTP", "Claude · OpenAI · Gemini · DeepSeek", "Vanilla JS"],
    links: { github: "https://github.com/kursatcnk/prompt-forge" },
    stage: "#d9d2c5",
    cover: { main: "assets/media/work/promptforge/landing-lg.webp", side: "assets/media/work/promptforge/forge-dark-lg.webp" },
    intro: [
      "Yapay zekâ araçlarında kötü sonuçların çoğu modelden değil, yarım yamalak yazılmış istekten geliyor: bağlam yok, kural yok, çıktının nasıl görüneceği belli değil.",
      "PromptForge promptu okuyor, eksik bağlamı ve belirsiz ifadeleri buluyor, sonra seçilen modelin en iyi anladığı biçimde yeniden yazıyor. Her analizde neyin neden değiştiğini de gösteriyor; amaç sadece promptu düzeltmek değil, daha iyi prompt yazmayı öğretmek."
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
    scene: { art: "assets/media/work/cards-rumble/art/fire-presence.webp", cards: ["assets/media/work/cards-rumble/art/card-ice.webp", "assets/media/work/cards-rumble/art/card-fire.webp", "assets/media/work/cards-rumble/art/card-poison.webp"] },
    headline: "Kuralları anlatmak yerine oynatmak.",
    summary: "Kendi bağımsız oyun stüdyom OnPixel'in ilk oyunu için resmi site: oyunun kurallarını anlatan, tarayıcıda denenebilen bir vitrin.",
    year: "2026",
    type: "Stüdyo & oyun sitesi",
    role: "Stüdyo kurucusu · tasarım ve geliştirme",
    stack: ["HTML", "CSS", "JavaScript", "GSAP · ScrollTrigger", "PHP"],
    links: {},
    stage: "#170d09",
    cover: { main: "assets/media/work/cards-rumble/home-lg.webp", side: "assets/media/work/cards-rumble/home-mobile.webp" },
    intro: [
      "Cards Rumble: Clash of Elements, OnPixel'in geliştirdiği 1'e 1 strateji kart oyunu. Üç element, otuz kart ve iki ayrı zafer yolu var; oyunun derinliği kurallarda saklı.",
      "Sitenin işi bu kuralları sıkıcı bir metin duvarına çevirmeden anlatmak: kartın anatomisi, element döngüsü ve oyun modları kaydırdıkça açılan sahnelerle anlatılıyor, ziyaretçi isterse tarayıcıda kısa bir düelloya girip kuralları deneyerek öğreniyor."
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
    headline: "Unutulan takip, kaçan müşteridir.",
    summary: "Kurulum gerektirmeyen, USB'den çalışan görev ve hatırlatma uygulaması. Müşteri takibinde “şu gün tekrar yazmam lazım” işlerini unutturmuyor.",
    year: "2026",
    type: "Masaüstü uygulama",
    role: "Tasarım ve geliştirme",
    stack: [".NET 10", "WPF", "JSON depolama", "Tek dosya yayın"],
    links: { github: "https://github.com/kursatcnk/work-tracker" },
    stage: "#15191f",
    cover: { main: "assets/media/work/gorev-takip/main.webp", side: "assets/media/work/gorev-takip/alarm.webp" },
    intro: [
      "Destek ve ürün tarafında her gün onlarca müşteriyle yazışırken en kolay kaybolan şey “şu gün tekrar dönmem lazım” notları oluyor. Hazır araçlar ya fazla ağır ya da kurulum ve hesap istiyor.",
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

  // Arşiv — daha önceki işler
  {
    slug: "cnk-fitness",
    title: "CNK Fitness",
    subtitle: "Spor salonu yönetim sistemi",
    summary: "Üyelik, paket/abonelik, ödeme ve ders planlamasını tek panelde toplayan masaüstü uygulaması.",
    year: "2024",
    type: "Masaüstü uygulama",
    stack: ["C# / .NET", "Masaüstü arayüz", "SQL", "Raporlama"],
    intro: ["CNK Fitness için üyelikten ödemeye kadar tüm operasyonu sadeleştiren masaüstü uygulaması. Üye kartı, paket/abonelik, ödeme geçmişi ve ders/randevu planı tek akışta; hızlı arama, filtre ve rapor ekranlarıyla günlük işlemleri hızlandırıyor."],
    highlights: ["Üye kartı ve paket/abonelik tanımları", "Ödeme geçmişi, borç ve bitiş uyarıları", "Ders/randevu takvimi ve yoklama akışı", "Raporlar: aktif üye, tahsilat, paket dağılımı"]
  },
  {
    slug: "rafael-guzellik",
    title: "Rafael Güzellik Merkezi",
    subtitle: "Randevu odaklı tanıtım sitesi",
    summary: "Mobilde hızlı açılan, hizmet kartları, galeri ve WhatsApp yönlendirmesiyle randevuya odaklanan tek sayfa.",
    year: "2024",
    type: "Landing / kurumsal web",
    stack: ["HTML", "CSS", "JavaScript", "Responsive"],
    intro: ["Rafael Güzellik Merkezi için tek bakışta güven ve randevu hedefiyle tasarlandı. Hizmetleri kısa kartlarla öne çıkarıyor, galeri ve konum/iletişim alanlarını netleştiriyor; WhatsApp ve telefon çağrılarıyla dönüşümü artırıyor."],
    highlights: ["Güçlü ilk ekran ve randevu/WhatsApp çağrısı", "Hizmet kartları ve net içerik hiyerarşisi", "Galeri, konum ve iletişim blokları", "Görsel sıkıştırma, lazy-load ve temel SEO"]
  },
  {
    slug: "eray-genc",
    title: "Eray Genç",
    subtitle: "Kişisel portfolyo sitesi",
    summary: "Projeler, yetenekler, CV ve iletişimi tek akışta toplayan sade kişisel site.",
    year: "2024",
    type: "Kişisel site",
    stack: ["HTML", "CSS", "JavaScript"],
    intro: ["Eray Genç için proje ızgarası, deneyim/öğrenim akışı ve hızlı iletişim içeren bir portfolyo. Tipografi ve boşluk dengesi, kaydırma geçişleri ve mobilde okunabilirlik odaklı; içerik modüler bölümlerle kolayca güncelleniyor."],
    highlights: ["Etiket/kategori mantıklı proje ızgarası", "CV indirme ve sosyal bağlantılar", "Kaydırma geçişleri", "Mobilde tek sütun, yüksek okunabilirlik"]
  },
  {
    slug: "stok-takip",
    title: "Stok & Ürün Takip",
    subtitle: "Depo ve stok yönetimi",
    summary: "Ürün, depo ve stok hareketlerini tek panelden yöneten, kritik stok uyarılı MVC uygulaması.",
    year: "2024",
    type: "Web uygulaması",
    stack: ["ASP.NET MVC", "C#", "SQL"],
    intro: ["Küçük ve orta ölçekli işletmeler için stok kontrolünü düzenleyen ASP.NET MVC uygulaması. Ürün kartları, depo hareketleri, tedarikçi kayıtları ve kritik stok eşikleriyle kayıp/eksik riskini azaltıyor."],
    highlights: ["Ürün, kategori ve depo yönetimi", "Stok giriş/çıkış ve hareket geçmişi", "Kritik stok uyarıları ve minimum eşikler", "En çok hareket edenler ve düşük stok raporları"]
  },
  {
    slug: "kutuphane",
    title: "Kütüphane Yönetimi",
    subtitle: "Katalog, üye ve ödünç akışı",
    summary: "Kitap, üye ve ödünç/iade süreçlerini yöneten; gecikme takipli MVC uygulaması.",
    year: "2024",
    type: "Web uygulaması",
    stack: ["ASP.NET MVC", "C#", "SQL"],
    intro: ["Kütüphane operasyonunu düzenleyen web uygulaması: kitap kataloğu, üye yönetimi ve ödünç/iade akışı. ISBN ve kategori bazlı arama, gecikme takibi ve durum filtreleriyle sirkülasyonu görünür hâle getiriyor."],
    highlights: ["ISBN/kategori/yazar ile katalog ve hızlı arama", "Ödünç/iade akışı ve teslim tarihi kontrolü", "Gecikenler listesi ve durum filtreleri", "Popüler kitap ve aktif üye raporları"]
  },
  {
    slug: "ceviri",
    title: "Çeviri Uygulaması",
    subtitle: "API tabanlı hızlı çeviri arayüzü",
    summary: "Dil değiştirme, kopyalama, geçmiş ve favorilerle günlük kullanıma uygun çeviri arayüzü.",
    year: "2025",
    type: "Web uygulaması",
    stack: ["ASP.NET Core", "C#", "REST API"],
    intro: ["Çeviri servislerine API ile bağlanan, sonucu hızlıca sunan web uygulaması. Debounce ve önbellekle gereksiz istekleri azaltıyor; dil değiştirme, kopyalama, geçmiş ve favorilerle günlük kullanımı pratikleştiriyor."],
    highlights: ["Kaynak/hedef dil seçimi ve tek tıkla değiştirme", "Debounce + önbellek ile düşük maliyetli istek", "Geçmiş ve favoriler", "Mobilde rahat kullanım"]
  },
  {
    slug: "eticaret-analiz",
    title: "E-Ticaret Analiz",
    subtitle: "Satış ve kampanya raporlama",
    summary: "Satış, kategori ve sepet davranışını KPI'larla özetleyen analiz ve raporlama çalışması.",
    year: "2025",
    type: "Veri / dashboard",
    stack: ["C#", "Entity Framework", "SQL"],
    intro: ["E-ticaret verisini KPI'lara çeviren analiz ve raporlama çalışması. Dönem karşılaştırmaları, kategori/ürün performansı ve kampanya etkisini tek ekranda özetleyerek karar almayı hızlandırıyor."],
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
    intro: ["Farklı yapay zekâ sağlayıcılarının API'lerini aynı ASP.NET Core iskeletinde tek tek bağladığım bir dizi küçük uygulama. Amaç her servisin istek/yanıt modelini, hata durumlarını ve maliyet davranışını gerçek kodla öğrenmekti; PromptForge'daki sağlayıcı adaptörleri bu çalışmanın üzerine kuruldu."],
    items: [
      ["Görsel analiz", "Azure AI Vision"], ["Detaylı nesne tespiti", "Azure AI Vision"], ["Kod asistanı", "OpenAI"],
      ["Görsel üretimi", "Replicate"], ["Text-to-image", "Stability AI"], ["Ses → yazı", "Deepgram"],
      ["Metinden sese", "Azure Speech"], ["Sohbet botu", "Claude"], ["PDF özetleyici", "Claude"],
      ["İş başvurusu e-postası", "Claude"], ["Sohbet botu", "Gemini"], ["Otomatik prompt zinciri", "Gemini"],
      ["Rol bazlı simülasyon", "Gemini"], ["Toksik içerik tespiti", "Hugging Face"], ["Duygu analizi", "Hugging Face"],
      ["Soru–cevap (RoBERTa)", "Hugging Face"], ["Varlık çıkarma (NER)", "Hugging Face"]
    ]
  }
];
