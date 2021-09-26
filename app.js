//Check whether service worker is enabed
if ("ServiceWorker" in navigator) {
  window.addEventListener("load", (e) => {
    navigator.serviceWorker
      .register("./SW_Cache_AllPages.js")
      .then((reg) => console.log("Service worker registerd"))
      .catch((err) => console.log(`Service Worker : Error : ${err}`));
  });
}
