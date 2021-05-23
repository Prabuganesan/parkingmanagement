import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { contactAssignment } from '../contactAssignment/contactAssignment';
import { PopoverController } from '@ionic/angular';
import { contactListAgainstCar } from '../contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleAssignment } from '../alternateVehicleAssignment/alternateVehicleAssignment';
import { alternateVehicleList } from '../alternateVehicleList/alternateVehicleList';
import { accountCreation } from '../accountCreation/accountCreation';
import { accountDetail } from '../accountDetail/accountDetail';
import { vehicleEntry } from '../vehicleEntry/vehicleEntry';
import { contactEntry } from '../contactEntry/contactEntry';
import {Location} from '@angular/common';

@Component({
  selector: 'vehicleInfoDetail',
  templateUrl: 'vehicleInfoDetail.html',
  styleUrls: ['vehicleInfoDetail.scss'],
})
export class vehicleInfoDetail {

  contactList = []
  fullVehicleList = []
  vehicle;
  items: MenuItem[];
  active;
  queryText = "";

  constructor(public router: Router,public dialogService: DialogService,public popoverController: PopoverController,private location : Location) {
    this.vehicle = {
      "vehicleInfo": {
        "vehicleType": "Car",
        "vehicleBrand": "Mahindra",
        "vehicleModel": "xuv",
        "vehicleNumber": "TN 69 A3421",
        "vehicleColor": "Yellow",
        "addedBy": "Security2"
      },
      "accountInfo": { "openDate": "05/02/2021 10:10 Am","totalBillAmount":2000,"receivedAmount":1000 },
      "rentPlanInfo": { "rentPlan": "Plan1", "rentAmount": 500 },
      "additionalContacts": [{
        "contactName": "Shunmu",
        "contactMobile": "9842785242"
      },
      {
        "contactName": "Shunmugam",
        "contactMobile": "9842785242"
      },
      {
        "contactName": "prabu ganesan",
        "contactMobile": "9842785242"
      },
      {
        "contactName": "Prabu",
        "contactMobile": "9842785242"
      },
      {
        "contactName": "prabu ganesan",
        "contactMobile": "9842785242"
      },
      {
        "contactName": "Prabu",
        "contactMobile": "9842785242"
      }]
    }
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
  async createAccount(){
    const popover = await this.popoverController.create({
      component: accountCreation,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
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
  async accountDetail(){
    const popover = await this.popoverController.create({
      component: accountDetail,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    

  }

  async contactAddButtonclick() {
    console.log("add contact")
    const popover = await this.popoverController.create({
      component: contactEntry,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  backButtonOnclick() {
    this.location.back();
  }
  moreActionclick() {
    console.log("more")
  }
  searchByKeyword() {
    console.log("search")
  }
  async vehicleAddButtonclick() {
    console.log("add vehicle")
    const popover = await this.popoverController.create({
      component: vehicleEntry,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
