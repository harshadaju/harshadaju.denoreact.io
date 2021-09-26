const cacheName = "V1";
const cahceAssets = ["index.html", "app.js"];

//Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker installed");
  e.waitUntil(
    cahces
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching files");
        cache.addAll(cahceAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//CAll Activate event
self.addEventListener("activate", (e) => {
  console.log("Service Worker ACtivated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
// Call fetch event to serve application even they are offline
self.addEventListener("fetch", (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
