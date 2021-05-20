import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { contactAssignment } from '../contactAssignment/contactAssignment';
import { PopoverController } from '@ionic/angular';
import { contactListAgainstCar } from '../contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleAssignment } from '../alternateVehicleAssignment/alternateVehicleAssignment';
import { alternateVehicleList } from '../alternateVehicleList/alternateVehicleList';

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

  constructor(public router: Router,public dialogService: DialogService,public popoverController: PopoverController) {
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
          this.assignContact();
        }
      },
      {
        label: 'Contact List',
        icon: 'pi pi-angle-right',
        command: () => {
          this.showContactList();
        }
      },
      {
        label: 'Create Account',
        icon: 'pi pi-angle-right',
        command: () => {
          this.createAccount();
        }
      },
      {
        label: 'Assign Alternate vehicle',
        icon: 'pi pi-angle-right',
        command: () => {
          this.assignAlternateVehicle();
        }
      },
      {
        label: 'Alternate vehicle List',
        icon: 'pi pi-angle-right',
        command: () => {
          this.alternateVehicleList();
        }
      },
      {
        label: 'Account detail',
        icon: 'pi pi-angle-right',
        command: () => {
          this.accountDetail();
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

  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  async assignContact(){

    const popover = await this.popoverController.create({
      component: contactAssignment,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();

  //   console.log("user add")
  //   const ref = this.dialogService.open(contactAssignment, {
  //     header: 'Contact assignment',
  //     width: '70%'
  // });
  }
  async showContactList(){
    const popover = await this.popoverController.create({
      component: contactListAgainstCar,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  createAccount(){

  }
  async assignAlternateVehicle(){
    const popover = await this.popoverController.create({
      component: alternateVehicleAssignment,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    
  }
  async alternateVehicleList(){

    const popover = await this.popoverController.create({
      component: alternateVehicleList,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    

  }
  accountDetail(){

  }
  itemSelect(contact){
    console.log(contact)
    contact.selected = 1;
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
