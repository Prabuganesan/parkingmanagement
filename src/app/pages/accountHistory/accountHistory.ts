import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {DialogService} from 'primeng/dynamicdialog';


@Component({
  selector: 'accountHistory',
  templateUrl: 'accountHistory.html',
  styleUrls: ['accountHistory.scss'],
})
export class accountHistory {

  accountList=[];

    constructor(public dialogService: DialogService,public popoverController: PopoverController) { }

    backButtonOnclick(){
      this.popoverController.dismiss()
    }

    ngOnInit() {
        this.accountList =[{"openDate":"2021-01-26 10:51:50 AM",
          "closeDate":"2021-01-26 10:51:50 AM",
          "totalBillAmount":1000,
          "receivedAmount":500,
          "pendingAmount":500,
          "accountAddedBy":"security 1",
          "rentPlan":"Plan 1"
        },
        {"openDate":"2021-01-26 10:51:50 AM",
          "closeDate":"2021-01-26 10:51:50 AM",
          "totalBillAmount":1000,
          "receivedAmount":500,
          "pendingAmount":500,
          "accountAddedBy":"security 1",
          "rentPlan":"Plan 1"
        },
        {"openDate":"2021-01-26 10:51:50 AM",
          "closeDate":"2021-01-26 10:51:50 AM",
          "totalBillAmount":1000,
          "receivedAmount":500,
          "pendingAmount":500,
          "accountAddedBy":"security 1",
          "rentPlan":"Plan 1"
        }
       ]
    }
    
  
}
