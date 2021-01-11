const cacheName = 'ytdl';
const staticAssets = [
    '/',
    '/manifest.webmanifest',
    '/icon512.png',
    '/favicon.ico',
    '/assets/yesconverter.png',
];

self.addEventListener('install', async event => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log('Opened Cache');
                return cache.addAll(staticAssets)
            })
    )
    // const cache = await caches.open(cacheName);
    // console.log(cache)
    // await cache.addAll(staticAssets)
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});


// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName);
//     const cached = await cache.match(req);
//     return cached || fetch(req);
// }

// async function networkAndCache(req) {
//     const cache = await caches.open(cacheName);
//     try {
//         const fresh = await fetch(req);
//         await cache.put(req, fresh.clone());
//         return fresh;
//     } catch (e) {
//         const cached = await cache.match(req);
//         return cached;
//     }
// }
self.addEventListener('fetch', function(event) {
  console.log(event.request.url)
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(cacheName)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open(cacheName)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
        })
    );
  }); 