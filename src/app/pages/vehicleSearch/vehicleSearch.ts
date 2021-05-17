import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { transactionEntry } from 'src/app/components/transactionEntry/transactionEntry';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'vehicleSearch',
  templateUrl: 'vehicleSearch.html',
  styleUrls: ['vehicleSearch.scss'],
})


export class vehicleSearch {
  vehiclelist = [];
  cols = [];
  frozenCols = [];
  queryText = ''

  constructor(public router: Router,public popoverController: PopoverController,private messageService: MessageService) {

   
    this.cols = [
      { field: 'vehicleInfo', header: 'Vehicle Info' },
      { field: 'May21', header: 'May 21' },
      { field: 'Apr21', header: 'Apr 21' },
      { field: 'Mar21', header: 'Mar 21' },
      { field: 'Feb21', header: 'Feb 21' },
      { field: 'Jan21', header: 'Jan 21' },
      { field: 'Dec20', header: 'Dec 21' },
      { field: 'Nov20', header: 'Nov 21' },
      { field: 'Oct20', header: 'Oct 21' },
      { field: 'Sep20', header: 'Sep 21' },
      { field: 'Aug20', header: 'Aug 21' }

  ];
//   this.frozenCols = [
//     { field: 'vehicleInfo', header: 'Vehicle Info' }
// ];
    this.vehiclelist = [
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Tiago",
          "vehicleNumber": "TN 69 A1234"
        },
        "primaryContact": {
          "contactName": "Prabu ganesan"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000,
          "Month":"May 21"
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 500,
          "pendingAmount": 500,
          "Month":"Apr 21"
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Mar 21"
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Feb 21"
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Jan 21"

        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Dec 20"

        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Nov 20"

        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Oct 20"

        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0,
          "Month":"Aug 20"

        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Bolt",
          "vehicleNumber": "TN 69 A 7863"
        },
        "primaryContact": {
          "contactName": "Shunmu"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Zest",
          "vehicleNumber": "TN 19 A 1263"
        },
        "primaryContact": {
          "contactName": "Shunmugam"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Tiago",
          "vehicleNumber": "TN 69 A1234"
        },
        "primaryContact": {
          "contactName": "Prabu ganesan"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 500,
          "pendingAmount": 500
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Bolt",
          "vehicleNumber": "TN 69 A 7863"
        },
        "primaryContact": {
          "contactName": "Shunmu"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Zest",
          "vehicleNumber": "TN 19 A 1263"
        },
        "primaryContact": {
          "contactName": "Shunmugam"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Tiago",
          "vehicleNumber": "TN 69 A1234"
        },
        "primaryContact": {
          "contactName": "Prabu ganesan"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 500,
          "pendingAmount": 500
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Bolt",
          "vehicleNumber": "TN 69 A 7863"
        },
        "primaryContact": {
          "contactName": "Shunmu"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Zest",
          "vehicleNumber": "TN 19 A 1263"
        },
        "primaryContact": {
          "contactName": "Shunmugam"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Tiago",
          "vehicleNumber": "TN 69 A1234"
        },
        "primaryContact": {
          "contactName": "Prabu ganesan"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 500,
          "pendingAmount": 500
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Bolt",
          "vehicleNumber": "TN 69 A 7863"
        },
        "primaryContact": {
          "contactName": "Shunmu"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Zest",
          "vehicleNumber": "TN 19 A 1263"
        },
        "primaryContact": {
          "contactName": "Shunmugam"
        },
        "May21": {
          "totalAmount": 1000,
          "receivedAmount": 0,
          "pendingAmount": 1000
        },
        "Apr21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Mar21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Feb21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Jan21": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Dec20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Nov20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Oct20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Sep20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        },
        "Aug20": {
          "totalAmount": 1000,
          "receivedAmount": 1000,
          "pendingAmount": 0
        }
      }
    ]
    
   }
  backButtonOnclick() {
    this.router.navigate(['menu'])
  }

  searchByKeyword(){
    console.log(this.queryText)
  }
  // amountCellClick(amountDetail){
  //   console.log("amount",amountDetail)
  // }
  vehicleCellClick(vehicle){
    console.log("vehicle",vehicle)
    this.router.navigate(['transactionHistory'])

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

