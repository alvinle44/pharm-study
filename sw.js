// Offline support. Network first (so updates show up right away), cached copy when offline.
// When you add or rename a file, add it to FILES and bump VERSION.
const VERSION = "v4";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "js/app.js",
  "js/config.js",
  "js/sync.js",
  "js/phar117-content.js",
  "js/phar117.js",
  "js/exam1.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "content/exam1/vaxA.js",
  "content/exam1/vaxB.js",
  "content/exam1/bp.js",
  "content/exam1/adh.js",
  "content/exam1/ppcp.js",
  "content/exam1/ins.js"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
    .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
