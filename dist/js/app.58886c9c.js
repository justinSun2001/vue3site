(function(e){function t(t){for(var r,a,u=t[0],l=t[1],d=t[2],i=0,s=[];i<u.length;i++)a=u[i],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&s.push(c[a][0]),c[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);b&&b(t);while(s.length)s.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==c[u]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-0e3a0d41":"d9cfb864","chunk-2d210c47":"6b6e8ad9","chunk-92a19eda":"6dcb1a89","chunk-b706b49e":"86eb2a23","chunk-ddbb8adc":"4fa17737"}[e]+".js"}function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-0e3a0d41":1,"chunk-92a19eda":1,"chunk-b706b49e":1,"chunk-ddbb8adc":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-0e3a0d41":"95dbfd1d","chunk-2d210c47":"31d6cfe0","chunk-92a19eda":"3151c42c","chunk-b706b49e":"2f381815","chunk-ddbb8adc":"8345e57e"}[e]+".css",c=l.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var d=o[u],i=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(i===r||i===c))return t()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){d=s[u],i=d.getAttribute("data-href");if(i===r||i===c)return t()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=t,b.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],b.parentNode.removeChild(b),n(o)},b.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(b)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var d,i=document.createElement("script");i.charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.src=u(e);var s=new Error;d=function(t){i.onerror=i.onload=null,clearTimeout(b);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,n[1](s)}c[e]=void 0}};var b=setTimeout((function(){d({type:"timeout",target:i})}),12e4);i.onerror=i.onload=d,document.head.appendChild(i)}return Promise.all(t)},l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],i=d.push.bind(d);d.push=t,d=d.slice();for(var s=0;s<d.length;s++)t(d[s]);var b=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("7a23");const a={class:"app"};function c(e,t,n,c,o,u){const l=Object(r["M"])("top-bar"),d=Object(r["M"])("router-view");return Object(r["D"])(),Object(r["i"])("div",a,[Object(r["m"])(l),Object(r["m"])(d)])}const o=Object(r["fb"])("data-v-118ac0a4");Object(r["G"])("data-v-118ac0a4");const u={class:"container"},l=Object(r["m"])("div",{class:"logo"},null,-1),d={class:"nav"},i=Object(r["l"])(" HOME "),s=Object(r["l"])(" ARTICLES "),b=Object(r["l"])(" CONTACT "),p=Object(r["l"])(" ABOUT ");Object(r["E"])();const f=o((e,t,n,a,c,f)=>{const h=Object(r["M"])("router-link");return Object(r["D"])(),Object(r["i"])("div",u,[l,Object(r["m"])("ul",d,[Object(r["m"])("li",null,[Object(r["m"])(h,{to:"/home"},{default:o(()=>[i]),_:1})]),Object(r["m"])("li",null,[Object(r["m"])(h,{to:"/articles"},{default:o(()=>[s]),_:1})]),Object(r["m"])("li",null,[Object(r["m"])(h,{to:"/contact"},{default:o(()=>[b]),_:1})]),Object(r["m"])("li",null,[Object(r["m"])(h,{to:"/about"},{default:o(()=>[p]),_:1})])])])});var h={};n("df9f");h.render=f,h.__scopeId="data-v-118ac0a4";var m=h,v={name:"App",components:{TopBar:m}};v.render=c;var O=v,j=n("6c02");const g=[{path:"/",redirect:"/home"},{path:"/home",name:"Home",component:()=>n.e("chunk-b706b49e").then(n.bind(null,"b3d7")),meta:{deepth:1,keepAlive:!0}},{path:"/articles/:id",name:"ArticleContent",component:()=>n.e("chunk-0e3a0d41").then(n.bind(null,"be1f")),props:!0,meta:{deepth:.5,keepAlive:!0}},{path:"/articles",name:"Articles",component:()=>n.e("chunk-ddbb8adc").then(n.bind(null,"9ae4")),meta:{deepth:2,keepAlive:!0}},{path:"/about",name:"About",component:()=>n.e("chunk-92a19eda").then(n.bind(null,"f820"))},{path:"/contact",name:"Contact",component:()=>n.e("chunk-2d210c47").then(n.bind(null,"b8fa"))}],k=Object(j["a"])({history:Object(j["b"])(),routes:g});var y=k,w=n("5502"),A=Object(w["a"])({state:{likes:0,pageIndex:1},mutations:{increment(e){e.likes++},getIndex(e,t){e.pageIndex=t}},actions:{},modules:{}}),_=n("3fd4"),C=(n("7dd6"),e=>{e.use(_["a"])}),E=n("bc3a"),T=n.n(E),x=n("2106"),P=n.n(x);const S=Object(r["h"])(O);C(S),S.use(A).use(y).use(P.a,T.a).mount("#app"),T.a.defaults.baseURL="http://localhost:3000"},bd7a:function(e,t,n){},df9f:function(e,t,n){"use strict";n("bd7a")}});
//# sourceMappingURL=app.58886c9c.js.map