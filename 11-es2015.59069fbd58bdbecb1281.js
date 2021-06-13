(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{vfUr:function(e,i,t){"use strict";t.r(i),t.d(i,"applicationUserListModule",function(){return C});var o=t("ofXK"),s=t("TEn/"),r=t("3Pt+"),a=t("fXoL"),n=t("tyNb"),c=t("27b0"),b=t("tp0D"),l=t("7zfz"),d=t("J7/z"),p=t("Gxio"),u=t("sYmb");let m=(()=>{class e{constructor(e,i,t,o,s,r,a){this.router=e,this.dbconfig=i,this.formBuilder=t,this.dbprovider=o,this.messageService=s,this.ref=r,this.config=a,this.applicationUserObj={},this.tableName="applicationUser",this.savedSuccessMessage="Data saved sucessfully","edit"==a.data.mode?(this.applicationUserObj=JSON.parse(JSON.stringify(a.data.object)),this.applicationUserObj.confirmPassword=a.data.object.password):this.initializeObjects(this.dbconfig.configuration.tableStructure),this.createFormGroup()}initializeObjects(e){this.applicationUserObj=JSON.parse(JSON.stringify(e[this.tableName]))}createFormGroup(){this.formGroup=this.formBuilder.group({applicationUser:this.formBuilder.group({userName:["",r.o.compose([r.o.maxLength(80),r.o.required])],mobile:[""],code:["",r.o.compose([r.o.required])],password:["",r.o.compose([r.o.required])],confirmPassword:["",r.o.compose([r.o.required])]})})}saveAction(){if(this.formGroup.patchValue({applicationUser:{userName:this.applicationUserObj.userName,mobile:this.applicationUserObj.mobile,code:this.applicationUserObj.code,password:this.applicationUserObj.password,confirmPassword:this.applicationUserObj.confirmPassword,userType:"Others"}}),this.formGroup.valid){if(this.applicationUserObj.confirmPassword!=this.applicationUserObj.password)return void this.messageService.add({key:"userEntry",severity:"error",summary:"Password mismatch",detail:"",closable:!0});this.alreadyExistValidation().then(e=>{e?this.messageService.add({key:"userEntry",severity:"error",summary:"Code already exist",detail:"",closable:!0}):(delete this.applicationUserObj.confirmPassword,this.dbprovider.save(this.tableName,this.applicationUserObj).then(e=>{"SUCCESS"==e.status?(this.messageService.add({key:"userEntry",severity:"success",summary:this.savedSuccessMessage,detail:""}),setTimeout(()=>this.ref.close("SUCCESS"),1e3)):this.messageService.add({key:"userEntry",severity:"error",summary:e.message,detail:"",closable:!0})}).catch(e=>{console.log(e),this.messageService.add({key:"userEntry",severity:"error",summary:e,detail:""})}))})}else this.messageService.add({key:"userEntry",severity:"error",summary:"Fill all fields",detail:"",closable:!0})}alreadyExistValidation(){var e=!1;return"edit"==this.config.data.mode&&this.applicationUserObj.code==this.config.data.object.code?Promise.resolve(e):this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({selector:{"data.code":this.applicationUserObj.code,"data.type":this.tableName},sort:["data.code"]}).then(i=>("SUCCESS"==i.status&&i.records.length>0&&(e=!0),e))}}return e.\u0275fac=function(i){return new(i||e)(a.Lb(n.g),a.Lb(c.a),a.Lb(r.b),a.Lb(b.a),a.Lb(l.f),a.Lb(d.d),a.Lb(d.b))},e.\u0275cmp=a.Fb({type:e,selectors:[["applicationUserEntry"]],decls:33,vars:24,consts:[[2,"height","350px"],[2,"height","100%",3,"formGroup"],["lines","full","formGroupName","applicationUser"],["position","floating"],["type","text","formControlName","userName","required","",3,"ngModel","ngModelChange"],["type","number","formControlName","mobile",3,"ngModel","ngModelChange"],["type","number","formControlName","code","required","",3,"ngModel","ngModelChange"],["type","password","formControlName","password","required","",3,"ngModel","ngModelChange"],["type","text","formControlName","confirmPassword","required","",3,"ngModel","ngModelChange"],["type","submit","color","danger","expand","block",3,"click"],["key","userEntry","position","center"]],template:function(e,i){1&e&&(a.Rb(0,"ion-content",0),a.Rb(1,"form",1),a.Rb(2,"ion-item",2),a.Rb(3,"ion-label",3),a.Dc(4),a.cc(5,"translate"),a.Qb(),a.Rb(6,"ion-input",4),a.Zb("ngModelChange",function(e){return i.applicationUserObj.userName=e}),a.Qb(),a.Qb(),a.Rb(7,"ion-item",2),a.Rb(8,"ion-label",3),a.Dc(9),a.cc(10,"translate"),a.Qb(),a.Rb(11,"ion-input",5),a.Zb("ngModelChange",function(e){return i.applicationUserObj.mobile=e}),a.Qb(),a.Qb(),a.Rb(12,"ion-item",2),a.Rb(13,"ion-label",3),a.Dc(14),a.cc(15,"translate"),a.Qb(),a.Rb(16,"ion-input",6),a.Zb("ngModelChange",function(e){return i.applicationUserObj.code=e}),a.Qb(),a.Qb(),a.Rb(17,"ion-item",2),a.Rb(18,"ion-label",3),a.Dc(19),a.cc(20,"translate"),a.Qb(),a.Rb(21,"ion-input",7),a.Zb("ngModelChange",function(e){return i.applicationUserObj.password=e}),a.Qb(),a.Qb(),a.Rb(22,"ion-item",2),a.Rb(23,"ion-label",3),a.Dc(24),a.cc(25,"translate"),a.Qb(),a.Rb(26,"ion-input",8),a.Zb("ngModelChange",function(e){return i.applicationUserObj.confirmPassword=e}),a.Qb(),a.Qb(),a.Rb(27,"ion-row"),a.Rb(28,"ion-col"),a.Rb(29,"ion-button",9),a.Zb("click",function(){return i.saveAction()}),a.Dc(30),a.cc(31,"translate"),a.Qb(),a.Qb(),a.Qb(),a.Qb(),a.Mb(32,"p-toast",10),a.Qb()),2&e&&(a.Ab(1),a.ic("formGroup",i.formGroup),a.Ab(3),a.Ec(a.dc(5,12,"applicationUserEntry.username")),a.Ab(2),a.ic("ngModel",i.applicationUserObj.userName),a.Ab(3),a.Ec(a.dc(10,14,"applicationUserEntry.mobile")),a.Ab(2),a.ic("ngModel",i.applicationUserObj.mobile),a.Ab(3),a.Ec(a.dc(15,16,"applicationUserEntry.code")),a.Ab(2),a.ic("ngModel",i.applicationUserObj.code),a.Ab(3),a.Ec(a.dc(20,18,"applicationUserEntry.password")),a.Ab(2),a.ic("ngModel",i.applicationUserObj.password),a.Ab(3),a.Ec(a.dc(25,20,"applicationUserEntry.confirmpassword")),a.Ab(2),a.ic("ngModel",i.applicationUserObj.confirmPassword),a.Ab(4),a.Ec(a.dc(31,22,"save")))},directives:[s.l,r.p,r.j,r.d,s.q,r.e,s.r,s.p,s.K,r.i,r.c,r.n,s.F,s.x,s.k,s.d,p.a],pipes:[u.c],styles:[""]}),e})();var h=t("8CEF");function f(e,i){1&e&&(a.Rb(0,"div",17),a.Mb(1,"i",18),a.Qb())}function g(e,i){1&e&&(a.Rb(0,"div",17),a.Mb(1,"i",19),a.Qb())}function y(e,i){if(1&e){const e=a.Sb();a.Rb(0,"div",13),a.Zb("click",function(){a.vc(e);const t=i.$implicit;return a.bc().editaction(t)}),a.Rb(1,"div",14),a.Bc(2,f,2,0,"div",15),a.Bc(3,g,2,0,"div",16),a.Rb(4,"div",17),a.Rb(5,"h2"),a.Dc(6),a.Qb(),a.Rb(7,"h3"),a.Dc(8),a.Qb(),a.Rb(9,"ion-label"),a.Dc(10),a.Qb(),a.Qb(),a.Qb(),a.Qb()}if(2&e){const e=i.$implicit;a.Ab(2),a.ic("ngIf","Admin"==e.userType),a.Ab(1),a.ic("ngIf","Admin"!=e.userType),a.Ab(3),a.Fc(" ",e.userName," "),a.Ab(2),a.Fc(" ",e.mobile," "),a.Ab(2),a.Fc(" Code - ",e.code," ")}}let v=(()=>{class e{constructor(e,i,t,o,s,r){this.router=e,this.dialogService=i,this.messageService=t,this.location=o,this.translate=s,this.dbprovider=r,this.users=[],this.tableName="applicationUser",this.fetchData()}fetchData(){this.dbprovider.fetchDocsWithoutRelationshipByType(this.tableName).then(e=>{e&&"SUCCESS"==e.status?this.users=e.records:this.messageService.add({key:"userList",severity:"error",summary:e.message,detail:""})})}backButtonOnclick(){this.location.back()}userAddClick(){console.log("user add"),this.dialogService.open(m,{header:this.translate.instant("applicationUserEntry.title"),width:"40%",data:{object:"",mode:"new"}}).onClose.subscribe(e=>{e&&"SUCCESS"==e&&this.fetchData()})}editaction(e){console.log("edit",e),this.dialogService.open(m,{header:this.translate.instant("rentPlanEntry.title"),width:"40%",data:{object:e,mode:"edit"}}).onClose.subscribe(e=>{e&&"SUCCESS"==e&&this.fetchData()})}}return e.\u0275fac=function(i){return new(i||e)(a.Lb(n.g),a.Lb(d.a),a.Lb(l.f),a.Lb(o.g),a.Lb(u.d),a.Lb(b.a))},e.\u0275cmp=a.Fb({type:e,selectors:[["applicationUserList"]],decls:19,vars:4,consts:[["no-border",""],["slot","start"],["slot","start",3,"click"],["name","arrow-back",2,"font-size","30px","color","black"],["slot","end"],["slot","end",3,"click"],["name","add",2,"font-size","30px","color","black"],["size","large",1,"ion-text-center"],[2,"padding","20px"],["layout","grid",3,"value"],["dv",""],["pTemplate","gridItem"],["key","userList","position","center"],[1,"p-col-12","p-md-4",2,"padding","5px",3,"click"],[1,"p-shadow-5"],["style","padding: 13px;",4,"ngIf"],["style","padding:13px;",4,"ngIf"],[2,"padding","13px"],[1,"pi","pi-user",2,"font-size","4rem"],[1,"pi","pi-id-card",2,"font-size","4rem"]],template:function(e,i){1&e&&(a.Rb(0,"ion-header",0),a.Rb(1,"ion-toolbar"),a.Rb(2,"ion-buttons",1),a.Rb(3,"ion-button",2),a.Zb("click",function(){return i.backButtonOnclick()}),a.Rb(4,"h2"),a.Mb(5,"ion-icon",3),a.Qb(),a.Qb(),a.Qb(),a.Rb(6,"ion-buttons",4),a.Rb(7,"ion-button",5),a.Zb("click",function(){return i.userAddClick()}),a.Rb(8,"h2"),a.Mb(9,"ion-icon",6),a.Qb(),a.Qb(),a.Qb(),a.Rb(10,"ion-title",7),a.Dc(11),a.cc(12,"translate"),a.Qb(),a.Qb(),a.Qb(),a.Rb(13,"ion-content"),a.Rb(14,"div",8),a.Rb(15,"p-dataView",9,10),a.Bc(17,y,11,5,"ng-template",11),a.Qb(),a.Qb(),a.Mb(18,"p-toast",12),a.Qb()),2&e&&(a.Ab(11),a.Fc(" ",a.dc(12,2,"applicationUserList.title")," "),a.Ab(4),a.ic("value",i.users))},directives:[s.n,s.B,s.e,s.d,s.o,s.A,s.l,h.a,l.h,p.a,o.k,s.r],pipes:[u.c],styles:[""]}),e})();var U=t("7kUa"),R=t("jIHw"),Q=t("Q4Mo"),S=t("1SLH");const w=[{path:"",component:v}];let C=(()=>{class e{}return e.\u0275mod=a.Jb({type:e}),e.\u0275inj=a.Ib({factory:function(i){return new(i||e)},imports:[[n.k.forChild(w),o.b,r.f,s.C,U.b,R.c,Q.b,S.b,h.b,d.c,u.b,p.b],n.k]}),e})()}}]);