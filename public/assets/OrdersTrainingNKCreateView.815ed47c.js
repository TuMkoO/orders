var m=(r,s,e)=>new Promise((o,n)=>{var d=t=>{try{a(e.next(t))}catch(p){n(p)}},i=t=>{try{a(e.throw(t))}catch(p){n(p)}},a=t=>t.done?o(t.value):Promise.resolve(t.value).then(d,i);a((e=e.apply(r,s)).next())});import{Q as h}from"./QCard.e574469e.js";import{_ as k,u as O,a as T,r as u,o as y,Y as $,Z as x,O as _,w as f,$ as c,g as l,e as g,f as v,d as A}from"./index.c6ab3c0f.js";import{O as B}from"./OrdersTrainingForm.4d71a634.js";import"./ClosePopup.642a79ff.js";import"./use-checkbox.1a9422ec.js";import"./ListenersForm.292295dd.js";import"./use-cache.b0833c75.js";import"./QToggle.3555097a.js";import"./QCardSection.d2c13724.js";import"./AppModal.78b45cc8.js";import"./array.90849054.js";import"./QCardActions.4537712d.js";import"./UsersForm.9fe15f73.js";const C={title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",titleTemplate:r=>`${r} | \u041D\u043E\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438`},w={setup(){O(C);const r=T(),s=u(!1),e=r.getters["auth/user"],o=u(!1);return y(()=>m(this,null,function*(){s.value=!0,e.roles&&(e.roles.includes("admin")||e.roles.includes("god")?o.value=!0:o.value=!1),s.value=!1})),{loading:s,access:o,user:e}},components:{AppPage:$,AppLoader:x,OrdersTrainingForm:B}},F={class:"q-gutter-y-md"},L={class:"q-pa-lg"},N={key:0};function V(r,s,e,o,n,d){const i=c("AppLoader"),a=c("OrdersTrainingForm"),t=c("app-page");return l(),_(t,{title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041D\u041A"},{default:f(()=>[g("div",F,[v(h,null,{default:f(()=>[g("div",L,[o.loading?(l(),A("div",N,[v(i)])):(l(),_(a,{key:1,orderType:"nk"}))])]),_:1})])]),_:1})}var H=k(w,[["render",V]]);export{H as default};