import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { transactionEntry } from 'src/app/components/transactionEntry/transactionEntry';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'vehicleSearch',
  templateUrl: 'vehicleSearch.html',
  styleUrls: ['vehicleSearch.scss'],
})


export class vehicleSearch {
  vehicleList = [];
  allvehicleList = [];

  cols = [];
  frozenCols = [];
  queryText = ''
  appLanguage = 'ta'
  public vehicleTableName = 'vehicle'
  public accountTableName = 'account'
  public vehicleContactAssignmentTablename = 'vehicleContactAssignment'
  public billTable = 'billDetail'


  constructor(public router: Router, public popoverController: PopoverController, private messageService: MessageService, private location: Location, private translate: TranslateService, private dbprovider: dbProvider) {

    this.appLanguage = this.translate.getDefaultLang()
    let month_mapping = { '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr', '5': 'May', '6': 'Jun', '7': 'Jul', '8': 'Aug', '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }
    var today = new Date();
    var currentMonth = today.getMonth() + 1
    var currentYearInTwoDigit = Number(today.getFullYear().toString().substr(-2))
    var currentYearInFourDigit = today.getFullYear()


    for (var i = 0; i <= 10; i++) {
      if (i == 10) {
        this.cols.splice(0, 0, { field: 'vehicleInfo', header: 'vehicleSearch.vehicleInfo' });
      } else {
        if (currentMonth == 0) {
          currentMonth = 12;
          currentYearInTwoDigit = currentYearInTwoDigit - 1;
          currentYearInFourDigit = currentYearInFourDigit - 1;
        }
        var col = {}
        col['month'] = currentMonth
        let monthValue = currentMonth--;
        col['field'] = month_mapping[monthValue] + currentYearInTwoDigit
        col['header'] = month_mapping[monthValue] + ' ' + currentYearInTwoDigit
        col['year'] = currentYearInFourDigit
        this.cols.push(col)
      }
    }

    console.log(this.translate.getDefaultLang())

    this.fetchVehicle();

  }
  backButtonOnclick() {
    this.location.back();
  }
  billGeneration() {
    console.log('Generate bill')

    this.router.navigate(['billGenerate'])
  }
  search(event) {
    console.log(event)
  }
  searchByKeyword() {

    console.log("search", this.queryText)
    this.vehicleList = []
    if (this.queryText.length > 0) {
      this.allvehicleList.forEach(element => {
        if (element.vehicleInfo.vehicleNumber.toLowerCase().includes(this.queryText.toLowerCase())) {
          this.vehicleList.push(element)
        }
      });
    } else {
      this.vehicleList = [...this.allvehicleList]

    }

  }
  // amountCellClick(amountDetail){
  //   console.log("amount",amountDetail)
  // }
  vehicleCellClick(vehicle) {
    console.log("vehicle", vehicle)
    if (vehicle['billAvailable'] == false) {
      this.messageService.add({ severity: 'info', summary: "Account not available", detail: 'Active account not available for this vehicle' });

    } else {
      this.router.navigate(['transactionHistory'], {
        queryParams: { 'vehicle': JSON.stringify(vehicle), appLanguage: this.appLanguage }
      });
    }

  }
  async amountCellClick(ev: any, amountDetail) {
    console.log("amount", amountDetail)
    if (amountDetail['pendingAmount'] > 0) {
      const popover = await this.popoverController.create({
        component: transactionEntry,
        componentProps: { billdetail: amountDetail },
        translucent: false,
        showBackdrop: true,
        backdropDismiss: false
      });
      await popover.present();

      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    else {
      this.messageService.add({ severity: 'success', summary: this.translate.instant('vehicleSearch.alreadyPaid') + amountDetail.Month, detail: '' });



    }


  }

  fetchVehicle() {
    this.vehicleList = []
    this.allvehicleList = []

    this.dbprovider.fetchDocsWithRelationshipUsingFindOption({ selector: { 'data.type': this.vehicleTableName } }, true, { 'childreference': ['account'] }).then(res => {
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        res['records'].forEach(element => {
          let fullVehicleInfo = {}
          let vehicleInfo = {}
          vehicleInfo['vehicleType'] = element['vehicleType']
          vehicleInfo['vehicleBrand'] = element['vehicleBrand']
          vehicleInfo['vehicleModel'] = element['vehicleModel']
          vehicleInfo['vehicleNumber'] = element['vehicleNumber']
          vehicleInfo['vehicleId'] = element['id']
          fullVehicleInfo['vehicleInfo'] = vehicleInfo
          fullVehicleInfo['accounts'] = element['accounts']

          var taskList = []
          taskList.push(this.fetchContact(fullVehicleInfo))
          taskList.push(this.fetchBillDetail(fullVehicleInfo))

          Promise.all(taskList).then(result => {
            this.vehicleList.push(fullVehicleInfo)
            this.allvehicleList = [...this.vehicleList]

          })

        });
      }
    })

  }

  fetchContact(fullVehicleInfo) {
    this.dbprovider.fetchDocsWithRelationshipUsingFindOption({ selector: { 'data.type': this.vehicleContactAssignmentTablename, 'data.vehicle_lookup': fullVehicleInfo['vehicleInfo']['vehicleId'] } }, true, { 'masterandlookupreference': ['contact'] }).then(res => {
      var contactInfo = {}
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        res['records'].forEach(element => {
          if (element['contact_lookup']['contactType'] == 'owner') {
            contactInfo['contactName'] = element['contact_lookup']['contactName']
            contactInfo['contactNameInTamil'] = element['contact_lookup']['contactNameInTamil']
          }
        })
        fullVehicleInfo['primaryContact'] = contactInfo
      } else {
        fullVehicleInfo['primaryContact'] = {}
      }
    }).catch(err => {
      fullVehicleInfo['primaryContact'] = {}
    })
  }
  fetchBillDetail(fullVehicleInfo) {
    var accounts = fullVehicleInfo['accounts']
    var activeAccount;
    if (accounts.length > 0) {
      accounts.forEach(element => {
        if (element['closeDate'] == null) {
          activeAccount = element
        }
      });
      if (activeAccount) {
        fullVehicleInfo['activeAccountId']= activeAccount['id']
        this.dbprovider.fetchDocsWithoutRelationshipByParentTypeAndId(this.billTable, this.accountTableName, activeAccount['id']).then(res => {
          console.log('bill', res)
          if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
            this.cols.forEach(col => {
              if (col['month']) {
                res['records'].forEach(bill => {
                  if (bill['billMonth'] == col['month'] && bill['billYear'] == col['year']) {
                    fullVehicleInfo[col['field']] = bill;
                  }
                });
              }
            });
          }
          console.log('fullVehicleInfo', fullVehicleInfo)
        }).catch(err => {
          console.log(err)
        })
      } else {
        fullVehicleInfo['billAvailable'] = false
      }
    }
    else {
      console.log('account length 0')

      fullVehicleInfo['billAvailable'] = false
    }
  }
}

