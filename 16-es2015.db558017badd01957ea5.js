(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{koon:function(e,t,i){"use strict";i.r(t),i.d(t,"startupModule",function(){return y});var s=i("ofXK"),o=i("TEn/"),r=i("3Pt+"),n=i("fXoL"),c=i("tyNb"),a=i("fU03"),l=i("7zfz"),d=i("tp0D"),h=i("/RsI"),u=i("7kUa"),g=i("Gxio"),p=i("jIHw");function b(e,t){if(1&e){const e=n.Tb();n.Sb(0,"ion-col"),n.Sb(1,"div",7),n.ac("click",function(){n.wc(e);const i=t.$implicit;return n.cc().openMenu(i)}),n.Nb(2,"ion-icon",8),n.Sb(3,"h3",9),n.Ec(4),n.Rb(),n.Rb(),n.Rb()}if(2&e){const e=t.$implicit;n.Ab(4),n.Fc(e.userName)}}function m(e,t){if(1&e){const e=n.Tb();n.Sb(0,"p-button",10),n.ac("click",function(){return n.wc(e),n.cc().login()}),n.Rb()}}const f=function(){return{width:"300px"}},v=[{path:"",component:(()=>{class e{constructor(e,t,i,s){this.router=e,this.util=t,this.messageService=i,this.dbprovider=s,this.display=!1,this.password="",this.userTableName="applicationUser",this.loginActivityTableName="loginActivities",this.users=[],s.oneTimeReplicationFromServer().then(e=>{console.log(e),e.ok||(console.log("Replication failed, Please up the server"),this.messageService.add({key:"startup",severity:"error",summary:"Replication failed, Please up the server",detail:"",closable:!0})),this.dbprovider.startSync(),this.createViewDoc(),this.createFirstAdmin()}).catch(e=>{console.log("Replication failed, Please up the server"),this.messageService.add({key:"startup",severity:"error",summary:"Replication failed, Please up the server",detail:"",closable:!0}),this.dbprovider.startSync(),this.createViewDoc(),this.createFirstAdmin()})}openMenu(e){console.log(e),this.display=!0,this.selectedUser=e}login(){this.selectedUser.password==this.password?(this.util.userId=this.selectedUser.code,this.util.loggedUserInfo=this.selectedUser,this.addLoginActivity().then(e=>{e?(this.insertLocalDoc(),setTimeout(()=>this.router.navigate(["/menu"]),300)):this.messageService.add({key:"startup",severity:"error",summary:"Login activity tracking failed",detail:"",closable:!0}),this.display=!1}),this.password=""):(this.messageService.add({key:"startup",severity:"error",summary:"Invalid password",detail:"",closable:!0}),this.display=!1,this.password="")}ionViewWillEnter(){console.log("view"),this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records)})}insertLocalDoc(){this.dbprovider.insertLocalDoc({_id:"_local/loginInfo",userId:this.util.userId,loggedUserInfo:this.util.loggedUserInfo,loggedUserActivity:this.util.loggedUserActivityInfo})}fetchLocalDoc(){this.dbprovider.getLocalDoc("_local/loginInfo").then(e=>{console.log(e)})}addLoginActivity(){const e=(new Date).getTime();var t=!1;return this.dbprovider.save(this.loginActivityTableName,{inTime:e,outTime:null,applicationUser:this.selectedUser.id}).then(e=>{if("SUCCESS"==e.status)return t=!0,this.dbprovider.fetchDocWithoutRelationshipByTypeAndId(this.loginActivityTableName,e.id).then(e=>(console.log("resss=",e),"SUCCESS"==e.status&&e.records&&e.records.length>0&&(this.util.loggedUserActivityInfo=e.records[0]),t))}).catch(e=>t)}createFirstAdmin(){this.fetchUserData().then(e=>{var t=!1;e.records&&e.records.length>0&&e.records.forEach(e=>{"Admin"==e.userType&&(t=!0)}),console.log(t),0==t?(this.util.userId=1,this.dbprovider.save(this.userTableName,{userName:"Shunmu",mobile:9841163959,code:1,userType:"Admin",password:"shunmu"}).then(e=>{console.log("result",e),"SUCCESS"==e.status?this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records)}):this.messageService.add({key:"startup",severity:"error",summary:"First time user creation failed",detail:"",closable:!0})}).catch(e=>{this.messageService.add({key:"startup",severity:"error",summary:"First time user creation failed",detail:""})})):this.fetchUserData().then(e=>{e.records&&e.records.length>0&&(this.users=e.records,this.dbprovider.getLocalDoc("_local/loginInfo").then(e=>{"SUCCESS"==e.status&&(console.log(e),this.util.userId=e.response.userId,this.util.loggedUserInfo=e.response.loggedUserInfo,this.util.loggedUserActivityInfo=e.response.loggedUserActivity,setTimeout(()=>this.router.navigate(["/menu"]),300))}))})})}fetchUserData(){return this.dbprovider.fetchDocsWithoutRelationshipByType(this.userTableName).then(e=>e&&"SUCCESS"==e.status?e:[]).catch(e=>(this.messageService.add({key:"startup",severity:"error",summary:"User fetching failed",detail:""}),[]))}createViewDoc(){this.dbprovider.saveDdoc({_id:"_design/billIndex",views:{billIndex:{map:"function (doc) {var month;if (doc.data.billMonth < 10) { month = '0' + doc.data.billMonth;} else {month = doc.data.billMonth;} emit(doc.data.account+'-'+doc.data.billYear+'-'+month) }"}}}).then(e=>{console.log("index",e)}).catch(e=>{console.log("index error",e)})}}return e.\u0275fac=function(t){return new(t||e)(n.Mb(c.g),n.Mb(a.a),n.Mb(l.h),n.Mb(d.a))},e.\u0275cmp=n.Gb({type:e,selectors:[["startup"]],decls:12,vars:10,consts:[[1,"auth-form","background",3,"fullscreen"],["size","large",1,"ion-text-center",2,"height","50px"],[4,"ngFor","ngForOf"],["header","Enter password",3,"visible","modal","responsive","appendTo","visibleChange"],["pInputText","","type","text","placeholder"," Password",3,"ngModel","ngModelChange"],["pTemplate","footer"],["key","startup","position","bottom-center"],[2,"background","#fdfdfd","width","60%","text-align","center","padding","5px","margin","0 auto","border-radius","10px",3,"click"],["name","person",2,"font-size","70px","padding","10px"],[2,"font-size","3vw"],["icon","pi pi-check","label","Login",1,"p-button-text",3,"click"]],template:function(e,t){1&e&&(n.Sb(0,"ion-content",0),n.Sb(1,"div"),n.Sb(2,"ion-title",1),n.Ec(3," Parking management "),n.Rb(),n.Rb(),n.Sb(4,"ion-grid"),n.Nb(5,"ion-row"),n.Sb(6,"ion-row"),n.Cc(7,b,5,1,"ion-col",2),n.Rb(),n.Rb(),n.Sb(8,"p-dialog",3),n.ac("visibleChange",function(e){return t.display=e}),n.Sb(9,"ion-input",4),n.ac("ngModelChange",function(e){return t.password=e}),n.Rb(),n.Cc(10,m,1,0,"ng-template",5),n.Rb(),n.Nb(11,"p-toast",6),n.Rb()),2&e&&(n.jc("fullscreen",!0),n.Ab(7),n.jc("ngForOf",t.users),n.Ab(1),n.Ac(n.lc(9,f)),n.jc("visible",t.display)("modal",!0)("responsive",!0)("appendTo","body"),n.Ab(1),n.jc("ngModel",t.password))},directives:[o.k,o.z,o.m,o.w,s.k,h.a,o.p,o.K,u.a,r.i,r.l,l.j,g.a,o.j,o.o,p.a],styles:['.divider[_ngcontent-%COMP%]{display:flex}.divider[_ngcontent-%COMP%]:after, .divider[_ngcontent-%COMP%]:before{content:"";flex:1}.line[_ngcontent-%COMP%]{align-items:center;margin:1em -1em;color:#ccc}.line[_ngcontent-%COMP%]:after, .line[_ngcontent-%COMP%]:before{height:1px;margin:0 1em}.one-line[_ngcontent-%COMP%]:after, .one-line[_ngcontent-%COMP%]:before{background:#ccc}.auth-form[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%], .auth-form[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{height:50%;justify-content:center}.already[_ngcontent-%COMP%]{display:block;text-align:center;padding-bottom:10px}.circle[_ngcontent-%COMP%]{width:50%;height:50%;background:#0ff;border:5px solid #00f}.circleBase[_ngcontent-%COMP%]{border-radius:50%}.background[_ngcontent-%COMP%]{--background:url(/assets/bg2.jpeg) 0 0/100% 100% no-repeat}']}),e})()}];let y=(()=>{class e{}return e.\u0275mod=n.Kb({type:e}),e.\u0275inj=n.Jb({factory:function(t){return new(t||e)},imports:[[c.k.forChild(v),s.c,r.f,o.B,h.b,p.c,u.b,g.b],c.k]}),e})()}}]);