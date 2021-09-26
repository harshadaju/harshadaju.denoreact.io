const cacheName = "V1";

//Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker installed");
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //   make copy/clone of response
        const resClone = res.clone();
        // OPen cache
        caches.open(cacheName).then((cache) => {
          // Add response to cahce
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
