const FILES_TO_CACHE = [
  "/index.html",
  "./css/styles.css",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];

const APP_PREFIX = 'Budget|Tracker-';     
const VERSION = 'Version_01';
const CACHE_NAME = APP_PREFIX + VERSION; // Budget|Tracker- Version_01

self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  // respondWith to intercept the fetch request
  e.respondWith(
    // to determine if the resource already exists in caches:
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('Responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('File is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

// The context of self here refers to the service worker object.
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME) //Installing cache :  Budget|Tracker- Version_01
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {   // .keys() returns an array of all cache names, which we're calling keyList.
        // `keyList` contains all cache names under your username.github.io
        // filter out ones that has this app prefix to create keeplist
        // console.log (keyList);
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX); // find Budget|Tracker-
        });
        // add current cache name to keeplist
        cacheKeeplist.push(CACHE_NAME);
        return Promise.all(keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('Deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

