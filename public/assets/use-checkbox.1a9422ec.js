var D=Object.defineProperty,N=Object.defineProperties;var K=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var I=(a,l,e)=>l in a?D(a,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[l]=e,d=(a,l)=>{for(var e in l||(l={}))L.call(l,e)&&I(a,e,l[e]);if(C)for(var e of C(l))M.call(l,e)&&I(a,e,l[e]);return a},k=(a,l)=>N(a,K(l));import{r as $,B as n,n as g,N as G,al as H,am as i,an as J,q as Q,M as U,ao as W,ap as X,s as Y,aq as Z,t as S}from"./index.c6ab3c0f.js";function ee(a,l){const e=$(null),f=n(()=>a.disable===!0?null:g("span",{ref:e,class:"no-outline",tabindex:-1}));function m(o){const r=l.value;o!==void 0&&o.type.indexOf("key")===0?r!==null&&document.activeElement!==r&&r.contains(document.activeElement)===!0&&r.focus():e.value!==null&&(o===void 0||r!==null&&r.contains(o.target)===!0)&&e.value.focus()}return{refocusTargetEl:f,refocusTarget:m}}var te={xs:30,sm:35,md:40,lg:50,xl:60};const ne=k(d(d(d({},U),W),X),{modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:a=>a==="tf"||a==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]}),re=["update:modelValue"];function ue(a,l){const{props:e,slots:f,emit:m,proxy:o}=Y(),{$q:r}=o,y=G(e,r),h=$(null),{refocusTargetEl:V,refocusTarget:_}=ee(e,h),O=H(e,te),c=n(()=>e.val!==void 0&&Array.isArray(e.modelValue)),b=n(()=>{const t=i(e.val);return c.value===!0?e.modelValue.findIndex(s=>i(s)===t):-1}),u=n(()=>c.value===!0?b.value>-1:i(e.modelValue)===i(e.trueValue)),v=n(()=>c.value===!0?b.value===-1:i(e.modelValue)===i(e.falseValue)),x=n(()=>u.value===!1&&v.value===!1),B=n(()=>e.disable===!0?-1:e.tabindex||0),T=n(()=>`q-${a} cursor-pointer no-outline row inline no-wrap items-center`+(e.disable===!0?" disabled":"")+(y.value===!0?` q-${a}--dark`:"")+(e.dense===!0?` q-${a}--dense`:"")+(e.leftLabel===!0?" reverse":"")),w=n(()=>{const t=u.value===!0?"truthy":v.value===!0?"falsy":"indet",s=e.color!==void 0&&(e.keepColor===!0||(a==="toggle"?u.value===!0:v.value!==!0))?` text-${e.color}`:"";return`q-${a}__inner relative-position non-selectable q-${a}__inner--${t}${s}`}),A=n(()=>{const t={type:"checkbox"};return e.name!==void 0&&Object.assign(t,{"^checked":u.value===!0?"checked":void 0,name:e.name,value:c.value===!0?e.val:e.trueValue}),t}),E=Z(A),P=n(()=>{const t={tabindex:B.value,role:a==="toggle"?"switch":"checkbox","aria-label":e.label,"aria-checked":x.value===!0?"mixed":u.value===!0?"true":"false"};return e.disable===!0&&(t["aria-disabled"]="true"),t});function p(t){t!==void 0&&(S(t),_(t)),e.disable!==!0&&m("update:modelValue",j(),t)}function j(){if(c.value===!0){if(u.value===!0){const t=e.modelValue.slice();return t.splice(b.value,1),t}return e.modelValue.concat([e.val])}if(u.value===!0){if(e.toggleOrder!=="ft"||e.toggleIndeterminate===!1)return e.falseValue}else if(v.value===!0){if(e.toggleOrder==="ft"||e.toggleIndeterminate===!1)return e.trueValue}else return e.toggleOrder!=="ft"?e.trueValue:e.falseValue;return e.indeterminateValue}function z(t){(t.keyCode===13||t.keyCode===32)&&S(t)}function F(t){(t.keyCode===13||t.keyCode===32)&&p(t)}const R=l(u,x);return Object.assign(o,{toggle:p}),()=>{const t=R();e.disable!==!0&&E(t,"unshift",` q-${a}__native absolute q-ma-none q-pa-none`);const s=[g("div",{class:w.value,style:O.value,"aria-hidden":"true"},t)];V.value!==null&&s.push(V.value);const q=e.label!==void 0?J(f.default,[e.label]):Q(f.default);return q!==void 0&&s.push(g("div",{class:`q-${a}__label q-anchor--skip`},q)),g("div",k(d({ref:h,class:T.value},P.value),{onClick:p,onKeydown:z,onKeyup:F}),s)}}export{re as a,ue as b,ee as c,te as o,ne as u};