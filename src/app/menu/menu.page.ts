import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { settingPage } from '../pages/settingPage/settingPage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  selectedLanguage = 'en'
  constructor(public router: Router, public popoverController: PopoverController,private translate: TranslateService) { }
  openMenu(id) {
    console.log(id)
    if (id == 1) {
      this.router.navigate(["/vehicleSearch"], {
        skipLocationChange: false
      });
    }
    else if (id == 2) {
      this.router.navigate(["/contactlistwithvehicleinfo"], {
        skipLocationChange: false
      });
    }
    else if (id == 3) {
      this.router.navigate(["/rentPlanList"], {
        skipLocationChange: false
      });
    }
    else if (id == 4) {
      this.router.navigate(["/applicationUserList"], {
        skipLocationChange: false
      });
    }
    else if (id == 6) {
      this.openSettingpage();
    }

    else {
      alert("Under development")
    }
  }
  logoutAction() {
    this.router.navigate(["startup"])
  }
  async openSettingpage() {
    const popover = await this.popoverController.create({
      component: settingPage,
      translucent: true,
      mode: 'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  switchLanguage() {
    // this.translate.setDefaultLang('en');
    if(this.selectedLanguage == 'en')
    {
      this.translate.setDefaultLang('ta');
      this.translate.use('ta')
      this.selectedLanguage = 'ta'

    }
    else{
      this.translate.setDefaultLang('en');
      this.translate.use('en')
      this.selectedLanguage = 'en'
    }

  }

}
