# Yayına alma

Site statik; build adımı yok, kök klasör olduğu gibi yayınlanıyor.

## Netlify (önerilen)

1. Netlify'da **Add new site → Import an existing project** ile bu repoyu seç (ya da klasörü sürükle-bırak).
2. Build komutu boş, publish directory `.` olarak kalsın (`netlify.toml` bunu zaten söylüyor).
3. Güvenlik başlıkları `netlify.toml` ve `_headers` üzerinden otomatik uygulanır.
4. Alan adını **Domain settings** bölümünden bağla.

## Vercel

1. **New Project** → repoyu seç.
2. Framework: **Other**, build komutu yok.
3. Başlıklar `vercel.json` üzerinden uygulanır.

## Cloudflare Pages

1. **Create a project** → repoyu bağla ya da **Direct upload** ile klasörü yükle.
2. Build komutu yok, çıktı klasörü `/`.
3. Başlıklar `_headers` dosyasından okunur.

## Apache / paylaşımlı hosting

Dosyaları kök dizine yükle; `.htaccess` güvenlik başlıklarını ve özel 404 sayfasını ayarlar (`mod_headers` gerekli).

## Yayından sonra kontrol listesi

- İletişim sayfasından bir test brief'i gönder. FormSubmit ilk seferde `info.cankaroglu@gmail.com` adresine aktivasyon e-postası yollar; onaylayınca sonraki gönderimler doğrudan gelir.
- Eski siteyi ziyaret etmiş bir tarayıcıda sayfayı bir kez yenile: yeni `service-worker.js` eski önbellekleri silip kendini kaldırır ve sayfa yeni sürümle açılır.
- `portfolio-details.html?slug=translator-clone` gibi eski adresler yeni proje sayfalarına, `service-details.html?service=webapp` gibi adresler hizmetler sayfasındaki ilgili bölüme gider.
