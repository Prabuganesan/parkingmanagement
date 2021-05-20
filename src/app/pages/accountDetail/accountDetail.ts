import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { accountHistory } from '../accountHistory/accountHistory';

@Component({
  selector: 'accountDetail',
  templateUrl: 'accountDetail.html',
  styleUrls: ['accountDetail.scss'],
})
export class accountDetail {

  constructor(public router:Router,public popoverController: PopoverController) {}
  async accountHistory(){
    console.log("history")
    const popover = await this.popoverController.create({
      component: accountHistory,
      translucent: true,
      mode:'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
