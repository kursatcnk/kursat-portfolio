// Eski sürüm bu adreste önbellekli bir service worker çalıştırıyordu.
// Bu dosya onun yerine geçip tüm önbellekleri siliyor, kendini kaldırıyor ve açık sekmeleri yeniliyor;
// böylece daha önce siteye girmiş ziyaretçiler de yeni sürümü görüyor.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
