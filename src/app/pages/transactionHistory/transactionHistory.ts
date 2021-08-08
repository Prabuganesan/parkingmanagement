import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'transactionHistory',
  templateUrl: 'transactionHistory.html',
  styleUrls: ['transactionHistory.scss'],
})


export class transactionHistory {
  transactionList = [];
  cols = [];
  frozenCols = [];
  queryText = ''
  vehicle;
  appLanguage;
  startYearMonth;
  endYearMonth;
  transactionTableName = 'transaction'
  billDetailableName = 'billDetail'
  month_mapping = { '1': 'JAN', '2': 'FEB', '3': 'MAR', '4': 'APR', '5': 'MAY', '6': 'JUN', '7': 'JUL', '8': 'AUG', '9': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC' }

  constructor(public router: Router, private dbprovider: dbProvider, public activatRoute: ActivatedRoute, public popoverController: PopoverController, private messageService: MessageService, private location: Location, private translate: TranslateService) {


    var today = new Date();
    var startMonth = today.getMonth() + 1

    if (startMonth < 10) {
      this.startYearMonth = today.getFullYear() + '-' + '0' + startMonth;
      this.endYearMonth = today.getFullYear() + '-' + '0' + startMonth;
    } else {
      this.startYearMonth = today.getFullYear() + '-' + startMonth;
      this.endYearMonth = today.getFullYear() + '-' + startMonth;
    }

    this.cols = [
      { field: 'month', header: 'transactionHistory.month' },
      { field: 'transactionDate', header: 'transactionHistory.date' },
      { field: 'transactionAmount', header: 'transactionHistory.amount' },
      { field: 'discountAmount', header: 'transactionHistory.discount' },
      { field: 'paidAmount', header: 'transactionHistory.paidAmount' },
      { field: 'receivedFrom', header: 'transactionHistory.receivedFrom' },
      // { field: 'receivedBy', header: 'transactionHistory.receivedBy' },
      { field: 'transactionMode', header: 'transactionHistory.amountMode' }
    ];

    this.activatRoute.queryParams.subscribe(params => {
      if (params["vehicle"]) {
        this.vehicle = JSON.parse(params["vehicle"]);
      }
      this.appLanguage = params["appLanguage"]
      this.search()
    });

   
   

  }
  backButtonOnclick() {
    this.location.back();
  }

  search() {
    console.log(this.queryText)

    const startDate = new Date(Number(this.startYearMonth.split('-')[0]), Number(this.startYearMonth.split('-')[1]) - 1, 1, 0, 0, 0);
    const endDate = new Date(Number(this.endYearMonth.split('-')[0]), Number(this.endYearMonth.split('-')[1]), 0, 23, 59, 59);

    var startTime = startDate.getTime()
    var endTime = endDate.getTime()

    if (startTime > endTime) {
      this.messageService.add({ key: "transactionHistory", severity: 'info', summary: 'Start month must be less than end month', detail: '' });

    } else {
      var startKey = this.vehicle['activeAccountId'] + '-' + Number(this.startYearMonth.split('-')[0]) + '-' + this.startYearMonth.split('-')[1]
      var endKey = this.vehicle['activeAccountId'] + '-' + Number(this.endYearMonth.split('-')[0]) + '-' + this.endYearMonth.split('-')[1]

      console.log(startKey, endKey)
      this.dbprovider.queryByView('billIndex', { 'startkey': startKey, 'endkey': endKey })
        .then(result => {
          if (result['status'] == 'SUCCESS' && result['records'].length > 0) {
            var ids = []
            result['records'].forEach(element => {
              ids.push(this.dbprovider.convertRelIdToDocId(element['id']))
            });
            console.log(ids)
            this.fetchTransaction(ids)
          } else {

          }
        }).catch(err => {
          // handle errors
          console.log(err)

        });

    }
  }

  fetchTransaction(billIds) {
    this.transactionList = []
    var taskList = [];
    billIds.forEach(element => {
      taskList.push(this.dbprovider.fetchChildDocsWithRelationshipByParentTypeAndId(this.transactionTableName, this.billDetailableName, element, true).then(res => {
        return res['records']
      }).catch(error => {
        return []
      }))
    });

    Promise.all(taskList).then(res => {
      const mergeArray = [].concat.apply([], res);
      console.log(mergeArray)
      mergeArray.forEach(element => {
        element['month'] = this.month_mapping[element['billDetail']['billMonth']] + ' ' + element['billDetail']['billYear']
        delete element['billDetail']
        this.transactionList.push(element)
      });


    })
  }

}

