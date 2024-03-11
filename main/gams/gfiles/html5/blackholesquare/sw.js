// This script is a service worker that uses the Cache API to cache static assets
// of a web application for offline access.

(() => {
  // Define the cache name as 'black-hole-square'.
  const cacheName = 'black-hole-square';

  // Define the list of static assets to be cached.
  const cacheAssets = ['index.html', 'icon.png', 'manifest.json'];

  // Event listener for the 'install' event.
  self.addEventListener('install', (event) => {
    // Wait until the cache is opened and add all the assets to the cache.
    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => cache.addAll(cacheAssets))
        .then(() => self.skipWaiting())
    );
  });

  // Event listener for the 'activate' event.
  self.addEventListener('activate', (event) => {
    // Define the list of caches to be deleted.
    const cachesToDelete = [cacheName];

    // Wait until all the caches are deleted and claim the clients.
    event.waitUntil(
      caches.keys()
        .then((keys) => keys.filter((key) => !cachesToDelete.includes(key)))
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.clients.claim())
    );
  });

  // Event listener for the 'fetch' event.
  self.addEventListener('fetch', (event) => {
    // Define the request with the 'reload' cache mode.
    const request = new Request(event.request, { cache: 'reload' });

    // If the 'cache' property is in the request, return the request.
    if ('cache' in request) return event.respondWith(fetch(request));

    // Create a new URL with the cache-busting parameter.
    const url = new URL(event.request.url, self.location.href);
    url.search += (url.search ? '&' : '')
