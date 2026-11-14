const CACHE = 'atmos-dom-v9';
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  /* cache:'reload' — uzmi sveže fajlove sa servera, ne iz keša pregledača */
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  /* provera nove verzije traži sveže sa servera (cache: 'no-store' / 'reload'), pa ne sme da dobije staru kopiju iz keša */
  if (req.cache === 'no-store' || req.cache === 'reload') return;

  /* sama stranica: prvo mreža (pri svakom pokretanju najnovija verzija), keš samo kad nema interneta */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); }
        return res;
      }).catch(() => caches.match('index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  /* ostalo: iz keša, a u pozadini osvežava (radi i bez interneta) */
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit || caches.match('index.html'));
      return hit || net;
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      if (cs.length) return cs[0].focus();
      return self.clients.openWindow('./index.html');
    })
  );
});
