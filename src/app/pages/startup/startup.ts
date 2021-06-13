import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appUtility } from 'src/app/core/appUtility';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'startup',
  templateUrl: 'startup.html',
  styleUrls: ['startup.scss'],
})
export class startup {

  display: boolean = false;
  password = "";
  public selectedUser;
  public userTableName = 'applicationUser'
  public loginActivityTableName = 'loginActivities'

  public users = []

  constructor(public router: Router, private util: appUtility, private messageService: MessageService, private dbprovider: dbProvider) {
    this.createFirstAdmin()
  }

  openMenu(item) {
    console.log(item)
    this.display = true;
    this.selectedUser = item
  }
  login() {
    if (this.selectedUser.password == this.password) {
      this.util.userId = this.selectedUser.code;
      this.util.loggedUserInfo = this.selectedUser;
      this.addLoginActivity().then(res=>{
        if(!res){
          this.messageService.add({ key: "startup", severity: 'error', summary: "Login activity tracking failed", detail: '', closable: true });
        }else{
          this.insertLocalDoc();
          setTimeout(() => this.router.navigate(['/menu']), 300);
        }
        this.display = false;
      })
      this.password = ''
    }
    else {
      this.messageService.add({ key: "startup", severity: 'error', summary: "Invalid password", detail: '', closable: true });
      this.display = false;
      this.password = ''
    }
  }

  ionViewWillEnter(){
    console.log('view')
    this.fetchUserData().then(res => {
      if (res['records'] && res['records'].length > 0) {
        this.users = res['records']
      }
    })
  }

  insertLocalDoc(){
    var localDoc = {
      _id: '_local/loginInfo',
      userId: this.util.userId,
      loggedUserInfo : this.util.loggedUserInfo,
      loggedUserActivity:this.util.loggedUserActivityInfo
    }
    this.dbprovider.insertLocalDoc(localDoc)
  }
  fetchLocalDoc(){
    this.dbprovider.getLocalDoc('_local/loginInfo').then(res=>{
      console.log(res)
    })
  }

  addLoginActivity(){
    const date = new Date();
    const timestamp = date.getTime();
    var activity = {
      "inTime": timestamp,
      "outTime":null,
      "applicationUser" : this.selectedUser.id
    }
    var activitySave = false;
    return this.dbprovider.save(this.loginActivityTableName, activity).then(result => {
      if (result['status'] == 'SUCCESS') {
        activitySave = true;
        return this.dbprovider.fetchDocWithoutRelationshipByTypeAndId(this.loginActivityTableName,result['id']).then(res=>{
          console.log('resss=',res)
          if (res['status'] == 'SUCCESS' && res['records'] && res['records'].length > 0) {
            this.util.loggedUserActivityInfo = res['records'][0]
          }
          return activitySave;
        })
      }
    }).catch(error => {
      return activitySave;
    });
  }

  createFirstAdmin() {
    this.fetchUserData().then(res => {
      var adminAdded = false;
      if (res['records'] && res['records'].length > 0) {
        res['records'].forEach(element => {
          if (element.userType == "Admin") {
            adminAdded = true;
          }
        });
      }
      console.log(adminAdded)
      if (adminAdded == false) {
        this.util.userId = 1;
        var admin = {
          "userName": "Shunmu",
          "mobile": 9841163959,
          "code": 1,
          "userType": "Admin",
          "password": "shunmu"
        }

        this.dbprovider.save(this.userTableName, admin).then(result => {
          console.log("result", result)
          if (result['status'] != 'SUCCESS') {
            this.messageService.add({ key: "startup", severity: 'error', summary: "First time user creation failed", detail: '', closable: true });
            return;
          }
          else {
            this.fetchUserData().then(res => {
              if (res['records'] && res['records'].length > 0) {
                this.users = res['records']
              }
            })
          }
        }).catch(error => {
          this.messageService.add({ key: "startup", severity: 'error', summary: "First time user creation failed", detail: '' });

        });
      } else {
        this.fetchUserData().then(res => {
          if (res['records'] && res['records'].length > 0) {
            this.users = res['records']
            this.dbprovider.getLocalDoc('_local/loginInfo').then(ldoc=>{
              if(ldoc['status'] == "SUCCESS"){
                  console.log(ldoc)
                  this.util.userId = ldoc['response']['userId']
                  this.util.loggedUserInfo = ldoc['response']['loggedUserInfo']
                  this.util.loggedUserActivityInfo = ldoc['response']['loggedUserActivity']
                  setTimeout(() => this.router.navigate(['/menu']), 300);

              }
            })

          }
        })
      }
    })
  }

  fetchUserData() {
    return this.dbprovider.fetchDocsWithoutRelationshipByType(this.userTableName).then(res => {
      if (res && res['status'] == "SUCCESS") {
        return res;
      }
      else {
        return [];

      }
    }).catch(error => {
      this.messageService.add({ key: "startup", severity: 'error', summary: "User fetching failed", detail: '' });
      return [];
    })
  }

}
