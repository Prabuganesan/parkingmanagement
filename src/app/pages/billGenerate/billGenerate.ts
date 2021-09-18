import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { appUtility } from 'src/app/core/appUtility';
import { dbProvider } from 'src/app/core/dbProvider';
import { Location } from '@angular/common';

import { timer } from 'rxjs';
import { last, map, take } from 'rxjs/operators';
import { dbConfiguration } from 'src/app/core/dbConfiguration';

@Component({
  selector: 'billGenerate',
  templateUrl: 'billGenerate.html',
  styleUrls: ['billGenerate.scss'],
})

export class billGenerate {

  public billTableName = 'billDetail'
  public accountTableName = 'account'
  public loginActivityTableName = 'loginActivities'
  public vehicleTableName = 'vehicle'
  public billNeedToGenerate = [];
  public logStream$;
  public selectedYearmonth;
  public savedSuccessMessage = 'Data saved successfully';
  public disableGenerate = false

  constructor(public router: Router, private dbconfig: dbConfiguration, private location: Location, private util: appUtility, private messageService: MessageService, private dbprovider: dbProvider) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1

    if (currentMonth < 10) {
      this.selectedYearmonth = today.getFullYear() + '-' + '0' + currentMonth;
    } else {
      this.selectedYearmonth = today.getFullYear() + '-' + currentMonth;
    }

    this.logEntry({ message: ' ', type: 'INFO' });
  }
  backButtonOnclick() {
    this.location.back();
  }

  filterValidAccounts() {
    this.disableGenerate = true;

    console.log(this.selectedYearmonth)
    var selectedMonth = this.selectedYearmonth.split('-')[1]
    var selectedYear = this.selectedYearmonth.split('-')[0]
    var today = new Date();
    var currentMonth = today.getMonth() + 1
    if(Number(selectedYear) > today.getFullYear()){
      this.messageService.add({ key: "billgen", severity: 'error', summary: "Please choose year below or equal to current year", detail: '', closable: true });
      this.disableGenerate = false;
      return;
    }else{
      if(Number(selectedYear) == today.getFullYear() && Number(selectedMonth)>currentMonth){
        this.messageService.add({ key: "billgen", severity: 'error', summary: "Please choose month below or equal to current month", detail: '', closable: true });
        this.disableGenerate = false;
        return;
      }
    }

    const monthLastDate = new Date(Number(selectedYear), Number(selectedMonth), 0, 23, 59, 59);
    // const firstDate = new Date(Number(selectedYear), Number(selectedMonth) - 1, 1);


    var filteredAccounts = []

    this.dbprovider.fetchDocsWithRelationshipByType(this.vehicleTableName, true, { 'childreference': ['account'] }).then(res => {
      console.log(res)
      if (res && res['status'] == "SUCCESS") {
        if (res['records'].length > 0) {
          res['records'].forEach(vehicle => {
            if (vehicle.accounts && vehicle.accounts.length > 0) {
              vehicle.accounts.forEach(account => {
                if (!account['closeDate'] && account.openDate < monthLastDate.getTime()) {
                  delete vehicle['accounts']
                  account['vehicle'] = vehicle
                  filteredAccounts.push(account)
                }
              });
            }
          })

          console.log(filteredAccounts)
          this.billGeneration(filteredAccounts, selectedMonth, selectedYear);
        } else {
          this.disableGenerate = false;
        }
      }
      else {
        this.messageService.add({ key: "billgen", severity: 'error', summary: res['message'], detail: '', closable: true });
        this.disableGenerate = false;
      }
    })
  }

  async billGeneration(filteredAccounts, selectedMonth, selectedYear) {
    console.log(filteredAccounts)
    if (filteredAccounts.length > 0) {
      this.logEntry({ message: filteredAccounts.length + ' vehicle available for selected month(' + selectedMonth + '-' + selectedYear + ') bill generation', type: 'INFO' });

      filteredAccounts.forEach(async account => {

        let result = await this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.account': account.id, 'data.billMonth': Number(selectedMonth), 'data.billYear': Number(selectedYear), 'data.type': this.billTableName }, sort: ['data.account'] })

        this.setLogMessage({ message: 'Bill generation started for ' + account['vehicle']['vehicleNumber'], type: 'INFO' })


        if (result && result['status'] == "SUCCESS") {
          if (result['records'].length > 0) {
            console.log(result)
            this.setLogMessage({ message: 'Already bill generated for ' + account['vehicle']['vehicleNumber'], type: 'INFO' })
          }
          else {
            this.util.billGenerate = true;
            var tableStructure = this.dbconfig.configuration.tableStructure
            var billObject = JSON.parse(JSON.stringify(tableStructure[this.billTableName]));
            billObject['totalAmount'] = account['rentPlan_lookup']['rentAmount']
            billObject['receivedAmount'] = 0;
            billObject['pendingAmount'] = account['rentPlan_lookup']['rentAmount'];
            billObject['billMonth'] = Number(selectedMonth)
            billObject['billYear'] = Number(selectedYear)
            billObject['account'] = account['id'];
             this.dbprovider.save(this.billTableName, billObject).then(result => {
              if (result['status'] != 'SUCCESS') {
                this.logEntry({ message: 'Bill generation failed for ' + account['vehicle']['vehicleNumber'], type: 'ERR' });
                return;
              }
              this.saveAccount(account,billObject)
              this.logEntry({ message: 'Bill generated for ' + account['vehicle']['vehicleNumber'] + ' and bill amount is ' + billObject['totalAmount'] + ' Rs', type: 'SUCCESS' });

            }).catch(error => {
              console.log(error)
              this.messageService.add({ key: "accCreation", severity: 'error', summary: error, detail: '' });

            });
          }
          console.log('bill ==', result)
        } else {
          this.logEntry({ message: 'Bill generation failed for ' + account['vehicle']['vehicleNumber'], type: 'ERR' });
        }

      });
      this.disableGenerate = false;
    }
    else {
      this.logEntry({ message: 'There is no vehicle available for selected month(' + selectedMonth + '-' + selectedYear + ') bill generation', type: 'INFO' });
      this.disableGenerate = false;

    }
  }

  saveAccount(account,billdetail){
    console.log(account)
    account['totalBillAmount'] = account['totalBillAmount'] + Number(billdetail['totalAmount']);
    if(!account['receivedAmount']){
      account['receivedAmount'] = 0;
    }
    this.dbprovider.save(this.accountTableName, account).then(result => {
    console.log(result)
    }).catch(error => {
      console.log(error)
    });
  }

  setLogMessage(message) {
    return Promise.resolve(this.logEntry(message));

  }

  logEntry(log) {
    var Logs = []
    Logs.push(log)
    this.logStream$ = timer(0).pipe(take(Logs.length), map(i => Logs[i]));

  }




}
