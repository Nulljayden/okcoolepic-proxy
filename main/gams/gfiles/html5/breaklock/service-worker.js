const APP_NAME = 'breaklock';
const APP_VERSION = 12;
const CACHE_NAME = `${APP_NAME}_${APP_VERSION}`;

const filesToCache = [
  './',
  './?utm_source=homescreen',
  './app.css',
  './app.js',
  './assets/intro.svg',
  './assets/fonts/robotomono-light-webfont.woff2',
  './assets/fonts/robotomono-light-webfont.woff',
  './assets/fonts/robotomono-light-webfont.ttf'
];

// Service worker from Google Documentation

self.addEventListener('install', async (event) => {
  // Perform install steps
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(filesToCache);
  } catch (error) {
    console.error('Error during install', error);
  }
});

self.addEventListener('activate', async (event) => {
  const currentClientId = event.clientId;

  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      return Promise.all(
        cacheNames.map(async (cacheName) => {
          if (cacheName.startsWith(APP_NAME) && cacheName !== CACHE_NAME) {
            await caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(
    caches.match(event.request).then(async (response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      const fetchRequest = event.request.clone();

      try {
        const response = await fetch(fetchRequest);

        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone();

        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, responseToCache);

        return response;
      } catch (error) {
        console.error('Error during fetch', error);
      }
    })
  );
});
