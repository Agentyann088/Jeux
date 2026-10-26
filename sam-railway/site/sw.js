const CACHE='sam-v1-2026-10-22';
const FILES=["./", "index.html", "vol1.html", "vol2.html", "manifest.webmanifest", "img/apple-touch-icon.png", "img/icon-192.png", "img/icon-512.png", "img/maskable-192.png", "img/maskable-512.png", "img/v1.jpg", "img/v2.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
    const u=new URL(e.request.url);
    if(r&&(r.ok||r.type==='opaque')&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return r;}).catch(()=>caches.match('index.html'))));
});
