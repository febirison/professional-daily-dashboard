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
  '/js/components/weatherWidget.js',
  '/js/components/newsWidget.js',
  '/js/components/quoteWidget.js',
  '/js/components/calendarWidget.js',
  '/js/components/timerWidget.js',
  '/js/components/noteWidget.js'
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
      return fetch(event.request).catch(() => {
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