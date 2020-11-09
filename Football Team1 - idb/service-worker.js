// menyimpan aset ke cache
const CACHE_NAME = "Football-Team-v123";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/maskable_icon_192.png",
  "/maskable_icon_512.png",
  "/nav.html",
  "/index.html",
  "/info-team.html",
  "/pages/standing.html",
  "/pages/saved-team.html",
  "/css/materialize.min.css",
  "/js/nav.js",
  "/js/api.js",
  "/js/materialize.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// menggunakan aset dari cache
self.addEventListener("fetch", function(event) {
  let BASE_URL = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

// penghapusan cache yang lama jika ada pembaruan aplikasi
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
