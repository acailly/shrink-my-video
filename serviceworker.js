const version = "v3";
const OFFLINE_URL = "index.html";

// Declare filesToCache variable
self.importScripts("./filesToCache.js");

// Declare serviceWorkerConfiguration variable
self.importScripts("./serviceworker-configuration.js");

self.addEventListener("install", function (event) {
  console.log("[service-worker] installation");

  // Add all the ressources in the cache
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );

  // Force this service worker to become the active service worker
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  console.log("[service-worker] activation");

  // Remove old caches
  console.log("[service-worker] clean old cache");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return !cacheName.startsWith(version);
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Set this service worker as clients' active service worker
  console.log("[service-worker] claim as active service worker");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", async function (event) {
  // TL;DR; Strategy: Cache falling back to app falling back the network

  console.log("[service-worker]", event.request.url, " - intercepted");

  event.respondWith(
    Promise.resolve(true)
      // Start searching in the cache...
      .then(() => {
        console.log(
          "[service-worker]",
          event.request.url,
          "- try to load from cache"
        );

        // TODO ACY Handle loading root (without index.html)
        // TODO ACY test on deployed version

        return caches.match(event.request);
      })
      .then((response) => {
        if (response) {
          console.log(
            "[service-worker]",
            event.request.url,
            "- loaded from cache!"
          );
          return response;
        }

        //... else fallback to the network
        console.log(
          "[service-worker]",
          event.request.url,
          "- fallback to network"
        );
        return fetch(event.request);
      })
      .catch((e) => {
        console.log("[service-worker]", event.request.url, "- failed!");

        //... if this is an error in cors mode, retry with a CORS proxy
        if (event.request.mode === "cors") {
          console.log(
            "[service-worker]",
            event.request.url,
            " - retry with CORS proxy"
          );

          const corsProxifiedURL = `${serviceWorkerConfiguration.corsProxyURL}${event.request.url}`;
          console.log(
            "[service-worker]",
            event.request.url,
            " - proxyfied URL:",
            corsProxifiedURL
          );

          // From https://stackoverflow.com/a/35421858
          const proxifiedRequest = new Request(corsProxifiedURL, {
            method: event.request.method,
            headers: event.request.headers,
            mode: event.request.mode,
            credentials: event.request.credentials,
            redirect: event.request.redirect,
          });

          return fetch(proxifiedRequest);
        }

        //... if this is an error in navigate mode, this is likely due to
        // a network failure, so we load the app landing page from the cache
        // (inspired from https://web.dev/offline-fallback-page/)
        if (event.request.mode === "navigate") {
          console.log(
            "[service-worker]",
            event.request.url,
            "- try to fallback to app offline landing page"
          );
          return caches.match(`${OFFLINE_URL}`);
        }

        //... else, just log error :-/
        console.error("[service-worker]", event.request.url, " - error:", e);
        throw e;
      })
  );
});
