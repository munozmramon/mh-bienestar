// M&H Bienestar Service Worker para compatibilidad PWA e instalación en móviles (Arquitectura Oliversia)
const CACHE_NAME = 'mh-bienestar-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET de mismo origen o recursos básicos
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
