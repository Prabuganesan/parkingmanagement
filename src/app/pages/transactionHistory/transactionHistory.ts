import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { transactionEntry } from 'src/app/components/transactionEntry/transactionEntry';
import {MessageService} from 'primeng/api';
import {Location} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'transactionHistory',
  templateUrl: 'transactionHistory.html',
  styleUrls: ['transactionHistory.scss'],
})


export class transactionHistory {
  ransactionlist = [];
  cols = [];
  frozenCols = [];
  queryText = ''

  constructor(public router: Router,public popoverController: PopoverController,private messageService: MessageService,private location : Location,private translate: TranslateService) {

   
    this.cols = [
      { field: 'month', header: 'transactionHistory.month' },
      { field: 'transactionDate', header: 'transactionHistory.date' },
      { field: 'transactionAmount', header: 'transactionHistory.amount' },
      { field: 'discountAmount', header: 'transactionHistory.discount' },
      { field: 'paidAmount', header: 'transactionHistory.paidAmount' },
      { field: 'receivedFrom', header: 'transactionHistory.receivedFrom' },
      { field: 'receivedBy', header: 'transactionHistory.receivedBy' },
      { field: 'transactionMode', header: 'transactionHistory.amountMode' }
    ];
//   this.frozenCols = [
//     { field: 'vehicleInfo', header: 'Vehicle Info' }
// ];
    this.ransactionlist = [
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu ganesan",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"upi"
      },
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu ganesan",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"upi"
      },
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu ganesan",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"upi"
      },
      {
        "month":"JAN 21",
        "transactionDate":"2021-01-26 10:51:50 AM",
        "transactionAmount":500,
        "discountAmount":100,
        "paidAmount":400,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      },
      {
        "month":"Feb 21",
        "transactionDate":"2021-01-26 10:30:50 AM",
        "transactionAmount":1000,
        "discountAmount":100,
        "paidAmount":900,
        "receivedFrom":"Prabu",
        "receivedBy":"Security 1",
        "transactionMode":"cash"
      }
     
    ]
    
   }
  backButtonOnclick() {
    this.location.back();
  }

  searchByKeyword(){
    console.log(this.queryText)
  }
  // amountCellClick(amountDetail){
  //   console.log("amount",amountDetail)
  // }
  vehicleCellClick(vehicle){
    console.log("vehicle",vehicle)

  }
}

