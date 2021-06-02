import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { vehicleInfoDetail } from './vehicleInfoDetail';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: vehicleInfoDetail,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,ButtonModule,RippleModule,MenuModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [vehicleInfoDetail]
})
export class vehicleInfoDetailModule {}
