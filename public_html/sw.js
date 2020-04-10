/* Editor: Johnson Gao 
 * Date This File Created: 2020-3-23 18:40:25
 * Description Of This Class:Service worker
 */

const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './index.html',
  './sw.js',
  './manifest.json',
  "./favicon.ico",
  "./js/vendor/bootstrap.js",
  "./js/vendor/bootstrap.min.js",
  "./js/vendor/jquery-1.11.2.min.js",
  "./js/vendor/modernizr-2.8.3-respond-1.4.2.min.js",
  "./js/vendor/npm.js",
  "./js/main.js",
  "./images/mainicon.png",
  "./images/mainicon128.png",
  "./images/mainicon192.png",
  "./images/mainicon32.png",
  "./images/mainicon512.png",
  "./images/icons/smrdflag.svg",
  "./css/animatedField.css",
  "./css/arrowButtonCss.css",
  "./css/bootstrap-theme.css",
  "./css/bootstrap-theme.css.map",
  "./css/bootstrap-theme.min.css",
  "./css/bootstrap.css",
  "./css/bootstrap.min.css",
  "./css/bootstrap.css.map",
  "./css/main.css"
];

    


self.addEventListener('install', async event => {
  console.log('install event');
  const cache = await caches.open(cacheName); 
  await cache.addAll(staticAssets); });

self.addEventListener('fetch', async event => {
  console.log('fetch event');
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    
  const cache = await caches.open(cacheName); 
  const cachedResponse = await cache.match(req); 
  return cachedResponse || fetch(req); 
}


