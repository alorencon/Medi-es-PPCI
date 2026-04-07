const CACHE_NAME = 'ppci-obras-v1';
const urlsToCache = [
  './',
  './index.html', // Substitua pelo nome exato do seu arquivo html, se for diferente
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta as requisições: se não tiver internet, puxa do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Achou no cache
        }
        return fetch(event.request); // Não achou, tenta baixar da internet
      })
  );
});
