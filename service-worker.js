/*
  Kürşat Portfolyo — Service Worker
  Amaç: Backend olmadan PWA hissi + offline/instant cache.
  Not: Bu dosya deploy ortamında root'ta olmalı.
*/

const CACHE = 'kursat-portfolio-v69';

// Temel sayfaları önbelleğe alıyorum (offline açılış için)
const CORE = [
  './',
  './index.html',
  './about.html',
  './service.html',
  './portfolio.html',
  './contact.html',
  './certificates.html',
  './news.html',
  './news-details.html',
  './service-details.html',
  './portfolio-details.html',
  './404.html',
  './assets/css/bootstrap.min.css',
  './assets/css/main.css?v=37',
  './assets/css/custom.css?v=59',
  './assets/css/enhancements.css?v=69',
  './assets/js/main.js',
  './assets/js/custom.js?v=59',
  './assets/js/enhancements.js?v=69',
  './assets/img/favicon.svg',
  './assets/img/pwa/icon-192.png',
  './assets/img/pwa/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isHTML(req) {
  return req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
}

function cacheFirst(request) {
  return caches.match(request).then((hit) => hit || fetch(request).then((res) => {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
    return res;
  }));
}

function staleWhileRevalidate(request) {
  return caches.match(request).then((hit) => {
    const fetcher = fetch(request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
      return res;
    }).catch(() => hit);
    return hit || fetcher;
  });
}

function networkFirst(request) {
  return fetch(request).then((res) => {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
    return res;
  }).catch(() => caches.match(request));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // SW dosyasını cache-first yapmıyorum
  if (url.pathname.endsWith('/service-worker.js') || url.pathname.endsWith('/manifest.webmanifest')) {
    return;
  }

  if (isHTML(req)) {
    // HTML: network-first (online ise güncel), offline ise cache
    event.respondWith(
      networkFirst(req).then((res) => res || caches.match('./index.html'))
    );
    return;
  }

  // Görseller: cache-first
  if (/\.(png|jpg|jpeg|webp|gif|svg|ico)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // CSS/JS: stale-while-revalidate
  if (/\.(css|js)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Diğer: cache-first
  event.respondWith(cacheFirst(req));
});
