import{Q as _}from"./QCard.0b892999.js";import{_ as f,u as g,a as v,r as n,o as h,Y as k,Z as O,O as i,w as p,$ as s,g as a,e as c,f as l,d as T}from"./index.555fd96b.js";import{O as y}from"./OrdersTrainingForm.ea1f8d1b.js";import"./ClosePopup.33424c6c.js";import"./use-checkbox.aacafc4d.js";import"./ListenersForm.81200fad.js";import"./use-cache.b0833c75.js";import"./QToggle.13ae7733.js";import"./QCardSection.0836dbef.js";import"./AppModal.af1e84a5.js";import"./array.e8768dd3.js";import"./QCardActions.abef1d6b.js";import"./UsersForm.bcb02c32.js";const $={title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",titleTemplate:o=>`${o} | \u041D\u043E\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438`},x={setup(){g($);const o=v(),r=n(!1),e=o.getters["auth/user"],t=n(!1);return h(async()=>{r.value=!0,e.roles&&(e.roles.includes("admin")||e.roles.includes("god")?t.value=!0:t.value=!1),r.value=!1}),{loading:r,access:t,user:e}},components:{AppPage:k,AppLoader:O,OrdersTrainingForm:y}},A={class:"q-gutter-y-md"},B={class:"q-pa-lg"},C={key:0};function w(o,r,e,t,F,L){const d=s("AppLoader"),m=s("OrdersTrainingForm"),u=s("app-page");return a(),i(u,{title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041D\u041A"},{default:p(()=>[c("div",A,[l(_,null,{default:p(()=>[c("div",B,[t.loading?(a(),T("div",C,[l(d)])):(a(),i(m,{key:1,orderType:"nk"}))])]),_:1})])]),_:1})}var j=f(x,[["render",w]]);export{j as default};