importScripts('./uv/uv.sw.js');

class MyServiceWorker extends UVServiceWorker {
  async fetch(event) {
    // You can add here any additional logic you want to implement
    // before delegating the fetch request to the UVServiceWorker.
    return await super.fetch(event);
  }
}

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (new MyServiceWorker()).fetch(event)
  );
});
