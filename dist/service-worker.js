if(!self.define){let s,o={};const e=(e,n)=>(e=new URL(e+".js",n).href,o[e]||new Promise((o=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=o,document.head.appendChild(s)}else s=e,importScripts(e),o()})).then((()=>{let s=o[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(n,l)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(o[i])return;let r={};const u=s=>e(s,i),c={module:{uri:i},exports:r,require:u};o[i]=Promise.all(n.map((s=>c[s]||u(s)))).then((s=>(l(...s),r)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"noos"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/noos/assets/glb/box_man.glb",revision:"a711da6dbb7b0ae8b6e74bda67fb1e6e"},{url:"/noos/css/320.43aebf05.css",revision:null},{url:"/noos/css/813.a365ab3a.css",revision:null},{url:"/noos/css/app.bd071c00.css",revision:null},{url:"/noos/css/editor.39aec01f.css",revision:null},{url:"/noos/fonts/optimer_bold.typeface.json",revision:"00563e7132387e352f043c2259bda093"},{url:"/noos/index.html",revision:"1e5c26316ef46e097a0c87d35468cbfa"},{url:"/noos/js/291.6b781749.js",revision:null},{url:"/noos/js/303.156ed56c.js",revision:null},{url:"/noos/js/320.7bc5d4e8.js",revision:null},{url:"/noos/js/477.f4037b28.js",revision:null},{url:"/noos/js/813.ab574135.js",revision:null},{url:"/noos/js/833.57f4a2aa.js",revision:null},{url:"/noos/js/837.7464eff7.js",revision:null},{url:"/noos/js/921.e630071e.js",revision:null},{url:"/noos/js/95.3a8a0383.js",revision:null},{url:"/noos/js/951.60251153.js",revision:null},{url:"/noos/js/about.0aba925a.js",revision:null},{url:"/noos/js/app.981ceb2a.js",revision:null},{url:"/noos/js/chunk-vendors.ddc9f6d2.js",revision:null},{url:"/noos/js/editor.fddb2cf7.js",revision:null},{url:"/noos/lib/ammo/ammo.js",revision:"16d89a8f0d3544ad56fe68bf6518ff5f"},{url:"/noos/lib/ammo/ammo.wasm.js",revision:"62f3fccdacecb20f93c6198f491d2d22"},{url:"/noos/lib/ammo/ammo.wasm.wasm",revision:"24cec114e4e97fc60bf62e9b51433978"},{url:"/noos/manifest.json",revision:"c3b320c46c8523bf03d890f26ed99eba"},{url:"/noos/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"/noos/stl/rubber.stl",revision:"8ec5a4d2a6abf875bee66e2e922a59bc"}],{})}));
//# sourceMappingURL=service-worker.js.map
