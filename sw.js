const CACHE = 'agnicycle-v4';
const PRECACHE = [
  '/',
  '/index.html',
  '/about/',
  '/cfd-training/',
  '/simulator/',
  '/spray/',
  '/ev-battery/',
  '/cfd-calculators/',
  '/og-image.png',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.svg',
  '/logo-animated.svg',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
