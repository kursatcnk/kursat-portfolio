// Proje verisi: ana sayfa, işler sayfası ve vaka çalışması bu tek dosyadan besleniyor.
// featured: true olanlar büyük vaka çalışması olarak, diğerleri arşiv listesinde görünür.
window.KURSAT_PROJECTS = [
  {
    slug: "fitmatrix",
    featured: true,
    title: "FitMatrix",
    sceneTitle: "FitMatrix",
    scene: { shots: ["assets/media/work/fitmatrix/editor-lg.webp", "assets/media/work/fitmatrix/measure-lg.webp"] },
    headline: "Masa kurulumunu satın almadan önce gerçek ölçüleriyle 3D'de kuran bir planlayıcı.",
    summary: "Monitörü, klavyeyi, kasayı ve hoparlörü üreticinin verdiği ölçülerle masaya yerleştiriyor; çakışmaları, masa sınırını ve kullanıcının boyuna göre ergonomiyi santimetre santimetre kontrol ediyor.",
    year: "2026",
    type: "Web uygulaması · 3D",
    role: "Ürün, tasarım ve full-stack geliştirme",
    stack: ["React · TypeScript", "React Three Fiber", "ASP.NET Core 10", "SQL Server", "Docker", "xUnit · Playwright · GitHub Actions"],
    links: { github: "https://github.com/kursatcnk/FitMatrix", live: "https://kursatcnk.github.io/FitMatrix/" },
    stage: "#ddd8cc",
    cover: { main: "assets/media/work/fitmatrix/editor-lg.webp", side: "assets/media/work/fitmatrix/measure-lg.webp" },
    intro: [
      "Yeni bir monitör ya da masa alırken asıl soru sığıp sığmayacağı: iki ekran yan yana masaya oturuyor mu, hoparlörler kenardan taşıyor mu, ekranın üst kenarı göz hizasında kalıyor mu? Ürün sayfalarındaki ölçüleri kâğıda dökmek hem uzun sürüyor hem de çoğu zaman bir şey gözden kaçıyor.",
      "FitMatrix masayı gerçek santimetrelerle 3D sahneye kuruyor. 1.400'ü aşkın ürünlük katalogdan ekipman seçiliyor, masaya sürükleniyor; uygulama çakışmaları ve masa sınırını anında yakalıyor, kullanıcının boyuna göre oturarak ya da ayakta ergonomi puanı veriyor. Canlı demo kurulum istemeden tarayıcıda açılıyor."
    ],
    features: [
      { title: "Gerçek ölçülü katalog", text: "1.400'ü aşkın ürün; ölçüler üreticilerin kendi sayfalarından, kaynak bağlantısı ve kontrol tarihiyle. Ürün adı, model kodu ya da GTIN ile yeni ürün aranıp ölçüsü doğrulanınca kataloğa ekleniyor." },
      { title: "Çakışma ve masa sınırı", text: "Döndürülmüş ürünlerin temas alanı da hesaba katılıyor; iki ürün üst üste bindiğinde ya da masadan taştığında yerleşim kırmızıya dönüyor." },
      { title: "Ergonomi puanı", text: "Masa yüksekliği, ekran üst kenarının göz hizası, görüş mesafesi ve klavye konumu kullanıcının boyuna göre, oturarak ya da ayakta ayrı ayrı puanlanıyor." },
      { title: "Göz hizası ve ölçü çizgileri", text: "Kamera masaya oturan kişinin gözüne alınabiliyor; seçili ürünün masa kenarlarına uzaklığı santimetre olarak sahnede görünüyor." },
      { title: "Monitör montajı ve oda", text: "Masa standı ya da VESA kolu, yatay/dikey ekran ve eğim; isteğe bağlı duvarlarla masanın odaya sığıp sığmadığı ve sandalye payı." },
      { title: "Paylaş ve dışa aktar", text: "Düzen tek bağlantıyla paylaşılıyor, veri sunucuya gitmiyor. Malzeme listesi CSV, sahne PNG olarak iniyor; priz planı gereken grup prizi öneriyor." }
    ],
    engineering: [
      { title: "Santimetre tabanlı sahne", text: "Bir sahne birimi bir santimetre. Masa ve ürün ölçüleri değiştikçe 3D geometri, temas alanı kontrolü ve SQL kaydı birlikte güncelleniyor." },
      { title: "Ölçü çıkarımı", text: "JSON-LD, üretici teknik tabloları, PDF föyler ve sitemap'lerden ölçü okunuyor; mm/cm/inç ve W×H×D gibi farklı yazımlar tanınıyor, sonuçlar SQL Server'da önbelleğe alınıyor." },
      { title: "Sunucusuz demo", text: "Katalog anlık görüntüsü derleme sırasında JSON'a çevriliyor; demo GitHub Pages'te sunucu olmadan çalışıyor. Tam sürüm tek docker compose komutuyla SQL Server ve API ile açılıyor." },
      { title: "Testler", text: "API ve katalog için xUnit, arayüz için birim testleri ve editörü uçtan uca deneyen Playwright testleri; hepsi GitHub Actions'ta." }
    ],
    gallery: [
      { src: "assets/media/work/fitmatrix/measure-lg.webp", caption: "Seçili monitörün masa kenarlarına uzaklığı ve yerleşim kontrolü.", wide: true },
      { src: "assets/media/work/fitmatrix/top-lg.webp", caption: "Üstten görünüm ve priz planı." },
      { src: "assets/media/work/fitmatrix/eye-lg.webp", caption: "Göz hizasından bakış." },
      { src: "assets/media/work/fitmatrix/editor-lg.webp", caption: "Editör: katalog, 3D masa ve ergonomi kontrolü.", wide: true }
    ]
  },
  {
    slug: "manga-lens",
    featured: true,
    title: "Manga Lens",
    sceneTitle: "Manga Lens",
    scene: { shots: ["assets/media/work/manga-lens/translated-lg.webp", "assets/media/work/manga-lens/scan-lg.webp"] },
    headline: "Manga sayfasını okuduğun yerde Türkçeye çeviren bir Chrome eklentisi.",
    summary: "Tek tıkla ekranı tarıyor, konuşma balonlarını buluyor ve çevirileri sayfayı yenilemeden, balonun şekline taşmadan yerine yazıyor.",
    year: "2026",
    type: "Chrome eklentisi",
    role: "Ürün, tasarım ve geliştirme",
    stack: ["TypeScript", "Chrome Extension (MV3)", "Canvas · Shadow DOM", "Claude · Gemini", "esbuild", "Vitest · GitHub Actions"],
    links: { github: "https://github.com/kursatcnk/manga-lens" },
    stage: "#d6d3e0",
    cover: { main: "assets/media/work/manga-lens/translated-lg.webp", side: "assets/media/work/manga-lens/scan-lg.webp" },
    intro: [
      "Türkçe manga çevirileri çoğu seride yarıda kalmış durumda. Sayfayı yapay zekâya kopyalayıp çeviri istemek mümkün ama okurken her sayfada bunu yapmak okumayı bitiriyor; çıkan metin de balonlardan ayrı bir yerde duruyor.",
      "Manga Lens okunan sayfanın üstünde çalışıyor. Sağdaki logoya basınca ekran taranıyor, yazı alanları mavi ile işaretleniyor ve çeviriler hazır oldukça balonların içine tek tek yerleşiyor. Orijinal yazı balonun kendi rengiyle siliniyor, Türkçe metin balonun şekline göre diziliyor."
    ],
    features: [
      { title: "Tek tıkla tarama", text: "Ekran görüntüsünden balonlar ve anlatım kutuları bulunuyor; canvas'a çizen ya da resmi parçalara bölen okuyucularda da aynı şekilde çalışıyor." },
      { title: "Balon balon çeviri", text: "Her balon ayrı istekte paralel gidiyor, cevap satır satır aktıkça balonlar doluyor. Claude ya da Gemini, kullanıcının kendi anahtarıyla." },
      { title: "Taşmayan yerleşim", text: "Balonun içi satır satır ölçülüyor, her satır o yükseklikteki gerçek genişliğe göre diziliyor. Uzun kelimeler Türkçe hece kurallarına göre bölünüyor." },
      { title: "Seri sözlüğü", text: "Karakter isimleri ve hitaplar seri başına saklanıyor, model yeni isimleri kendisi ekliyor; önceki sayfanın son satırları bağlam olarak gidiyor." },
      { title: "Balon düğmeleri", text: "Çevrilen balonun üstünde yeniden çevir, elle düzelt ve orijinali göster. Elle yapılan düzeltme bir dahakine önbellekten geliyor." },
      { title: "Otomatik mod", text: "Sayfa çevrilince ya da webtoon kaydırılınca yeni balonlar kendiliğinden çevriliyor, önceden çevrilenler yerinde kalıyor." }
    ],
    engineering: [
      { title: "Balon tespiti", text: "Kapalı beyaz alanlar bulunup içlerindeki koyu parçalara bakılıyor; yazı birçok küçük harf, göz bebeği ise tek, yuvarlak ve dolu bir leke. Resim ters çevrilip siyah balonlardaki beyaz yazılar da aranıyor." },
      { title: "Kaymayan katman", text: "Çeviriler sayfanın içindeki ayrı bir katmanda ve altlarındaki resme bağlı; sayfa kaydığında tarayıcı onları resimle aynı karede taşıyor." },
      { title: "Hız ve maliyet", text: "Balon başına paralel istek, düşünmesi kapatılmış hızlı modeller ve görüntüye göre önbellek. Ayarlarda aylık token ve tahmini ücret görünüyor." },
      { title: "Testler", text: "Tespit, Türkçe heceleme, yerleşim ve akış ayrıştırma için Vitest testleri; eklenti API'lerini taklit eden bir test sayfası ve GitHub Actions." }
    ],
    gallery: [
      { src: "assets/media/work/manga-lens/translated-lg.webp", caption: "Çevrilmiş sayfa: orijinal yazı silinmiş, Türkçe metin balonun şeklinde.", wide: true },
      { src: "assets/media/work/manga-lens/scan-lg.webp", caption: "Tarama: bulunan yazı alanları mavi ile işaretleniyor." },
      { src: "assets/media/work/manga-lens/original-lg.webp", caption: "Aynı sayfanın orijinali." },
      { src: "assets/media/work/manga-lens/dark-bubble-lg.webp", caption: "Siyah balonda beyaz yazı ve yamuk balonlar.", wide: true },
      { src: "assets/media/work/manga-lens/glossary-lg.webp", caption: "Seri sözlüğü: isimler her bölümde aynı kalıyor." },
      { src: "assets/media/work/manga-lens/actions-lg.webp", caption: "Balon düğmeleri: yeniden çevir, düzelt, orijinali göster." }
    ]
  },
  {
    slug: "cv-tailor",
    featured: true,
    title: "CV Tailor",
    sceneTitle: "CV Tailor",
    scene: { shots: ["assets/media/work/cv-tailor/review-lg.webp", "assets/media/work/cv-tailor/review-mobile.webp"], phone: true },
    headline: "CV'yi ilana göre, uydurmadan yeniden yazan bir çalışma alanı.",
    summary: "CV'yi başvurulan ilana göre yeniden yazıyor, her değişikliğin nedenini anlatıyor ve kaynağı olmayan hiçbir iddianın CV'ye girmesine izin vermiyor.",
    year: "2026",
    type: "Web uygulaması",
    role: "Ürün, tasarım ve full-stack geliştirme",
    stack: ["ASP.NET Core 10", "EF Core 10", "SQL Server", "QuestPDF · OpenXML · PdfPig", "Claude · OpenAI · Gemini · DeepSeek", "Vanilla JS", "xUnit · GitHub Actions"],
    links: { github: "https://github.com/kursatcnk/cv-tailor" },
    stage: "#ddd3c8",
    cover: { main: "assets/media/work/cv-tailor/landing-lg.webp", side: "assets/media/work/cv-tailor/review-dark-lg.webp" },
    intro: [
      "Herkes her ilana aynı CV'yi gönderiyor; ilanın aradığı kelimeler CV'de geçmeyince başvuru, bir insan okumadan elenebiliyor. CV'yi yapay zekâya yeniden yazdırmak da kolay, ama sonuç çoğu zaman yapılmamış işler ve uydurulmuş rakamlarla dolu oluyor.",
      "CV Tailor ilanın istediklerini adayın gerçek deneyimleriyle eşleştiriyor, eksik kalanları adaya soruyor, maddeleri ilana göre yeniden yazıyor ve her değişikliğin nedenini yanına yazıyor. Yazılan her madde kaynağıyla karşılaştırılıyor; kaynakta olmayan bir rakam, teknoloji ya da iddia aday onaylamadan CV'ye girmiyor."
    ],
    features: [
      { title: "Gereksinim–kanıt eşleştirmesi", text: "İlandaki her gereksinimin karşısında adayın kasasındaki kanıt ve gücü: güçlü, zayıf, yok. Eş anlamlılar sözlüğü, Türkçe ekler ve deneyim süresi hesabıyla; AI kullanmadan." },
      { title: "Sorular", text: "Eksik ya da zayıf kalan noktalar ve rakamsız maddeler için kısa sorular. Aday \"yok\" derse o konuda madde yazılmıyor." },
      { title: "Prova ekranı", text: "Her madde önce/sonra yan yana, nedeni ve ilan kelimeleri işaretli. Kabul, ret, düzenleme ya da başka bir yazım; CV'nin son hâli yanda canlı önizlemede." },
      { title: "ATS testi", text: "İndirilecek PDF ve Word dosyası bir işe alım sistemi gibi geri okunuyor; ad, iletişim, bölüm başlıkları ve her madde tek tek aranıyor." },
      { title: "Sağlık kontrolü ve koç", text: "Ters tarihler, açıklanmamış boşluklar, klişeler ve \"görev aldım\" gibi zayıf ifadeler; madde yazılırken anlık geri bildirim." },
      { title: "Ön yazı ve önce/sonra karnesi", text: "Onaylanan CV'den ön yazı ve yüklenen CV ile yeni CV'nin aynı ölçülerle karşılaştırması." }
    ],
    engineering: [
      { title: "Uydurma koruması", text: "AI'ın yazdığı her madde dayandığı kayıtları göstermek zorunda. Kod; kaynakta olmayan rakamı, teknolojiyi, şirket adını ve büyütülmüş rolü yakalıyor. Kurgusal vakalardan oluşan bir değerlendirme seti bu oranları CI'da ölçüyor." },
      { title: "Kişisel veri", text: "Ad, e-posta, telefon, linkler, TC kimlik no ve IBAN metin AI'a gitmeden maskeleniyor, cevapta geri konuyor. Kullanıcı bütün verisini tek dosya olarak indirebiliyor (KVKK)." },
      { title: "CV okuma", text: "İki sütunlu PDF'ler okuma sırasına göre çözülüyor, kaybolan bitişik harfler işaretleniyor; yüklenen dosyada ATS'leri zorlayan tablo, metin kutusu ve üst bilgi uyarılıyor." },
      { title: "Testler", text: "200'ü aşkın test. API testleri uygulamayı gerçek SQL Server (LocalDB) ile ayağa kaldırıp oturum, CSRF, kullanıcı izolasyonu ve eşzamanlı kota kilidini uçtan uca deniyor." }
    ],
    gallery: [
      { src: "assets/media/work/cv-tailor/review-lg.webp", caption: "Prova ekranı: önce/sonra karnesi, her maddenin nedeni ve canlı önizleme.", wide: true },
      { src: "assets/media/work/cv-tailor/vault-lg.webp", caption: "Kariyer kasası ve sağlık kontrolü." },
      { src: "assets/media/work/cv-tailor/questions-lg.webp", caption: "Eksik kalan gereksinimler için sorular." },
      { src: "assets/media/work/cv-tailor/cv-page-lg.webp", caption: "Çıktı: tek sütunlu, ATS dostu PDF; iletişim bilgileri tıklanabilir.", wide: true, pad: true },
      { src: "assets/media/work/cv-tailor/match-lg.webp", caption: "Hedef ekranı: gereksinimler ve kasadaki kanıtlar.", wide: true },
      { src: "assets/media/work/cv-tailor/review-mobile.webp", caption: "Telefonda prova ekranı.", wide: true, pad: true }
    ]
  },
  {
    slug: "friday",
    featured: true,
    title: "Friday",
    sceneTitle: "Friday",
    scene: { shots: ["assets/media/work/friday/chat.webp", "assets/media/work/friday/hud-speaking.webp"] },
    headline: "Seni sürekli dinlemeyen, tamamen bilgisayarında çalışan Türkçe sesli asistan.",
    summary: "Kısayola basınca mikrofonu açıyor, susunca kapatıyor. Konuşmayı tanıma, anlama ve cevabı seslendirme internete çıkmadan yerelde yapılıyor; dil modeli 18 araçla gerçek iş görüyor.",
    year: "2026",
    type: "Masaüstü uygulama",
    role: "Tasarım ve geliştirme",
    stack: ["C# · .NET", "WPF", "Whisper.net", "Ollama · Gemma 4", "Piper TTS"],
    links: { github: "https://github.com/kursatcnk/Friday" },
    stage: "#14161c",
    cover: { main: "assets/media/work/friday/chat.webp", side: "assets/media/work/friday/hud-speaking.webp" },
    intro: [
      "Sesli asistanların çoğu \"Hey ...\" sözcüğünü yakalamak için mikrofonu sürekli açık tutuyor ve konuşmayı buluta gönderiyor. Türkçe desteği de çoğu zaman yarım kalıyor.",
      "Friday tersini yapıyor: mikrofon yalnızca kısayola basınca açılıyor, ses bellekten dışarı çıkmıyor. Whisper konuşmayı yazıya döküyor, Gemma 4 ne istendiğini anlayıp gerekli aracı çağırıyor, Piper cevabı Türkçe okuyor. API anahtarı, abonelik ya da internet gerekmiyor."
    ],
    features: [
      { title: "Ekranı görme", text: "\"Bu hata ne?\" denince aktif pencerenin görüntüsü alınıp Gemma 4'ün görme yeteneğiyle yerelde yorumlanıyor; görüntü diske yazılmıyor." },
      { title: "Pano işlemleri", text: "Kopyalanan metni özetleme, çevirme, yazım düzeltme ya da resmileştirme; sonuç panoya geri konuyor." },
      { title: "Kalıcı hafıza", text: "\"Unutma, muayene 20 Kasım'da\" gibi notlar haftalar sonra hatırlanıyor, sabah brifinginde okunuyor; panelden görülüp silinebiliyor." },
      { title: "Dosya ve sistem", text: "Windows Arama diziniyle dosya bulma, \"bilgisayar neden yavaş?\" sorusuna işlemci, bellek ve disk ölçümüyle cevap, çalan müziği okuma ve kontrol." },
      { title: "Gizlilik defteri", text: "Mikrofonun ne zaman ve ne kadar açık kaldığı, neyin bilgisayarda kalıp neyin dışarı çıktığı zaman çizelgesinde görünüyor." },
      { title: "Rutinler ve kesme", text: "\"Çalışma modunu aç\" ile uygulamalar açılıyor; Friday konuşurken kısayola basınca susup dinlemeye geçiyor." }
    ],
    engineering: [
      { title: "Yerel boru hattı", text: "Kısayol → 16 kHz ses (yalnızca bellekte) → Whisper Large v3 Turbo, GPU'da ~0,3 sn → Gemma 4 ve araç çağırma → cümle cümle Piper seslendirme." },
      { title: "Araç çağırma", text: "Dil modeline 18 araç JSON şemasıyla veriliyor; model metin yerine araç çağrısı üretiyor, Friday aracı çalıştırıp sonucu geri veriyor. Silme, kapatma ve komut çalıştırma bilerek yok." },
      { title: "Ekran kartı belleği", text: "8 GB'lık kartta boştayken 0 GB, konuşurken ~4 GB. Görme modülü yalnızca gerektiğinde yükleniyor, 5 dakika boşta kalınca modeller GPU'dan çıkıyor." },
      { title: "Hızlı uyanma", text: "Kısayola basınca modeller yüklenmeye başlıyor ve kullanıcı konuşurken hazır oluyor; ilk ses soru bittikten yaklaşık 2 saniye sonra geliyor." }
    ],
    gallery: [
      { src: "assets/media/work/friday/chat.webp", caption: "Sohbet paneli: pano düzeltme, hafıza ve sistem soruları.", wide: true, pad: true },
      { src: "assets/media/work/friday/hud-speaking.webp", caption: "Konuşurken açılan kapsül.", pad: true },
      { src: "assets/media/work/friday/hud-thinking.webp", caption: "Düşünürken.", pad: true },
      { src: "assets/media/work/friday/privacy.webp", caption: "Gizlilik defteri: mikrofonun açık kaldığı her an.", wide: true, pad: true }
    ]
  },
  {
    slug: "bilgec",
    featured: true,
    title: "BilGeç",
    sceneTitle: "BilGeç",
    scene: { shots: ["assets/media/work/bilgec/home.webp", "assets/media/work/bilgec/answer.webp"], phone: true },
    headline: "Sosyal medyada kaydırmaya kısa bir bilgi molası veren Android uygulaması.",
    summary: "Seçilen uygulamalardaki toplam süreyi cihazda sayıyor; süre dolunca açık uygulamanın üstünde dört şıklı bir genel kültür sorusu açıyor. Hesap, reklam ve internet yok.",
    year: "2026",
    type: "Android uygulaması",
    role: "Ürün, tasarım ve geliştirme",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Kullanım erişimi · ön plan servisi", "Node.js veri aracı"],
    links: { github: "https://github.com/kursatcnk/bilgec" },
    stage: "#e9dfd8",
    cover: { main: "assets/media/work/bilgec/home.webp", side: "assets/media/work/bilgec/answer.webp" },
    intro: [
      "Ekran süresi uygulamaları genelde bir sınır koyup uygulamayı kilitliyor; çoğu kişi de birkaç gün sonra bu kilidi kapatıyor. Ben kaydırmayı yasaklamak yerine araya küçük ve işe yarar bir şey koymak istedim.",
      "BilGeç, Instagram, TikTok, YouTube gibi seçilen uygulamalardaki aktif süreyi birlikte sayıyor. Ayarlanan süre dolunca uygulamanın üstünde kısa bir soru açılıyor; cevaplanınca sayaç sıfırlanıyor ve kullanıcı kaldığı yere dönüyor. Sorular ve istatistikler yalnızca cihazda."
    ],
    features: [
      { title: "Ortak sayaç", text: "Instagram, TikTok, X, YouTube, Facebook, Reddit ve Snapchat için tek sayaç; 15, 30, 45 ya da 60 dakikalık aralıklar ve bir saat ya da gün sonuna kadar duraklatma." },
      { title: "3.114 çevrimdışı soru", text: "Bayraklar, coğrafya, temel bilim, tarih, sanat, doğa, spor ve günlük bilgi; sekiz kategori ayrı ayrı açılıp kapatılabiliyor." },
      { title: "Akıllı tekrar", text: "Görülmemiş bilgiler öne alınıyor, yanlış cevaplar ayrı tekrar ekranında yeniden soruluyor; sorular favorilere eklenebiliyor." },
      { title: "Hızlı tur", text: "Sayacı beklemeden 5 soruluk tur, tur puanı ve en iyi skor." },
      { title: "Hedef ve rozetler", text: "Günlük hedef, son yedi günün grafiği, günlük seri; ilk cevap, üç günlük seri ve haftada 25 soru için mini rozetler." },
      { title: "Tema ve geri yükleme", text: "Açık, koyu ve sistem teması; telefon yeniden başlayınca takip servisi kendiliğinden geri geliyor." }
    ],
    engineering: [
      { title: "Cihazda takip", text: "Süre Android'in kullanım istatistiklerinden okunuyor; hiçbir veri cihazdan çıkmıyor, uygulamanın internet izni yok." },
      { title: "Soru veritabanı", text: "Sorular açık lisanslı ülke ve periyodik tablo verilerinden bir Node.js aracıyla üretilip Room veritabanı olarak uygulamaya gömülüyor." },
      { title: "Tekrar önleme", text: "Her soru bir bilgi anahtarına bağlı; aynı bilgiyi soran farklı cümleler de tekrar sayılıyor ve görülmemiş bilgiler önce geliyor." },
      { title: "Testler", text: "Birim testleri, lint ve debug derlemesi tek Gradle komutuyla çalışıyor." }
    ],
    gallery: [
      { src: "assets/media/work/bilgec/home.webp", caption: "Ana ekran: koruma, sıradaki mola ve hızlı tur.", pad: true },
      { src: "assets/media/work/bilgec/question.webp", caption: "Hızlı turda bir soru.", pad: true },
      { src: "assets/media/work/bilgec/answer.webp", caption: "Cevaptan sonra kısa açıklama.", pad: true }
    ]
  },
  {
    slug: "linguaflow",
    title: "LinguaFlow",
    subtitle: "Cihazda canlı altyazı ve çeviri",
    summary: "Windows'ta çalan her konuşmayı duyduğu anda yazıya döküp seçilen dile çeviren, her zaman üstte duran altyazı şeridi.",
    year: "2026",
    type: "Masaüstü uygulama",
    stack: ["C# · .NET 10", "WPF", "Whisper.net", "Silero VAD", "Bergamot"],
    links: { github: "https://github.com/kursatcnk/LinguaFlow" },
    intro: ["Video, toplantı, yayın ya da oyunda çalan sesi sistemden yakalayıp Whisper ile GPU'da yazıya döküyor ve çeviriyor. Ses bilgisayardan hiç çıkmıyor; \"yalnızca cihazda\" modunda çeviri de Mozilla'nın yerel modelleriyle yapılıyor."],
    highlights: ["Konuşma sürerken güncellenen anlık altyazı", "Arka plandaki şarkıyı ayıklayan ana konuşmacı filtresi", "Önceki cümleyle bağlamlı çeviri", "Cümle bittikten ~0,5 sn sonra kesin çeviri (RTX 3070)", "99 dilde otomatik dil algılama"]
  },
  {
    slug: "promptforge",
    featured: false,
    title: "PromptForge",
    subtitle: "Modele göre prompt iyileştirme",
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
    featured: false,
    title: "OnPixel — Cards Rumble",
    subtitle: "Oynanarak öğrenilen oyun sitesi",
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
    slug: "work-tracker",
    featured: false,
    title: "WorkTracker",
    subtitle: "USB'den çalışan hatırlatıcılı görev takibi",
    sceneTitle: "WorkTracker",
    scene: { shots: ["assets/media/work/work-tracker/main.webp", "assets/media/work/work-tracker/alarm.webp"] },
    headline: "“Şu gün tekrar yazarım” notları için küçük bir uygulama.",
    summary: "Müşteri takibinde geri dönüş notlarının kaybolmaması için geliştirdiğim bir masaüstü uygulaması. Kurulum istemiyor, USB'den çalışıyor; zamanı gelince ekrana sesli bir hatırlatma çıkarıyor.",
    year: "2026",
    type: "Masaüstü uygulama",
    role: "Tasarım ve geliştirme",
    stack: [".NET 10", "WPF", "JSON depolama", "Tek dosya yayın"],
    links: { github: "https://github.com/kursatcnk/work-tracker" },
    stage: "#15191f",
    cover: { main: "assets/media/work/work-tracker/main.webp", side: "assets/media/work/work-tracker/alarm.webp" },
    intro: [
      "Müşteri yazışmalarının yoğun olduğu işlerde en kolay kaybolan şey “şu gün tekrar dönmem lazım” notları oluyor. Hazır araçlar ya bu iş için fazla ağır kalıyor ya da kurulum ve hesap istiyor.",
      "WorkTracker çift tıkla açılan, saatin yanındaki simgeye inip arka planda bekleyen küçük bir uygulama. Zamanı gelince ekranın en önüne sesli bir uyarı çıkarıyor; tüm veriler exe'nin yanındaki tek bir dosyada, USB ile birlikte taşınıyor."
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
      { src: "assets/media/work/work-tracker/main.webp", caption: "Ana liste: öncelik şeritleri, aşama ilerlemesi ve müşteri etiketleri.", pad: true, wide: true },
      { src: "assets/media/work/work-tracker/alarm.webp", caption: "Kaçırılan hatırlatma uyarısı ve erteleme seçenekleri.", pad: true },
      { src: "assets/media/work/work-tracker/stages.webp", caption: "Aşamalar penceresi.", pad: true }
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
