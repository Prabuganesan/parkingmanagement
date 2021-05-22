import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { rentPlanPopupList } from '../rentPlanPopupList/rentPlanPopupList';

@Component({
  selector: 'accountCreation',
  templateUrl: 'accountCreation.html',
  styleUrls: ['accountCreation.scss'],
})
export class accountCreation {
  openDate;
  closeDate;
  constructor(public router:Router,public popoverController: PopoverController) {}
  async openRentPlanList(){
    const popover = await this.popoverController.create({
      component: rentPlanPopupList,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
