!function(){function e(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function i(e,i){for(var t=0;t<i.length;t++){var o=i[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,t,o){return t&&i(e.prototype,t),o&&i(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{vfUr:function(i,o,n){"use strict";n.r(o),n.d(o,"applicationUserListModule",function(){return j});var r,a=n("ofXK"),s=n("TEn/"),c=n("3Pt+"),b=n("fXoL"),l=n("tyNb"),p=n("27b0"),d=n("tp0D"),u=n("7zfz"),m=n("J7/z"),f=n("Gxio"),h=n("sYmb"),g=((r=function(){function i(t,o,n,r,a,s){e(this,i),this.router=t,this.dbconfig=o,this.formBuilder=n,this.dbprovider=r,this.messageService=a,this.ref=s,this.applicationUserObj={},this.tableName="applicationUser",this.savedSuccessMessage="Data saved sucessfully",this.initializeObjects(this.dbconfig.configuration.tableStructure),this.createFormGroup()}return t(i,[{key:"initializeObjects",value:function(e){this.applicationUserObj=JSON.parse(JSON.stringify(e.applicationUser))}},{key:"createFormGroup",value:function(){this.formGroup=this.formBuilder.group({applicationUser:this.formBuilder.group({userName:["",c.o.compose([c.o.maxLength(80),c.o.required])],mobile:[""],code:["",c.o.compose([c.o.required])],password:["",c.o.compose([c.o.required])],confirmPassword:["",c.o.compose([c.o.required])]})})}},{key:"saveAction",value:function(){var e=this;if(this.formGroup.patchValue({pfm126493:{userName:this.applicationUserObj.userName,mobile:this.applicationUserObj.mobile,code:this.applicationUserObj.code,password:this.applicationUserObj.password,confirmPassword:this.applicationUserObj.confirmPassword,userType:"Others"}}),this.formGroup.valid){if(this.applicationUserObj.confirmPassword!=this.applicationUserObj.password)return void this.messageService.add({key:"userEntry",severity:"error",summary:"Password mismatch",detail:"",closable:!0});this.alreadyExistValidation().then(function(i){i?e.messageService.add({key:"userEntry",severity:"error",summary:"Code already exist",detail:"",closable:!0}):(delete e.applicationUserObj.confirmPassword,e.dbprovider.save(e.tableName,e.applicationUserObj).then(function(i){"SUCCESS"==i.status?(e.messageService.add({key:"userEntry",severity:"success",summary:e.savedSuccessMessage,detail:""}),setTimeout(function(){return e.ref.close("SUCCESS")},1e3)):e.messageService.add({key:"userEntry",severity:"error",summary:i.message,detail:"",closable:!0})}).catch(function(i){console.log(i),e.messageService.add({key:"userEntry",severity:"error",summary:i,detail:""})}))})}else this.messageService.add({key:"userEntry",severity:"error",summary:"Fill all fields",detail:"",closable:!0})}},{key:"alreadyExistValidation",value:function(){var e=!1;return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({selector:{"data.code":this.applicationUserObj.code,"data.type":this.tableName},sort:["data.code"]}).then(function(i){return"SUCCESS"==i.status&&i.records.length>0&&(e=!0),e})}}]),i}()).\u0275fac=function(e){return new(e||r)(b.Lb(l.g),b.Lb(p.a),b.Lb(c.b),b.Lb(d.a),b.Lb(u.f),b.Lb(m.c))},r.\u0275cmp=b.Fb({type:r,selectors:[["applicationUserEntry"]],decls:33,vars:24,consts:[[2,"height","350px"],[2,"height","100%",3,"formGroup"],["lines","full","formGroupName","applicationUser"],["position","floating"],["type","text","formControlName","userName","required","",3,"ngModel","ngModelChange"],["type","number","formControlName","mobile",3,"ngModel","ngModelChange"],["type","number","formControlName","code","required","",3,"ngModel","ngModelChange"],["type","password","formControlName","password","required","",3,"ngModel","ngModelChange"],["type","text","formControlName","confirmPassword","required","",3,"ngModel","ngModelChange"],["type","submit","color","danger","expand","block",3,"click"],["key","userEntry","position","center"]],template:function(e,i){1&e&&(b.Rb(0,"ion-content",0),b.Rb(1,"form",1),b.Rb(2,"ion-item",2),b.Rb(3,"ion-label",3),b.Cc(4),b.cc(5,"translate"),b.Qb(),b.Rb(6,"ion-input",4),b.Zb("ngModelChange",function(e){return i.applicationUserObj.userName=e}),b.Qb(),b.Qb(),b.Rb(7,"ion-item",2),b.Rb(8,"ion-label",3),b.Cc(9),b.cc(10,"translate"),b.Qb(),b.Rb(11,"ion-input",5),b.Zb("ngModelChange",function(e){return i.applicationUserObj.mobile=e}),b.Qb(),b.Qb(),b.Rb(12,"ion-item",2),b.Rb(13,"ion-label",3),b.Cc(14),b.cc(15,"translate"),b.Qb(),b.Rb(16,"ion-input",6),b.Zb("ngModelChange",function(e){return i.applicationUserObj.code=e}),b.Qb(),b.Qb(),b.Rb(17,"ion-item",2),b.Rb(18,"ion-label",3),b.Cc(19),b.cc(20,"translate"),b.Qb(),b.Rb(21,"ion-input",7),b.Zb("ngModelChange",function(e){return i.applicationUserObj.password=e}),b.Qb(),b.Qb(),b.Rb(22,"ion-item",2),b.Rb(23,"ion-label",3),b.Cc(24),b.cc(25,"translate"),b.Qb(),b.Rb(26,"ion-input",8),b.Zb("ngModelChange",function(e){return i.applicationUserObj.confirmPassword=e}),b.Qb(),b.Qb(),b.Rb(27,"ion-row"),b.Rb(28,"ion-col"),b.Rb(29,"ion-button",9),b.Zb("click",function(){return i.saveAction()}),b.Cc(30),b.cc(31,"translate"),b.Qb(),b.Qb(),b.Qb(),b.Qb(),b.Mb(32,"p-toast",10),b.Qb()),2&e&&(b.Ab(1),b.hc("formGroup",i.formGroup),b.Ab(3),b.Dc(b.dc(5,12,"applicationUserEntry.username")),b.Ab(2),b.hc("ngModel",i.applicationUserObj.userName),b.Ab(3),b.Dc(b.dc(10,14,"applicationUserEntry.mobile")),b.Ab(2),b.hc("ngModel",i.applicationUserObj.mobile),b.Ab(3),b.Dc(b.dc(15,16,"applicationUserEntry.code")),b.Ab(2),b.hc("ngModel",i.applicationUserObj.code),b.Ab(3),b.Dc(b.dc(20,18,"applicationUserEntry.password")),b.Ab(2),b.hc("ngModel",i.applicationUserObj.password),b.Ab(3),b.Dc(b.dc(25,20,"applicationUserEntry.confirmpassword")),b.Ab(2),b.hc("ngModel",i.applicationUserObj.confirmPassword),b.Ab(4),b.Dc(b.dc(31,22,"save")))},directives:[s.l,c.p,c.j,c.d,s.q,c.e,s.r,s.p,s.K,c.i,c.c,c.n,s.F,s.x,s.k,s.d,f.a],pipes:[h.c],styles:[""]}),r),y=n("8CEF");function v(e,i){1&e&&(b.Rb(0,"div",17),b.Mb(1,"i",18),b.Qb())}function U(e,i){1&e&&(b.Rb(0,"div",17),b.Mb(1,"i",19),b.Qb())}function C(e,i){if(1&e&&(b.Rb(0,"div",13),b.Rb(1,"div",14),b.Ac(2,v,2,0,"div",15),b.Ac(3,U,2,0,"div",16),b.Rb(4,"div",17),b.Rb(5,"h2"),b.Cc(6),b.Qb(),b.Rb(7,"h3"),b.Cc(8),b.Qb(),b.Rb(9,"ion-label"),b.Cc(10),b.Qb(),b.Qb(),b.Qb(),b.Qb()),2&e){var t=i.$implicit;b.Ab(2),b.hc("ngIf","Admin"==t.userType),b.Ab(1),b.hc("ngIf","Admin"!=t.userType),b.Ab(3),b.Ec(" ",t.userName," "),b.Ab(2),b.Ec(" ",t.mobile," "),b.Ab(2),b.Ec(" Code - ",t.code," ")}}var R,k,Q=((R=function(){function i(t,o,n,r,a,s){e(this,i),this.router=t,this.dialogService=o,this.messageService=n,this.location=r,this.translate=a,this.dbprovider=s,this.users=[],this.tableName="applicationUser",this.fetchData()}return t(i,[{key:"fetchData",value:function(){var e=this;this.dbprovider.fetchDocsWithoutRelationshipByType(this.tableName).then(function(i){i&&"SUCCESS"==i.status?e.users=i.records:e.messageService.add({key:"userList",severity:"error",summary:i.message,detail:""})})}},{key:"backButtonOnclick",value:function(){this.location.back()}},{key:"userAddClick",value:function(){var e=this;console.log("user add"),this.dialogService.open(g,{header:this.translate.instant("applicationUserEntry.title"),width:"40%"}).onClose.subscribe(function(i){i&&"SUCCESS"==i&&e.fetchData()})}}]),i}()).\u0275fac=function(e){return new(e||R)(b.Lb(l.g),b.Lb(m.a),b.Lb(u.f),b.Lb(a.g),b.Lb(h.d),b.Lb(d.a))},R.\u0275cmp=b.Fb({type:R,selectors:[["applicationUserList"]],decls:19,vars:4,consts:[["no-border",""],["slot","start"],["slot","start",3,"click"],["name","arrow-back",2,"font-size","30px","color","black"],["slot","end"],["slot","end",3,"click"],["name","add",2,"font-size","30px","color","black"],["size","large",1,"ion-text-center"],[2,"padding","20px"],["layout","grid",3,"value"],["dv",""],["pTemplate","gridItem"],["key","userList","position","center"],[1,"p-col-12","p-md-4",2,"padding","5px"],[1,"p-shadow-5"],["style","padding: 13px;",4,"ngIf"],["style","padding:13px;",4,"ngIf"],[2,"padding","13px"],[1,"pi","pi-user",2,"font-size","4rem"],[1,"pi","pi-id-card",2,"font-size","4rem"]],template:function(e,i){1&e&&(b.Rb(0,"ion-header",0),b.Rb(1,"ion-toolbar"),b.Rb(2,"ion-buttons",1),b.Rb(3,"ion-button",2),b.Zb("click",function(){return i.backButtonOnclick()}),b.Rb(4,"h2"),b.Mb(5,"ion-icon",3),b.Qb(),b.Qb(),b.Qb(),b.Rb(6,"ion-buttons",4),b.Rb(7,"ion-button",5),b.Zb("click",function(){return i.userAddClick()}),b.Rb(8,"h2"),b.Mb(9,"ion-icon",6),b.Qb(),b.Qb(),b.Qb(),b.Rb(10,"ion-title",7),b.Cc(11),b.cc(12,"translate"),b.Qb(),b.Qb(),b.Qb(),b.Rb(13,"ion-content"),b.Rb(14,"div",8),b.Rb(15,"p-dataView",9,10),b.Ac(17,C,11,5,"ng-template",11),b.Qb(),b.Qb(),b.Mb(18,"p-toast",12),b.Qb()),2&e&&(b.Ab(11),b.Ec(" ",b.dc(12,2,"applicationUserList.title")," "),b.Ab(4),b.hc("value",i.users))},directives:[s.n,s.B,s.e,s.d,s.o,s.A,s.l,y.a,u.h,f.a,a.k,s.r],pipes:[h.c],styles:[""]}),R),w=n("7kUa"),S=n("jIHw"),O=n("Q4Mo"),M=n("1SLH"),A=[{path:"",component:Q}],j=((k=function i(){e(this,i)}).\u0275mod=b.Jb({type:k}),k.\u0275inj=b.Ib({factory:function(e){return new(e||k)},imports:[[l.k.forChild(A),a.b,c.f,s.C,w.b,S.c,O.b,M.b,y.b,m.b,h.b,f.b],l.k]}),k)}}])}();