import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { appUtility } from 'src/app/core/appUtility';
import { dbProvider } from 'src/app/core/dbProvider';
import * as lodash from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'settingPage',
  templateUrl: 'settingPage.html',
  styleUrls: ['settingPage.scss']
})
export class settingPage {
  loginActivity = []
  users = []
  selectedUser = {}
  showLoggeduserDetail = true;
  loginActivityTableName = "loginActivities";
  applicationUserTableName = "applicationUser"
  constructor(public router: Router,public util: appUtility, private dbprovider: dbProvider,private messageService: MessageService) {
    if(this.util.loggedUserInfo['code']==1){
      this.allActivityFetch(this.util.loggedUserInfo['id'])   
      this.fetchApplicationUser()
    }
    
  }


  segmentChanged(event) {
    console.log('Segment changed', event.detail.value);
    if (event.detail.value == 'loggeduser') {
      this.showLoggeduserDetail = true;
    } else {
      this.showLoggeduserDetail = false;

    }

  }
  onChange(){
    console.log(this.selectedUser)
    this.allActivityFetch(this.selectedUser['id'])   

  }

  fetchApplicationUser(){
    this.dbprovider.fetchDocsWithoutRelationshipByType(this.applicationUserTableName).then(res=>{
      if(res && res['status'] == "SUCCESS"){
        this.users = res['records'];
      }
      else{
        this.messageService.add({ key:"setting", severity: 'error', summary: "User fetching failed", detail: ''});
      }
    })
  }

  allActivityFetch(userid) {
        // this.fetchDocWithRelationshipByTypeAndId('employee', '0C4C2938-F924-0AB6-96CA-C1D47513F579', true,{'childreference':['address'],'masterandlookupreference':['department']}).then(res => {

    return this.dbprovider.fetchChildDocsWithRelationshipByParentTypeAndId(this.loginActivityTableName,this.applicationUserTableName,userid,false,{'masterandlookupreference':[this.applicationUserTableName]}).then(res => {
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        console.log(res)
        this.loginActivity = lodash.sortBy( res['records'], 'inTime' ).reverse();
      }
      else{
        this.messageService.add({ key:"setting", severity: 'error', summary: "Activity fetching failed", detail: ''});

      }
    })

  }

}
