!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"5lbs":function(n,i,o){"use strict";o.r(i),o.d(i,"billGenerateModule",function(){return G});var a,l,r=o("ofXK"),s=o("TEn/"),c=o("3Pt+"),b=o("mrSG"),u=o("PqYM"),h=o("IzEk"),d=o("lJxs"),g=o("fXoL"),m=o("tyNb"),f=o("27b0"),p=o("fU03"),v=o("7zfz"),y=o("tp0D"),S=o("dpPO"),k=o("Gxio"),N=o("sYmb"),A=((a=function(){function n(t,i,o,a,l,r){e(this,n),this.router=t,this.dbconfig=i,this.location=o,this.util=a,this.messageService=l,this.dbprovider=r,this.billTableName="billDetail",this.accountTableName="account",this.loginActivityTableName="loginActivities",this.vehicleTableName="vehicle",this.billNeedToGenerate=[],this.savedSuccessMessage="Data saved successfully",this.disableGenerate=!1;var s=new Date,c=s.getMonth()+1;this.selectedYearmonth=c<10?s.getFullYear()+"-0"+c:s.getFullYear()+"-"+c,this.logEntry({message:" ",type:"INFO"})}var i,o,a;return i=n,(o=[{key:"backButtonOnclick",value:function(){this.location.back()}},{key:"filterValidAccounts",value:function(){var e=this;this.disableGenerate=!0,console.log(this.selectedYearmonth);var t=this.selectedYearmonth.split("-")[1],n=this.selectedYearmonth.split("-")[0],i=new Date(Number(n),Number(t),0,23,59,59),o=[];this.dbprovider.fetchDocsWithRelationshipByType(this.vehicleTableName,!0,{childreference:["account"]}).then(function(a){console.log(a),a&&"SUCCESS"==a.status?a.records.length>0?(a.records.forEach(function(e){e.accounts&&e.accounts.length>0&&e.accounts.forEach(function(t){!t.closeDate&&t.openDate<i.getTime()&&(delete e.accounts,t.vehicle=e,o.push(t))})}),console.log(o),e.billGeneration(o,t,n)):e.disableGenerate=!1:(e.messageService.add({key:"billgen",severity:"error",summary:a.message,detail:"",closable:!0}),e.disableGenerate=!1)})}},{key:"billGeneration",value:function(e,t,n){return Object(b.a)(this,void 0,void 0,regeneratorRuntime.mark(function i(){var o=this;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:console.log(e),e.length>0?(this.logEntry({message:e.length+" vehicle available for selected month("+t+"-"+n+") bill generation",type:"INFO"}),e.forEach(function(e){return Object(b.a)(o,void 0,void 0,regeneratorRuntime.mark(function i(){var o,a,l=this;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({selector:{"data.account":e.id,"data.billMonth":Number(t),"data.billYear":Number(n),"data.type":this.billTableName},sort:["data.account"]});case 2:o=i.sent,this.setLogMessage({message:"Bill generation started for "+e.vehicle.vehicleNumber,type:"INFO"}),o&&"SUCCESS"==o.status?(o.records.length>0?(console.log(o),this.setLogMessage({message:"Already bill generated for "+e.vehicle.vehicleNumber,type:"INFO"})):(this.util.billGenerate=!0,(a=JSON.parse(JSON.stringify(this.dbconfig.configuration.tableStructure[this.billTableName]))).totalAmount=e.rentPlan_lookup.rentAmount,a.receivedAmount=0,a.pendingAmount=e.rentPlan_lookup.rentAmount,a.billMonth=Number(t),a.billYear=Number(n),a.account=e.id,this.dbprovider.save(this.billTableName,a).then(function(t){"SUCCESS"==t.status?(l.saveAccount(e,a),l.logEntry({message:"Bill generated for "+e.vehicle.vehicleNumber+" and bill amount is "+a.totalAmount+" Rs",type:"SUCCESS"})):l.logEntry({message:"Bill generation failed for "+e.vehicle.vehicleNumber,type:"ERR"})}).catch(function(e){console.log(e),l.messageService.add({key:"accCreation",severity:"error",summary:e,detail:""})})),console.log("bill ==",o)):this.logEntry({message:"Bill generation failed for "+e.vehicle.vehicleNumber,type:"ERR"});case 4:case"end":return i.stop()}},i,this)}))}),this.disableGenerate=!1):(this.logEntry({message:"There is no vehicle available for selected month("+t+"-"+n+") bill generation",type:"INFO"}),this.disableGenerate=!1);case 1:case"end":return i.stop()}},i,this)}))}},{key:"saveAccount",value:function(e,t){console.log(e),e.totalBillAmount=e.totalBillAmount+Number(t.totalAmount),e.receivedAmount||(e.receivedAmount=0),this.dbprovider.save(this.accountTableName,e).then(function(e){console.log(e)}).catch(function(e){console.log(e)})}},{key:"setLogMessage",value:function(e){return Promise.resolve(this.logEntry(e))}},{key:"logEntry",value:function(e){var t=[];t.push(e),this.logStream$=Object(u.a)(0).pipe(Object(h.a)(t.length),Object(d.a)(function(e){return t[e]}))}}])&&t(i.prototype,o),a&&t(i,a),n}()).\u0275fac=function(e){return new(e||a)(g.Mb(m.g),g.Mb(f.a),g.Mb(r.h),g.Mb(p.a),g.Mb(v.h),g.Mb(y.a))},a.\u0275cmp=g.Gb({type:a,selectors:[["billGenerate"]],decls:20,vars:11,consts:[["no-border",""],["slot","start"],["slot","start",3,"disabled","click"],["name","arrow-back",2,"font-size","30px","color","black"],["size","large",1,"ion-text-center"],[2,"position","fixed"],["ion-fixed","",1,"center"],[2,"padding-right","5px","padding-left","5px"],["type","month","id","start","name","start","min","2000-01","value","2021-03",2,"background-color","lightgray","align-self","center","padding-bottom","3px","padding-top","2px",3,"ngModel","ngModelChange"],["slot","end",3,"disabled","click"],["theme","light","title","Bill generation logs",3,"logStream","animated","icons"],["key","billgen","position","bottom-center"]],template:function(e,t){1&e&&(g.Sb(0,"ion-header",0),g.Sb(1,"ion-toolbar"),g.Sb(2,"ion-buttons",1),g.Sb(3,"ion-button",2),g.ac("click",function(){return t.backButtonOnclick()}),g.Sb(4,"h2"),g.Nb(5,"ion-icon",3),g.Rb(),g.Rb(),g.Rb(),g.Sb(6,"ion-title",4),g.Ec(7),g.dc(8,"translate"),g.Rb(),g.Rb(),g.Rb(),g.Sb(9,"ion-content"),g.Sb(10,"ion-toolbar",5),g.Sb(11,"ion-item",6),g.Sb(12,"label",7),g.Ec(13,"Month : "),g.Rb(),g.Sb(14,"input",8),g.ac("ngModelChange",function(e){return t.selectedYearmonth=e}),g.Rb(),g.Sb(15,"ion-button",9),g.ac("click",function(){return t.filterValidAccounts()}),g.Ec(16,"Generate "),g.Rb(),g.Rb(),g.Rb(),g.Nb(17,"log-monitor",10),g.dc(18,"async"),g.Nb(19,"p-toast",11),g.Rb()),2&e&&(g.Ab(3),g.kc("disabled",t.disableGenerate),g.Ab(4),g.Gc(" ",g.ec(8,7,"billGenerate.title")," "),g.Ab(7),g.jc("ngModel",t.selectedYearmonth),g.Ab(1),g.kc("disabled",t.disableGenerate),g.Ab(2),g.jc("logStream",g.ec(18,9,t.logStream$))("animated",!0)("icons",!0))},directives:[s.n,s.A,s.e,s.d,s.o,s.z,s.k,s.q,c.a,c.i,c.l,S.a,k.a],pipes:[N.c,r.b],styles:[".center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-content:center;align-items:center;width:41%;margin:auto;min-width:300px}"]}),a),R=o("/RsI"),E=o("jIHw"),w=o("7kUa"),M=[{path:"",component:A}],G=((l=function t(){e(this,t)}).\u0275mod=g.Kb({type:l}),l.\u0275inj=g.Jb({factory:function(e){return new(e||l)},imports:[[m.k.forChild(M),r.c,c.f,s.B,R.b,E.c,w.b,k.b,N.b,S.b],m.k]}),l)}}])}();