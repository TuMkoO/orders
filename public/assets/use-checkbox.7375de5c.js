import{r as q,C as l,q as f,O as j,am as z,an as s,ao as F,s as R,N as D,ap as N,aq as K,t as L,ar as M,x as V}from"./index.8f4ba276.js";function G(a,v){const e=q(null),c=l(()=>a.disable===!0?null:f("span",{ref:e,class:"no-outline",tabindex:-1}));function g(u){const n=v.value;u!==void 0&&u.type.indexOf("key")===0?n!==null&&document.activeElement!==n&&n.contains(document.activeElement)===!0&&n.focus():e.value!==null&&(u===void 0||n!==null&&n.contains(u.target)===!0)&&e.value.focus()}return{refocusTargetEl:c,refocusTarget:g}}var H={xs:30,sm:35,md:40,lg:50,xl:60};const Q={...D,...N,...K,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:a=>a==="tf"||a==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},U=["update:modelValue"];function W(a,v){const{props:e,slots:c,emit:g,proxy:u}=L(),{$q:n}=u,C=j(e,n),p=q(null),{refocusTargetEl:k,refocusTarget:I}=G(e,p),S=z(e,H),i=l(()=>e.val!==void 0&&Array.isArray(e.modelValue)),m=l(()=>{const t=s(e.val);return i.value===!0?e.modelValue.findIndex(o=>s(o)===t):-1}),r=l(()=>i.value===!0?m.value>-1:s(e.modelValue)===s(e.trueValue)),d=l(()=>i.value===!0?m.value===-1:s(e.modelValue)===s(e.falseValue)),h=l(()=>r.value===!1&&d.value===!1),$=l(()=>e.disable===!0?-1:e.tabindex||0),y=l(()=>`q-${a} cursor-pointer no-outline row inline no-wrap items-center`+(e.disable===!0?" disabled":"")+(C.value===!0?` q-${a}--dark`:"")+(e.dense===!0?` q-${a}--dense`:"")+(e.leftLabel===!0?" reverse":"")),O=l(()=>{const t=r.value===!0?"truthy":d.value===!0?"falsy":"indet",o=e.color!==void 0&&(e.keepColor===!0||(a==="toggle"?r.value===!0:d.value!==!0))?` text-${e.color}`:"";return`q-${a}__inner relative-position non-selectable q-${a}__inner--${t}${o}`}),_=l(()=>{const t={type:"checkbox"};return e.name!==void 0&&Object.assign(t,{"^checked":r.value===!0?"checked":void 0,name:e.name,value:i.value===!0?e.val:e.trueValue}),t}),T=M(_),w=l(()=>{const t={tabindex:$.value,role:a==="toggle"?"switch":"checkbox","aria-label":e.label,"aria-checked":h.value===!0?"mixed":r.value===!0?"true":"false"};return e.disable===!0&&(t["aria-disabled"]="true"),t});function b(t){t!==void 0&&(V(t),I(t)),e.disable!==!0&&g("update:modelValue",A(),t)}function A(){if(i.value===!0){if(r.value===!0){const t=e.modelValue.slice();return t.splice(m.value,1),t}return e.modelValue.concat([e.val])}if(r.value===!0){if(e.toggleOrder!=="ft"||e.toggleIndeterminate===!1)return e.falseValue}else if(d.value===!0){if(e.toggleOrder==="ft"||e.toggleIndeterminate===!1)return e.trueValue}else return e.toggleOrder!=="ft"?e.trueValue:e.falseValue;return e.indeterminateValue}function B(t){(t.keyCode===13||t.keyCode===32)&&V(t)}function E(t){(t.keyCode===13||t.keyCode===32)&&b(t)}const P=v(r,h);return Object.assign(u,{toggle:b}),()=>{const t=P();e.disable!==!0&&T(t,"unshift",` q-${a}__native absolute q-ma-none q-pa-none`);const o=[f("div",{class:O.value,style:S.value,"aria-hidden":"true"},t)];k.value!==null&&o.push(k.value);const x=e.label!==void 0?F(c.default,[e.label]):R(c.default);return x!==void 0&&o.push(f("div",{class:`q-${a}__label q-anchor--skip`},x)),f("div",{ref:p,class:y.value,...w.value,onClick:b,onKeydown:B,onKeyup:E},o)}}export{U as a,W as b,G as c,H as o,Q as u};
