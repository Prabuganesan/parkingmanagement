(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{koon:function(e,t,n){"use strict";n.r(t),n.d(t,"startupModule",function(){return y});var i=n("ofXK"),o=n("TEn/"),s=n("3Pt+"),r=n("fXoL"),c=n("tyNb"),a=n("fU03"),l=n("7zfz"),d=n("tp0D"),p=n("/RsI"),g=n("7kUa"),h=n("Gxio"),u=n("jIHw");function m(e,t){if(1&e){const e=r.Tb();r.Sb(0,"div",11),r.Sb(1,"div",12),r.ac("click",function(){r.wc(e);const n=t.$implicit;return r.cc().openMenu(n)}),r.Sb(2,"div",13),r.Nb(3,"ion-icon",14),r.Rb(),r.Sb(4,"span",15),r.Ec(5),r.Rb(),r.Rb(),r.Rb()}if(2&e){const e=t.$implicit;r.Ab(5),r.Fc(e.userName)}}function b(e,t){if(1&e){const e=r.Tb();r.Sb(0,"p-button",16),r.ac("click",function(){return r.wc(e),r.cc().login()}),r.Rb()}}const f=function(){return{width:"300px"}},v=[{path:"",component:(()=>{class e{constructor(e,t,n,i){this.router=e,this.util=t,this.messageService=n,this.dbprovider=i,this.display=!1,this.password="",this.userTableName="applicationUser",this.loginActivityTableName="loginActivities",this.users=[],i.oneTimeReplicationFromServer().then(e=>{console.log(e),e.ok||(console.log("Replication failed, Please up the server"),this.messageService.add({key:"startup",severity:"error",summary:"Replication failed, Please up the server",detail:"",closable:!0})),this.dbprovider.startSync(),this.createViewDoc(),this.createFirstAdmin()}).catch(e=>{console.log("Replication failed, Please up the server"),this.messageService.add({key:"startup",severity:"error",summary:"Replication failed, Please up the server",detail:"",closable:!0}),this.dbprovider.startSync(),this.createViewDoc(),this.createFirstAdmin()})}openMenu(e){console.log(e),this.display=!0,this.selectedUser=e}login(){this.selectedUser.password==this.password?(this.util.userId=this.selectedUser.code,this.util.loggedUserInfo=this.selectedUser,this.addLoginActivity().then(e=>{e?(this.insertLocalDoc(),setTimeout(()=>this.router.navigate(["/menu"]),300)):this.messageService.add({key:"startup",severity:"error",summary:"Login activity tracking failed",detail:"",closable:!0}),this.display=!1}),this.password=""):(this.messageService.add({key:"startup",severity:"error",summary:"Invalid password",detail:"",closable:!0}),this.display=!1,this.password="")}ionViewWillEnter(){console.log("view"),this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records)})}insertLocalDoc(){this.dbprovider.insertLocalDoc({_id:"_local/loginInfo",userId:this.util.userId,loggedUserInfo:this.util.loggedUserInfo,loggedUserActivity:this.util.loggedUserActivityInfo})}fetchLocalDoc(){this.dbprovider.getLocalDoc("_local/loginInfo").then(e=>{console.log(e)})}addLoginActivity(){const e=(new Date).getTime();var t=!1;return this.dbprovider.save(this.loginActivityTableName,{inTime:e,outTime:null,applicationUser:this.selectedUser.id}).then(e=>{if("SUCCESS"==e.status)return t=!0,this.dbprovider.fetchDocWithoutRelationshipByTypeAndId(this.loginActivityTableName,e.id).then(e=>(console.log("resss=",e),"SUCCESS"==e.status&&e.records&&e.records.length>0&&(this.util.loggedUserActivityInfo=e.records[0]),t))}).catch(e=>t)}createFirstAdmin(){this.fetchUserData().then(e=>{var t=!1;e.records&&e.records.length>0&&e.records.forEach(e=>{"Admin"==e.userType&&(t=!0)}),console.log(t),0==t?(this.util.userId=1,this.dbprovider.save(this.userTableName,{userName:"Shunmu",mobile:9841163959,code:1,userType:"Admin",password:"shunmu"}).then(e=>{console.log("result",e),"SUCCESS"==e.status?this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records)}):this.messageService.add({key:"startup",severity:"error",summary:"First time user creation failed",detail:"",closable:!0})}).catch(e=>{this.messageService.add({key:"startup",severity:"error",summary:"First time user creation failed",detail:""})})):this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records,this.dbprovider.getLocalDoc("_local/loginInfo").then(e=>{"SUCCESS"==e.status&&(console.log(e),this.util.userId=e.response.userId,this.util.loggedUserInfo=e.response.loggedUserInfo,this.util.loggedUserActivityInfo=e.response.loggedUserActivity,setTimeout(()=>this.router.navigate(["/menu"]),300))}))})})}fetchUserData(){return this.dbprovider.fetchDocsWithoutRelationshipByType(this.userTableName).then(e=>e&&"SUCCESS"==e.status?e:[]).catch(e=>(this.messageService.add({key:"startup",severity:"error",summary:"User fetching failed",detail:""}),[]))}createViewDoc(){this.dbprovider.saveDdoc({_id:"_design/billIndex",views:{billIndex:{map:"function (doc) {var month;if (doc.data.billMonth < 10) { month = '0' + doc.data.billMonth;} else {month = doc.data.billMonth;} emit(doc.data.account+'-'+doc.data.billYear+'-'+month) }"}}}).then(e=>{console.log("index",e)}).catch(e=>{console.log("index error",e)})}}return e.\u0275fac=function(t){return new(t||e)(r.Mb(c.g),r.Mb(a.a),r.Mb(l.h),r.Mb(d.a))},e.\u0275cmp=r.Gb({type:e,selectors:[["startup"]],decls:13,vars:10,consts:[[1,"auth-form","background",3,"fullscreen"],["size","large",1,"ion-text-center",2,"height","50px","font-size","22px"],[1,"pm-landing-page"],[1,"pm-startup-bg"],["src","../../../assets/parking.jpg","alt","parking"],[1,"pm-startup-ulist"],["class","pm-l-p",4,"ngFor","ngForOf"],["header","Enter password",3,"visible","modal","responsive","appendTo","visibleChange"],["pInputText","","type","text","placeholder"," Password",3,"ngModel","ngModelChange"],["pTemplate","footer"],["key","startup","position","bottom-center"],[1,"pm-l-p"],[1,"pm-l-p-s",3,"click"],[1,"pm-u-icon-p"],["name","person",1,"pm-u-icon"],[1,"pm-truncate","pm-width-option"],["icon","pi pi-check","label","Login",1,"p-button-text",3,"click"]],template:function(e,t){1&e&&(r.Sb(0,"ion-content",0),r.Sb(1,"div"),r.Sb(2,"ion-title",1),r.Ec(3," Parking management "),r.Rb(),r.Rb(),r.Sb(4,"div",2),r.Sb(5,"div",3),r.Nb(6,"img",4),r.Rb(),r.Sb(7,"div",5),r.Cc(8,m,6,1,"div",6),r.Rb(),r.Rb(),r.Sb(9,"p-dialog",7),r.ac("visibleChange",function(e){return t.display=e}),r.Sb(10,"ion-input",8),r.ac("ngModelChange",function(e){return t.password=e}),r.Rb(),r.Cc(11,b,1,0,"ng-template",9),r.Rb(),r.Nb(12,"p-toast",10),r.Rb()),2&e&&(r.jc("fullscreen",!0),r.Ab(8),r.jc("ngForOf",t.users),r.Ab(1),r.Ac(r.lc(9,f)),r.jc("visible",t.display)("modal",!0)("responsive",!0)("appendTo","body"),r.Ab(1),r.jc("ngModel",t.password))},directives:[o.k,o.z,i.k,p.a,o.p,o.K,g.a,s.i,s.l,l.j,h.a,o.o,u.a],styles:['.divider[_ngcontent-%COMP%]{display:flex}.divider[_ngcontent-%COMP%]:after, .divider[_ngcontent-%COMP%]:before{content:"";flex:1}.line[_ngcontent-%COMP%]{align-items:center;margin:1em -1em;color:#ccc}.line[_ngcontent-%COMP%]:after, .line[_ngcontent-%COMP%]:before{height:1px;margin:0 1em}.one-line[_ngcontent-%COMP%]:after, .one-line[_ngcontent-%COMP%]:before{background:#ccc}.auth-form[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%], .auth-form[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{height:50%;justify-content:center}.already[_ngcontent-%COMP%]{display:block;text-align:center;padding-bottom:10px}.circle[_ngcontent-%COMP%]{width:50%;height:50%;background:#0ff;border:5px solid #00f}.circleBase[_ngcontent-%COMP%]{border-radius:50%}ion-content[_ngcontent-%COMP%]{--background:#fff}ion-title[_ngcontent-%COMP%]{color:#000}.pm-landing-page[_ngcontent-%COMP%]{display:inline-flex;width:100%;height:calc(100% - 50px);align-items:center;overflow:hidden}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-bg[_ngcontent-%COMP%]{width:60%}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]{width:40%;display:inline-flex;flex-direction:column;height:100%;justify-content:center;overflow-x:hidden;overflow-y:auto}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-l-p[_ngcontent-%COMP%]{background:#acacac;display:inline-flex;width:calc(100% - 90px);padding:10px;border-radius:5px;margin:10px;box-shadow:0 2px 8px 0 rgba(99,99,99,.2)}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-l-p[_ngcontent-%COMP%]   .pm-l-p-s[_ngcontent-%COMP%]{display:inline-flex;align-items:center;width:100%}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-l-p[_ngcontent-%COMP%]   .pm-l-p-s[_ngcontent-%COMP%]   .pm-u-icon-p[_ngcontent-%COMP%]{background:#909090;border-radius:500px;height:50px;width:50px;display:inline-flex;align-items:center;justify-content:center;margin-right:10px}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-l-p[_ngcontent-%COMP%]   .pm-l-p-s[_ngcontent-%COMP%]   .pm-u-icon-p[_ngcontent-%COMP%]   .pm-u-icon[_ngcontent-%COMP%], .pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-l-p[_ngcontent-%COMP%]   .pm-l-p-s[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:26px}.pm-landing-page[_ngcontent-%COMP%]   .pm-startup-ulist[_ngcontent-%COMP%]   .pm-width-option[_ngcontent-%COMP%]{width:calc(100% - 60px)}']}),e})()}];let y=(()=>{class e{}return e.\u0275mod=r.Kb({type:e}),e.\u0275inj=r.Jb({factory:function(t){return new(t||e)},imports:[[c.k.forChild(v),i.c,s.f,o.B,p.b,u.c,g.b,h.b],c.k]}),e})()}}]);