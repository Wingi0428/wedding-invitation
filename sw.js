const CACHE = "wedding-invitation-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./config.js",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/hero-bg.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/og-cover.png",
  "./assets/wein-transport-map.webp",
  "./assets/couple-main.webp",
  "./assets/skytree.webp",
  "./assets/universal.webp",
  "./assets/garden.webp",
  "./assets/qixi-cutout.webp",
  "./assets/qixi-close.webp",
  "./assets/qixi-window.webp",
  "./assets/biscuit.webp",
  "./assets/boat.webp",
  "./assets/rings.webp",
  "./assets/universal-castle.webp",
  "./assets/universal-selfie.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
