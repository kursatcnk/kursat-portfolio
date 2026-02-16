# Security & Privacy (Statik Site)

Bu proje statik (backend’siz) bir portfolyo sitesidir. Sunucu tarafı doğrulama yapılmadığı için "tam güvenlik" mümkün değildir; ancak saldırı yüzeyini küçültmek ve gizlilik beklentisini karşılamak için aşağıdaki sertleştirmeler uygulanmıştır.

## Uygulanan sertleştirmeler
- **Security headers**: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP.
- **CSP (Content-Security-Policy)**: Script ve bağlantı hedefleri kısıtlandı.
- **Clickjacking koruması**: iframe içinde çalıştırma engellendi.
- **Çerez/kalıcı depolama yok**: Bu sitede form verileri cookie/localStorage/sessionStorage ile saklanmaz.
- **Form gizliliği**: İletişim formu gönderiminden sonra otomatik sıfırlanır, BFCache senaryolarında yeniden doldurma azaltılır.
- **External link hardening**: target=_blank linklerde noopener/noreferrer uygulanır.

## Deploy notları
- **Netlify / Cloudflare Pages**: `_headers` veya `netlify.toml` ile header’lar otomatik uygulanır.
- **Vercel**: `vercel.json` header’ları uygular.
- **Apache**: `.htaccess` ile header’lar uygulanabilir.

## Sınırlar
- Backend olmadığı için rate-limit/WAF/doğrulama gibi kontroller hosting katmanında (örn. Cloudflare) yapılmalıdır.
