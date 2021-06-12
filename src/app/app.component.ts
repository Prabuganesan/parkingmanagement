import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from './core/dbProvider';
import { Platform } from '@ionic/angular';
import { appUtility } from './core/appUtility';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public translate: TranslateService,private dbprovider:dbProvider,private plt: Platform,private util:appUtility) {
    this.translate.use('en');
    if (!this.plt.is('cordova')) {
        this.util.isMobile = false
    }
    this.dbprovider.initializePouchDb()

  }
 
}
