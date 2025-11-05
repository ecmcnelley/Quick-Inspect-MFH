const CACHE_NAME = 'inspection-app-v1';
const ASSETS = [
  "./DELIVERY-SUMMARY.md",
  "./FEDERAL-COMPLIANCE-GUIDE.md",
  "./IMPLEMENTATION-GUIDE.md",
  "./QUICK-START.html",
  "./README.md",
  "./START-HERE.txt",
  "./icons/icon-192.png",
  "./icons/icon-256.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./manifest.webmanifest",
  "./nspire-inspection-standalone.html",
  "./rental-inspection-app.jsx"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => {
      return cached || fetch(req).then(resp => {
        // Optionally cache new GETs
        if (req.method === 'GET' && resp && resp.status === 200 && !resp.type === 'opaque') {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});