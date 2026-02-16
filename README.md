# Kürşat Portfolyo Sitesi

Bu proje, kendi adıma hazırladığım modern ve mobil uyumlu portfolyo sitesidir.

## Proje Yapısı

- `index.html` : Ana sayfa
- `about.html` : Hakkımda
- `service.html` / `service-details.html` : Hizmetler ve hizmet detayı
- `portfolio.html` / `portfolio-details.html` : Projeler ve proje detayı
- `certificates.html` : Sertifikalar
- `news.html` / `news-details.html` : Yazılar
- `contact.html` : İletişim
- `assets/` : CSS, JS, görseller ve vendor bağımlılıkları
  - `assets/css/main.css` : Temel stiller
  - `assets/css/custom.css` : Projeye özel ek/override stiller
  - `assets/js/main.js` : Vendor/çekirdek etkileşimler
  - `assets/js/custom.js` : Projeye özel etkileşimler (benim eklediğim davranışlar)

## Lokal Çalıştırma

Bu proje statik olduğu için herhangi bir backend gerekmez.

- En pratik yöntem: VS Code → **Live Server**
- Alternatif: herhangi bir basit statik sunucu (ör. `python -m http.server`)

## Deploy (Canlıya Alma)

`docs/DEPLOY.md` içinde Netlify/Vercel/Cloudflare Pages gibi seçenekleri adım adım anlattım.

