!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{tmT9:function(n,i,c){"use strict";c.r(i),c.d(i,"vehicleInfoDetailModule",function(){return P});var o=c("ofXK"),a=c("TEn/"),l=c("3Pt+"),h=c("mrSG"),r=c("VqLa"),s=c("XqSU"),b=c("0Eai"),u=c("eKwt"),d=c("fXoL"),f=c("tyNb"),v=c("J7/z"),p=c("sYmb"),g=c("tp0D"),S=c("7zfz"),m=c("jIHw"),R=c("Q4Mo"),A=c("1SLH");function I(e,t){if(1&e&&(d.Sb(0,"div"),d.Sb(1,"div",8),d.Sb(2,"ion-avatar",9),d.Nb(3,"ion-icon",10),d.Rb(),d.Sb(4,"ion-label",11),d.Sb(5,"h3"),d.Ec(6),d.Rb(),d.Rb(),d.Rb(),d.Sb(7,"div",12),d.Sb(8,"ion-label"),d.Sb(9,"h2"),d.Ec(10),d.Rb(),d.Sb(11,"h2"),d.Ec(12),d.Rb(),d.Sb(13,"h2"),d.Sb(14,"b"),d.Ec(15),d.Rb(),d.Rb(),d.Sb(16,"p"),d.Ec(17),d.Rb(),d.Rb(),d.Rb(),d.Rb()),2&e){var n=d.cc();d.Ab(6),d.Fc(n.vehicle.alternateVehicleInfo.vehicleColor),d.Ab(4),d.Fc(n.vehicle.alternateVehicleInfo.vehicleType),d.Ab(2),d.Hc("",n.vehicle.alternateVehicleInfo.vehicleBrand," ",n.vehicle.alternateVehicleInfo.vehicleModel," "),d.Ab(3),d.Fc(n.vehicle.alternateVehicleInfo.vehicleNumber),d.Ab(2),d.Gc("Added By : ",n.vehicle.alternateVehicleInfo.addedBy,"")}}function w(e,t){1&e&&(d.Sb(0,"div"),d.Sb(1,"ion-label",11),d.Nb(2,"br"),d.Sb(3,"h3"),d.Ec(4,"Alternate vehicle not available"),d.Rb(),d.Rb(),d.Rb())}function y(e,t){if(1&e&&(d.Sb(0,"h2"),d.Ec(1),d.Rb()),2&e){var n=d.cc().$implicit;d.Ab(1),d.Fc(n.contactName)}}function C(e,t){if(1&e&&(d.Sb(0,"h2"),d.Ec(1),d.Rb()),2&e){var n=d.cc().$implicit;d.Ab(1),d.Fc(n.contactNameInTamil)}}function k(e,t){if(1&e&&(d.Sb(0,"ion-col",28),d.Sb(1,"div"),d.Sb(2,"ion-label",22),d.Cc(3,y,2,1,"h2",23),d.Cc(4,C,2,1,"h2",23),d.Sb(5,"h2"),d.Ec(6),d.Rb(),d.Rb(),d.Rb(),d.Rb()),2&e){var n=t.$implicit,i=d.cc();d.Ab(3),d.jc("ngIf",i.appLanguage&&"en"==i.appLanguage),d.Ab(1),d.jc("ngIf",i.appLanguage&&"ta"==i.appLanguage),d.Ab(2),d.Fc(n.contactMobile)}}var V,E,L=((V=function(){function n(t,i,c,o,a,l,h,r){var s=this;e(this,n),this.router=t,this.activatRoute=i,this.dialogService=c,this.popoverController=o,this.location=a,this.translate=l,this.dbprovider=h,this.messageService=r,this.contactList=[],this.vehicleList=[],this.fullVehicleList=[],this.queryText="",this.appLanguage="ta",this.contactTableName="contact",this.vehicleTableName="vehicle",this.accountTableName="account",this.alternateVehicleTableName="alternateVehicle",this.vehicleContactAssignmentTableName="vehicleContactAssignment",this.appLanguage=this.translate.getDefaultLang(),this.activatRoute.queryParams.subscribe(function(e){console.log(e),e.vehicle&&(s.vehicle=JSON.parse(e.vehicle),s.selectedContactId=e.selectedContactId,console.log(s.vehicle))}),this.items=[{label:"Actions",items:[{label:this.translate.instant("actions.editVehicle"),icon:"pi pi-angle-right",command:function(){s.vehicleEditAction()}},{label:this.translate.instant("actions.contactList"),icon:"pi pi-angle-right",command:function(){s.showAlternateContactList()}},{label:this.translate.instant("actions.alternateVehicleList"),icon:"pi pi-angle-right",command:function(){s.alternateVehicleList()}},{label:this.translate.instant("actions.accountDetail"),icon:"pi pi-angle-right",command:function(){s.accountDetail()}}]}]}var i,c,o;return i=n,(c=[{key:"vehicleEditAction",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("edit vehicle"),this.dialogService.open(u.a,{header:this.translate.instant("vehicleEntry.title"),width:"50%",data:{object:this.selectedVehicle,mode:"edit",contactId:this.selectedContactId}}).onClose.subscribe(function(e){e&&"SUCCESS"==e&&t.fetchVehicle()});case 1:case"end":return e.stop()}},e,this)}))}},{key:"fetchVehicle",value:function(){var e=this,t=this.vehicleTableName+"_2_"+this.vehicle.vehicleInfo.id;console.log(n);var n=[t];this.vehicleList=[],this.dbprovider.fetchDocsWithDocIds(n).then(function(t){console.log(t),"SUCCESS"==t.status&&t.response.length>0?t.response.forEach(function(t){e.fetchAccountAndAdditionalContactInfo(t.id).then(function(n){n.vehicleInfo=t,console.log("result==>",n),e.vehicleList.push(n),e.vehicleList.length>0&&(e.vehicle=e.vehicleList[0])})}):e.vehicleList=[]}).catch(function(t){e.vehicleList=[]})}},{key:"fetchAccountAndAdditionalContactInfo",value:function(e){var t={},n=[];return n.push(this.fetchAccountInfoAgainstVehicle(e).then(function(e){e?(t.rentPlanInfo=e.rentPlan_lookup,delete e.rentPlan_lookup,t.accountInfo=e,console.log(e)):(t.accountInfo={},t.rentPlanInfo={})})),n.push(this.fetchAdditionalContactInfoAgainstVehicle(e).then(function(e){t.additionalContacts=e})),n.push(this.fetchAlternateVehicleInfoAgainstVehicle(e).then(function(e){t.alternateVehicleInfo=e.length>0?e[0]:{}})),Promise.all(n).then(function(e){return console.log(e),t})}},{key:"fetchAccountInfoAgainstVehicle",value:function(e){return this.dbprovider.fetchDocsWithRelationshipUsingFindOption({selector:{"data.vehicle":e,"data.type":this.accountTableName},sort:["data.vehicle"]},!0,{masterandlookupreference:["rentPlan"]}).then(function(e){if(console.log(e),!e||"SUCCESS"!=e.status)return null;if(e.records.length>0){var t=null;return e.records.forEach(function(e){e.closeDate||(t=e)}),t}}).catch(function(e){return null})}},{key:"fetchAdditionalContactInfoAgainstVehicle",value:function(e){var t=this;return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({selector:{"data.vehicle_lookup":e,"data.type":this.vehicleContactAssignmentTableName},sort:["data.vehicle_lookup"]}).then(function(e){if(console.log(e),"SUCCESS"==e.status&&e.records.length>0){var n=e.records.map(function(e){return e.contact_lookup}).map(function(e){return t.contactTableName+"_2_"+e});return t.fetchContactListAgainstVehicle(n)}return[]}).catch(function(e){return[]})}},{key:"fetchContactListAgainstVehicle",value:function(e){console.log(e);var t=[];return this.dbprovider.fetchDocsWithDocIds(e).then(function(e){return console.log(e),"SUCCESS"==e.status&&e.response.length>0?(e.response.forEach(function(e){console.log(e),"others"==e.contactType&&t.push(e)}),t):[]}).catch(function(e){return[]})}},{key:"fetchAlternateVehicleInfoAgainstVehicle",value:function(e){return this.dbprovider.fetchDocsWithoutRelationshipByParentTypeAndId(this.alternateVehicleTableName,this.vehicleTableName,e).then(function(e){return console.log(e),e&&"SUCCESS"==e.status?e.records:null})}},{key:"menuClick",value:function(e){this.selectedVehicle=e.vehicleInfo,console.log("menu click",this.selectedVehicle)}},{key:"alternateVehicleList",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("alternate vehicle detail"),this.dialogService.open(s.a,{header:this.translate.instant("alternateVehicle.title"),width:"50%",data:{vehicle:this.selectedVehicle}}).onClose.subscribe(function(e){t.fetchVehicle()});case 1:case"end":return e.stop()}},e,this)}))}},{key:"accountDetail",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("account detail"),this.dialogService.open(b.a,{header:this.translate.instant("accountDetail.title"),width:"50%",data:{vehicle:this.selectedVehicle}}).onClose.subscribe(function(e){t.fetchVehicle()});case 1:case"end":return e.stop()}},e,this)}))}},{key:"showAlternateContactList",value:function(){return Object(h.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("alternate contact detail"),this.dialogService.open(r.a,{header:this.translate.instant("contactList.title"),width:"50%",data:{vehicle:this.selectedVehicle}}).onClose.subscribe(function(e){t.fetchVehicle()});case 1:case"end":return e.stop()}},e,this)}))}},{key:"backButtonOnclick",value:function(){this.location.back()}}])&&t(i.prototype,c),o&&t(i,o),n}()).\u0275fac=function(e){return new(e||V)(d.Mb(f.g),d.Mb(f.a),d.Mb(v.a),d.Mb(a.F),d.Mb(o.h),d.Mb(p.d),d.Mb(g.a),d.Mb(S.h))},V.\u0275cmp=d.Gb({type:V,selectors:[["vehicleInfoDetail"]],decls:94,vars:65,consts:[["no-border",""],["slot","start"],["slot","start",3,"click"],["name","arrow-back",2,"font-size","30px","color","black"],["size","large",1,"ion-text-center"],[2,"height","100%"],[2,"background-color","white","height","33.3%","width","100%","max-height","200px","min-height","180px"],["size","5.6",2,"height","99%"],[1,"alignleft",2,"text-align","center","width","30%"],[2,"margin","auto"],["name","car-sport-outline",2,"font-size","50px"],[2,"text-align","center"],[1,"alignleft",2,"width","67%"],[1,"vl","alignright"],[1,"alignleft",2,"width","100%","padding-left","10px"],["size","0.8",2,"background-color","white"],["pButton","","pRipple","","type","button","icon","pi pi-ellipsis-v","label","",1,"p-button-rounded","p-button-text",3,"click"],["appendTo","body",3,"popup","model"],["menu",""],[1,"hl"],[2,"height","33.3%","max-height","200px","min-height","180px"],[1,"alignleft",2,"width","97%"],[2,"padding-left","10px"],[4,"ngIf"],[2,"width","100%","height","30%"],[2,"padding-left","4px"],[2,"width","100%","height","70%"],["style","min-width: 25%;max-width: 25%;",4,"ngFor","ngForOf"],[2,"min-width","25%","max-width","25%"]],template:function(e,t){if(1&e){var n=d.Tb();d.Sb(0,"ion-header",0),d.Sb(1,"ion-toolbar"),d.Sb(2,"ion-buttons",1),d.Sb(3,"ion-button",2),d.ac("click",function(){return t.backButtonOnclick()}),d.Sb(4,"h2"),d.Nb(5,"ion-icon",3),d.Rb(),d.Rb(),d.Rb(),d.Sb(6,"ion-title",4),d.Ec(7),d.dc(8,"translate"),d.Rb(),d.Rb(),d.Rb(),d.Sb(9,"ion-content"),d.Sb(10,"ion-grid",5),d.Sb(11,"ion-row",6),d.Sb(12,"ion-col",7),d.Sb(13,"h2"),d.Ec(14),d.dc(15,"translate"),d.Rb(),d.Sb(16,"div"),d.Sb(17,"div",8),d.Sb(18,"ion-avatar",9),d.Nb(19,"ion-icon",10),d.Rb(),d.Sb(20,"ion-label",11),d.Sb(21,"h3"),d.Ec(22),d.Rb(),d.Rb(),d.Rb(),d.Sb(23,"div",12),d.Sb(24,"ion-label"),d.Sb(25,"h2"),d.Ec(26),d.Rb(),d.Sb(27,"h2"),d.Ec(28),d.Rb(),d.Sb(29,"h2"),d.Sb(30,"b"),d.Ec(31),d.Rb(),d.Rb(),d.Sb(32,"p"),d.Ec(33),d.Rb(),d.Rb(),d.Rb(),d.Nb(34,"div",13),d.Rb(),d.Rb(),d.Sb(35,"ion-col",7),d.Sb(36,"h2"),d.Ec(37),d.dc(38,"translate"),d.Rb(),d.Sb(39,"div",14),d.Sb(40,"ion-label"),d.Sb(41,"h2"),d.Ec(42),d.dc(43,"translate"),d.Rb(),d.Sb(44,"h2"),d.Ec(45),d.dc(46,"translate"),d.Rb(),d.Sb(47,"p"),d.Ec(48),d.dc(49,"translate"),d.Rb(),d.Sb(50,"p"),d.Ec(51),d.dc(52,"date"),d.Rb(),d.Rb(),d.Rb(),d.Rb(),d.Sb(53,"ion-col",15),d.Sb(54,"button",16),d.ac("click",function(e){return d.wc(n),d.vc(56).toggle(e),t.menuClick(t.vehicle),e.stopPropagation()}),d.Rb(),d.Nb(55,"p-menu",17,18),d.Rb(),d.Nb(57,"div",19),d.Rb(),d.Sb(58,"ion-row",20),d.Sb(59,"ion-col",7),d.Sb(60,"div"),d.Sb(61,"h2"),d.Ec(62),d.dc(63,"translate"),d.Rb(),d.Sb(64,"div",21),d.Sb(65,"ion-label",22),d.Sb(66,"h2"),d.Ec(67),d.dc(68,"translate"),d.dc(69,"translate"),d.Rb(),d.Sb(70,"h2"),d.Ec(71),d.dc(72,"translate"),d.dc(73,"translate"),d.Rb(),d.Sb(74,"h2"),d.Sb(75,"b"),d.Ec(76),d.dc(77,"translate"),d.dc(78,"translate"),d.Rb(),d.Rb(),d.Rb(),d.Rb(),d.Nb(79,"div",13),d.Rb(),d.Rb(),d.Sb(80,"ion-col",7),d.Sb(81,"h2"),d.Ec(82),d.dc(83,"translate"),d.Rb(),d.Cc(84,I,18,6,"div",23),d.Cc(85,w,5,0,"div",23),d.Rb(),d.Nb(86,"div",19),d.Rb(),d.Sb(87,"ion-row",20),d.Sb(88,"ion-row",24),d.Sb(89,"h2",25),d.Ec(90),d.dc(91,"translate"),d.Rb(),d.Rb(),d.Sb(92,"ion-row",26),d.Cc(93,k,7,3,"ion-col",27),d.Rb(),d.Rb(),d.Rb(),d.Rb()}2&e&&(d.Ab(7),d.Gc(" ",d.ec(8,32,"vehicleSearch.vehicleInfo")," "),d.Ab(7),d.Fc(d.ec(15,34,"contactListWithVehicle.primaryVehicleInfo")),d.Ab(8),d.Fc(t.vehicle.vehicleInfo.vehicleColor),d.Ab(4),d.Fc(t.vehicle.vehicleInfo.vehicleType),d.Ab(2),d.Hc("",t.vehicle.vehicleInfo.vehicleBrand," ",t.vehicle.vehicleInfo.vehicleModel," "),d.Ab(3),d.Fc(t.vehicle.vehicleInfo.vehicleNumber),d.Ab(2),d.Gc("Added By : ",t.vehicle.vehicleInfo.addedBy,""),d.Ab(4),d.Fc(d.ec(38,36,"contactListWithVehicle.accountInfo")),d.Ab(5),d.Hc("",d.ec(43,38,"rentPlanEntry.rentPlanName")," : ",t.vehicle.rentPlanInfo.rentPlan,""),d.Ab(3),d.Hc("",t.vehicle.rentPlanInfo.rentAmount," ",d.ec(46,40,"rs"),""),d.Ab(3),d.Gc("",d.ec(49,42,"contactListWithVehicle.accountOpenDate")," :"),d.Ab(3),d.Fc(d.fc(52,44,t.vehicle.accountInfo.openDate,"dd/MM/yyyy hh:mm a")),d.Ab(4),d.jc("popup",!0)("model",t.items),d.Ab(7),d.Fc(d.ec(63,47,"contactListWithVehicle.outstandingInfo")),d.Ab(5),d.Ic("",d.ec(68,49,"contactListWithVehicle.totalAmount")," : ",t.vehicle.accountInfo.totalBillAmount," ",d.ec(69,51,"rs"),""),d.Ab(4),d.Ic("",d.ec(72,53,"contactListWithVehicle.paidAmount")," : ",t.vehicle.accountInfo.receivedAmount," ",d.ec(73,55,"rs"),""),d.Ab(5),d.Ic("",d.ec(77,57,"contactListWithVehicle.pendingAmount")," : ",t.vehicle.accountInfo.totalBillAmount-t.vehicle.accountInfo.receivedAmount," ",d.ec(78,59,"rs"),""),d.Ab(6),d.Fc(d.ec(83,61,"contactListWithVehicle.alternateVehicleInfo")),d.Ab(2),d.jc("ngIf",t.vehicle.alternateVehicleInfo.vehicleType),d.Ab(1),d.jc("ngIf",!t.vehicle.alternateVehicleInfo.vehicleType),d.Ab(5),d.Fc(d.ec(91,63,"contactListWithVehicle.additionalContactInfo")),d.Ab(3),d.jc("ngForOf",t.vehicle.additionalContacts))},directives:[a.m,a.z,a.d,a.c,a.n,a.y,a.j,a.l,a.v,a.i,a.b,a.q,m.b,R.a,A.a,o.l,o.k],pipes:[p.c,o.e],styles:[".sticky[_ngcontent-%COMP%]{position:-webkit-sticky;top:0;height:60px}.alignleft[_ngcontent-%COMP%]{float:left}.alignright[_ngcontent-%COMP%]{float:right}.vl[_ngcontent-%COMP%]{border-left:1px solid #050505;height:100px}.vl2[_ngcontent-%COMP%]{border-left:1px solid #a09d9d;height:100%}.hl[_ngcontent-%COMP%]{border-top:1px solid #a09d9d;width:100%;height:1px;background-color:#000}.my-button[_ngcontent-%COMP%]{--background:#white;--background-activated:#white}.center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-content:center;align-items:center;width:50%;margin:auto}.container[_ngcontent-%COMP%]{display:flex;flex-direction:row;height:100%;width:100%}.right[_ngcontent-%COMP%]{background-color:#fff;display:block;width:100%;overflow-y:scroll}"]}),V),x=c("7kUa"),N=[{path:"",component:L}],P=((E=function t(){e(this,t)}).\u0275mod=d.Kb({type:E}),E.\u0275inj=d.Jb({factory:function(e){return new(e||E)},imports:[[f.k.forChild(N),o.c,l.f,a.A,x.b,m.c,R.b,A.b,p.b],f.k]}),E)}}])}();