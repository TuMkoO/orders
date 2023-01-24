var w=(t,o,s)=>new Promise((e,p)=>{var m=c=>{try{a(s.next(c))}catch(f){p(f)}},b=c=>{try{a(s.throw(c))}catch(f){p(f)}},a=c=>c.done?e(c.value):Promise.resolve(c.value).then(m,b);a((s=s.apply(t,o)).next())});import{_ as B,a as L,r as y,B as S,o as D,br as j,$ as T,g as d,d as _,e as n,f as l,j as x,w as r,O as q,i as M,ar as v,Q as E,W as C,X as k,bs as H,as as K,at as R,au as z,u as G,Z as W,Y as X}from"./index.c6ab3c0f.js";import{Q}from"./ClosePopup.642a79ff.js";import{A as Y,Q as h,a as Z}from"./AppModal.78b45cc8.js";import{Q as V,a as J}from"./QFab.acf7ba55.js";import"./use-checkbox.1a9422ec.js";import"./QCard.e574469e.js";const $=[{name:"name",required:!0,label:"\u0424\u0418\u041E",align:"left",field:t=>t.listener.firstName+" "+t.listener.secondName[0]+". "+t.listener.lastName[0]+".",format:t=>`${t}`,sortable:!0},{name:"date",align:"left",label:"\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",field:"date",sortable:!0},{name:"companyShortName",align:"left",label:"\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435",field:"companyShortName",sortable:!0},{name:"contract",align:"left",label:"\u0414\u043E\u0433\u043E\u0432\u043E\u0440",field:"contractNumber",sortable:!1},{name:"program",align:"left",label:"\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430",field:"program",sortable:!0},{name:"status",align:"left",label:"\u0421\u0442\u0430\u0442\u0443\u0441",field:"status",sortable:!0},{name:"control",align:"center",label:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435",field:""}],ee=[{name:"name",required:!0,label:"\u0424\u0418\u041E",align:"left",field:t=>t.listener.firstName+" "+t.listener.secondName+" "+t.listener.lastName,format:t=>`${t}`,sortable:!0},{name:"date",align:"left",label:"\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",field:"date",sortable:!0},{name:"program",align:"left",label:"\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430",field:"program",sortable:!0},{name:"status",align:"left",label:"\u0421\u0442\u0430\u0442\u0443\u0441",field:"status",sortable:!0},{name:"control",align:"center",label:"\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435",field:""}],ae={components:{AppModal:Y},setup(){const t=L(),o=y(!1),s=t.getters["auth/user"],e=y(""),p=S(()=>t.getters["orderTraining/orders"]),m=y([]),b=S(()=>t.getters["orderTraining/orders"].filter(u=>e.value?(u.listener.firstName+" "+u.listener.secondName+" "+u.listener.lastName).toLowerCase().includes(e.value.toLowerCase()):!0)),a=y(!1),c=y(""),f=y("");D(()=>{s.roles&&(s.roles.includes("admin")||s.roles.includes("god")?o.value=!0:o.value=!1)});function A(){return w(this,null,function*(){s.roles&&(s.roles.includes("admin")||s.roles.includes("god")?yield t.dispatch("orderTraining/load"):yield t.dispatch("orderTraining/loadByCompany",s.id))})}function F(u,i){a.value=!0,u=="delete"?(c.value="delete",f.value="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438"):u=="send"&&(c.value="send",f.value="\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443")}function N(){a.value=!1,c.value="",f.value=""}function O(u){return w(this,null,function*(){try{yield u.forEach(i=>{const U=i._id,I={type:i.orderType,program:i.program,status:"\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443",date:new Date,listener:i.listener,company:i.company,ownerCompany:i.ownerCompany,ownerListener:i.ownerListener};t.dispatch("orderTraining/update",{value:I,id:U})})}catch(i){}N(),A(),m.value=[]})}function P(u){return w(this,null,function*(){N();for(const i of u)yield t.dispatch("orderTraining/remove",i._id);yield A(),m.value=[]})}return{initialPagination:{sortBy:"status",descending:!0,page:1,rowsPerPage:10},user:s,access:o,columnsAdmin:$,columnsUser:ee,rows:p,filteredRows:b,selected:m,search:e,getSelectedString(){return m.value.length===0?"":`${m.value.length} record${m.value.length>1?"s":""} selected of ${b.value.length}`},modal:a,modalType:c,modalTitle:f,showModal:F,closeModal:N,sendForVerification:O,remove:P,dateFormat:j}}},g=t=>(R("data-v-4c57eba6"),t=t(),z(),t),te={key:0},oe=g(()=>n("p",{class:"text-center"}," \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0430! ",-1)),ne={class:"text-center"},se={key:1},le=g(()=>n("p",{class:"text-center"},"\u0417\u0430\u044F\u0432\u043E\u043A \u043D\u0430 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041D\u041A \u043D\u0435\u0442",-1)),re={class:"text-center"},ce={key:2},de={class:""},ie={class:"text-responsive"},me={class:"text-responsive"},ue={class:"table-nav"},_e={key:0,class:"q-card__section q-card__section--vert"},be={key:1,class:"q-card__section q-card__section--vert"},fe={class:"q-card__actions justify-end q-card__actions--horiz row"},ge=g(()=>n("span",{class:"q-focus-helper"},null,-1)),ye=g(()=>n("span",{class:"q-btn__content text-center col items-center q-anchor--skip justify-center row"},[n("span",{class:"block"},"\u0423\u0434\u0430\u043B\u0438\u0442\u044C")],-1)),pe=[ge,ye],ve=g(()=>n("span",{class:"q-focus-helper"},null,-1)),he=g(()=>n("span",{class:"q-btn__content text-center col items-center q-anchor--skip justify-center row"},[n("span",{class:"block"},"\u0414\u0430")],-1)),we=[ve,he],ke=g(()=>n("span",{class:"q-focus-helper"},null,-1)),qe=g(()=>n("span",{class:"q-btn__content text-center col items-center q-anchor--skip justify-center row"},[n("span",{class:"block"},"\u041E\u0442\u043C\u0435\u043D\u0430")],-1)),Te=[ke,qe];function Ne(t,o,s,e,p,m){const b=T("app-modal");return d(),_("div",null,[!e.access&&(!e.user.id||!e.user.firstName||!e.user.secondName||!e.user.lastName||!e.user.phone||!e.user.email||!e.user.post||!e.user.companyBank||!e.user.companyBik||!e.user.companyDirFirstName||!e.user.companyDirLastName||!e.user.companyDirPost||!e.user.companyDirSecondName||!e.user.companyEmail||!e.user.companyFullName||!e.user.companyGrounds||!e.user.companyInn||!e.user.companyLegalAddressCity||!e.user.companyLegalAddressCode||!e.user.companyLegalAddressHouse||!e.user.companyLegalAddressStreet||!e.user.companyMailAddressCity||!e.user.companyMailAddressCode||!e.user.companyMailAddressHouse||!e.user.companyMailAddressStreet||!e.user.companyOwnershipType||!e.user.companyPayment||!e.user.companyPhone||!e.user.companyShortName)?(d(),_("div",te,[oe,n("div",ne,[l(x,{label:"\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C",type:"button",color:"primary",to:"/profile"})])])):e.rows.length?(d(),_("div",ce,[n("div",de,[l(E,{"bottom-slots":"",modelValue:e.search,"onUpdate:modelValue":o[1]||(o[1]=a=>e.search=a),label:"\u0414\u043B\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E"},{append:r(()=>[e.search!==""?(d(),q(M,{key:0,name:"close",onClick:o[0]||(o[0]=a=>e.search=""),class:"cursor-pointer"})):v("",!0),l(M,{name:"search"})]),_:1},8,["modelValue"])]),l(Z,{rows:e.filteredRows,columns:e.access?e.columnsAdmin:e.columnsUser,"row-key":"_id","selected-rows-label":e.getSelectedString,selection:"multiple",pagination:e.initialPagination,"hide-selected-banner":!0,selected:e.selected,"onUpdate:selected":o[2]||(o[2]=a=>e.selected=a)},{"header-selection":r(a=>[l(Q,{modelValue:a.selected,"onUpdate:modelValue":c=>a.selected=c},null,8,["modelValue","onUpdate:modelValue"])]),"body-selection":r(a=>[l(Q,{modelValue:a.selected,"onUpdate:modelValue":c=>a.selected=c},null,8,["modelValue","onUpdate:modelValue"])]),"body-cell-date":r(a=>[l(h,{props:a},{default:r(()=>[C(k(e.dateFormat(a.row.date)),1)]),_:2},1032,["props"])]),"body-cell-companyShortName":r(a=>[l(h,{props:a},{default:r(()=>[n("div",ie,k(a.row.user.companyShortName),1)]),_:2},1032,["props"])]),"body-cell-contract":r(a=>[l(h,{props:a},{default:r(()=>[C(k(a.row.contractNumber&&a.row.contractDate?a.row.contractNumber+" \u043E\u0442 "+e.dateFormat(a.row.contractDate):"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E"),1)]),_:2},1032,["props"])]),"body-cell-program":r(a=>[l(h,{props:a},{default:r(()=>[n("div",me,k(a.row.program=="vik"?"\u0412\u0418\u041A":a.row.program=="vd"?"\u0412\u0414":a.row.program=="tk"?"\u0422\u041A":a.row.program=="pvk"?"\u041F\u0412\u041A":a.row.program=="pvt"?"\u041F\u0412\u0422":a.row.program=="mk"?"\u041C\u041A":a.row.program=="uk"?"\u0423\u041A":a.row.program=="rk"?"\u0420\u041A":a.row.program=="mi"?"\u041C\u0418":a.row.program=="1s"?"1\u0421":""),1)]),_:2},1032,["props"])]),"body-cell-status":r(a=>[l(h,{props:a},{default:r(()=>[l(H,{color:a.row.status=="\u041F\u0440\u0438\u043D\u044F\u0442\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443"?"primary":a.row.status=="\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0430 \u043D\u0430 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u043A\u0443"?"orange":a.row.status=="\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443"?"purple":a.row.status=="\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430"?"green":a.row.status=="\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430"?"red":a.row.status=="\u0418\u0434\u0451\u0442 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"?"teal":a.row.status=="\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"?"grey":""},{default:r(()=>[C(k(a.row.status),1)]),_:2},1032,["color"])]),_:2},1032,["props"])]),"body-cell-control":r(a=>[l(h,{props:a},{default:r(()=>[n("div",null,[l(x,{class:"bg-primary text-white q-mr-sm",icon:"open_in_new",to:{name:"orderTrainingNK",params:{id:a.row._id}}},null,8,["to"])])]),_:2},1032,["props"])]),_:1},8,["rows","columns","selected-rows-label","pagination","selected"]),n("div",ue,[l(J,{color:"secondary",icon:"more_vert",direction:"up"},{default:r(()=>[l(V,{color:"amber","text-color":"black",icon:"delete",disable:!e.selected.length||e.selected.map(a=>a.status).includes("\u041F\u0440\u0438\u043D\u044F\u0442\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443")&&!e.access||e.selected.map(a=>a.status).includes("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443")&&!e.access||e.selected.map(a=>a.status).includes("\u0418\u0434\u0451\u0442 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435")&&!e.access||e.selected.map(a=>a.status).includes("\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430")&&!e.access||e.selected.map(a=>a.status).includes("\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430")&&!e.access,onClick:o[3]||(o[3]=a=>e.showModal("delete"))},null,8,["disable"]),e.access?v("",!0):(d(),q(V,{key:0,color:"amber","text-color":"black",disable:!e.selected.length||e.selected.map(a=>a.status).includes("\u041F\u0440\u0438\u043D\u044F\u0442\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443")||e.selected.map(a=>a.status).includes("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443")||e.selected.map(a=>a.status).includes("\u0418\u0434\u0451\u0442 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435")||e.selected.map(a=>a.status).includes("\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430")||e.selected.map(a=>a.status).includes("\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430"),onClick:o[4]||(o[4]=a=>e.showModal("send")),icon:"send_and_archive"},null,8,["disable"])),l(V,{color:"amber","text-color":"black",icon:"note_add",to:"/add-order-training-nk"})]),_:1})])])):(d(),_("div",se,[le,n("div",re,[l(x,{label:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",type:"button",color:"primary",to:"/add-order-training-nk"})])])),(d(),q(K,{to:"body"},[l(b,{title:e.modalTitle,show:e.modal,onClose:e.closeModal},{default:r(()=>[e.modalType=="delete"?(d(),_("div",_e," \u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B. \u0412\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435? ")):v("",!0),e.modalType=="send"?(d(),_("div",be," \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443? ")):v("",!0),n("div",fe,[e.modalType=="delete"?(d(),_("button",{key:0,class:"q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-negative q-btn--actionable q-focusable q-hoverable",tabindex:"0",type:"button",onClick:o[5]||(o[5]=a=>e.remove(e.selected))},pe)):v("",!0),e.modalType=="send"?(d(),_("button",{key:1,class:"q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-primary q-btn--actionable q-focusable q-hoverable",tabindex:"0",type:"button",onClick:o[6]||(o[6]=a=>e.sendForVerification(e.selected))},we)):v("",!0),n("button",{class:"q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-positive q-btn--actionable q-focusable q-hoverable",tabindex:"0",type:"button",onClick:o[7]||(o[7]=(...a)=>e.closeModal&&e.closeModal(...a))},Te)])]),_:1},8,["title","show","onClose"])]))])}var xe=B(ae,[["render",Ne],["__scopeId","data-v-4c57eba6"]]);const Ce={title:"\u041F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041D\u041A",titleTemplate:t=>`${t} | \u041D\u043E\u0432\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438`},Ve={setup(){G(Ce);const t=y(!1),o=L();o.getters["orderTraining/orders"];const s=o.getters["auth/user"];return D(()=>w(this,null,function*(){t.value=!0,s.roles.length&&(s.roles.includes("admin")||s.roles.includes("god")?yield o.dispatch("orderTraining/load"):yield o.dispatch("orderTraining/loadByCompany",s.id)),t.value=!1})),{loading:t}},components:{AppLoader:W,AppPage:X,OrdersTrainingTable:xe}},Ae={key:0};function Se(t,o,s,e,p,m){const b=T("AppLoader"),a=T("OrdersTrainingTable"),c=T("app-page");return d(),q(c,{title:"\u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041D\u041A"},{default:r(()=>[n("div",null,[e.loading?(d(),_("div",Ae,[l(b)])):(d(),q(a,{key:1}))])]),_:1})}var Pe=B(Ve,[["render",Se]]);export{Pe as default};