// Yazılar: liste, ana sayfa ve makale sayfası bu veriden besleniyor.
// slug ve tarihler eski bağlantılar çalışsın diye sabit tutuluyor.
window.KURSAT_POSTS = [
  {
    slug: "web-sitesi-donusum-mimarisi",
    title: "Bir web sitesinin ilk ekranı neyi anlatmalı?",
    category: "Genel",
    date: "2024-06-20",
    readingTime: 4,
    featured: true,
    tags: ["İlk ekran", "İçerik", "İletişim"],
    excerpt: "Bir siteye girdiğimde ilk birkaç saniyede üç şeyi anlamak istiyorum: ne yapıyorsunuz, kimin için yapıyorsunuz, size nasıl ulaşırım. Çoğu site bu üçünden en az birini atlıyor.",
    content: `
<p>Destekte çalışırken müşterilerin bize ulaşmaya çalıştığı sayfaları çok gördüm. Ortak nokta şuydu: insanlar okumuyor, tarıyor. Aradığını birkaç saniyede bulamayan ya telefonu açıyor ya da sekmeyi kapatıyor.</p>
<h2>İlk ekranda üç soru</h2>
<p>Bir sitenin en üst kısmı, yani sayfayı kaydırmadan görülen alan, şu üç soruya cevap vermeli:</p>
<ul>
  <li><strong>Ne yapıyorsunuz?</strong> Tek cümleyle. “Yenilikçi çözümler” değil, “Kadıköy'de diş kliniği” gibi.</li>
  <li><strong>Kimin için?</strong> Herkese hitap eden bir cümle aslında kimseye hitap etmiyor.</li>
  <li><strong>Şimdi ne yapmalıyım?</strong> Belirgin tek bir buton. Üç farklı buton yan yana olunca hiçbiri tıklanmıyor.</li>
</ul>
<h2>Sık gördüğüm hatalar</h2>
<p>En yaygını her şeyi ana sayfaya koymak: hizmetlerin tamamı, ekip, haberler, kampanyalar... Ziyaretçi neye bakacağını bilemiyor. Ana sayfa bir vitrin; ayrıntılar kendi sayfalarında durabilir.</p>
<p>İkincisi, iletişim yolunun belirsiz olması. Form mu doldurayım, WhatsApp'tan mı yazayım, arayayım mı? Hepsi olabilir ama biri öne çıkmalı. Size en çok işi hangisi getiriyorsa onu büyütün.</p>
<p>Üçüncüsü, iddia edip göstermemek. “Kaliteli hizmet” yazmak yerine yaptığınız bir işin fotoğrafını, bir müşterinin gerçek yorumunu ya da çalışma şeklinizi koymak çok daha ikna edici.</p>
<h2>Basit bir sıra</h2>
<ol>
  <li>Ne yaptığınızı söyleyen başlık ve tek bir buton</li>
  <li>Hizmetler, kısa başlıklarla</li>
  <li>Örnek işler</li>
  <li>Nasıl çalıştığınız</li>
  <li>Sayfanın sonunda yine iletişim</li>
</ol>
<p>Bu sıra her iş için doğru olmayabilir ama boş bir sayfaya başlamaktan iyidir. Sonra gerçek ziyaretçilerin nerede durduğuna bakıp düzeltirsiniz.</p>`
  },
  {
    slug: "clean-architecture-urun-gelistirme",
    title: "Clean Architecture'a ne zaman gerek var?",
    category: "Mimari",
    date: "2024-06-26",
    readingTime: 5,
    featured: true,
    tags: ["Mimari", "Bakım", ".NET"],
    excerpt: "Klasör sayısını artırmak mimari değil. Clean Architecture'ın asıl derdi iş kurallarını veritabanından ve arayüzden ayırmak. Peki her projede buna gerek var mı?",
    content: `
<p>Clean Architecture'ı ilk öğrendiğimde her projeye uyguladım. Üç ekranlık bir uygulama için dört katman, onlarca arayüz... Kod düzenli görünüyordu ama küçük bir değişiklik için beş dosya açmam gerekiyordu. Zamanla ne zaman işe yaradığını daha iyi anladım.</p>
<h2>Temel fikir</h2>
<p>Bağımlılıklar içe doğru akar. Uygulamanın merkezindeki iş kuralları, “sipariş nasıl oluşur, indirim nasıl hesaplanır” gibi, veritabanını, web çatısını ya da dış servisleri bilmez. Dış katmanlar bu çekirdeğe uyum sağlar.</p>
<p>Pratikteki karşılığı şu: başka bir veritabanına geçmeniz ya da ödeme sağlayıcısını değiştirmeniz gerektiğinde iş kurallarına dokunmazsınız. Test yazarken de veritabanı kurmadan kuralları deneyebilirsiniz.</p>
<h2>Ne zaman değer?</h2>
<ul>
  <li>Proje uzun yaşayacaksa ve birden fazla kişi üzerinde çalışacaksa</li>
  <li>İş kuralları karmaşıksa ve sık değişiyorsa</li>
  <li>Ödeme, kargo, e-posta gibi dış servisler ileride değişebilecekse</li>
</ul>
<h2>Ne zaman fazla?</h2>
<p>Basit bir kayıt-listeleme uygulaması, kısa ömürlü bir kampanya sitesi ya da bir fikri denemek için yazılan prototip. Bunlarda iyi isimlendirilmiş birkaç klasör ve controller'da birikmeyen bir servis katmanı genelde yeterli.</p>
<h2>Abartmadan başlamak</h2>
<ul>
  <li>İş akışlarına isim verin: “Sipariş oluştur”, “Üyeliği yenile”. Her biri ayrı bir sınıf ya da metot olsun.</li>
  <li>Veritabanı ve dış servis erişimini bir arayüzün arkasına alın.</li>
  <li>İş mantığını controller'a yazmayın.</li>
</ul>
<p>Bu üç alışkanlık bile projeyi ileride tam bir Clean Architecture yapısına taşımayı kolaylaştırıyor. Gerek olursa.</p>`
  },
  {
    slug: "performans-seo-deneyim",
    title: "Yavaş bir siteyi hızlandırırken nereden başlıyorum?",
    category: "Web",
    date: "2024-06-18",
    readingTime: 4,
    featured: true,
    tags: ["Hız", "Google", "Görseller"],
    excerpt: "Hız çalışmasına araç listesiyle değil, ölçümle başlıyorum. Çoğu zaman sorunun büyük kısmı birkaç ağır görselde ve artık kullanılmayan bir iki kütüphanede çıkıyor.",
    content: `
<p>“Site yavaş” şikâyeti genelde doğru ama tarif etmesi zor. O yüzden ilk iş ölçmek: Lighthouse ya da PageSpeed Insights ile birkaç sayfayı, özellikle telefon görünümünde test ediyorum. Rakamlar, hissedilen yavaşlığın nereden geldiğini gösteriyor.</p>
<h2>En çok fark yaratanlar</h2>
<ol>
  <li><strong>Görseller.</strong> Telefondan çekilmiş 4 MB'lık bir fotoğrafın 400 piksellik bir kutuda gösterildiğini çok gördüm. Doğru boyuta küçültüp WebP'ye çevirmek tek başına sayfayı birkaç kat hafifletebiliyor.</li>
  <li><strong>Kullanılmayan kod.</strong> Bir slider için eklenmiş ama artık kullanılmayan kütüphaneler, hazır temalarla gelen eklentiler. Silmek en hızlı optimizasyon.</li>
  <li><strong>Yükleme sırası.</strong> İlk ekranda görünenler önce yüklensin, sayfanın altındakiler ziyaretçi oraya yaklaşınca.</li>
  <li><strong>Önbellek.</strong> CSS, fontlar, logolar gibi değişmeyen dosyalar tarayıcıda saklansın, her ziyarette yeniden indirilmesin.</li>
</ol>
<h2>Google ile ilgisi</h2>
<p>Google hızı sıralamada dikkate alıyor ama tek başına mucize yaratmıyor. Daha önemlisi, yavaş açılan sayfada ziyaretçinin beklememesi. Hızlanan bir sitede insanlar daha çok sayfa geziyor; bu da dolaylı olarak işe yarıyor.</p>
<h2>Bir kere yetmiyor</h2>
<p>Hızlandırdığınız site, her yeni görsel ve eklentiyle yavaş yavaş eski hâline dönüyor. Büyük bir değişiklikten sonra testi tekrarlamak ve görselleri yüklemeden önce küçültmeyi alışkanlık edinmek bunu önlüyor.</p>`
  },
  {
    slug: "guvenli-giris-jwt-oturum",
    title: "Giriş sistemi tasarlarken düşündüğüm şeyler",
    category: "Güvenlik",
    date: "2024-06-26",
    readingTime: 5,
    featured: false,
    tags: ["Güvenlik", "JWT", "Oturum"],
    excerpt: "Giriş ekranı uygulamanın kapısı. Kötü tasarlanırsa ya kullanıcıyı yoruyor ya da açık bırakıyor. “Oturum mu, JWT mi?” sorusundan önce cevaplanması gereken birkaç soru var.",
    content: `
<p>Destekte en sık gelen taleplerden biri “giriş yapamıyorum”du. Şifre unutma, kilitlenen hesaplar, beklenmedik anda kapanan oturumlar... Bunların çoğu kullanıcı hatası değil, tasarım eksiğiydi. O yüzden bir giriş sistemi kurarken önce senaryolara bakıyorum.</p>
<h2>Önce sorular</h2>
<ul>
  <li>Uygulama sadece web mi, yoksa mobil uygulama ya da başka servisler de kullanacak mı?</li>
  <li>Bir kullanıcının erişimini anında kapatmam gerekebilir mi?</li>
  <li>Kim neyi görebilir, kim neyi değiştirebilir?</li>
</ul>
<h2>Oturum mu, JWT mi?</h2>
<p><strong>Sunucu tarafı oturum</strong>, tek bir web uygulaması için genelde en basit ve en güvenli seçenek. Bir kullanıcının erişimini kapatmak istediğinizde oturumunu silmeniz yeterli.</p>
<p><strong>JWT</strong>, birden fazla servis ya da mobil uygulama olduğunda işe yarıyor; her servis token'ı kendi başına doğrulayabiliyor. Bedeli, verilmiş bir token'ı süresi dolmadan geri almanın zor olması. Bu yüzden erişim token'larını kısa ömürlü tutup bir yenileme mekanizması kurmak gerekiyor.</p>
<h2>Gözden kaçmaması gerekenler</h2>
<ul>
  <li>Şifreler BCrypt gibi bilerek yavaş çalışan bir algoritmayla saklanmalı.</li>
  <li>Giriş denemeleri IP ve hesap başına sınırlanmalı.</li>
  <li>Şifre sıfırlama bağlantısı tek kullanımlık ve kısa süreli olmalı.</li>
  <li>İki adımlı doğrulama en azından yönetici hesaplarında olmalı.</li>
  <li>Başarısız girişler kayda geçmeli; bir saldırıyı ancak bu kayıtlarla fark edersiniz.</li>
</ul>
<p>Güvenlik ile kolaylık sanıldığı kadar çelişmiyor. “Bu cihazı hatırla” seçeneği, açık bir hata mesajı ve kolay bir şifre sıfırlama akışı, kullanıcıyı yormadan güvenliği artırıyor.</p>`
  },
  {
    slug: "ui-ux-guven-donusum",
    title: "Kullanıcı neden vazgeçer? Arayüzde dikkat ettiğim yedi şey",
    category: "Tasarım",
    date: "2024-06-19",
    readingTime: 4,
    featured: false,
    tags: ["Tasarım", "Kullanılabilirlik", "Erişilebilirlik"],
    excerpt: "Kullanıcılar neden vazgeçtiklerini söylemiyor, sessizce gidiyorlar. Destekte gördüğüm şikâyetlerin çoğu aslında birkaç basit arayüz hatasına dayanıyordu.",
    content: `
<p>Destek ekibindeyken bir şeyi fark ettim: kullanıcıların şikâyet ettiği şey ile asıl sorun çoğu zaman farklıydı. “Sistem çalışmıyor” diyen kişi genelde yanlış butona basmıştı, çünkü doğru buton gözden kaçıyordu.</p>
<h2>Dikkat ettiğim yedi şey</h2>
<ul>
  <li><strong>Bir ana eylem.</strong> Her ekranda en önemli buton belli olsun, ikincil eylemler daha sade dursun.</li>
  <li><strong>Okuma sırası.</strong> Başlık, açıklama, buton. Göz bu sırayı zorlanmadan takip edebilmeli.</li>
  <li><strong>Boşluk.</strong> Sıkışık ekranlar daha karmaşık görünür. Boşluk eklemek çoğu zaman içerik çıkarmaktan daha kolay bir çözüm.</li>
  <li><strong>Tutarlılık.</strong> Aynı işi yapan butonlar her yerde aynı görünsün, aynı adı taşısın.</li>
  <li><strong>Anlaşılır hata mesajları.</strong> “Bir hata oluştu” değil; neyin yanlış olduğu ve ne yapılması gerektiği.</li>
  <li><strong>Telefon.</strong> Tıklanacak alanlar parmakla rahat basılacak büyüklükte olsun.</li>
  <li><strong>Klavye ve kontrast.</strong> Sadece klavye kullanan biri de gezebilmeli; açık gri yazılar beyaz zeminde kaybolmamalı.</li>
</ul>
<h2>Beğenmek yerine ölçmek</h2>
<p>“Bence daha güzel oldu” iyi bir ölçü değil. Formu kaç kişinin başlatıp kaçının bitirdiğine, insanların hangi sayfada çıktığına bakmak çok daha fazlasını anlatıyor. Küçük bir değişikliğin etkisini bu rakamlarla görebiliyorsunuz.</p>`
  },
  {
    slug: "net8-minimal-api-ne-zaman",
    title: ".NET 8 Minimal API'yi nerede kullanıyorum?",
    category: "API",
    date: "2024-06-26",
    readingTime: 4,
    featured: false,
    tags: [".NET 8", "Minimal API", "Backend"],
    excerpt: "Minimal API az kodla hızlı bir başlangıç sağlıyor. Ama proje büyüdükçe düzeni korumak size kalıyor; birkaç alışkanlıkla bu sorun olmaktan çıkıyor.",
    content: `
<p>Minimal API ile ilk denememde tek bir Program.cs dosyasında yirmi uç nokta birikmişti. Çalışıyordu ama hangi uç noktanın nerede olduğunu bulmak zordu. Sorun Minimal API'de değil, benim düzen kurmamamdaydı.</p>
<h2>İyi oturduğu yerler</h2>
<ul>
  <li>Az sayıda uç noktası olan küçük servisler</li>
  <li>Bir fikri hızlıca denemek için yazılan prototipler</li>
  <li>İki sistem arasında köprü kuran küçük entegrasyon servisleri</li>
</ul>
<p>Onlarca ekranı ve karmaşık yetkilendirmesi olan bir uygulamada controller tabanlı yapı hâlâ daha rahat olabiliyor. İkisi aynı projede birlikte de kullanılabiliyor.</p>
<h2>Düzeni korumak için</h2>
<ul>
  <li><strong>Gruplayın.</strong> Uç noktaları konuya göre ayrı dosyalara bölün; <code>MapGroup</code> ile ortak öneki ve yetkiyi bir kez tanımlayın.</li>
  <li><strong>Doğrulamayı ayırın.</strong> Gelen veriyi kontrol eden kodu uç noktanın içine gömmeyin.</li>
  <li><strong>Hataları tek biçimde döndürün.</strong> <code>ProblemDetails</code> gibi standart bir yapı, istemci tarafında işi kolaylaştırıyor.</li>
  <li><strong>Kayıt tutun.</strong> Bir istek hata verdiğinde neler olduğunu loglardan görebilmelisiniz.</li>
</ul>
<h2>Hız meselesi</h2>
<p>Minimal API biraz daha hafif ama bir uygulamayı asıl yavaşlatan şey genelde veritabanı sorguları oluyor. Gereğinden fazla veri çeken bir sorguyu düzeltmek, çatı seçiminden çok daha büyük fark yaratıyor.</p>`
  },
  {
    slug: "veri-modeli-saglam-temel",
    title: "Veri modelini baştan doğru kurmak neden bu kadar önemli?",
    category: "Veri",
    date: "2024-06-10",
    readingTime: 4,
    featured: false,
    tags: ["Veri", "SQL", "Raporlama"],
    excerpt: "Uygulamanın ekranlarını sonradan değiştirmek kolay, veri modelini değiştirmek zor. Siemens'te rapor hazırlarken ve sonra kendi projelerimde bunu birkaç kez zor yoldan öğrendim.",
    content: `
<p>Siemens'teki stajımda işimin büyük kısmı farklı tablolardan veri çekip rapor hazırlamaktı. En çok vaktimi alan şey sorgu yazmak değil, aynı bilginin farklı tablolarda farklı yazılmış olmasıydı. Bir kaydın adı bir yerde kısaltılmış, başka bir yerde tam yazılmıştı; sonuçlar birbirini tutmuyordu.</p>
<h2>Dikkat ettiğim dört şey</h2>
<ol>
  <li><strong>Bir bilgi tek yerde dursun.</strong> Müşterinin adresi her siparişe kopyalanmasın, müşteriye bağlı olsun. Sipariş anındaki adresi saklamak gerekiyorsa bunu ayrıca ve bilerek yapın.</li>
  <li><strong>İsimler anlaşılır olsun.</strong> <code>tbl_x1</code> yerine <code>Siparisler</code>. Altı ay sonra o sorguyu yazacak kişi siz de olabilirsiniz.</li>
  <li><strong>İlişkiler doğru kurulsun.</strong> Bir öğrenci birden fazla derse, bir derse de birden fazla öğrenci kaydolabiliyorsa bu bir ara tabloyla gösterilmeli.</li>
  <li><strong>Raporu baştan düşünün.</strong> “Bu veriden ileride hangi soruyu soracağız?” diye sormak eksik alanları erkenden fark ettiriyor. Tarih alanı olmayan bir tablodan aylık rapor çıkaramazsınız.</li>
</ol>
<h2>Sonradan düzeltmek</h2>
<p>Model yanlış kurulmuşsa ve içinde veri varsa, düzeltmek hem zaman alıyor hem risk taşıyor: veriyi taşımak, eski alanları silmeden önce yenilerini doldurmak, her adımı test etmek gerekiyor. Baştan bir iki saat fazla düşünmek insanı bu işten kurtarıyor.</p>`
  },
  {
    slug: "api-entegrasyonlari-dayaniklilik",
    title: "Dış servislere bağlanırken neler ters gidebilir?",
    category: "API",
    date: "2024-05-28",
    readingTime: 5,
    featured: false,
    tags: ["API", "Entegrasyon", "Hata yönetimi"],
    excerpt: "Bir API'ye bağlanmak birkaç satır kod. Zor olan, o servis yavaşladığında, hata verdiğinde ya da cevabının biçimini değiştirdiğinde ne olacağı.",
    content: `
<p>Destekte çözdüğüm vakaların önemli bir kısmı bir entegrasyondan çıkıyordu. Uygulama çalışıyordu ama bağlandığı dış servis yavaşlamış ya da bir alanın adını değiştirmişti. Hata mesajı ise sadece “işlem başarısız” diyordu.</p>
<h2>Sık karşılaşılanlar</h2>
<ul>
  <li>Geçici bağlantı kopmaları ve çok uzun süren cevaplar</li>
  <li>Servis cevabının biçiminin haber verilmeden değişmesi</li>
  <li>İstek sınırına (rate limit) takılmak</li>
  <li>Hata olduğunda nedenini gösterecek bir kaydın olmaması</li>
</ul>
<h2>Kontrol listem</h2>
<ol>
  <li><strong>Zaman aşımı koyun.</strong> Bir isteği sonsuza kadar beklemeyin; birkaç saniye sonra vazgeçip kullanıcıya bilgi verin.</li>
  <li><strong>Tekrar denemeyi akıllıca yapın.</strong> Her hatada değil, geçici hatalarda; her denemede biraz daha bekleyerek. .NET'te Polly bu iş için çok pratik.</li>
  <li><strong>Gelen veriyi kontrol edin.</strong> Beklemediğiniz bir biçim geldiğinde uygulama çökmesin, durumu kaydetsin.</li>
  <li><strong>İstekleri izlenebilir yapın.</strong> Her isteğe bir kimlik verin ve loglarda baştan sona takip edin.</li>
  <li><strong>Bir B planınız olsun.</strong> Servis tamamen çökerse kullanıcı ne görecek? Boş bir ekran mı, yoksa “şu an yapılamıyor, birazdan tekrar deneyin” mi?</li>
</ol>
<p>Bu listenin hepsini her entegrasyonda uygulamak gerekmiyor. Ama ödeme gibi kritik bağlantılarda eksik kalan madde, bir gün mutlaka kendini hatırlatıyor.</p>`
  },
  {
    slug: "scrum-ile-net-ilerleme",
    title: "Scrum'dan bir şey alacaksanız, bu üçünü alın",
    category: "Yönetim",
    date: "2024-05-22",
    readingTime: 3,
    featured: false,
    tags: ["Scrum", "Planlama", "Geri bildirim"],
    excerpt: "Scrum çoğu yerde bir toplantı listesine dönüşüyor. Bence işe yarayan kısmı çok daha küçük: kısa bir hedef, çalışanı göstermek ve dönüp bakmak.",
    content: `
<p>Scrum'u hem ekibin içinden hem de dışarıdan gördüm. Bütün toplantıları eksiksiz yapıp yine de geciken ekipler de var, kuralların yarısını uygulamadan düzgün ilerleyenler de. Aradaki fark genelde şu üç şeyde.</p>
<h2>1. Kısa ve net bir hedef</h2>
<p>Bir ya da iki haftalık bir dönem için “bu sürenin sonunda şu çalışıyor olacak” diyebilmek. Görev listesi değil, bir sonuç. Hedef net olunca araya giren işlere “bu dönem değil” demek kolaylaşıyor.</p>
<h2>2. Çalışanı göstermek</h2>
<p>Dönem sonunda yapılan işi, onu isteyen kişiye çalışırken göstermek. Toplantıda anlatılan ilerleme ile ekranda görülen ilerleme arasındaki farkı en hızlı bu kapatıyor. Yanlış anlaşılmalar da iş bittikten sonra değil, burada ortaya çıkıyor.</p>
<h2>3. Dönüp bakmak</h2>
<p>“Bu dönem ne iyi gitti, neyi değiştirelim?” sorusu. Uzun bir toplantı olması gerekmiyor; on beş dakika ve somut bir karar yeterli. Önemli olan, bir sonraki dönemde o değişikliğin gerçekten yapılması.</p>
<p>Freelance işlerde de aynı ritmi kullanıyorum: haftalık bir hedef, hafta sonunda çalışan bir ara sürüm ve kısa bir değerlendirme.</p>`
  },
  {
    slug: "clean-code-bakim-maliyeti",
    title: "Kodu okunur tutmak için edindiğim yedi alışkanlık",
    category: "Yazılım",
    date: "2024-05-15",
    readingTime: 4,
    featured: false,
    tags: ["Okunabilirlik", "Bakım", "C#"],
    excerpt: "Çalışan kod yazmak başlangıç. Altı ay sonra o koda dönen kişinin, ki çoğu zaman bu siz oluyorsunuz, ne olduğunu hızlıca anlayabilmesi asıl mesele.",
    content: `
<p>Destekte bir hatanın nedenini bulmak için başkalarının yazdığı kodu çok okudum. Bazı dosyalarda beş dakikada ne olduğunu anlıyordum, bazılarında bir saat sonra bile emin olamıyordum. Aradaki fark çoğunlukla zekice bir mimari değil, basit alışkanlıklardı.</p>
<h2>Yedi alışkanlık</h2>
<ul>
  <li><strong>İsim, ne yaptığını söylesin.</strong> <code>Hesapla()</code> değil, <code>KdvDahilTutariHesapla()</code>. Uzun bir isim, açıklama satırından iyidir.</li>
  <li><strong>Bir metot tek iş yapsın.</strong> Metodu anlatırken “ve” diyorsanız muhtemelen ikiye bölünmeli.</li>
  <li><strong>İç içe koşulları azaltın.</strong> Geçersiz durumları başta eleyip erkenden dönmek kodu düzleştiriyor.</li>
  <li><strong>Hataları yutmayın.</strong> Boş bir catch bloğu, ileride bulunması en zor hataları üretiyor.</li>
  <li><strong>Log yazarken okuyacak kişiyi düşünün.</strong> Sadece “hata” değil; hangi kullanıcı, hangi işlem, hangi değer.</li>
  <li><strong>İş kurallarını dış dünyadan ayırın.</strong> Veritabanına bağlı olmayan kodu test etmek çok daha kolay.</li>
  <li><strong>Basit olanı seçin.</strong> “İleride lazım olur” diye eklenen soyutlamaların çoğu hiç lazım olmuyor.</li>
</ul>
<p>Bunların hiçbiri kitap ezberlemeyi gerektirmiyor. Kod incelerken “bunu ilk kez gören biri anlar mı?” diye sormak çoğunu kendiliğinden getiriyor.</p>`
  },
  {
    slug: "ddos-hizmet-kesintisi-riski",
    title: "DDoS saldırısına karşı küçük bir işletme ne yapabilir?",
    category: "Siber",
    date: "2024-05-10",
    readingTime: 4,
    featured: false,
    tags: ["Güvenlik", "DDoS", "Hazırlık"],
    excerpt: "DDoS'tan tamamen korunmak büyük şirketler için bile kolay değil. Ama birkaç basit önlemle bir saldırının etkisini ciddi ölçüde azaltmak mümkün.",
    content: `
<p>DDoS saldırısında amaç sisteme girmek değil, onu meşgul edip gerçek ziyaretçilerin ulaşamamasını sağlamak. Bir kampanya günü sitenin açılmaması ya da sipariş alan bir sistemin saatlerce durması doğrudan para kaybı demek.</p>
<h2>Katman katman önlem</h2>
<ol>
  <li><strong>CDN ve güvenlik duvarı.</strong> Cloudflare gibi bir hizmet trafiği sunucunuza ulaşmadan karşılıyor ve şüpheli istekleri ayıklıyor. Küçük işletmeler için ücretsiz planı bile çok şey değiştiriyor.</li>
  <li><strong>İstek sınırlama.</strong> Aynı adresten saniyede yüzlerce istek gelmesi normal değil. Giriş, arama ve form gibi uç noktalara sınır koymak hem saldırıyı hem kötü niyetli botları yavaşlatıyor.</li>
  <li><strong>Önbellek.</strong> Her istekte veritabanına gitmeyen sayfalar yük altında çok daha uzun dayanıyor.</li>
  <li><strong>İzleme.</strong> Trafikte ani bir artış olduğunda haberiniz olsun. Sorunu müşteriden öğrenmek en kötü senaryo.</li>
  <li><strong>Ne yapılacağını önceden bilmek.</strong> Saldırı anında kimi arayacağınızı ve hangi ayarı açacağınızı bir sayfaya yazmak paniği azaltıyor.</li>
</ol>
<h2>Ne zaman ciddiye almalı?</h2>
<p>Siteniz sadece tanıtım amaçlıysa ve birkaç saat kapalı kalması büyük sorun yaratmıyorsa bir CDN çoğu zaman yeterli. Satışlarınız ya da randevularınız sitenizden geliyorsa yukarıdaki listenin tamamı üzerinde düşünmeye değer.</p>`
  },
  {
    slug: "proje-yonetimi-netlik",
    title: "Projeler neden gecikir? Kapsam, öncelik ve iletişim",
    category: "Yönetim",
    date: "2024-03-20",
    readingTime: 4,
    featured: false,
    tags: ["Kapsam", "Öncelik", "İletişim"],
    excerpt: "Gördüğüm gecikmelerin çok azı teknik bir sorundan kaynaklanıyordu. Çoğu, neyin yapılacağının baştan net olmamasından ya da beklemede kalan kararlardan çıktı.",
    content: `
<p>Bir işin başında “tam olarak ne yapıyoruz?” sorusu cevapsız kaldığında proje ilerliyor gibi görünüyor ama her hafta yeni bir “aslında şöyle olmalıydı” çıkıyor. Bugün analist olarak işimin önemli bir kısmı bu soruyu işin en başında netleştirmek.</p>
<h2>Gecikmelerin sık nedenleri</h2>
<ul>
  <li>Kapsam yazılı değil ya da iş ilerledikçe sessizce genişliyor.</li>
  <li>Karar vermesi gereken kişiye ulaşılamıyor; iş onay beklerken duruyor.</li>
  <li>Bir risk görülüyor ama kimseye söylenmiyor, büyüdüğünde ortaya çıkıyor.</li>
</ul>
<h2>Başlamadan önce üç soru</h2>
<ol>
  <li><strong>Hedef ne?</strong> Bu işin sonunda ne değişmiş olacak, tek cümleyle.</li>
  <li><strong>Bittiğini nasıl anlayacağız?</strong> “Kullanıcı formu doldurduğunda bilgiler CRM'e düşüyor” gibi kontrol edilebilir bir ölçüt.</li>
  <li><strong>Ne yapmıyoruz?</strong> Kapsam dışında kalanları yazmak, en az kapsamın içindekiler kadar önemli.</li>
</ol>
<h2>Küçük bir ritim</h2>
<p>Haftada bir, on beş dakikalık bir görüşme: ne bitti, ne takıldı, hangi karar bekleniyor. Bu kadar basit bir alışkanlık bile sorunları büyümeden görünür kılıyor.</p>`
  }
];
