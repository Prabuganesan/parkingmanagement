import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { transactionEntry } from 'src/app/components/transactionEntry/transactionEntry';
import {MessageService} from 'primeng/api';
import {Location} from '@angular/common';

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

  constructor(public router: Router,public popoverController: PopoverController,private messageService: MessageService,private location : Location) {

   
    this.cols = [
      { field: 'month', header: 'Month' },
      { field: 'transactionDate', header: 'Date' },
      { field: 'transactionAmount', header: 'Amount' },
      { field: 'discountAmount', header: 'Discount' },
      { field: 'paidAmount', header: 'Paid Amount' },
      { field: 'receivedFrom', header: 'Received from' },
      { field: 'receivedBy', header: 'Received by' },
      { field: 'transactionMode', header: 'Mode' }
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
  async amountCellClick(ev: any,amountDetail) {
    console.log("amount",amountDetail)
    if(amountDetail.pendingAmount>0)
    {
      const popover = await this.popoverController.create({
        component: transactionEntry,
        event: ev,
        componentProps: { amountDetail: amountDetail },
        translucent: false,
        showBackdrop:true,
        backdropDismiss:false
      });
      await popover.present();
  
      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    else
    {
      this.messageService.add({severity:'success', summary:'Already paid for '+amountDetail.Month, detail:''});

    }

    
  }
}

