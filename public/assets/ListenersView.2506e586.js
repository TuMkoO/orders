var y=(o,a,s)=>new Promise((e,m)=>{var l=i=>{try{p(s.next(i))}catch(t){m(t)}},b=i=>{try{p(s.throw(i))}catch(t){m(t)}},p=i=>i.done?e(i.value):Promise.resolve(i.value).then(l,b);p((s=s.apply(o,a)).next())});import{_ as U,Z as A,r as f,a as V,B as C,o as F,$ as L,g as r,d as v,f as u,e as n,j as q,w as _,O as w,i as B,ar as g,Q as P,P as j,R as H,W as T,X as x,as as z,at as R,au as D,u as E,Y as O}from"./index.c6ab3c0f.js";import{A as W,Q,a as X,b as Y}from"./AppModal.78b45cc8.js";import{Q as Z}from"./QTr.735eb789.js";import{L as G}from"./ListenersForm.292295dd.js";import"./ClosePopup.642a79ff.js";import"./use-checkbox.1a9422ec.js";import"./QCard.e574469e.js";import"./use-cache.b0833c75.js";import"./QToggle.3555097a.js";import"./QCardSection.d2c13724.js";import"./array.90849054.js";import"./QCardActions.4537712d.js";const J=[{name:"fio",required:!0,label:"\u0424\u0418\u041E",align:"left",field:o=>o.firstName+" "+o.secondName+" "+o.lastName,format:o=>`${o}`,sortable:!0},{name:"post",align:"left",label:"\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",field:"post",sortable:!0},{name:"company",align:"left",label:"\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435",field:"ownerUser",sortable:!0},{name:"phone",align:"left",label:"\u0422\u0435\u043B\u0435\u0444\u043E\u043D",field:"phone",sortable:!0},{name:"email",align:"left",label:"Email",field:"email",sortable:!0},{name:"status",align:"left",label:"\u0421\u0442\u0430\u0442\u0443\u0441",field:"status",sortable:!0},{name:"control",align:"center",label:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435",field:""}],K={components:{AppLoader:A,AppModal:W,ListenersForm:G},setup(){const o=f(!1),a=V(),s=C(()=>a.getters["auth/user"]),e=C(()=>a.getters["auth/users"]),m=f(!1),l=f(""),b=C(()=>a.getters["listener/listeners"]),p=C(()=>a.getters["listener/listeners"].filter(c=>l.value&&!m.value?c.firstName.toLowerCase().includes(l.value.toLowerCase())||c.secondName.toLowerCase().includes(l.value.toLowerCase())||c.lastName.toLowerCase().includes(l.value.toLowerCase())||s.value.companyShortName.toLowerCase().includes(l.value.toLowerCase())||s.value.companyFullName.toLowerCase().includes(l.value.toLowerCase()):l.value&&m.value?c.firstName.toLowerCase().includes(l.value.toLowerCase())||c.secondName.toLowerCase().includes(l.value.toLowerCase())||c.lastName.toLowerCase().includes(l.value.toLowerCase())||s.value.companyShortName.toLowerCase().includes(l.value.toLowerCase())||s.value.companyFullName.toLowerCase().includes(l.value.toLowerCase())||e.value.filter(h=>h._id==c.ownerUser)[0].companyShortName.toLowerCase().includes(l.value.toLowerCase())||e.value.filter(h=>h._id==c.ownerUser)[0].companyFullName.toLowerCase().includes(l.value.toLowerCase()):!0)),i=f(!1),t=f(""),d=f(""),S=f();F(()=>y(this,null,function*(){o.value=!0,s.value.roles.length&&(s.value.roles.includes("admin")||s.value.roles.includes("god")?m.value=!0:m.value=!1),o.value=!1}));const M=()=>y(this,null,function*(){o.value=!0,m.value?yield a.dispatch("listener/load"):yield a.dispatch("listener/loadByCompany",s.value.id),o.value=!1}),I=(c,h)=>y(this,null,function*(){h&&(S.value=yield a.dispatch("listener/loadById",h._id)),c=="delete"?(t.value="delete",d.value="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044F"):c=="add"?(t.value="add",d.value="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0433\u043E \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044F",m.value&&(yield a.dispatch("auth/loadUsers"))):c=="edit"&&(t.value="edit",d.value="\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044F",m.value&&(yield a.dispatch("auth/loadUsers"))),i.value=!0}),N=()=>{i.value=!1,t.value="",d.value=""};return{initialPagination:{sortBy:"fio",descending:!1,page:1,rowsPerPage:10},user:s,users:e,search:l,columns:J,loading:o,rows:b,filteredRows:p,modal:i,modalTitle:d,modalType:t,currentListener:S,showModal:I,closeModal:N,deleteListener:c=>y(this,null,function*(){yield a.dispatch("listener/remove",c),M(),N()}),updateListener:()=>{M(),N()}}}},k=o=>(R("data-v-362dc3ef"),o=o(),D(),o),$={class:"w-100"},ee={key:0},ae={key:1},te=k(()=>n("p",{class:"text-center"},"\u0421\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0438 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u044B",-1)),oe={class:"text-center"},se={key:2},le={class:"row justify-between"},ne={style:{flex:"1"}},re={key:0},ie={class:"text-bold"},de={class:"table-nav"},ce={key:0,class:"q-card__section q-card__section--vert"},ue={key:1,class:"q-card__actions justify-end q-card__actions--horiz row"},me=k(()=>n("span",{class:"q-focus-helper"},null,-1)),pe=k(()=>n("span",{class:"q-btn__content text-center col items-center q-anchor--skip justify-center row"},[n("span",{class:"block"},"\u0423\u0434\u0430\u043B\u0438\u0442\u044C")],-1)),_e=[me,pe],ve=k(()=>n("span",{class:"q-focus-helper"},null,-1)),fe=k(()=>n("span",{class:"q-btn__content text-center col items-center q-anchor--skip justify-center row"},[n("span",{class:"block"},"\u041E\u0442\u043C\u0435\u043D\u0430")],-1)),be=[ve,fe];function we(o,a,s,e,m,l){const b=L("AppLoader"),p=L("ListenersForm"),i=L("app-modal");return r(),v("div",$,[e.loading?(r(),v("div",ee,[u(b)])):!e.loading&&!e.rows.length?(r(),v("div",ae,[te,n("div",oe,[u(q,{label:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",type:"button",color:"primary",onClick:a[0]||(a[0]=t=>e.showModal("add"))})])])):(r(),v("div",se,[n("div",le,[n("div",ne,[u(P,{"bottom-slots":"",modelValue:e.search,"onUpdate:modelValue":a[2]||(a[2]=t=>e.search=t),label:"\u0414\u043B\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044F \u0438\u043B\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F"},{append:_(()=>[e.search!==""?(r(),w(B,{key:0,name:"close",onClick:a[1]||(a[1]=t=>e.search=""),class:"cursor-pointer"})):g("",!0),u(B,{name:"search"})]),_:1},8,["modelValue"])])]),e.user&&e.users&&e.user.companyShortName?(r(),v("div",re,[u(X,{rows:e.filteredRows,columns:e.columns,"row-key":"name",pagination:e.initialPagination},{header:_(t=>[u(Z,{props:t},{default:_(()=>[(r(!0),v(j,null,H(t.cols,d=>(r(),w(Y,{key:d.name,props:t,class:"text-center"},{default:_(()=>[n("span",ie,x(d.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),"body-cell-company":_(t=>[u(Q,{props:t},{default:_(()=>[T(x(t.row.ownerUser==e.user.id?e.user.companyShortName:e.users.map(d=>d).filter(d=>d._id==t.row.ownerUser)[0].companyShortName),1)]),_:2},1032,["props"])]),"body-cell-control":_(t=>[u(Q,{props:t},{default:_(()=>[n("div",null,[u(q,{class:"bg-orange q-mr-sm",icon:"edit_note",onClick:d=>e.showModal("edit",t.row)},null,8,["onClick"]),u(q,{class:"bg-red",icon:"delete",onClick:d=>e.showModal("delete",t.row)},null,8,["onClick"])])]),_:2},1032,["props"])]),_:1},8,["rows","columns","pagination"])])):g("",!0),n("div",de,[u(q,{fab:"",icon:"add",onClick:a[3]||(a[3]=t=>e.showModal("add")),color:"secondary"})])])),(r(),w(z,{to:"body"},[u(i,{title:e.modalTitle,show:e.modal,fullSize:e.modalType!="delete",onClose:e.closeModal},{default:_(()=>[e.modalType=="delete"?(r(),v("div",ce,[T(" \u0421\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044C "),n("b",null,x(e.currentListener.firstName+" "+e.currentListener.secondName+" "+e.currentListener.lastName),1),T(" \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0451\u043D. \u0412\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435? ")])):g("",!0),e.modalType=="delete"?(r(),v("div",ue,[n("button",{class:"q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable",tabindex:"0",type:"button",onClick:a[4]||(a[4]=t=>e.deleteListener(e.currentListener._id))},_e),n("button",{class:"q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-positive q-btn--actionable q-focusable q-hoverable",tabindex:"0",type:"button",onClick:a[5]||(a[5]=(...t)=>e.closeModal&&e.closeModal(...t))},be)])):g("",!0),e.modalType=="add"?(r(),w(p,{key:2,buttonTitle:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",submitType:"add",onSuccess:e.updateListener,onHide:e.closeModal},null,8,["onSuccess","onHide"])):e.modalType=="edit"?(r(),w(p,{key:3,buttonTitle:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",submitType:"update",listener:e.currentListener,onSuccess:e.updateListener,onHide:e.closeModal},null,8,["listener","onSuccess","onHide"])):g("",!0)]),_:1},8,["title","show","fullSize","onClose"])]))])}var he=U(K,[["render",we],["__scopeId","data-v-362dc3ef"]]);const ye={title:"\u0421\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0438",titleTemplate:o=>`${o} | \u041D\u043E\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438`},Le={setup(){E(ye);const o=f(!1),a=V(),s=C(()=>a.getters["auth/user"]);return F(()=>y(this,null,function*(){o.value=!0,s.value.roles.length&&(s.value.roles.includes("admin")||s.value.roles.includes("god")?(yield a.dispatch("listener/load"),yield a.dispatch("auth/loadUsers")):yield a.dispatch("listener/loadByCompany",s.value.id)),o.value=!1})),{loading:o}},components:{AppPage:O,AppLoader:A,ListenersTable:he}},ge={class:"q-gutter-y-md"},Ce={key:0};function ke(o,a,s,e,m,l){const b=L("AppLoader"),p=L("ListenersTable"),i=L("app-page");return r(),w(i,{title:"\u0421\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u0438"},{default:_(()=>[n("div",ge,[e.loading?(r(),v("div",Ce,[u(b)])):(r(),w(p,{key:1}))])]),_:1})}var He=U(Le,[["render",ke]]);export{He as default};