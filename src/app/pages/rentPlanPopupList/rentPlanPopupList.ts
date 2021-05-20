import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'rentPlanPopupList',
  templateUrl: 'rentPlanPopupList.html',
  styleUrls: ['rentPlanPopupList.scss']
})
export class rentPlanPopupList {
  rentplans = []
  constructor(public router: Router,public popoverController: PopoverController) {

    this.rentplans = [{
      "rentPlan": "Car Plan 1",
      "rentAmount": 500,
      "vehicleType": "Car"
    },
    {
      "rentPlan": " Car Plan 2",
      "rentAmount": 400,
      "vehicleType": "Car"
    },
    {
      "rentPlan": "Car Plan 3",
      "rentAmount": 600,
      "vehicleType": "Car"
    },
    {
      "rentPlan": "Auto Plan 1",
      "rentAmount": 400,
      "vehicleType": "Auto"
    },
    {
      "rentPlan": "Auto Plan 2",
      "rentAmount": 600,
      "vehicleType": "Auto"
    }]
  }
  backButtonOnclick(){
    this.popoverController.dismiss()
  }
  itemSelect(rentplan){
    this.popoverController.dismiss()
  }

}
