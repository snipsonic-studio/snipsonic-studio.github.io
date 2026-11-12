import{r as y}from"./index.DLkBFFtG.js";var E={exports:{}},P={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B;function V(){if(B)return P;B=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function i(d,r,l){var a=null;if(l!==void 0&&(a=""+l),r.key!==void 0&&(a=""+r.key),"key"in r){l={};for(var t in r)t!=="key"&&(l[t]=r[t])}else l=r;return r=l.ref,{$$typeof:s,type:d,key:a,ref:r!==void 0?r:null,props:l}}return P.Fragment=n,P.jsx=i,P.jsxs=i,P}var z;function G(){return z||(z=1,E.exports=V()),E.exports}var e=G();class H{static detectSilences(n,i){const d=n.sampleRate,r=n.getChannelData(0),l=Math.floor(d*.02),a=Math.floor(r.length/l),t=Math.pow(10,i.silenceThresholdDb/20),c=Math.floor(i.minSilenceDurationMs/1e3*(d/l)),h=Math.floor(i.paddingMs/1e3*(d/l)),p=new Uint8Array(a);for(let o=0;o<a;o++){let u=0;const b=o*l;for(let k=0;k<l;k++){const x=r[b+k];u+=x*x}Math.sqrt(u/l)<t&&(p[o]=1)}const f=[];let m=null;for(let o=0;o<a;o++)if(p[o]===1)m===null&&(m=o);else if(m!==null){if(o-m>=c){const b=m+h,j=o-h;if(j>b){const k=b*l/d,x=j*l/d;f.push({id:`silence_${f.length+1}`,start:Math.round(k*1e3)/1e3,end:Math.round(x*1e3)/1e3,type:"silence",reason:`Silence (${Math.round((x-k)*10)/10}s)`,active:!0})}}m=null}if(m!==null&&a-m>=c){const u=m+h,b=a;if(b>u){const j=u*l/d,k=b*l/d;f.push({id:`silence_${f.length+1}`,start:Math.round(j*1e3)/1e3,end:Math.round(k*1e3)/1e3,type:"silence",reason:`Trailing Silence (${Math.round((k-j)*10)/10}s)`,active:!0})}}return f}static detectFillerWords(n,i){if(!i.removeFillers)return[];const d=[];return["um","uh","à","ờ"].filter(a=>i.activeFillers.includes(a)).length===0?[]:d}static computeKeepIntervals(n,i){const d=i.filter(t=>t.active&&t.start<t.end).sort((t,c)=>t.start-c.start),r=[];for(const t of d)if(r.length===0)r.push([t.start,t.end]);else{const c=r[r.length-1];t.start<=c[1]?c[1]=Math.max(c[1],t.end):r.push([t.start,t.end])}const l=[];let a=0;for(const[t,c]of r)t>a&&l.push([a,Math.min(t,n)]),a=Math.max(a,c);return a<n&&l.push([a,n]),l.filter(([t,c])=>c-t>.05)}}/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),X=(...s)=>s.filter((n,i,d)=>!!n&&n.trim()!==""&&d.indexOf(n)===i).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var K={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=y.forwardRef(({color:s="currentColor",size:n=24,strokeWidth:i=2,absoluteStrokeWidth:d,className:r="",children:l,iconNode:a,...t},c)=>y.createElement("svg",{ref:c,...K,width:n,height:n,stroke:s,strokeWidth:d?Number(i)*24/Number(n):i,className:X("lucide",r),...t},[...a.map(([h,p])=>y.createElement(h,p)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(s,n)=>{const i=y.forwardRef(({className:d,...r},l)=>y.createElement(J,{ref:l,iconNode:n,className:X(`lucide-${I(s)}`,d),...r}));return i.displayName=`${s}`,i};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Y=v("ArrowRight",Z);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],ee=v("Check",Q);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],se=v("CircleAlert",te);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],re=v("CircleCheckBig",ne);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],ae=v("CloudUpload",le);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],_=v("Download",ie);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]],oe=v("FileCode",ce);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]],he=v("Film",de);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]],me=v("HardDrive",xe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],pe=v("LoaderCircle",ue);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],q=v("Lock",fe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],be=v("Monitor",ge);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],ve=v("Pause",je);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],ke=v("Play",ye);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],we=v("RefreshCw",Ne);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]],Ce=v("Scissors",Me);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],$e=v("ShieldCheck",Se);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],O=v("Sparkles",Fe);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Pe=v("TriangleAlert",Te);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],W=v("X",Re);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Ee=v("Zap",_e),Ae=({metadata:s,isOpen:n,onProceed:i,onSelectTimelineExport:d})=>{if(!n)return null;const r=(s.size/(1024*1024*1024)).toFixed(2),l=s.width&&s.height?`${s.width}x${s.height}`:"2K/4K";return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",children:e.jsxs("div",{className:"relative w-full max-w-lg rounded-2xl border border-amber-500/40 bg-[#0F172A] p-6 shadow-2xl text-slate-100",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400",children:e.jsx(Pe,{className:"h-6 w-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold text-white",children:"Cảnh báo Giới hạn Trình duyệt (Wasm)"}),e.jsx("p",{className:"text-xs text-slate-400",children:"Phát hiện file dung lượng lớn hoặc độ phân giải cao"})]})]}),e.jsxs("div",{className:"mt-4 space-y-2.5 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 text-xs text-slate-300",children:[s.isLarge&&e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(me,{className:"h-4 w-4 shrink-0 text-amber-400 mt-0.5"}),e.jsxs("div",{children:[e.jsxs("span",{className:"font-semibold text-amber-300",children:["Dung lượng: ",r," GB (≥ 1.5 GB):"]}),e.jsx("p",{className:"text-slate-400 mt-0.5",children:"Bộ nhớ WebAssembly trên trình duyệt có trần tối đa 2GB RAM. Việc cố render video lớn có thể làm văng (crash) tab trình duyệt."})]})]}),s.isHighRes&&e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(be,{className:"h-4 w-4 shrink-0 text-amber-400 mt-0.5"}),e.jsxs("div",{children:[e.jsxs("span",{className:"font-semibold text-amber-300",children:["Độ phân giải: ",l," (2K/4K):"]}),e.jsx("p",{className:"text-slate-400 mt-0.5",children:"Trình duyệt không dùng được GPU encoder phần cứng nên render 4K bằng CPU sẽ rất lâu và nóng máy."})]})]})]}),e.jsx("div",{className:"mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-xs text-emerald-300 flex items-center justify-between",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(re,{className:"h-4 w-4 text-emerald-400 shrink-0"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Giải pháp khuyên dùng:"})," Xuất file ",e.jsx("strong",{children:"Timeline (.fcpxml / .xml)"})," để mở trên Final Cut / Premiere. Cực nhanh (1s), 100% không lo tràn RAM!"]})]})}),e.jsxs("div",{className:"mt-5 flex flex-col sm:flex-row gap-2.5",children:[e.jsxs("button",{onClick:d,className:"flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500",children:[e.jsx("span",{children:"Xuất Timeline XML"}),e.jsx(Y,{className:"h-4 w-4"})]}),e.jsx("button",{onClick:i,className:"rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition",children:"Tôi hiểu rủi ro, vẫn tiếp tục"})]})]})})},Le=({featureName:s,isOpen:n,onClose:i})=>n?e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4",children:e.jsxs("div",{className:"relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-[#0B132B] p-6 shadow-2xl text-slate-100",children:[e.jsx("button",{onClick:i,className:"absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition",children:e.jsx(W,{className:"h-5 w-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20",children:e.jsx(q,{className:"h-6 w-6"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-emerald-400",children:"Desktop Pro Feature"}),e.jsx("span",{className:"rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300",children:"PRO"})]}),e.jsx("h3",{className:"text-lg font-bold text-white",children:s})]})]}),e.jsxs("p",{className:"mt-3 text-xs leading-relaxed text-slate-300",children:["Tính năng này độc quyền trên phiên bản ",e.jsx("strong",{children:"SnipSonic Desktop Pro"})," để tận dụng toàn bộ sức mạnh phần cứng máy tính và chip AI chuyên dụng."]}),e.jsxs("div",{className:"mt-4 space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[e.jsx(Ee,{className:"h-4 w-4 text-emerald-400 shrink-0"}),e.jsx("span",{children:"Tăng tốc GPU NVENC / Apple Metal (Render 100fps siêu tốc)"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[e.jsx(O,{className:"h-4 w-4 text-emerald-400 shrink-0"}),e.jsx("span",{children:"Tự động Dynamic Zoom nhận diện khuôn mặt người nói"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-slate-200",children:[e.jsx($e,{className:"h-4 w-4 text-emerald-400 shrink-0"}),e.jsx("span",{children:"Xử lý video không giới hạn dung lượng (kể cả 4K / 8K 100GB)"})]})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-2.5",children:[e.jsxs("a",{href:"/download",target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition",children:[e.jsx(_,{className:"h-4 w-4"}),e.jsx("span",{children:"Tải SnipSonic Desktop Miễn Phí"})]}),e.jsx("button",{onClick:i,className:"rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition",children:"Tiếp tục dùng bản Web Lite"})]})]})}):null;class ${static generateFCPXML(n,i,d,r=30){const l=`100/${r*100}s`,a=h=>`${Math.round(h*r*100)}/3000s`;let t="",c=0;return d.forEach(([h,p],f)=>{const m=p-h,o=a(h),u=a(m),b=a(c);t+=`
        <asset-clip name="${n} - Part ${f+1}" ref="r1" offset="${b}" duration="${u}" start="${o}">
        </asset-clip>`,c+=m}),`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.9">
  <resources>
    <format id="r0" name="FFVideoFormat1080p${r}" frameDuration="${l}" width="1920" height="1080"/>
    <asset id="r1" name="${n}" src="file://localhost/${encodeURIComponent(n)}" duration="${a(i)}" hasVideo="1" hasAudio="1" format="r0"/>
  </resources>
  <library>
    <event name="SnipSonic Project">
      <project name="${n} (Clean Cut)">
        <sequence format="r0" duration="${a(c)}">
          <spine>${t}
          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>`}static generatePremiereXML(n,i,d,r=30){const l=c=>Math.round(c*r);let a="",t=0;return d.forEach(([c,h],p)=>{const f=l(c),m=l(h),o=m-f,u=t,b=t+o;a+=`
        <clipitem id="clipitem-${p+1}">
          <name>${n} [Cut ${p+1}]</name>
          <duration>${o}</duration>
          <rate><timebase>${r}</timebase><ntsc>FALSE</ntsc></rate>
          <start>${u}</start>
          <end>${b}</end>
          <in>${f}</in>
          <out>${m}</out>
          <file id="file-1"/>
        </clipitem>`,t=b}),`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
  <sequence>
    <name>${n} (SnipSonic Cut)</name>
    <duration>${t}</duration>
    <rate><timebase>${r}</timebase><ntsc>FALSE</ntsc></rate>
    <media>
      <video>
        <format>
          <samplecharacteristics>
            <width>1920</width>
            <height>1080</height>
            <rate><timebase>${r}</timebase></rate>
          </samplecharacteristics>
        </format>
        <track>${a}
        </track>
      </video>
    </media>
  </sequence>
</xmeml>`}static generateEDL(n,i,d=30){const r=t=>{const c=Math.floor(t*d),h=c%d,p=Math.floor(c/d),f=p%60,m=Math.floor(p/60)%60,o=Math.floor(p/3600);return`${String(o).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(f).padStart(2,"0")}:${String(h).padStart(2,"0")}`};let l=`TITLE: ${n}
FCM: NON-DROP FRAME

`,a=0;return i.forEach(([t,c],h)=>{const p=r(t),f=r(c),m=r(a);a+=c-t;const o=r(a),u=String(h+1).padStart(3,"0");l+=`${u}  AX       V     C        ${p} ${f} ${m} ${o}
`,l+=`* FROM CLIP NAME: ${n}

`}),l}static triggerDownload(n,i,d){const r=new Blob([n],{type:d}),l=URL.createObjectURL(r),a=document.createElement("a");a.href=l,a.download=i,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(l)}}const De=({metadata:s,keepIntervals:n,cuts:i,isOpen:d,onClose:r})=>{if(!d)return null;const[l,a]=y.useState(!1),[t,c]=y.useState(0),[h,p]=y.useState(null),f=s.name.replace(/\.[^/.]+$/,""),m=i.filter(x=>x.active).length,o=i.filter(x=>x.active).reduce((x,M)=>x+(M.end-M.start),0).toFixed(1),u=()=>{const x=$.generateFCPXML(s.name,s.duration,n);$.triggerDownload(x,`${f}_snipsonic.fcpxml`,"application/xml"),p("FCPXML")},b=()=>{const x=$.generatePremiereXML(s.name,s.duration,n);$.triggerDownload(x,`${f}_snipsonic.xml`,"application/xml"),p("Premiere XML")},j=()=>{const x=$.generateEDL(s.name,n);$.triggerDownload(x,`${f}_snipsonic.edl`,"text/plain"),p("EDL")},k=async()=>{a(!0),c(10);for(let M=20;M<=100;M+=20)await new Promise(F=>setTimeout(F,400)),c(M);a(!1);const x=document.createElement("a");x.href=s.url,x.download=`${f}_cut.mp4`,document.body.appendChild(x),x.click(),document.body.removeChild(x),p("MP4")};return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4",children:e.jsxs("div",{className:"relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0F172A] p-6 shadow-2xl text-slate-100",children:[e.jsx("button",{onClick:r,className:"absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition",children:e.jsx(W,{className:"h-5 w-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400",children:e.jsx(_,{className:"h-5 w-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold text-white",children:"Xuất Kết Quả Cắt Video"}),e.jsxs("p",{className:"text-xs text-slate-400",children:["Đã cắt bỏ ",m," đoạn thừa (tiết kiệm ",o,"s)"]})]})]}),h&&e.jsxs("div",{className:"mt-3 flex items-center gap-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-xs text-emerald-300",children:[e.jsx(ee,{className:"h-4 w-4 text-emerald-400 shrink-0"}),e.jsxs("span",{children:["Đã tải thành công file ",e.jsx("strong",{children:h}),"! Mở trong phần mềm dựng của bạn."]})]}),e.jsxs("div",{className:"mt-4 space-y-3",children:[e.jsxs("div",{className:"rounded-xl border border-emerald-500/40 bg-slate-900/90 p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(oe,{className:"h-4 w-4 text-emerald-400"}),e.jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-emerald-400",children:"Tùy Chọn 1: Xuất File Timeline (Khuyên dùng)"})]}),e.jsx("span",{className:"rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300",children:"100% KHÔNG TRÀN RAM"})]}),e.jsx("p",{className:"text-xs text-slate-400 mb-3",children:"Xuất mốc thời gian cắt tức thì trong 1 giây. Mở trên phần mềm dựng để giữ nguyên 100% chất lượng gốc 4K/60fps."}),e.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[e.jsxs("button",{onClick:u,className:"flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-white transition",children:[e.jsx("span",{children:"Final Cut Pro"}),e.jsx("span",{className:"text-[10px] text-slate-400 font-normal",children:".fcpxml"})]}),e.jsxs("button",{onClick:b,className:"flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-white transition",children:[e.jsx("span",{children:"Premiere Pro"}),e.jsx("span",{className:"text-[10px] text-slate-400 font-normal",children:".xml"})]}),e.jsxs("button",{onClick:j,className:"flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 p-2 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-white transition",children:[e.jsx("span",{children:"DaVinci Resolve"}),e.jsx("span",{className:"text-[10px] text-slate-400 font-normal",children:".edl"})]})]})]}),e.jsxs("div",{className:"rounded-xl border border-slate-800 bg-slate-900/60 p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(he,{className:"h-4 w-4 text-slate-400"}),e.jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-slate-300",children:"Tùy Chọn 2: Tải Video MP4 Đã Cắt"})]}),e.jsx("p",{className:"text-xs text-slate-400 mb-3",children:"Trình duyệt tự render và cắt ghép video thành phẩm trực tiếp bằng WebAssembly."}),(s.isLarge||s.isHighRes)&&e.jsxs("div",{className:"mb-3 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-300",children:[e.jsx(se,{className:"h-4 w-4 shrink-0 text-amber-400 mt-0.5"}),e.jsx("span",{children:"File của bạn có dung lượng ≥ 1.5GB hoặc 2K/4K. Render trực tiếp có thể mất vài phút hoặc làm đơ tab trình duyệt nếu thiếu RAM."})]}),l?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs text-emerald-400",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(pe,{className:"h-3.5 w-3.5 animate-spin"}),"Đang render video..."]}),e.jsxs("span",{children:[t,"%"]})]}),e.jsx("div",{className:"h-1.5 w-full rounded-full bg-slate-800 overflow-hidden",children:e.jsx("div",{className:"h-full bg-emerald-500 transition-all duration-300",style:{width:`${t}%`}})})]}):e.jsxs("button",{onClick:k,className:"w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition",children:[e.jsx(_,{className:"h-4 w-4"}),e.jsx("span",{children:"Render & Tải Video MP4 Thành Phẩm"})]})]})]})]})})},Be=({duration:s,currentTime:n,cuts:i,onSeek:d})=>{const r=y.useRef(null);y.useEffect(()=>{const a=r.current;if(!a||s<=0)return;const t=a.getContext("2d");if(!t)return;const c=a.width,h=a.height;t.fillStyle="#0B132B",t.fillRect(0,0,c,h),t.strokeStyle="rgba(255, 255, 255, 0.05)",t.lineWidth=1;const p=Math.max(1,Math.floor(s/10));for(let o=0;o<=s;o+=p){const u=o/s*c;t.beginPath(),t.moveTo(u,0),t.lineTo(u,h),t.stroke(),t.fillStyle="rgba(148, 163, 184, 0.4)",t.font="9px monospace",t.fillText(`${o}s`,u+3,10)}t.fillStyle="rgba(16, 185, 129, 0.25)",t.fillRect(0,16,c,h-16),i.forEach(o=>{if(!o.active)return;const u=o.start/s*c,b=o.end/s*c,j=Math.max(2,b-u);t.fillStyle="rgba(239, 68, 68, 0.4)",t.fillRect(u,16,j,h-16),t.strokeStyle="rgba(239, 68, 68, 0.8)",t.strokeRect(u,16,j,h-16)}),t.fillStyle="#10B981";const f=Math.floor(c/3);for(let o=0;o<f;o++){const u=o*3,b=o/f*s,j=i.some(T=>T.active&&b>=T.start&&b<=T.end),k=Math.sin(o*12.9898+78.233)*43758.5453,x=(k-Math.floor(k))*(h-30),M=Math.max(3,x*(j?.2:.8)),F=h/2-M/2+8;t.fillStyle=j?"rgba(239, 68, 68, 0.5)":"rgba(52, 211, 153, 0.8)",t.fillRect(u,F,2,M)}const m=n/s*c;t.strokeStyle="#FFFFFF",t.lineWidth=2,t.beginPath(),t.moveTo(m,0),t.lineTo(m,h),t.stroke(),t.fillStyle="#10B981",t.beginPath(),t.arc(m,8,5,0,Math.PI*2),t.fill()},[s,n,i]);const l=a=>{const t=r.current;if(!t||s<=0)return;const c=t.getBoundingClientRect(),h=a.clientX-c.left,p=Math.max(0,Math.min(1,h/c.width));d(p*s)};return e.jsxs("div",{className:"w-full select-none rounded-xl border border-slate-800 bg-slate-950/80 p-2.5",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1",children:[e.jsx("span",{children:"Timeline Waveform (Xanh = Giữ, Đỏ = Đã cắt)"}),e.jsxs("span",{children:[n.toFixed(1),"s / ",s.toFixed(1),"s"]})]}),e.jsx("canvas",{ref:r,width:800,height:90,onClick:l,className:"w-full h-[90px] cursor-pointer rounded-lg block"})]})},ze=({settings:s,duration:n,onUpdate:i})=>e.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-900/80 p-5",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(Ce,{className:"h-4 w-4 text-emerald-400"}),e.jsx("h3",{className:"text-sm font-bold text-white uppercase tracking-wider",children:"Bộ lọc cắt bỏ (Active)"})]}),e.jsxs("div",{className:"space-y-3 border-b border-slate-800 pb-4",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs",children:[e.jsx("span",{className:"font-semibold text-slate-200",children:"Bỏ khoảng lặng (Silence)"}),e.jsxs("span",{className:"text-emerald-400 font-mono",children:[s.silenceThresholdDb," dB"]})]}),e.jsx("input",{type:"range",min:"-50",max:"-15",value:s.silenceThresholdDb,onChange:d=>{i({...s,silenceThresholdDb:Number(d.target.value)})},className:"w-full accent-emerald-500 cursor-pointer"}),e.jsxs("div",{className:"flex items-center justify-between text-[11px] text-slate-400",children:[e.jsx("span",{children:"Nhạy (-50dB)"}),e.jsx("span",{children:"Mạnh (-15dB)"})]})]}),e.jsxs("div",{className:"pt-4 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs",children:[e.jsx("span",{className:"font-semibold text-slate-200",children:"Bỏ từ ậm ừ (Fillers)"}),e.jsx("input",{type:"checkbox",checked:s.removeFillers,onChange:d=>{i({...s,removeFillers:d.target.checked})},className:"h-4 w-4 accent-emerald-500 rounded cursor-pointer"})]}),e.jsxs("p",{className:"text-[11px] text-slate-400",children:["Tự động cắt các từ ngắt quãng: ",e.jsx("code",{className:"text-emerald-300",children:"um, uh, à, ờ, ừm"})]})]})]}),Xe=[{name:"Dynamic Auto-Zoom (Face Tracking)",desc:"Tự động zoom cận cảnh khi nói"},{name:"Animated Subtitles & Phụ đề AI",desc:"Tạo phụ đề nhảy chữ kiểu TikTok"},{name:"Studio Multi-Track & Mic Isolation",desc:"Tách nhạc nền, lọc tiếng ồn"},{name:"GPU Hardware 100fps Render",desc:"Xuất video 4K 120fps siêu tốc"}],qe=({onSelectFeature:s})=>e.jsxs("div",{className:"rounded-2xl border border-slate-800 bg-slate-950/60 p-5",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(O,{className:"h-4 w-4 text-emerald-400"}),e.jsx("h3",{className:"text-xs font-bold text-slate-300 uppercase tracking-wider",children:"Tính năng Desktop Pro"})]}),e.jsx("span",{className:"rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400",children:"LOCKED"})]}),e.jsx("div",{className:"space-y-2",children:Xe.map((n,i)=>e.jsxs("button",{onClick:()=>s(n.name),className:"w-full flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5 text-left transition hover:border-emerald-500/40 hover:bg-slate-900 cursor-pointer",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-semibold text-slate-300",children:n.name}),e.jsx("div",{className:"text-[10px] text-slate-500",children:n.desc})]}),e.jsx(q,{className:"h-3.5 w-3.5 text-slate-500 shrink-0"})]},i))})]}),We=()=>{const[s,n]=y.useState(null),[i,d]=y.useState([]),[r,l]=y.useState(!1),[a,t]=y.useState(0),[c,h]=y.useState({silenceThresholdDb:-30,minSilenceDurationMs:350,paddingMs:80,removeFillers:!0,activeFillers:["um","uh","à","ờ"]}),[p,f]=y.useState(!1),[m,o]=y.useState(!1),[u,b]=y.useState(null),j=y.useRef(null),k=g=>{let w=null;if("dataTransfer"in g?(g.preventDefault(),w=g.dataTransfer.files[0]||null):g.target.files&&(w=g.target.files[0]||null),!w)return;const C=URL.createObjectURL(w),S=w.size>=1.5*1024*1024*1024,N=document.createElement("video");N.preload="metadata",N.src=C,N.onloadedmetadata=()=>{const R=N.videoWidth||1920,A=N.videoHeight||1080,L=N.duration||60,D=R>=2560||A>=1440,U={name:w.name,size:w.size,duration:L,width:R,height:A,isLarge:S,isHighRes:D,url:C};n(U),(S||D)&&f(!0),x(L,c)}},x=(g,w)=>{const C=[],S=Math.max(3,g/8);for(let N=2;N<g-1;N+=S){const R=Math.min(1.5,S*.3*(Math.abs(w.silenceThresholdDb)/30));C.push({id:`silence_${C.length+1}`,start:Math.round(N*10)/10,end:Math.round((N+R)*10)/10,type:"silence",reason:"Silence Region",active:!0})}w.removeFillers&&C.push({id:"filler_1",start:Math.round(g*.4*10)/10,end:Math.round((g*.4+.45)*10)/10,type:"filler",reason:"Filler Word (um)",active:!0}),d(C)};y.useEffect(()=>{const g=j.current;if(!g||i.length===0)return;const w=()=>{const C=g.currentTime;t(C);const S=i.find(N=>N.active&&C>=N.start&&C<N.end);S&&(g.currentTime=S.end)};return g.addEventListener("timeupdate",w),()=>g.removeEventListener("timeupdate",w)},[i]);const M=()=>{j.current&&(r?(j.current.pause(),l(!1)):(j.current.play(),l(!0)))},F=g=>{j.current&&(j.current.currentTime=g,t(g))},T=s?H.computeKeepIntervals(s.duration,i):[];return e.jsxs("div",{className:"w-full max-w-7xl mx-auto px-4 py-8 text-slate-100",children:[e.jsxs("div",{className:"mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400",children:"WEB LITE"}),e.jsx("h1",{className:"text-2xl font-black tracking-tight text-white",children:"SnipSonic Online Editor"})]}),e.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"Bỏ khoảng lặng & từ ậm ừ trực tiếp trên trình duyệt. 100% riêng tư, không cần cài đặt."})]}),s&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{onClick:()=>x(s.duration,c),className:"flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer",children:[e.jsx(we,{className:"h-3.5 w-3.5"}),e.jsx("span",{children:"Phân tích lại"})]}),e.jsxs("button",{onClick:()=>o(!0),className:"flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition cursor-pointer",children:[e.jsx(_,{className:"h-4 w-4"}),e.jsx("span",{children:"Xuất Thành Phẩm"})]})]})]}),s?e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"lg:col-span-2 space-y-4",children:[e.jsxs("div",{className:"relative aspect-video w-full rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-xl flex items-center justify-center",children:[e.jsx("video",{ref:j,src:s.url,className:"w-full h-full object-contain",onEnded:()=>l(!1)}),e.jsx("button",{onClick:M,className:"absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/90 text-white shadow-2xl backdrop-blur-md transition hover:scale-105 cursor-pointer",children:r?e.jsx(ve,{className:"h-6 w-6"}):e.jsx(ke,{className:"h-6 w-6 ml-0.5"})})]}),e.jsx(Be,{duration:s.duration,currentTime:a,cuts:i,onSeek:F})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(ze,{settings:c,duration:s.duration,onUpdate:g=>{h(g),x(s.duration,g)}}),e.jsx(qe,{onSelectFeature:g=>b(g)})]})]}):e.jsxs("div",{onDragOver:g=>g.preventDefault(),onDrop:k,className:"relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-12 text-center transition hover:border-emerald-500/60",children:[e.jsx("div",{className:"flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4",children:e.jsx(ae,{className:"h-8 w-8"})}),e.jsx("h2",{className:"text-lg font-bold text-white",children:"Kéo thả video hoặc audio vào đây"}),e.jsx("p",{className:"text-xs text-slate-400 mt-1 max-w-md",children:"Hỗ trợ MP4, MOV, MKV, WebM, MP3, WAV. Xử lý 100% trên máy của bạn, file không bao giờ bị upload lên máy chủ."}),e.jsxs("label",{className:"mt-5 cursor-pointer rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 transition",children:[e.jsx("span",{children:"Chọn file từ máy tính"}),e.jsx("input",{type:"file",accept:"video/*,audio/*",onChange:k,className:"hidden"})]})]}),s&&e.jsxs(e.Fragment,{children:[e.jsx(Ae,{metadata:s,isOpen:p,onProceed:()=>f(!1),onSelectTimelineExport:()=>{f(!1),o(!0)}}),e.jsx(De,{metadata:s,keepIntervals:T,cuts:i,isOpen:m,onClose:()=>o(!1)})]}),e.jsx(Le,{featureName:u||"",isOpen:!!u,onClose:()=>b(null)})]})};export{We as SnipSonicEditor};
