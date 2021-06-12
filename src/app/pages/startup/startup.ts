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
  public tableName = 'applicationUser'
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
    this.display = false;
    this.util.userId = this.selectedUser.code;
    if (this.selectedUser.password == this.password) {
      setTimeout(() => this.router.navigate(['/menu']), 300);
    }
    else {
      this.messageService.add({ key: "startup", severity: 'error', summary: "Invalid password", detail: '', closable: true });
    }
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

        this.dbprovider.save(this.tableName, admin).then(result => {
          console.log("result", result)
          if (result['status'] != 'SUCCESS') {
            this.messageService.add({ key: "startup", severity: 'error', summary: "First time user creation failed", detail: '', closable: true });
            return;
          }
          else {
            this.fetchUserData().then(res => {
              if (res['records'] && res['records'].length > 0) {
                this.users = res['records']
                console.log("user list", this.users)
              }
            })
          }
        }).catch(error => {
          console.log(error)
          this.messageService.add({ key: "startup", severity: 'error', summary: "First time user creation failed", detail: '' });

        });
      } else {
        this.fetchUserData().then(res => {
          if (res['records'] && res['records'].length > 0) {
            this.users = res['records']
            console.log("user list else", this.users)
          }
        })
      }
    })
  }

  fetchUserData() {
    return this.dbprovider.fetchDocsWithoutRelationshipByType(this.tableName).then(res => {
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
