const CACHE_NAME = 'dashboard-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/main.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/themes.css',
  '/js/app.js',
  '/js/utils/storage.js',
  '/js/services/weatherService.js',
  '/js/services/newsService.js',
  '/js/services/quoteService.js',
  '/js/components/weatherWidget.js',
  '/js/components/newsWidget.js',
  '/js/components/quoteWidget.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        return new Response('Offline content not available.');
      });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});