import{k as N,n as o,q as U,av as St,i as Ee,s as Q,B as d,M as ye,N as he,r as M,D as V,aw as yt,ax as Fe,ay as je,o as Ae,m as ht,l as _t,E as Ne,S as wt,an as Qe,ao as qt,al as Ct,az as Pt,aA as Ve,aB as Se,aC as De,aD as kt,x as pe,aE as Rt,aF as p,j as H,a1 as xt,_ as Tt,g as Bt,O as Ot,w as te,f as le,aG as Ft,aH as Vt,W as Dt,X as $t,aI as Lt,aJ as Mt}from"./index.789610f1.js";import{u as Et,a as jt,c as ze,Q as me,b as At,d as Nt,C as Qt}from"./ClosePopup.561e5bd3.js";import{Q as pt}from"./QCard.8ec9d0ab.js";var zt=N({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:l,emit:a}){const u=Q(),{proxy:{$q:r}}=u,f=i=>{a("click",i)};return()=>{if(e.props===void 0)return o("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:f},U(l.default));let i,c;const v=u.vnode.key;if(v){if(i=e.props.colsMap[v],i===void 0)return}else i=e.props.col;if(i.sortable===!0){const n=i.align==="right"?"unshift":"push";c=St(l.default,[]),c[n](o(Ee,{class:i.__iconClass,name:r.iconSet.table.arrowUp}))}else c=U(l.default);const S={class:i.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:i.headerStyle,onClick:n=>{i.sortable===!0&&e.props.sort(i),f(n)}};return o("th",S,c)}}}),ql=N({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:l}){const a=Q(),u=d(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return o("td",{class:u.value},U(l.default));const r=a.vnode.key,f=(e.props.colsMap!==void 0?e.props.colsMap[r]:null)||e.props.col;if(f===void 0)return;const{row:i}=e.props;return o("td",{class:u.value+f.__tdClass(i),style:f.__tdStyle(i)},U(l.default))}}});const Ht=["horizontal","vertical","cell","none"];var Ut=N({name:"QMarkupTable",props:{...ye,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Ht.includes(e)}},setup(e,{slots:l}){const a=Q(),u=he(e,a.proxy.$q),r=d(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(u.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>o("div",{class:r.value},[o("table",{class:"q-table"},U(l.default))])}});function He(e,l){return o("div",e,[o("table",{class:"q-table"},l)])}const It={list:wt,table:Ut},Wt=["list","table","__qtable"];var Gt=N({name:"QVirtualScroll",props:{...Et,type:{type:String,default:"list",validator:e=>Wt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:{default:void 0}},setup(e,{slots:l,attrs:a}){let u;const r=M(null),f=d(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:i,localResetVirtualScroll:c,padVirtualScroll:v,onVirtualScrollEvt:S}=jt({virtualScrollLength:f,getVirtualScrollTarget:C,getVirtualScrollEl:q}),n=d(()=>{if(f.value===0)return[];const O=(F,R)=>({index:i.value.from+R,item:F});return e.itemsFn===void 0?e.items.slice(i.value.from,i.value.to).map(O):e.itemsFn(i.value.from,i.value.to-i.value.from).map(O)}),m=d(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),w=d(()=>e.scrollTarget!==void 0?{}:{tabindex:0});V(f,()=>{c()}),V(()=>e.scrollTarget,()=>{_(),h()});function q(){return r.value.$el||r.value}function C(){return u}function h(){u=yt(q(),e.scrollTarget),u.addEventListener("scroll",S,Fe.passive)}function _(){u!==void 0&&(u.removeEventListener("scroll",S,Fe.passive),u=void 0)}function B(){let O=v(e.type==="list"?"div":"tbody",n.value.map(l.default));return l.before!==void 0&&(O=l.before().concat(O)),Qe(l.after,O)}return je(()=>{c()}),Ae(()=>{h()}),ht(()=>{h()}),_t(()=>{_()}),Ne(()=>{_()}),()=>{if(l.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?He({ref:r,class:"q-table__middle "+m.value},B()):o(It[e.type],{...a,ref:r,class:[a.class,m.value],...w.value},B)}}});const Kt={xs:2,sm:4,md:6,lg:10,xl:14};function $e(e,l,a){return{transform:l===!0?`translateX(${a.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Xt=N({name:"QLinearProgress",props:{...ye,...qt,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:l}){const{proxy:a}=Q(),u=he(e,a.$q),r=Ct(e,Kt),f=d(()=>e.indeterminate===!0||e.query===!0),i=d(()=>e.reverse!==e.query),c=d(()=>({...r.value!==null?r.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),v=d(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),S=d(()=>$e(e.buffer!==void 0?e.buffer:1,i.value,a.$q)),n=d(()=>`q-linear-progress__track absolute-full q-linear-progress__track--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__track--${u.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),m=d(()=>$e(f.value===!0?1:e.value,i.value,a.$q)),w=d(()=>`q-linear-progress__model absolute-full q-linear-progress__model--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__model--${f.value===!0?"in":""}determinate`),q=d(()=>({width:`${e.value*100}%`})),C=d(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"}`);return()=>{const h=[o("div",{class:n.value,style:S.value}),o("div",{class:w.value,style:m.value})];return e.stripe===!0&&f.value===!1&&h.push(o("div",{class:C.value,style:q.value})),o("div",{class:v.value,style:c.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Qe(l.default,h))}}});let z=0;const Jt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},Yt=["update:fullscreen","fullscreen"];function Zt(){const e=Q(),{props:l,emit:a,proxy:u}=e;let r,f,i;const c=M(!1);Pt(e)===!0&&V(()=>u.$route.fullPath,()=>{l.noRouteFullscreenExit!==!0&&n()}),V(()=>l.fullscreen,m=>{c.value!==m&&v()}),V(c,m=>{a("update:fullscreen",m),a("fullscreen",m)});function v(){c.value===!0?n():S()}function S(){c.value!==!0&&(c.value=!0,i=u.$el.parentNode,i.replaceChild(f,u.$el),document.body.appendChild(u.$el),z++,z===1&&document.body.classList.add("q-body--fullscreen-mixin"),r={handler:n},Ve.add(r))}function n(){c.value===!0&&(r!==void 0&&(Ve.remove(r),r=void 0),i.replaceChild(u.$el,f),c.value=!1,z=Math.max(0,z-1),z===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),u.$el.scrollIntoView!==void 0&&setTimeout(()=>{u.$el.scrollIntoView()})))}return je(()=>{f=document.createElement("span")}),Ae(()=>{l.fullscreen===!0&&S()}),Ne(n),Object.assign(u,{toggleFullscreen:v,setFullscreen:S,exitFullscreen:n}),{inFullscreen:c,toggleFullscreen:v}}function el(e,l){return new Date(e)-new Date(l)}const tl={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function ll(e,l,a,u){const r=d(()=>{const{sortBy:c}=l.value;return c&&a.value.find(v=>v.name===c)||null}),f=d(()=>e.sortMethod!==void 0?e.sortMethod:(c,v,S)=>{const n=a.value.find(q=>q.name===v);if(n===void 0||n.field===void 0)return c;const m=S===!0?-1:1,w=typeof n.field=="function"?q=>n.field(q):q=>q[n.field];return c.sort((q,C)=>{let h=w(q),_=w(C);return h==null?-1*m:_==null?1*m:n.sort!==void 0?n.sort(h,_,q,C)*m:Se(h)===!0&&Se(_)===!0?(h-_)*m:De(h)===!0&&De(_)===!0?el(h,_)*m:typeof h=="boolean"&&typeof _=="boolean"?(h-_)*m:([h,_]=[h,_].map(B=>(B+"").toLocaleString().toLowerCase()),h<_?-1*m:h===_?0:m)})});function i(c){let v=e.columnSortOrder;if(kt(c)===!0)c.sortOrder&&(v=c.sortOrder),c=c.name;else{const m=a.value.find(w=>w.name===c);m!==void 0&&m.sortOrder&&(v=m.sortOrder)}let{sortBy:S,descending:n}=l.value;S!==c?(S=c,n=v==="da"):e.binaryStateSort===!0?n=!n:n===!0?v==="ad"?S=null:n=!1:v==="ad"?n=!0:S=null,u({sortBy:S,descending:n,page:1})}return{columnToSort:r,computedSortMethod:f,sort:i}}const al={filter:[String,Object],filterMethod:Function};function nl(e,l){const a=d(()=>e.filterMethod!==void 0?e.filterMethod:(u,r,f,i)=>{const c=r?r.toLowerCase():"";return u.filter(v=>f.some(S=>{const n=i(S,v)+"";return(n==="undefined"||n==="null"?"":n.toLowerCase()).indexOf(c)!==-1}))});return V(()=>e.filter,()=>{pe(()=>{l({page:1},!0)})},{deep:!0}),{computedFilterMethod:a}}function rl(e,l){for(const a in l)if(l[a]!==e[a])return!1;return!0}function Le(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const ol={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function il(e,l){const{props:a,emit:u}=e,r=M(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:a.rowsPerPageOptions.length>0?a.rowsPerPageOptions[0]:5},a.pagination)),f=d(()=>{const n=a["onUpdate:pagination"]!==void 0?{...r.value,...a.pagination}:r.value;return Le(n)}),i=d(()=>f.value.rowsNumber!==void 0);function c(n){v({pagination:n,filter:a.filter})}function v(n={}){pe(()=>{u("request",{pagination:n.pagination||f.value,filter:n.filter||a.filter,getCellValue:l})})}function S(n,m){const w=Le({...f.value,...n});if(rl(f.value,w)===!0){i.value===!0&&m===!0&&c(w);return}if(i.value===!0){c(w);return}a.pagination!==void 0&&a["onUpdate:pagination"]!==void 0?u("update:pagination",w):r.value=w}return{innerPagination:r,computedPagination:f,isServerSide:i,requestServerInteraction:v,setPagination:S}}function sl(e,l,a,u,r,f){const{props:i,emit:c,proxy:{$q:v}}=e,S=d(()=>u.value===!0?a.value.rowsNumber||0:f.value),n=d(()=>{const{page:R,rowsPerPage:x}=a.value;return(R-1)*x}),m=d(()=>{const{page:R,rowsPerPage:x}=a.value;return R*x}),w=d(()=>a.value.page===1),q=d(()=>a.value.rowsPerPage===0?1:Math.max(1,Math.ceil(S.value/a.value.rowsPerPage))),C=d(()=>m.value===0?!0:a.value.page>=q.value),h=d(()=>(i.rowsPerPageOptions.includes(l.value.rowsPerPage)?i.rowsPerPageOptions:[l.value.rowsPerPage].concat(i.rowsPerPageOptions)).map(x=>({label:x===0?v.lang.table.allRows:""+x,value:x})));V(q,(R,x)=>{if(R===x)return;const I=a.value.page;R&&!I?r({page:1}):R<I&&r({page:R})});function _(){r({page:1})}function B(){const{page:R}=a.value;R>1&&r({page:R-1})}function O(){const{page:R,rowsPerPage:x}=a.value;m.value>0&&R*x<S.value&&r({page:R+1})}function F(){r({page:q.value})}return i["onUpdate:pagination"]!==void 0&&c("update:pagination",{...a.value}),{firstRowIndex:n,lastRowIndex:m,isFirstPage:w,isLastPage:C,pagesNumber:q,computedRowsPerPageOptions:h,computedRowsNumber:S,firstPage:_,prevPage:B,nextPage:O,lastPage:F}}const ul={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},cl=["update:selected","selection"];function dl(e,l,a,u){const r=d(()=>{const C={};return e.selected.map(u.value).forEach(h=>{C[h]=!0}),C}),f=d(()=>e.selection!=="none"),i=d(()=>e.selection==="single"),c=d(()=>e.selection==="multiple"),v=d(()=>a.value.length>0&&a.value.every(C=>r.value[u.value(C)]===!0)),S=d(()=>v.value!==!0&&a.value.some(C=>r.value[u.value(C)]===!0)),n=d(()=>e.selected.length);function m(C){return r.value[C]===!0}function w(){l("update:selected",[])}function q(C,h,_,B){l("selection",{rows:h,added:_,keys:C,evt:B});const O=i.value===!0?_===!0?h:[]:_===!0?e.selected.concat(h):e.selected.filter(F=>C.includes(u.value(F))===!1);l("update:selected",O)}return{hasSelectionMode:f,singleSelection:i,multipleSelection:c,allRowsSelected:v,someRowsSelected:S,rowsSelectedNumber:n,isRowSelected:m,clearSelection:w,updateSelection:q}}function Me(e){return Array.isArray(e)?e.slice():[]}const vl={expanded:Array},fl=["update:expanded"];function gl(e,l){const a=M(Me(e.expanded));V(()=>e.expanded,i=>{a.value=Me(i)});function u(i){return a.value.includes(i)}function r(i){e.expanded!==void 0?l("update:expanded",i):a.value=i}function f(i,c){const v=a.value.slice(),S=v.indexOf(i);c===!0?S===-1&&(v.push(i),r(v)):S!==-1&&(v.splice(S,1),r(v))}return{isRowExpanded:u,setExpanded:r,updateExpanded:f}}const bl={visibleColumns:Array};function ml(e,l,a){const u=d(()=>{if(e.columns!==void 0)return e.columns;const c=e.rows[0];return c!==void 0?Object.keys(c).map(v=>({name:v,label:v.toUpperCase(),field:v,align:Se(c[v])?"right":"left",sortable:!0})):[]}),r=d(()=>{const{sortBy:c,descending:v}=l.value;return(e.visibleColumns!==void 0?u.value.filter(n=>n.required===!0||e.visibleColumns.includes(n.name)===!0):u.value).map(n=>{const m=n.align||"right",w=`text-${m}`;return{...n,align:m,__iconClass:`q-table__sort-icon q-table__sort-icon--${m}`,__thClass:w+(n.headerClasses!==void 0?" "+n.headerClasses:"")+(n.sortable===!0?" sortable":"")+(n.name===c?` sorted ${v===!0?"sort-desc":""}`:""),__tdStyle:n.style!==void 0?typeof n.style!="function"?()=>n.style:n.style:()=>null,__tdClass:n.classes!==void 0?typeof n.classes!="function"?()=>w+" "+n.classes:q=>w+" "+n.classes(q):()=>w}})}),f=d(()=>{const c={};return r.value.forEach(v=>{c[v.name]=v}),c}),i=d(()=>e.tableColspan!==void 0?e.tableColspan:r.value.length+(a.value===!0?1:0));return{colList:u,computedCols:r,computedColsMap:f,computedColspan:i}}const ae="q-table__bottom row items-center",Ue={};ze.forEach(e=>{Ue[e]={}});var Cl=N({name:"QTable",props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{default:void 0},...Ue,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...ye,...Jt,...bl,...al,...ol,...vl,...ul,...tl},emits:["request","virtualScroll",...Yt,...fl,...cl],setup(e,{slots:l,emit:a}){const u=Q(),{proxy:{$q:r}}=u,f=he(e,r),{inFullscreen:i,toggleFullscreen:c}=Zt(),v=d(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),S=M(null),n=M(null),m=d(()=>e.grid!==!0&&e.virtualScroll===!0),w=d(()=>" q-table__card"+(f.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),q=d(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":w.value)+(f.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(i.value===!0?" fullscreen scroll":"")),C=d(()=>q.value+(e.loading===!0?" q-table--loading":""));V(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+q.value,()=>{m.value===!0&&n.value!==null&&n.value.reset()});const{innerPagination:h,computedPagination:_,isServerSide:B,requestServerInteraction:O,setPagination:F}=il(u,j),{computedFilterMethod:R}=nl(e,F),{isRowExpanded:x,setExpanded:I,updateExpanded:Ie}=gl(e,a),ne=d(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:s,descending:g}=_.value;return e.filter&&(t=R.value(t,e.filter,D.value,j)),Je.value!==null&&(t=Ye.value(e.rows===t?t.slice():t,s,g)),t}),_e=d(()=>ne.value.length),L=d(()=>{let t=ne.value;if(B.value===!0)return t;const{rowsPerPage:s}=_.value;return s!==0&&(G.value===0&&e.rows!==t?t.length>K.value&&(t=t.slice(0,K.value)):t=t.slice(G.value,K.value)),t}),{hasSelectionMode:E,singleSelection:We,multipleSelection:we,allRowsSelected:Ge,someRowsSelected:qe,rowsSelectedNumber:re,isRowSelected:oe,clearSelection:Ke,updateSelection:W}=dl(e,a,L,v),{colList:Xe,computedCols:D,computedColsMap:Ce,computedColspan:Pe}=ml(e,_,E),{columnToSort:Je,computedSortMethod:Ye,sort:ie}=ll(e,_,Xe,F),{firstRowIndex:G,lastRowIndex:K,isFirstPage:se,isLastPage:ue,pagesNumber:X,computedRowsPerPageOptions:Ze,computedRowsNumber:J,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe}=sl(u,h,_,B,F,_e),et=d(()=>L.value.length===0),tt=d(()=>{const t={};return ze.forEach(s=>{t[s]=e[s]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function lt(){m.value===!0&&n.value.reset()}function at(){if(e.grid===!0)return bt();const t=e.hideHeader!==!0?Be:null;if(m.value===!0){const g=l["top-row"],b=l["bottom-row"],y={default:k=>Re(k.item,l.body,k.index)};if(g!==void 0){const k=o("tbody",g({cols:D.value}));y.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(y.before=t);return b!==void 0&&(y.after=()=>o("tbody",b({cols:D.value}))),o(Gt,{ref:n,class:e.tableClass,style:e.tableStyle,...tt.value,scrollTarget:e.virtualScrollTarget,items:L.value,type:"__qtable",tableColspan:Pe.value,onVirtualScroll:rt},y)}const s=[ot()];return t!==null&&s.unshift(t()),He({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},s)}function nt(t,s){if(n.value!==null){n.value.scrollTo(t,s);return}t=parseInt(t,10);const g=S.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(g!==null){const b=S.value.querySelector(".q-table__middle.scroll"),y=g.offsetTop-e.virtualScrollStickySizeStart,k=y<b.scrollTop?"decrease":"increase";b.scrollTop=y,a("virtualScroll",{index:t,from:0,to:h.value.rowsPerPage-1,direction:k})}}function rt(t){a("virtualScroll",t)}function ke(){return[o(Xt,{class:"q-table__linear-progress",color:e.color,dark:f.value,indeterminate:!0,trackColor:"transparent"})]}function Re(t,s,g){const b=v.value(t),y=oe(b);if(s!==void 0)return s(xe({key:b,row:t,pageIndex:g,__trClass:y?"selected":""}));const k=l["body-cell"],P=D.value.map(T=>{const Z=l[`body-cell-${T.name}`],ee=Z!==void 0?Z:k;return ee!==void 0?ee(it({key:b,row:t,pageIndex:g,col:T})):o("td",{class:T.__tdClass(t),style:T.__tdStyle(t)},j(T,t))});if(E.value===!0){const T=l["body-selection"],Z=T!==void 0?T(st({key:b,row:t,pageIndex:g})):[o(me,{modelValue:y,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(ee,mt)=>{W([b],[t],ee,mt)}})];P.unshift(o("td",{class:"q-table--col-auto-width"},Z))}const $={key:b,class:{selected:y}};return e.onRowClick!==void 0&&($.class["cursor-pointer"]=!0,$.onClick=T=>{a("RowClick",T,t,g)}),e.onRowDblclick!==void 0&&($.class["cursor-pointer"]=!0,$.onDblclick=T=>{a("RowDblclick",T,t,g)}),e.onRowContextmenu!==void 0&&($.class["cursor-pointer"]=!0,$.onContextmenu=T=>{a("RowContextmenu",T,t,g)}),o("tr",$,P)}function ot(){const t=l.body,s=l["top-row"],g=l["bottom-row"];let b=L.value.map((y,k)=>Re(y,t,k));return s!==void 0&&(b=s({cols:D.value}).concat(b)),g!==void 0&&(b=b.concat(g({cols:D.value}))),o("tbody",b)}function xe(t){return ge(t),t.cols=t.cols.map(s=>p({...s},"value",()=>j(s,t.row))),t}function it(t){return ge(t),p(t,"value",()=>j(t.col,t.row)),t}function st(t){return ge(t),t}function ge(t){Object.assign(t,{cols:D.value,colsMap:Ce.value,sort:ie,rowIndex:G.value+t.pageIndex,color:e.color,dark:f.value,dense:e.dense}),E.value===!0&&p(t,"selected",()=>oe(t.key),(s,g)=>{W([t.key],[t.row],s,g)}),p(t,"expand",()=>x(t.key),s=>{Ie(t.key,s)})}function j(t,s){const g=typeof t.field=="function"?t.field(s):s[t.field];return t.format!==void 0?t.format(g,s):g}const A=d(()=>({pagination:_.value,pagesNumber:X.value,isFirstPage:se.value,isLastPage:ue.value,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,inFullscreen:i.value,toggleFullscreen:c}));function ut(){const t=l.top,s=l["top-left"],g=l["top-right"],b=l["top-selection"],y=E.value===!0&&b!==void 0&&re.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return o("div",{class:k},[t(A.value)]);let P;if(y===!0?P=b(A.value).slice():(P=[],s!==void 0?P.push(o("div",{class:"q-table-control"},[s(A.value)])):e.title&&P.push(o("div",{class:"q-table__control"},[o("div",{class:["q-table__title",e.titleClass]},e.title)]))),g!==void 0&&(P.push(o("div",{class:"q-table__separator col"})),P.push(o("div",{class:"q-table__control"},[g(A.value)]))),P.length!==0)return o("div",{class:k},P)}const Te=d(()=>qe.value===!0?null:Ge.value);function Be(){const t=ct();return e.loading===!0&&l.loading===void 0&&t.push(o("tr",{class:"q-table__progress"},[o("th",{class:"relative-position",colspan:Pe.value},ke())])),o("thead",t)}function ct(){const t=l.header,s=l["header-cell"];if(t!==void 0)return t(be({header:!0})).slice();const g=D.value.map(b=>{const y=l[`header-cell-${b.name}`],k=y!==void 0?y:s,P=be({col:b});return k!==void 0?k(P):o(zt,{key:b.name,props:P},()=>b.label)});if(We.value===!0&&e.grid!==!0)g.unshift(o("th",{class:"q-table--col-auto-width"}," "));else if(we.value===!0){const b=l["header-selection"],y=b!==void 0?b(be({})):[o(me,{color:e.color,modelValue:Te.value,dark:f.value,dense:e.dense,"onUpdate:modelValue":Oe})];g.unshift(o("th",{class:"q-table--col-auto-width"},y))}return[o("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},g)]}function be(t){return Object.assign(t,{cols:D.value,sort:ie,colsMap:Ce.value,color:e.color,dark:f.value,dense:e.dense}),we.value===!0&&p(t,"selected",()=>Te.value,Oe),t}function Oe(t){qe.value===!0&&(t=!1),W(L.value.map(v.value),L.value,t)}const Y=d(()=>{const t=[e.iconFirstPage||r.iconSet.table.firstPage,e.iconPrevPage||r.iconSet.table.prevPage,e.iconNextPage||r.iconSet.table.nextPage,e.iconLastPage||r.iconSet.table.lastPage];return r.lang.rtl===!0?t.reverse():t});function dt(){if(e.hideBottom===!0)return;if(et.value===!0){if(e.hideNoData===!0)return;const g=e.loading===!0?e.loadingLabel||r.lang.table.loading:e.filter?e.noResultsLabel||r.lang.table.noResults:e.noDataLabel||r.lang.table.noData,b=l["no-data"],y=b!==void 0?[b({message:g,icon:r.iconSet.table.warning,filter:e.filter})]:[o(Ee,{class:"q-table__bottom-nodata-icon",name:r.iconSet.table.warning}),g];return o("div",{class:ae+" q-table__bottom--nodata"},y)}const t=l.bottom;if(t!==void 0)return o("div",{class:ae},[t(A.value)]);const s=e.hideSelectedBanner!==!0&&E.value===!0&&re.value>0?[o("div",{class:"q-table__control"},[o("div",[(e.selectedRowsLabel||r.lang.table.selectedRecords)(re.value)])])]:[];if(e.hidePagination!==!0)return o("div",{class:ae+" justify-end"},ft(s));if(s.length>0)return o("div",{class:ae},s)}function vt(t){F({page:1,rowsPerPage:t.value})}function ft(t){let s;const{rowsPerPage:g}=_.value,b=e.paginationLabel||r.lang.table.pagination,y=l.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(o("div",{class:"q-table__separator col"})),k===!0&&t.push(o("div",{class:"q-table__control"},[o("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||r.lang.table.recordsPerPage]),o(At,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:g,options:Ze.value,displayValue:g===0?r.lang.table.allRows:g,dark:f.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":vt})])),y!==void 0)s=y(A.value);else if(s=[o("span",g!==0?{class:"q-table__bottom-item"}:{},[g?b(G.value+1,Math.min(K.value,J.value),J.value):b(1,_e.value,J.value)])],g!==0&&X.value>1){const P={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(P.size="sm"),X.value>2&&s.push(o(H,{key:"pgFirst",...P,icon:Y.value[0],disable:se.value,onClick:ce})),s.push(o(H,{key:"pgPrev",...P,icon:Y.value[1],disable:se.value,onClick:de}),o(H,{key:"pgNext",...P,icon:Y.value[2],disable:ue.value,onClick:ve})),X.value>2&&s.push(o(H,{key:"pgLast",...P,icon:Y.value[3],disable:ue.value,onClick:fe}))}return t.push(o("div",{class:"q-table__control"},s)),t}function gt(){const t=e.gridHeader===!0?[o("table",{class:"q-table"},[Be()])]:e.loading===!0&&l.loading===void 0?ke():void 0;return o("div",{class:"q-table__middle"},t)}function bt(){const t=l.item!==void 0?l.item:s=>{const g=s.cols.map(y=>o("div",{class:"q-table__grid-item-row"},[o("div",{class:"q-table__grid-item-title"},[y.label]),o("div",{class:"q-table__grid-item-value"},[y.value])]));if(E.value===!0){const y=l["body-selection"],k=y!==void 0?y(s):[o(me,{modelValue:s.selected,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(P,$)=>{W([s.key],[s.row],P,$)}})];g.unshift(o("div",{class:"q-table__grid-item-row"},k),o(xt,{dark:f.value}))}const b={class:["q-table__grid-item-card"+w.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(b.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(b.onClick=y=>{a("RowClick",y,s.row,s.pageIndex)}),e.onRowDblclick!==void 0&&(b.onDblclick=y=>{a("RowDblclick",y,s.row,s.pageIndex)})),o("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(s.selected===!0?" q-table__grid-item--selected":"")},[o("div",b,g)])};return o("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},L.value.map((s,g)=>t(xe({key:v.value(s),row:s,pageIndex:g}))))}return Object.assign(u.proxy,{requestServerInteraction:O,setPagination:F,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,isRowSelected:oe,clearSelection:Ke,isRowExpanded:x,setExpanded:I,sort:ie,resetVirtualScroll:lt,scrollTo:nt,getCellValue:j}),Rt(u.proxy,{filteredSortedRows:()=>ne.value,computedRows:()=>L.value,computedRowsNumber:()=>J.value}),()=>{const t=[ut()],s={ref:S,class:C.value};return e.grid===!0?t.push(gt()):Object.assign(s,{class:[s.class,e.cardClass],style:e.cardStyle}),t.push(at(),dt()),e.loading===!0&&l.loading!==void 0&&t.push(l.loading()),o("div",s,t)}}});const Sl={props:{title:{type:String,required:!0},show:{type:Boolean,required:!0},fullSize:{type:Boolean,required:!1}},emits:["close"],setup(e,{emit:l}){const a=M(!1),u=()=>{a.value=!1,l("close")};return V(()=>e.show,(r,f)=>{a.value=r}),{confirm:a,close:u}}};function yl(e,l,a,u,r,f){return Bt(),Ot(Nt,{modelValue:u.confirm,"onUpdate:modelValue":l[0]||(l[0]=i=>u.confirm=i),persistent:"","full-width":a.fullSize},{default:te(()=>[le(pt,null,{default:te(()=>[le(Ft,null,{default:te(()=>[le(Vt,null,{default:te(()=>[Dt($t(a.title),1)]),_:1}),Lt(le(H,{flat:"",round:"",dense:"",icon:"close",onClick:u.close},null,8,["onClick"]),[[Qt]])]),_:1}),Mt(e.$slots,"default")]),_:3})]),_:3},8,["modelValue","full-width"])}var Pl=Tt(Sl,[["render",yl]]);export{Pl as A,ql as Q,Cl as a,zt as b};