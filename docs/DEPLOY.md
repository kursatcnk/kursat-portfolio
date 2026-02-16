# Deploy Rehberi

Bu site **statik** olduğu için ücretsiz platformlarda kolayca canlıya alınabilir.

## Netlify (Önerilir)

1. Netlify hesabı açın.
2. "Add new site" → "Deploy manually" seçin.
3. Proje klasörünü (zip açılmış hali) sürükleyip bırakın.
4. Yayınlandıktan sonra alan adını (domain) bağlayabilirsiniz.

## Vercel

1. Vercel hesabı açın.
2. "New Project" → projeyi yükleyin.
3. Framework seçmeden (Other) ilerleyin.
4. Build adımı yok; direkt yayınlanır.

## Cloudflare Pages

1. Cloudflare Pages → Create a project
2. "Direct upload" ile klasörü yükleyin.
3. Build komutu gerekmez.

## Güvenlik Notu

- Bu proje backend kullanmadığı için sunucu tarafı güvenlik kontrolleri (rate-limit, WAF vb.) platform tarafında kalır.
- Tarayıcı tarafında yaptığım hardening ayarları (CSP / güvenli link açma / formda çerez tutmama vb.) projede mevcuttur.

