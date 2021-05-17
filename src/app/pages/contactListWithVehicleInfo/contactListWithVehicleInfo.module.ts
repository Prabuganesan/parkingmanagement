import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { contactListWithVehicleInfo } from './contactListWithVehicleInfo';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';

const routes: Routes = [
  {
    path: '',
    component: contactListWithVehicleInfo,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,ButtonModule,RippleModule,MenuModule
  ],
  exports: [RouterModule],
  declarations: [contactListWithVehicleInfo]
})
export class contactListWithVehicleInfoModule {}
