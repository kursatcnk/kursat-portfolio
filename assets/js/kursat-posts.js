// Yazılar: liste, ana sayfa ve makale sayfası bu veriden besleniyor.
// Yazılımla ilgilenen de ilgilenmeyen de okuyabilsin diye her yazı gündelik bir örnekle başlıyor.
// Eski bağlantılar çalışsın diye mevcut yazıların slug ve tarihleri sabit tutuluyor.
window.KURSAT_POSTS = [
  {
    slug: "yapay-zekaya-iyi-soru-sormak",
    title: "Yapay zekâ neden bazen saçmalar? Çoğu zaman soru yüzünden",
    category: "Yapay zekâ",
    date: "2026-10-01",
    readingTime: 5,
    featured: true,
    tags: ["Yapay zekâ", "Prompt", "PromptForge"],
    excerpt: "ChatGPT'ye ya da Claude'a bir şey sorup alakasız bir cevap aldığınız oldu mu? Çoğu zaman sorun modelde değil, sorunun eksik olmasında. Bunu fark ettikten sonra PromptForge'u yazdım.",
    content: `
<p>Diyelim ki ChatGPT'den bir iş ilanı yazmasını istediniz: “Yazılım geliştirici için iş ilanı yaz.” Gelen metin düzgün ama tamamen sıradan: “Dinamik ekibimize katılacak, takım çalışmasına yatkın...” Okuyunca “bu yapay zekâ pek işe yaramıyor” diye düşünüyorsunuz.</p>
<p>Ama modelin elinde neler vardı? Şirketin adı yoktu, ne iş yaptığı yoktu. Kimi aradığınız, hangi teknolojileri kullandığınız, uzaktan mı ofisten mi çalışılacağı yoktu. Eksik bilgiyle en olası, yani en sıradan metni yazdı. Aynı işi yeni başlayan bir çalışana verseniz o da size önce bir sürü soru sorardı.</p>
<h2>Yeni bir çalışana iş verir gibi düşünün</h2>
<p>Bu modellerle çalışırken en işe yarayan bakış açısı bence şu: karşınızda çok bilgili ama sizi ve işinizi hiç tanımayan, ilk gününü yaşayan biri var. Ona bir iş verirken ne söylerdiniz?</p>
<ul>
  <li><strong>Amaç:</strong> Bu metin ne için yazılıyor, kim okuyacak?</li>
  <li><strong>Bağlam:</strong> Şirket kim, ürün ne, daha önce ne denendi?</li>
  <li><strong>Sınırlar:</strong> Ne uzunlukta olsun, hangi tonda, nelerden kaçınsın?</li>
  <li><strong>Örnek:</strong> Beğendiğiniz bir örnek varsa onu gösterin.</li>
  <li><strong>Biçim:</strong> Sonuç tablo mu olsun, madde madde mi, e-posta mı?</li>
</ul>
<p>İş ilanı isteğine bu beşini eklediğinizde gelen metin herhangi bir şirketin değil, sizin şirketinizin ilanı gibi okunmaya başlıyor. Model aynı; değişen tek şey sorunun kendisi.</p>
<h2>Her model aynı dili konuşmuyor</h2>
<p>İşin ilginç bir tarafı daha var: farklı modeller farklı yazım düzenlerini daha iyi anlıyor. Örneğin Anthropic, Claude'a verilen bilgileri XML benzeri etiketlerle ayırmayı öneriyor. GPT tarafında ise başlıklarla bölünmüş istekler iyi sonuç veriyor. İçerik aynı kalsa bile düzenin değişmesi sonucu etkileyebiliyor.</p>
<p>Bunları her seferinde hatırlamak zor. PromptForge'u bu yüzden yazdım. Araç, yazdığınız isteği okuyup eksik kalan kısımları gösteriyor (amaç, bağlam, sonuç biçimi, kısıtlar). Sonra isteği seçtiğiniz modelin en iyi anladığı biçimde yeniden düzenliyor ve her değişikliğin yanına nedenini yazıyor. Birkaç kullanımdan sonra aynı eksikleri zaten bırakmamaya başlıyorsunuz. Bence aracın asıl faydası da bu.</p>
<h2>Hemen deneyebileceğiniz bir şey</h2>
<p>Bir dahaki sefere bir şey istemeden önce isteğinizin sonuna şu cümleyi ekleyin: <em>“Başlamadan önce, bu işi iyi yapabilmen için eksik olan bilgileri bana sor.”</em> Model size sorular soracak. O soruları cevaplamak, iyi bir istek yazmayı öğrenmenin bildiğim en kısa yolu.</p>
<div class="kursat-callout"><strong>Yazılımcıysanız:</strong> Kod isterken dili ve sürümü, kullandığınız çatıyı, hata mesajının tamamını ve “ne denedim, ne oldu” bilgisini eklemek cevabın kalitesini en çok değiştiren şey. “Bu kod çalışmıyor” yazmakla hata çıktısını olduğu gibi yapıştırmak arasında çok fark var.</div>`
  },
  {
    slug: "teknik-is-analisti-ne-yapar",
    title: "Teknik iş analisti ne iş yapar? Kısaca: tercümanlık",
    category: "Süreç",
    date: "2026-10-01",
    readingTime: 5,
    featured: true,
    tags: ["İş analizi", "Kariyer", "İletişim"],
    excerpt: "Unvanımı söyleyince genelde ikinci bir soru geliyor: “O ne demek?” En kısa cevabım şu: işi isteyen kişiyle o işi yapacak yazılım ekibi arasında tercümanlık yapıyorum. Biraz açayım.",
    content: `
<p>Unvanımı söyleyince genelde ikinci bir soru geliyor: “O tam olarak ne demek?” En kısa cevabım şu: bir işi isteyen kişiyle o işi yapacak yazılım ekibi arasında tercümanlık yapıyorum. İkisi de Türkçe konuşuyor ama aynı cümleden çoğu zaman farklı şeyler anlıyorlar.</p>
<h2>Aynı cümle, iki farklı anlam</h2>
<p>Bir iş birimi şunu istesin: “Müşteri listesini Excel'e aktarabilelim.” Kulağa basit geliyor. Ama yazılım ekibinin bunu yapabilmesi için cevaplanması gereken bir sürü soru var:</p>
<ul>
  <li>Hangi müşteriler? Hepsi mi, yoksa ekranda filtrelenmiş olanlar mı?</li>
  <li>Hangi bilgiler? Telefon numaraları da olacak mı? Olacaksa bu listeyi kimler indirebilecek?</li>
  <li>Liste 50 bin satırsa ne olacak? Ekran bekleyecek mi, dosya e-postayla mı gelecek?</li>
  <li>Bu dosyayı kim, hangi sıklıkla, ne için kullanacak?</li>
</ul>
<p>Bu sorular sorulmadan iş başlarsa iki hafta sonra ekip “istediğiniz buydu” der, iş birimi “ama biz bunu demek istememiştik” der. Benim işim bu konuşmayı iki hafta sonra değil, en başta yaptırmak.</p>
<h2>Gün içinde neler yapıyorum?</h2>
<ul>
  <li><strong>Dinliyorum.</strong> Talebi getiren kişiyle konuşup asıl derdi anlamaya çalışıyorum. Bazen istenen şey sorunun çözümü değil, akla gelen ilk fikir oluyor.</li>
  <li><strong>Yazıya döküyorum.</strong> İhtiyacı, geliştiricilerin üzerinde çalışabileceği “user story”lere çeviriyorum. Yanına bir de kabul kriterleri ekliyorum, yani “işin bittiğini nasıl anlayacağız?” sorusunun cevabını.</li>
  <li><strong>Sıraya koyuyorum.</strong> Her şey aynı anda yapılamıyor. Hangi işin daha çok insanın işini kolaylaştırdığına bakıp öncelik veriyorum.</li>
  <li><strong>Takip ediyorum.</strong> Sorunların nerede tekrar ettiğini, hangi işlerin söz verilen süreyi aştığını rakamlarla izliyorum.</li>
</ul>
<h2>Destekten gelmenin faydası</h2>
<p>Bu role gelmeden önce aynı şirkette iki yıl yazılım destek uzmanıydım. Yani sorunların kullanıcıya nasıl yansıdığını birebir gördüm. Bir talebi değerlendirirken hâlâ ilk sorduğum şey bu: “Bu değişiklik, destek hattını arayan birinin derdini azaltır mı?”</p>
<p>Kod yazmayı bilmenin de faydası büyük. Geliştiricinin “bu zor” dediği şeyin neden zor olduğunu anlayabiliyorum. Bazen aynı ihtiyacı çok daha kolay karşılayacak bir yol da önerebiliyorum. Kendi projelerimde ise iki rolü birden yapıyorum: önce analist gibi soruyu netleştiriyor, sonra geliştirici olarak kodunu yazıyorum.</p>
<div class="kursat-callout"><strong>Bir yazılım yaptıracaksanız:</strong> Ne istediğinizi değil, neden istediğinizi anlatın. “Excel'e aktarma butonu istiyoruz” yerine “her ay sonu satış ekibi müşteri listesini elle hazırlıyor ve yarım günümüz gidiyor” demek, size çok daha iyi bir çözüm getirebilir.</div>`
  },
  {
    slug: "web-sitesi-donusum-mimarisi",
    title: "Bir siteye girdiğinizde ilk beş saniyede ne oluyor?",
    category: "Web",
    date: "2024-06-20",
    readingTime: 5,
    featured: true,
    tags: ["Web sitesi", "İlk izlenim", "İçerik"],
    excerpt: "Bir web sitesinde kalıp kalmayacağınıza çoğu zaman birkaç saniyede karar veriyorsunuz. Bu kararı neyin verdirdiğini bilirseniz, kendi sitenize de başka bir gözle bakarsınız.",
    content: `
<p>Telefonunuzdan bir diş kliniği aradığınızı düşünün. Google'da üç sonuca tıklıyorsunuz. Birincisi açılırken bekliyorsunuz; ekranda büyük bir slayt dönüyor, üzerinde “Gülüşünüz bizim için değerli” yazıyor. İkincisinin menüsü o kadar kalabalık ki aradığınızı bulamıyorsunuz. Üçüncüsünün en üstünde ise “Kadıköy'de diş kliniği · Bugün için randevu alın” yazıyor ve altında tek bir buton var.</p>
<p>Büyük ihtimalle üçüncüsünü arıyorsunuz. Diğer ikisinin doktorları belki daha iyi, ama bunu öğrenecek kadar orada kalmadınız.</p>
<h2>İnsanlar okumuyor, tarıyor</h2>
<p>Bir sayfaya girdiğimizde metni baştan sona okumuyoruz. Gözümüz başlıklara, butonlara, resimlere atlıyor ve kafamızda hızla üç soruya cevap arıyoruz:</p>
<ol>
  <li><strong>Doğru yerde miyim?</strong> Bu site aradığım şeyi mi yapıyor?</li>
  <li><strong>Güvenebilir miyim?</strong> Gerçek bir işletme mi, düzgün çalışıyor mu?</li>
  <li><strong>Şimdi ne yapacağım?</strong> Arayacak mıyım, yazacak mıyım, fiyata mı bakacağım?</li>
</ol>
<p>Bu sorulardan birinin cevabı birkaç saniyede bulunamazsa ziyaretçi “geri” tuşuna basıyor. Sayfaya ne kadar emek verilmiş olursa olsun, geri kalanı hiç görülmüyor.</p>
<h2>Sık yapılan üç hata</h2>
<p><strong>Ne yaptığını söylemeyen başlıklar.</strong> “Geleceği birlikte inşa ediyoruz” güzel bir cümle. Ama bir inşaat firmasında da, bir yazılım şirketinde de, bir okulda da kullanılabilir; ziyaretçiye hiçbir şey anlatmıyor. “İstanbul'da anahtar teslim ev tadilatı” ise anlatıyor.</p>
<p><strong>Her şeyi ana sayfaya koymak.</strong> Bütün hizmetler, haberler, ekip, kampanyalar, sertifikalar... Seçenek arttıkça karar vermek zorlaşıyor. Ana sayfa bir vitrin gibi; dükkândaki her şeyi vitrine koyarsanız hiçbir şey görünmez.</p>
<p><strong>İddia edip göstermemek.</strong> “Kaliteli ve güvenilir hizmet” yazmak herkesin yapabileceği bir şey. Yaptığınız bir işin fotoğrafı, gerçek bir müşteri yorumu, açık bir adres ve telefon numarası ise güveni gerçekten artırıyor.</p>
<h2>Kendi sitenize beş saniye testi yapın</h2>
<p>Sitenizi hiç görmemiş birine telefonunuzu verin, beş saniye baktırıp geri alın. Sonra sorun: “Bu işletme ne iş yapıyor? Ona nasıl ulaşırsın?” İki soruya da hemen cevap verebiliyorsa iyi durumdasınız. Duraksıyorsa sorunun nerede olduğunu muhtemelen siz de o anda göreceksiniz.</p>
<div class="kursat-callout"><strong>Site yapan biriyseniz:</strong> Tasarıma başlamadan önce müşteriden tek cümle isteyin: “Ne yapıyoruz, kimin için yapıyoruz?” Bu cümle yazılamıyorsa sorun tasarımda değil, henüz netleşmemiş mesajda.</div>`
  },
  {
    slug: "guvenli-giris-jwt-oturum",
    title: "Şifreniz bir sitede nasıl saklanıyor? (Aslında saklanmıyor)",
    category: "Güvenlik",
    date: "2024-06-26",
    readingTime: 6,
    featured: false,
    tags: ["Şifre", "Güvenlik", "İki adımlı doğrulama"],
    excerpt: "İyi yapılmış bir site şifrenizi bilmez. “Şifremi unuttum” dediğinizde size eski şifrenizi değil, yeni şifre bağlantısı göndermesinin nedeni bu. Bir giriş ekranının arkasında neler olduğuna bakalım.",
    content: `
<p>Bir siteye “şifremi unuttum” dediğinizde size eski şifreniz değil, yeni bir şifre belirlemeniz için bir bağlantı gelir. Bunun bir nedeni var: iyi yapılmış bir site şifrenizi bilmez. Bilmesi de gerekmez.</p>
<h2>Kıyma makinesi benzetmesi</h2>
<p>Şifreler, “hash” denen tek yönlü bir işlemden geçirilerek saklanır. Bunu bir kıyma makinesi gibi düşünebilirsiniz: eti makineden geçirip kıyma yapmak kolay, ama kıymadan eski eti geri elde etmek imkânsız. Üstelik aynı et her seferinde aynı kıymayı verir.</p>
<p>Siz kayıt olurken şifreniz bu makineden geçer ve site sadece “kıymayı” saklar. Giriş yaparken yazdığınız şifre yine makineden geçer; çıkan sonuç saklanan sonuçla aynıysa içeri alınırsınız. Site şifrenizin kendisini hiçbir zaman bir yere yazmaz.</p>
<p>İyi sistemler buna bir de “tuz” ekler: her kullanıcının şifresine, makineye girmeden önce o kişiye özel rastgele bir değer katılır. Böylece aynı şifreyi kullanan iki kişinin kayıtları bile birbirine benzemez. Ayrıca bu işlem bilerek yavaş yapılır. Sizin girişiniz için fark edilmeyecek kadar kısa sürer, ama milyonlarca şifreyi tek tek denemeye çalışan biri için yıllar alır.</p>
<h2>Bir site şifrenizi e-postayla geri gönderiyorsa</h2>
<p>Bu kötü bir işaret. Demek ki şifreniz o sistemde okunabilir hâlde duruyor. Site bir gün veri sızıntısı yaşarsa şifreniz olduğu gibi ortaya çıkar. Böyle bir sitede, başka hiçbir yerde kullanmadığınız bir şifre kullanın.</p>
<h2>Asıl tehlike: aynı şifreyi her yerde kullanmak</h2>
<p>Büyük sitelerin şifrelerinin doğrudan kırılması nadirdir. Çok daha yaygın olanı şu: küçük ve iyi korunmayan bir site sızıntı yaşar. Oradan çıkan e-posta ve şifre çiftleri otomatik programlarla e-posta, banka ve sosyal medya hesaplarında tek tek denenir. Her yerde aynı şifreyi kullanıyorsanız kapılar sırayla açılır.</p>
<ul>
  <li>Her site için farklı bir şifre kullanın. Hepsini ezberlemek zorunda değilsiniz; bir şifre yöneticisi bunu sizin yerinize yapar.</li>
  <li>E-posta hesabınızı özellikle koruyun. Diğer bütün hesaplarınızın “şifremi unuttum” bağlantısı oraya gidiyor.</li>
  <li>Önemli hesaplarda iki adımlı doğrulamayı açın. Şifreniz çalınsa bile telefonunuzdaki uygulamanın ürettiği kod olmadan kimse giremez.</li>
</ul>
<h2>Siteyi yapan tarafta neler olmalı?</h2>
<p>Bir giriş sistemi kurarken kullanıcının görmediği birkaç şeye dikkat etmek gerekiyor. Aynı adresten art arda yapılan giriş denemeleri sınırlanmalı, yoksa biri saniyede yüzlerce şifre deneyebilir. Şifre sıfırlama bağlantıları tek kullanımlık olmalı ve kısa sürede geçersiz hâle gelmeli. Başarısız girişler de kayda geçmeli; bir saldırıyı ancak bu kayıtlarla fark edebilirsiniz. Bunların hiçbiri kullanıcıya fazladan zahmet çıkarmıyor, çoğunun varlığından haberi bile olmuyor.</p>
<div class="kursat-callout"><strong>Geliştiriciyseniz:</strong> Şifreleri SHA-256 gibi hızlı algoritmalarla değil, BCrypt, scrypt ya da Argon2 gibi bilerek yavaş çalışan algoritmalarla saklayın. Hatalı girişte “bu e-posta kayıtlı değil” yerine “e-posta veya şifre hatalı” demek, saldırganın hangi hesapların var olduğunu öğrenmesini de engeller.</div>`
  },
  {
    slug: "clean-architecture-urun-gelistirme",
    title: "Yazılımda “mimari” ne demek? Bir evin tesisatı üzerinden",
    category: "Yazılım",
    date: "2024-06-26",
    readingTime: 5,
    featured: false,
    tags: ["Mimari", "Clean Architecture", "Bakım"],
    excerpt: "Yazılımcılar “mimari” dediğinde çoğu kişinin aklına karmaşık şemalar geliyor. Oysa mesele bir evin tesisatı kadar somut: musluğu değiştirmek için duvarı kırmanız gerekiyorsa bir yerde bir hata var.",
    content: `
<p>Banyonuzdaki musluğu değiştirmek istediğinizi düşünün. Çoğu evde bu bir saatlik iş: eskisini sökersiniz, yenisini takarsınız. Ama bazı evlerde borular duvarın içine öyle gömülmüştür ki musluğu değiştirmek için fayansları kırmanız gerekir. İki evde de musluktan aynı şekilde su akar. Fark, bir şeyi değiştirmek istediğiniz gün ortaya çıkar.</p>
<p>Yazılımda “mimari” dediğimiz şey de büyük ölçüde bu: sistemin parçalarının birbirine nasıl bağlandığı ve birini değiştirdiğinizde diğerlerinin ne kadar etkilendiği.</p>
<h2>Gerçek bir örnek: ödeme şirketini değiştirmek</h2>
<p>Bir e-ticaret sitesinin kartla ödeme almak için bir ödeme şirketiyle çalıştığını düşünelim. Bir gün daha uygun komisyon veren başka bir şirkete geçmek istiyorsunuz.</p>
<p>İyi kurulmuş bir sistemde ödeme işi tek bir yerde toplanmıştır. Sistemin geri kalanı sadece “şu tutarı tahsil et” der; bunun hangi şirketle yapıldığını bilmez. Yeni şirkete geçmek için yalnızca o parça değişir.</p>
<p>Kötü kurulmuş bir sistemde ise eski ödeme şirketinin kuralları her yere sızmıştır: sepet sayfası, iade ekranı, muhasebe raporu, kampanya hesabı... Hepsi o şirketin çalışma biçimine göre yazılmıştır. Değişiklik haftalar sürer ve her yerde yeni hatalar çıkar.</p>
<h2>Clean Architecture'ın fikri</h2>
<p>Yazılımcıların sık konuştuğu “Clean Architecture” yaklaşımının özü bu ayrımı yapmak. İşin kendi kuralları, yani indirimin nasıl hesaplandığı ya da bir siparişin ne zaman onaylandığı, merkezde durur ve dış dünyadan habersizdir. Veritabanı, ödeme şirketi, e-posta servisi ve ekranlar dışarıda kalır, merkeze uyum sağlar. Böylece dışarıdaki bir parça değiştiğinde merkezdeki kurallara dokunmak gerekmez.</p>
<h2>Ama her eve bu kadar tesisat gerekmez</h2>
<p>Bu yaklaşımı ilk öğrendiğimde her projeye uygulamaya çalıştım. Üç ekranlık küçük bir uygulama için dört katman, onlarca ayrı dosya... Kod çok düzenli görünüyordu ama küçük bir değişiklik için beş dosya açmam gerekiyordu. Bir bahçe kulübesine apartman tesisatı döşemek gibiydi.</p>
<p>Zamanla şunu öğrendim: mimari, projenin ne kadar yaşayacağına ve ne kadar değişeceğine göre seçilmeli. Kısa ömürlü bir kampanya sitesi için sade bir yapı yeterli. Yıllarca kullanılacak, birçok kişinin üzerinde çalışacağı ve kuralları sık değişen bir sistemde ise baştan düşünülmüş bir yapı ileride çok zaman ve para kazandırır.</p>
<div class="kursat-callout"><strong>Yazılım yaptıracaksanız:</strong> Teklif veren kişiye şunu sorun: “Yarın ödeme şirketini ya da e-posta servisini değiştirmek istesem ne kadar sürer?” Alacağınız cevap, sistemin nasıl kurulacağı hakkında size çok şey anlatır.</div>`
  },
  {
    slug: "ui-ux-guven-donusum",
    title: "Kullanıcı hata yapmaz, ekran yaptırır",
    category: "Web",
    date: "2024-06-19",
    readingTime: 5,
    featured: false,
    tags: ["Kullanılabilirlik", "Tasarım", "Destek"],
    excerpt: "Destek ekibinde çalışırken fark ettim: “sistem çalışmıyor” diye arayanların önemli bir kısmı aslında yanlış bir şey yapmamıştı. Ekran onları yanlış yere yönlendirmişti.",
    content: `
<p>Destek ekibinde çalışırken bir şey dikkatimi çekti: “sistem çalışmıyor” diye arayan kişilerin önemli bir kısmında sistem aslında çalışıyordu. Kullanıcı yanlış butona basmış, bir uyarıyı görmemiş ya da bir adımı atlamıştı. İlk tepki “kullanıcı hatası” demek oluyor. Ama aynı hatayı birçok farklı kişi yapıyorsa, sorun kişilerde değil ekrandadır.</p>
<h2>Kapı kolu örneği</h2>
<p>Hiç üzerinde “itiniz” yazan bir kapıyı çekmeye çalıştınız mı? Muhtemelen evet. Kapıda çekmek için yapılmış bir kol varsa, üzerine ne yazarsanız yazın insanlar çeker. Elimiz gözümüzün gördüğüne göre hareket ediyor, yazıyı okumuyoruz.</p>
<p>Ekranlar da böyle. En büyük, en renkli buton hangisiyse insanlar ona basıyor. “Kaydet” ile “Sil” yan yana ve aynı renkteyse, bir gün birileri yanlışlıkla silecek.</p>
<h2>En sık karşılaştığım sorunlar</h2>
<ul>
  <li><strong>Ne olduğunu söylemeyen hata mesajları.</strong> “Bir hata oluştu” yazısı kullanıcıya hiçbir şey anlatmaz. “Telefon numarası 10 haneli olmalı” ise hem sorunu hem çözümü söyler.</li>
  <li><strong>Gözden kaçan ana buton.</strong> Sayfada eşit büyüklükte beş buton varsa kullanıcı hangisinin doğru olduğunu tahmin etmek zorunda kalır.</li>
  <li><strong>Kaybolan emek.</strong> Uzun bir formu doldurup tek bir alanı yanlış girince her şeyin silinmesi, insanları en çok sinirlendiren şeylerden biri.</li>
  <li><strong>Telefonda kullanılamayan ekranlar.</strong> Bilgisayarda düzgün görünen bir tablo telefonda sağa sola kaydırmadan okunamıyorsa kullanıcı vazgeçiyor.</li>
  <li><strong>Okunmayan yazılar.</strong> Beyaz zemin üzerinde açık gri yazı şık görünebilir. Ama güneşin altında telefondan okumaya çalışan biri için neredeyse görünmez.</li>
</ul>
<h2>Basit bir test</h2>
<p>Bir ekranın ne kadar anlaşılır olduğunu ölçmenin en ucuz yolu, onu hiç görmemiş birine bir görev verip izlemek: “Bu sitede yarın için randevu al.” Yardım etmeyin, sadece izleyin. Nerede duraksadığını, nereye yanlışlıkla tıkladığını not alın. Beş kişiyle yapılan böyle bir test bile çoğu zaman ekranın en büyük sorunlarını ortaya çıkarıyor.</p>
<h2>Beğenmek yerine bakmak</h2>
<p>“Bence daha güzel olmuş” iyi bir ölçü değil. Formu kaç kişinin başlatıp kaçının bitirdiğine, insanların hangi sayfada siteden çıktığına bakmak çok daha fazlasını anlatıyor. Güzel bir ekran, anlaşılır olmadığı sürece işe yaramıyor.</p>`
  },
  {
    slug: "performans-seo-deneyim",
    title: "Bir siteyi yavaşlatan şey çoğu zaman tek bir fotoğraftır",
    category: "Web",
    date: "2024-06-18",
    readingTime: 5,
    featured: false,
    tags: ["Hız", "Görseller", "Google"],
    excerpt: "Yavaş açılan sitelerin çoğunda sorun karmaşık bir teknik mesele değil: telefonla çekilip olduğu gibi yüklenmiş birkaç fotoğraf. Bunu kendiniz de birkaç dakikada kontrol edebilirsiniz.",
    content: `
<p>Yavaş bir siteyi açıp neden yavaş olduğuna baktığımda en sık karşılaştığım şey şaşırtıcı derecede basit: telefonla çekilmiş, hiç küçültülmeden yüklenmiş fotoğraflar. Bugünün telefonları birkaç megabaytlık fotoğraflar çekiyor. Sitede bu fotoğraf belki kartvizit büyüklüğünde bir kutuda gösteriliyor, ama ziyaretçinin telefonu yine de dosyanın tamamını indiriyor.</p>
<p>Ana sayfada böyle on fotoğraf varsa, mobil internetle girmiş birinin onlarca megabayt indirmesi gerekiyor. Sayfanın açılmasını bekleyen birinin sabrı da genelde bu kadar uzun sürmüyor.</p>
<h2>Bir benzetme</h2>
<p>Bir arkadaşınıza evinizin yolunu tarif etmek için ona şehrin duvar boyutundaki haritasını kargoyla gönderdiğinizi düşünün. Bilgi doğru, ama ulaşması çok uzun sürüyor ve çoğu işe yaramıyor. Bir web sayfası da gerektiğinden fazlasını gönderdiğinde aynı şey oluyor.</p>
<h2>Kendiniz kontrol edin</h2>
<ol>
  <li><strong>pagespeed.web.dev</strong> adresine sitenizin adresini yazın. Google'ın bu ücretsiz aracı sayfanızı telefon ve bilgisayar için ayrı ayrı test ediyor.</li>
  <li>Çıkan puandan çok, altındaki önerilere bakın. “Görselleri uygun boyuta getirin” ya da “Görselleri yeni nesil biçimlerde sunun” gibi maddeler görüyorsanız sorunun büyük kısmı muhtemelen fotoğraflarda.</li>
  <li>Önerilerin yanında tahmini kazanç da yazıyor. En büyük kazancı gösteren maddeden başlayın.</li>
</ol>
<h2>En çok fark yaratanlar</h2>
<ul>
  <li><strong>Fotoğrafları doğru boyutta yüklemek.</strong> Ekranda 800 piksel genişliğinde görünecek bir görselin 4000 piksel olmasına gerek yok.</li>
  <li><strong>Modern biçim kullanmak.</strong> WebP gibi biçimler aynı görüntüyü JPEG'e göre genellikle çok daha küçük bir dosyayla sunuyor.</li>
  <li><strong>Kullanılmayanı silmek.</strong> Hazır temalar ve eklentiler, sitede hiç kullanılmayan kodları da her ziyarette yüklüyor.</li>
  <li><strong>Sırayla yüklemek.</strong> Sayfanın altındaki görseller, ziyaretçi oraya yaklaştığında yüklenebilir. Tarayıcılar bugün buna tek bir ayarla izin veriyor.</li>
</ul>
<h2>Google bunu önemsiyor mu?</h2>
<p>Evet, Google sayfa deneyimini sıralamada dikkate aldığını açıkça söylüyor. Ama bence asıl mesele Google değil, insanlar. Hızlı açılan bir sitede ziyaretçi daha çok sayfa geziyor, daha az vazgeçiyor. Google'ın ölçmeye çalıştığı şey de sonuçta bu davranış.</p>
<div class="kursat-callout"><strong>Geliştiriciyseniz:</strong> Görselleri yayına almadan önce otomatik olarak boyutlandıran ve WebP'ye çeviren bir adım eklemek, içerik giren kişinin dikkatine güvenmekten çok daha kalıcı bir çözüm. <code>&lt;img&gt;</code> etiketlerine <code>width</code>, <code>height</code> ve <code>loading="lazy"</code> eklemeyi de unutmayın.</div>`
  },
  {
    slug: "veri-modeli-saglam-temel",
    title: "Aynı firma, üç farklı isim: verinin neden hep dağınık olduğu üzerine",
    category: "Veri",
    date: "2024-06-10",
    readingTime: 5,
    featured: false,
    tags: ["Veri", "Raporlama", "Excel"],
    excerpt: "Stajda bir raporu hazırlamak için harcadığım sürenin büyük kısmı analize değil, aynı bilginin farklı yerlerde farklı yazılmış olmasıyla uğraşmaya gitti. Veriyi baştan düzgün tutmanın neden bu kadar önemli olduğunu orada öğrendim.",
    content: `
<p>Siemens'teki stajımda işimin büyük kısmı farklı kaynaklardan veri toplayıp düzenli raporlar hazırlamaktı. İlk haftalarda beni en çok şaşırtan şey, asıl zamanın analize değil temizliğe gitmesiydi. Aynı firma bir tabloda kısaltmasıyla, bir diğerinde tam unvanıyla, bir başkasında yazım hatasıyla geçiyordu. Bilgisayar için bunlar üç ayrı firmaydı ve toplamlar birbirini tutmuyordu.</p>
<h2>Bir telefon rehberi düşünün</h2>
<p>Telefonunuzdaki rehberde aynı kişiyi üç kez kaydettiğinizi düşünün: “Ahmet”, “Ahmet İş” ve “Ahmet Yılmaz”. Birinde eski numarası, birinde yenisi, birinde de e-posta adresi var. Ahmet'e ulaşmak istediğinizde hangisini arayacağınızı bilemezsiniz. Numarası değiştiğinde üçünü birden güncellemeniz gerekir; birini unutursanız yanlış numarayı aramaya devam edersiniz.</p>
<p>Şirketlerin verisi de çoğu zaman böyle büyür. Her ekip kendi listesini tutar, her yeni ihtiyaçta bilgi bir yere daha kopyalanır. Sonunda kimse hangisinin doğru olduğundan emin olamaz.</p>
<h2>“Veri modeli” ne demek?</h2>
<p>Veri modeli, bir sistemin bilgileri nasıl sakladığının planıdır: hangi bilgiler var, birbirleriyle nasıl ilişkili, her biri nerede duruyor. Bir binanın kat planı gibi düşünebilirsiniz. Bina dikildikten sonra duvar yıkmak mümkün ama zahmetli ve riskli. Planı baştan doğru çizmek çok daha ucuz.</p>
<h2>İyi bir planın dört özelliği</h2>
<ol>
  <li><strong>Her bilgi tek yerde durur.</strong> Müşterinin adresi her siparişe kopyalanmaz; müşteri kaydında durur ve sipariş ona bağlanır. Adres değişince tek bir yerde güncellenir.</li>
  <li><strong>İsimler anlaşılırdır.</strong> Bir tablonun adı “tbl_x1” değil “Siparişler” olur. Altı ay sonra sisteme bakan kişi, ki bu siz de olabilirsiniz, ne bulacağını bilir.</li>
  <li><strong>İlişkiler gerçeği yansıtır.</strong> Bir öğrenci birden fazla derse, bir derse de birden fazla öğrenci kaydolabiliyorsa sistem buna izin verecek şekilde kurulur.</li>
  <li><strong>İleride sorulacak soruları düşünür.</strong> “Bu veriden ileride hangi soruyu soracağız?” diye sormak eksikleri erkenden gösterir. Kayıt tarihi tutulmayan bir sistemden “bu ay kaç yeni müşteri geldi?” sorusunun cevabını alamazsınız.</li>
</ol>
<h2>Küçük işletmeler için de geçerli</h2>
<p>Bunlar sadece büyük şirketlerin derdi değil. Müşterilerini Excel'de tutan bir işletme için de aynı kurallar işliyor: her müşteri tek satırda, her bilgi kendi sütununda, tarihler tarih biçiminde. Bu kadar basit bir düzen bile, bir gün o listeyi bir yazılıma taşımak istediğinizde size haftalar kazandırır.</p>
<div class="kursat-callout"><strong>Geliştiriciyseniz:</strong> Sipariş anındaki adres ya da fiyat gibi “o anki hâli” saklanması gereken bilgileri bilerek kopyalayın, ama bunun bir kopya olduğunu alan adında da belli edin. Bir de her tabloya bir oluşturulma tarihi ekleyin; raporlama ihtiyacı mutlaka gelir.</div>`
  },
  {
    slug: "api-entegrasyonlari-dayaniklilik",
    title: "“İşlem başarısız” yazısının arkasında genelde başka bir şirket vardır",
    category: "Yazılım",
    date: "2024-05-28",
    readingTime: 5,
    featured: false,
    tags: ["API", "Entegrasyon", "Destek"],
    excerpt: "Kartla ödeme, kargo takibi, e-fatura... Kullandığınız uygulamaların çoğu işin bir kısmını başka şirketlerin sistemlerine yaptırıyor. Ekranda “işlem başarısız” gördüğünüzde sorun çoğu zaman o bağlantıda.",
    content: `
<p>Bir e-ticaret sitesinden alışveriş yaptığınızda tek bir siteyle konuştuğunuzu düşünürsünüz. Oysa “Ödeme yap” butonuna bastığınız anda arka planda birkaç farklı şirketin sistemi devreye girer. Kartınızı bankanın ödeme altyapısı kontrol eder, faturanızı bir e-fatura servisi keser, kargonuzu kargo şirketinin sistemi kaydeder, onay e-postanızı bir e-posta servisi gönderir.</p>
<p>Bu sistemlerin birbiriyle konuşmasını sağlayan şeye API diyoruz.</p>
<h2>Restorandaki garson</h2>
<p>API'yi bir restorandaki garson gibi düşünebilirsiniz. Mutfağa girip yemeği kendiniz yapmazsınız; garsona ne istediğinizi söylersiniz, o mutfağa iletir, hazır olunca size getirir. Mutfakta ne olup bittiğini bilmeniz gerekmez. Garsonun sizden beklediği tek şey, siparişi menüdeki gibi vermeniz.</p>
<p>Sorun şu ki mutfak sizin kontrolünüzde değil. Bazen çok yoğundur ve sipariş geç gelir. Bazen bir malzeme bitmiştir. Bazen de menü size haber verilmeden değişmiştir.</p>
<h2>Neler ters gidebilir?</h2>
<ul>
  <li><strong>Karşı taraf yavaşlar.</strong> Bankanın sistemi o an yoğunsa cevap gecikir. Uygulama sonsuza kadar beklerse sizin ekranınız da donar.</li>
  <li><strong>Karşı taraf hata verir.</strong> Bakım çalışması, kısa bir kesinti... Çoğu zaman birkaç saniye sonra tekrar denense işlem başarılı olur.</li>
  <li><strong>Kurallar değişir.</strong> Servis gönderdiği bilginin biçimini değiştirir; dün çalışan bağlantı bugün çalışmaz.</li>
  <li><strong>Sınıra takılırsınız.</strong> Çoğu servis dakikada belli sayıda isteğe izin verir. Kampanya günü bu sınır bir anda dolabilir.</li>
</ul>
<h2>Destekte en çok vakit alan vakalar</h2>
<p>Destekte en çok uğraştıran vakalar bunlar. Müşteri bir hata görüyor ama ekranda sadece “işlem başarısız” yazıyor. Sorunun bizde mi, karşı tarafta mı, yoksa aradaki ağda mı olduğunu anlamak için kayıtları tek tek incelemek gerekiyor. İyi kurulmuş bir bağlantıda bu soru birkaç dakikada cevaplanıyor; kötü kurulmuş bir bağlantıda saatler sürüyor.</p>
<h2>İyi bir bağlantı nasıl davranır?</h2>
<ul>
  <li>Karşı tarafı belli bir süre bekler; cevap gelmezse vazgeçip kullanıcıya dürüstçe bilgi verir.</li>
  <li>Geçici hatalarda, arada biraz bekleyerek birkaç kez tekrar dener.</li>
  <li>Ödeme gibi işlemleri tekrar denerken aynı ödemenin iki kez çekilmemesine dikkat eder.</li>
  <li>Her isteği kayda geçirir. Bir sorun olduğunda “ne zaman, kime, ne gönderdik, ne cevap aldık?” sorusu hemen cevaplanır.</li>
</ul>
<p>Kullanıcı olarak bunların hiçbirini görmezsiniz. Ama iyi yapılmış bir uygulamada “işlem başarısız” yerine “Banka şu an cevap vermiyor, kartınızdan para çekilmedi, birkaç dakika sonra tekrar deneyin” gibi bir mesaj görürsünüz. Aradaki fark, o arka plan işçiliği.</p>
<div class="kursat-callout"><strong>Geliştiriciyseniz:</strong> Her dış çağrıya bir zaman aşımı koyun. Yalnızca geçici hatalarda, giderek artan bekleme süreleriyle tekrar deneyin (.NET'te Polly bunun için çok pratik). Ödeme gibi işlemlerde idempotency anahtarı kullanın. İsteklere bir korelasyon kimliği verip loglarda taşımak da destekteki arkadaşlarınızın gününü kurtarır.</div>`
  },
  {
    slug: "scrum-ile-net-ilerleme",
    title: "Bir yazılım ekibinde iki hafta nasıl geçer? Scrum'u basitçe anlatmak",
    category: "Süreç",
    date: "2024-05-22",
    readingTime: 5,
    featured: false,
    tags: ["Scrum", "Ekip", "Planlama"],
    excerpt: "Yazılım ekiplerinde sık duyulan “sprint”, “daily”, “retro” kelimelerinin arkasında aslında çok sade bir fikir var: büyük bir işi, sonunda gösterilebilecek bir şey çıkan kısa parçalara bölmek.",
    content: `
<p>Bir yazılım ekibinin toplantılarına dışarıdan katılan biri genelde birkaç yabancı kelimeyle karşılaşır: sprint, daily, review, retro. Kulağa karmaşık bir sistem gibi geliyor, ama arkasındaki fikir oldukça sade.</p>
<h2>Bir düğün hazırlığı düşünün</h2>
<p>Altı ay sonraki bir düğünü planladığınızı düşünün. “Düğün hazırlığı” diye tek bir dev iş olarak bakarsanız nereden başlayacağınızı bilemezsiniz ve son aya kadar her şey yolunda gibi görünür. Oysa işi iki haftalık parçalara bölerseniz durum değişir: bu iki hafta salon seçilecek, sonraki iki hafta davetiyeler basılacak... Her parçanın sonunda gerçekten bir şey tamamlanmış olur. Bir sorun varsa da son ayda değil, hemen fark edersiniz.</p>
<p>Scrum, yazılım için bunu yapıyor.</p>
<h2>İki haftalık bir döngü</h2>
<ul>
  <li><strong>Planlama:</strong> Döngünün başında ekip, iki hafta sonunda neyin çalışır hâlde olacağına karar veriyor. Bir görev listesi değil, bir hedef: “Kullanıcılar şifrelerini kendileri sıfırlayabilecek” gibi.</li>
  <li><strong>Günlük kısa görüşme:</strong> Her sabah on beş dakika. Dün ne yaptım, bugün ne yapacağım, beni engelleyen bir şey var mı? Amaç rapor vermek değil, takılan birini erkenden görmek.</li>
  <li><strong>Gösterim:</strong> Döngünün sonunda yapılan iş, onu isteyen kişilere çalışırken gösteriliyor. Anlatılmıyor, gösteriliyor.</li>
  <li><strong>Geriye bakış:</strong> Ekip kendine soruyor: Bu iki hafta ne iyi gitti, neyi değiştirelim?</li>
</ul>
<h2>Bence asıl işe yarayan kısım</h2>
<p>Scrum'un en değerli parçası bence gösterim. “Yüzde sekseni bitti” cümlesi çok şey saklayabilir. Ama ekranda çalışan bir şeyi görmek, herkesin aynı şeyi anlayıp anlamadığını hemen ortaya çıkarıyor. Yanlış anlaşılmalar iş bittikten aylar sonra değil, iki hafta içinde yakalanıyor.</p>
<p>İkincisi geriye bakış. Kuralları ne kadar iyi uygularsanız uygulayın, her ekibin kendine özgü sorunları olur. Her iki haftada bir küçük bir şeyi düzeltmek, bir yılın sonunda bambaşka bir ekip demek.</p>
<h2>Yazılımcı olmayanlar için</h2>
<p>Bir yazılım ekibiyle çalışıyorsanız gösterim toplantılarına mutlaka katılın. Orada gördüğünüz şey sizin işinizi çözüyor mu, hemen söyleyin. Geri bildiriminiz ne kadar erken gelirse düzeltmesi o kadar ucuz olur. Ben de freelance işlerimde aynı ritmi kullanıyorum: her haftanın sonunda müşteriye çalışan bir ara sürüm gösteriyorum.</p>`
  },
  {
    slug: "clean-code-bakim-maliyeti",
    title: "Küçük bir değişiklik neden bu kadar uzun sürüyor?",
    category: "Yazılım",
    date: "2024-05-15",
    readingTime: 5,
    featured: false,
    tags: ["Kod kalitesi", "Bakım", "Okunabilirlik"],
    excerpt: "“Sadece bir yazının yerini değiştireceğiz, neden üç gün sürüyor?” Yazılımla çalışan hemen herkes bu soruyu bir gün soruyor. Cevabın büyük kısmı kodun nasıl yazıldığında saklı.",
    content: `
<p>Yazılım ekipleriyle çalışan hemen herkes bir gün şu soruyu sorar: “Sadece bir alanın yerini değiştireceğiz, bu neden üç gün sürüyor?” Soran kişi için bu gerçekten basit bir iş. Ama ekranda küçük görünen bir değişiklik, kodun içinde bambaşka bir şeye karşılık gelebilir.</p>
<h2>Dağınık bir atölye</h2>
<p>İki marangoz atölyesi düşünün. Birincisinde her alet duvarda, kendi yerinde asılı. İkincisinde aletler tezgâhın üstüne, çekmecelere, kutulara rastgele atılmış. İki marangoz da aynı derecede usta. Ama küçük bir tamir lazım olduğunda birincisi işe beş dakikada başlar, ikincisi yarım saat tornavida arar. Üstelik ararken başka bir şeyi devirebilir.</p>
<p>Kod da böyle. “Çalışan” her kod aynı değildir. Düzenli yazılmış bir kodda değişikliğin nereye yapılacağı bellidir. Dağınık bir kodda önce neyin nerede olduğunu anlamak, sonra bir yeri değiştirirken başka bir yerin bozulmadığından emin olmak gerekir. Zamanın çoğu değişikliğin kendisine değil, bu ikisine gider.</p>
<h2>Destekte gördüklerim</h2>
<p>Destek uzmanı olarak bir hatanın kaynağını bulmak için başkalarının yazdığı kodu sık sık okumam gerekiyor. Bazı bölümlerde ne olduğunu birkaç dakikada anlıyorum, bazılarında bir saat sonra bile emin olamıyorum. Aradaki farkı yaratan şey nadiren karmaşık bir mimari; çoğu zaman basit alışkanlıklar.</p>
<h2>Kodu okunur tutan alışkanlıklar</h2>
<ul>
  <li><strong>İsimler ne yaptığını söyler.</strong> Bir işlemin adı “Hesapla” değil, “KdvDahilTutariHesapla” olur. Uzun ama açık bir isim, kısa ama belirsiz bir isimden iyidir.</li>
  <li><strong>Her parça tek bir iş yapar.</strong> Bir işlevi anlatırken cümlenizde “ve” geçiyorsa muhtemelen iki ayrı parçaya bölünmeli.</li>
  <li><strong>Hatalar saklanmaz.</strong> Bir şey ters gittiğinde sessizce geçmek yerine kayda geçmek, ileride saatler kazandırır.</li>
  <li><strong>Basit olan seçilir.</strong> “İleride lazım olur” diye eklenen karmaşıklığın çoğu hiç lazım olmaz, ama her değişiklikte yük olur.</li>
</ul>
<h2>Bir işletme sahibi için anlamı</h2>
<p>Bir yazılım yaptırırken sadece “çalışıyor mu?” diye sormak yetmiyor. Yazılım yaşayan bir şey; ilk teslimden sonra da değişecek, büyüyecek. İlk sürümü aceleyle ve dağınık yazılmış bir sistem, sonraki her değişiklikte size daha pahalıya mal olur. Teklif alırken “bu kodu ileride başka bir geliştirici devralırsa ne kadar kolay anlar?” diye sormak bu yüzden yerinde bir soru.</p>
<div class="kursat-callout"><strong>Geliştiriciyseniz:</strong> Kod incelemesinde bence en faydalı soru şu: “Bunu ilk kez gören biri, açıklama satırlarına bakmadan anlayabilir mi?” Boş <code>catch</code> blokları ve beş katman iç içe geçmiş <code>if</code>'ler bu soruya genelde “hayır” dedirtir.</div>`
  },
  {
    slug: "ddos-hizmet-kesintisi-riski",
    title: "Bir siteyi çökertmek için içeri girmeye gerek yok: DDoS'u basitçe anlamak",
    category: "Güvenlik",
    date: "2024-05-10",
    readingTime: 5,
    featured: false,
    tags: ["DDoS", "Güvenlik", "Küçük işletme"],
    excerpt: "Haberlerde “siber saldırı nedeniyle siteye erişilemiyor” cümlesini sık görürüz. Bunların çoğunda kimse bir şey çalmaz; sadece kapı tıkanır. Nasıl çalıştığını ve küçük bir işletmenin ne yapabileceğini anlatayım.",
    content: `
<p>Haberlerde arada bir “siber saldırı nedeniyle sitemize erişim sağlanamıyor” açıklamaları görürüz. Bu saldırıların önemli bir kısmında kimse sisteme sızmaz, hiçbir veri çalınmaz. Saldırganın tek amacı gerçek ziyaretçilerin siteye ulaşamamasıdır. Buna DDoS saldırısı deniyor.</p>
<h2>Dükkânın kapısını tıkamak</h2>
<p>Küçük bir dükkân düşünün. Bir gün kapının önüne yüzlerce kişi geliyor. Hiçbiri bir şey almıyor, hiçbir şey çalmıyor; sadece içeri girip çıkıyor, kasiyere anlamsız sorular soruyorlar. Sonuçta gerçek müşteriler kapıya bile yaklaşamıyor. Dükkân açık ama kimse alışveriş yapamıyor.</p>
<p>DDoS'ta bu kalabalık, saldırganın kontrolündeki binlerce cihazdan geliyor. Bunlar çoğu zaman sahiplerinin haberi bile olmadan ele geçirilmiş cihazlar: güncellenmemiş modemler, güvenlik kameraları, eski bilgisayarlar. Hepsi aynı anda bir siteye istek gönderiyor ve sunucu bu yükü kaldıramıyor.</p>
<h2>Neden bu kadar yaygın?</h2>
<p>Çünkü yapması ucuz. İnternette bu tür saldırıları saatlik kiralayan yasa dışı hizmetler bile var. Hedefin büyük bir şirket olması da gerekmiyor; rakip bir işletme, kızgın bir eski çalışan ya da sadece eğlence arayan biri kampanya gününüzü mahvedebilir.</p>
<h2>Küçük bir işletme ne yapabilir?</h2>
<ol>
  <li><strong>Önüne bir kalkan koymak.</strong> Cloudflare gibi hizmetler sitenizin önünde duran devasa bir kapı görevlisi gibi çalışır. Trafiği önce kendileri karşılar, saldırı olduğunu düşündükleri istekleri sunucunuza ulaşmadan ayıklar. Temel DDoS koruması bu tür hizmetlerin ücretsiz planlarında bile var ve çoğu küçük site için yeterli.</li>
  <li><strong>Kapıda sıra kuralı koymak.</strong> Aynı adresten saniyede yüzlerce istek gelmesi normal değil. Giriş ve form sayfalarına “bir adresten dakikada en fazla şu kadar istek” gibi sınırlar koymak hem saldırıları hem kötü niyetli botları yavaşlatır.</li>
  <li><strong>Hazır cevaplar vermek.</strong> Her ziyarette baştan hesaplanmak yerine önceden hazırlanmış sayfalar sunan siteler yük altında çok daha uzun dayanır.</li>
  <li><strong>Haberdar olmak.</strong> Sitenin çöktüğünü müşteriden öğrenmek en kötü senaryo. Ücretsiz izleme araçları siteniz cevap vermediğinde size birkaç dakika içinde mesaj atar.</li>
  <li><strong>Ne yapacağınızı önceden bilmek.</strong> Saldırı anında kimi arayacağınızı ve hangi ayarı açacağınızı bir sayfaya yazmak, o an yaşanacak paniği yarıya indirir.</li>
</ol>
<h2>Ne kadar endişelenmeli?</h2>
<p>Siteniz sadece tanıtım amaçlıysa ve birkaç saat kapalı kalması işinizi durdurmuyorsa, bir koruma hizmeti ve basit bir izleme çoğu zaman yeterli. Satışlarınız ya da randevularınız sitenizden geliyorsa yukarıdaki listenin tamamını düşünmeye değer. Bir de evdeki modeminizin şifresini değiştirip güncellemelerini yapmayı unutmayın; böylece sizin cihazınız başkasının saldırısında kullanılmaz.</p>`
  },
  {
    slug: "proje-yonetimi-netlik",
    title: "Projeler neden gecikir? Buzdağının görünmeyen kısmı",
    category: "Süreç",
    date: "2024-03-20",
    readingTime: 5,
    featured: false,
    tags: ["Proje", "Kapsam", "İletişim"],
    excerpt: "Yazılım projelerinin gecikmesinin en büyük nedeni çoğu zaman teknik değil. İşin başında “tam olarak ne istiyoruz?” sorusu cevaplanmadığında her hafta yeni bir sürpriz çıkıyor.",
    content: `
<p>Bir proje başlarken herkes iyimserdir. Bir tarih konuşulur, ilk haftalar hızlı geçer. Sonra bir şeyler kaymaya başlar: “Bu ekran da olsa iyi olur”, “Aslında şunu da kastetmiştik”, “Onay için müdürün dönmesini bekliyoruz”. Teslim tarihi sessizce ileri gider.</p>
<p>Bu gecikmelerin çok azı teknik bir sorundan kaynaklanır. Çoğu, işin başında cevaplanmamış sorulardan çıkar.</p>
<h2>Buzdağı</h2>
<p>Bir yazılım isteği genelde bir buzdağının görünen kısmı gibidir. “Müşterilerimiz internetten randevu alabilsin” cümlesi suyun üstünde kalan kısım. Altında ise şunlar var: Randevu iptal edilebilecek mi? Kaç saat öncesine kadar? İptal edilirse kime haber gidecek? Aynı saate iki kişi randevu almaya çalışırsa ne olacak? Tatil günleri nasıl belirlenecek? Personel izinliyken ne olacak?</p>
<p>Bu soruların hepsi bir gün mutlaka sorulur. Asıl soru, ne zaman sorulacakları: iş başlamadan önce mi, yoksa yarısı yapılmışken mi? İkincisinde her cevap, yapılmış bir şeyin yeniden yapılması anlamına gelir.</p>
<h2>Gecikmenin üç tanıdık nedeni</h2>
<ul>
  <li><strong>Sessizce büyüyen kapsam.</strong> Her toplantıda “bu da olsa güzel olur” diye eklenen küçük istekler tek tek masum görünür, ama toplamı projeyi ikiye katlar.</li>
  <li><strong>Bekleyen kararlar.</strong> Ekip hazırdır ama bir tasarımın onaylanmasını ya da bir sorunun cevaplanmasını bekler. Bekleme süresi hiçbir planda yazmaz ama takvimden düşer.</li>
  <li><strong>Söylenmeyen riskler.</strong> Biri bir sorunun gelmekte olduğunu görür ama “belki halledilir” diye söylemez. Sorun büyüdüğünde çözümü de pahalılaşmıştır.</li>
</ul>
<h2>Başlamadan önce üç soru</h2>
<ol>
  <li><strong>Bu işin sonunda ne değişmiş olacak?</strong> Tek cümleyle. Örneğin: “Randevular telefonla değil siteden alınacak, sekreterin günde iki saati boşa çıkacak.”</li>
  <li><strong>Bittiğini nasıl anlayacağız?</strong> Herkesin kontrol edebileceği bir ölçüt. Örneğin: “Müşteri randevu aldığında hem kendisine hem personele SMS gidiyor.”</li>
  <li><strong>Neyi yapmıyoruz?</strong> Kapsam dışında kalanları yazmak, en az içindekiler kadar önemli. “Online ödeme bu aşamada yok” cümlesi ileride yaşanacak birçok tartışmayı baştan bitirir.</li>
</ol>
<h2>Haftada on beş dakika</h2>
<p>Projeyi yolunda tutmak için karmaşık araçlara gerek yok. Haftada bir, on beş dakikalık bir görüşme yeterli: Bu hafta ne bitti? Nerede takıldık? Hangi karar bekleniyor ve kimden? Bu üç sorunun düzenli sorulması, sorunları büyümeden masaya getiriyor.</p>`
  }
];

// Kaldırılan ya da birleştirilen yazıların eski adresleri, en yakın yazıya yönleniyor.
window.KURSAT_POST_ALIASES = {
  "net8-minimal-api-ne-zaman": "api-entegrasyonlari-dayaniklilik"
};
