import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { alternateVehicleEntry } from '../alternateVehicleEntry/alternateVehicleEntry';

@Component({
  selector: 'alternateVehicleList',
  templateUrl: 'alternateVehicleList.html',
  styleUrls: ['alternateVehicleList.scss']
})
export class alternateVehicleList {
  vehicleList = []
  constructor(public router: Router,public popoverController: PopoverController) {

    this.vehicleList = [
      {
        "vehicleType": "Car",
        "vehicleBrand": "Tata",
        "vehicleModel": "Tiago",
        "vehicleNumber": "TN 69 A1234",
        "vehicleColor": "Blue",
        "addedBy": "Security1"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Mahindra",
        "vehicleModel": "xuv",
        "vehicleNumber": "TN 69 A3421",
        "vehicleColor": "Yellow",
        "addedBy": "Security2"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Tata",
        "vehicleModel": "Nexon",
        "vehicleNumber": "TN 19 A5471",
        "vehicleColor": "Green",
        "addedBy": "Security2"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Mahindra",
        "vehicleModel": "xuv",
        "vehicleNumber": "TN 69 A3421",
        "vehicleColor": "Yellow",
        "addedBy": "Security2"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Tata",
        "vehicleModel": "Nexon",
        "vehicleNumber": "TN 19 A5471",
        "vehicleColor": "Green",
        "addedBy": "Security2"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Tata",
        "vehicleModel": "Nexon",
        "vehicleNumber": "TN 19 A5471",
        "vehicleColor": "Green",
        "addedBy": "Security2"
      },
      {
        "vehicleType": "Car",
        "vehicleBrand": "Mahindra",
        "vehicleModel": "xuv",
        "vehicleNumber": "TN 69 A3421",
        "vehicleColor": "Yellow",
        "addedBy": "Security2"
      },
    ]
  }

  itemSelect(vehicle){

  }
  async addAlternateVehicle(){
    console.log("history")
    const popover = await this.popoverController.create({
      component: alternateVehicleEntry,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

}
