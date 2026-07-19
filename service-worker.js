const CACHE_NAME = 'family-finance-v20';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/lib/chart.umd.js',
  './assets/js/lib/xlsx.full.min.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        const requests = urlsToCache.map(url => new Request(url, { cache: 'no-cache' }));
        return cache.addAll(requests);
      })
      .then(() => self.skipWaiting())
  );
});

// Listen for skip waiting messages from the page
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// NETWORK-FIRST strategy: Always try the network first.
// Only fall back to cache if the network is unavailable (offline).
self.addEventListener('fetch', event => {
  // Skip non-GET requests and cross-origin requests (e.g. GitHub API)
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Got a fresh response from network — update the cache
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed (offline) — serve from cache
        return caches.match(event.request);
      })
  );
});
