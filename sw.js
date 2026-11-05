const V='parcelle3d-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/Line2.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegments2.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineSegmentsGeometry.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineGeometry.js',
 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/lines/LineMaterial.js'];
const LAZY=['https://cdn.jsdelivr.net/npm/dxf-parser@1.1.2/dist/dxf-parser.js','https://cdn.jsdelivr.net/npm/delaunator@5.0.1/delaunator.min.js','https://cdn.jsdelivr.net/npm/proj4@2.11.0/dist/proj4.js',
 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js','https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.all(LAZY.map(u=>c.add(u).catch(()=>{})));}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.origin===location.origin&&(r.mode==='navigate'||u.pathname.endsWith('/index.html'))){ // network first for the page
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return;}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;})));});
