import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'alternateVehicleAssignment',
  templateUrl: 'alternateVehicleAssignment.html',
  styleUrls: ['alternateVehicleAssignment.scss']
})
export class alternateVehicleAssignment {
  vehicleList = []
  constructor(public router: Router) {

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

}
