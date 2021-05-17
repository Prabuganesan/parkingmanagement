import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'contactListWithVehicleInfo',
  templateUrl: 'contactListWithVehicleInfo.html',
  styleUrls: ['contactListWithVehicleInfo.scss'],
})
export class contactListWithVehicleInfo {

  contactList = []
  vehicleList = []
  items: MenuItem[];
  active;

  constructor(public router: Router) {
    this.contactList = [
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":1 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 }, 
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0  },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 }
    ]

    this.items = [{
      label: 'Actions',
      items: [{
        label: 'Assign Contact',
        icon: 'pi pi-angle-right',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Contact List',
        icon: 'pi pi-angle-right',
        command: () => {
          this.delete();
        }
      },
      {
        label: 'Create Account',
        icon: 'pi pi-angle-right',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Assign Alternate vehicle',
        icon: 'pi pi-angle-right',
        command: () => {
          this.delete();
        }
      },
      {
        label: 'Alternate vehicle List',
        icon: 'pi pi-angle-right',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Account detail',
        icon: 'pi pi-angle-right',
        command: () => {
          this.delete();
        }
      }
      ]
    }
    ];

    this.vehicleList = [
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Tiago",
          "vehicleNumber": "TN 69 A1234",
          "vehicleColor": "Blue",
          "addedBy": "Security1"
        },
        "accountInfo": { "openDate": "02/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 1000 },
        "additionalContacts": [{
          "contactName": "Prabu ganesan",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Mahindra",
          "vehicleModel": "xuv",
          "vehicleNumber": "TN 69 A3421",
          "vehicleColor": "Yellow",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "05/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Nexon",
          "vehicleNumber": "TN 19 A5471",
          "vehicleColor": "Green",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "10/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 1500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Prabu",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Mahindra",
          "vehicleModel": "xuv",
          "vehicleNumber": "TN 69 A3421",
          "vehicleColor": "Yellow",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "05/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Nexon",
          "vehicleNumber": "TN 19 A5471",
          "vehicleColor": "Green",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "10/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 1500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Prabu",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Tata",
          "vehicleModel": "Nexon",
          "vehicleNumber": "TN 19 A5471",
          "vehicleColor": "Green",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "10/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 1500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Prabu",
          "contactMobile": "9842785242"
        }]
      },
      {
        "vehicleInfo": {
          "vehicleType": "Car",
          "vehicleBrand": "Mahindra",
          "vehicleModel": "xuv",
          "vehicleNumber": "TN 69 A3421",
          "vehicleColor": "Yellow",
          "addedBy": "Security2"
        },
        "accountInfo": { "openDate": "05/02/2021 10:10 Am" },
        "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 500 },
        "additionalContacts": [{
          "contactName": "Shunmu",
          "contactMobile": "9842785242"
        },
        {
          "contactName": "Shunmugam",
          "contactMobile": "9842785242"
        }]
      },
    ]

  }

  itemSelect(contact){
    console.log(contact)
    contact.selected = 1;
    }
  update() {
    console.log("update")
  }
  delete() {
    console.log("delete")
  }

  contactAddButtonclick() {
    console.log("add contact")
  }

  backButtonOnclick() {
    this.router.navigate(['menu'])
  }
  moreActionclick() {
    console.log("more")
  }
  searchByKeyword() {
    console.log("search")
  }
  vehicleAddButtonclick() {
    console.log("add vehicle")
  }
}
