# Güvenlik ve gizlilik

Site statik ve backend'siz. Sunucu tarafı doğrulama olmadığı için bazı kontroller hosting katmanına kalıyor; tarayıcı tarafında saldırı yüzeyini küçültmek için aşağıdakiler uygulandı.

## Uygulananlar

- **Güvenlik başlıkları:** CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP (`_headers`, `netlify.toml`, `vercel.json`, `.htaccess`).
- **CSP:** Script yalnızca kendi alan adından ve EmailJS SDK'sı için jsDelivr'dan; fontlar ve görseller yalnızca kendi alan adından. Ağ bağlantısı ve form gönderimi sadece EmailJS ve FormSubmit'e açık.
- **Üçüncü taraf yok:** Fontlar siteyle birlikte geliyor; analitik, reklam ya da izleme betiği yok. Harita sayfaya gömülmüyor, yeni sekmede açılıyor.
- **Depolama:** Tarayıcıda yalnızca tema tercihi (`kursat-theme`) saklanıyor. Form ve brief verisi saklanmıyor, cookie kullanılmıyor.
- **Spam:** İletişim formunda bal küpü (honeypot) alanı var; FormSubmit tarafında ek koruma açılabilir.
- **Dış bağlantılar:** Yeni sekmede `noopener noreferrer` ile açılıyor.

## Sınırlar

Rate-limit, WAF ve bot koruması hosting katmanında (örneğin Cloudflare) yapılmalı.
