import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { vehicleSearch } from './vehicleSearch';
import { RouterModule, Routes } from '@angular/router';

import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

const routes: Routes = [
  {
    path: '',
    component: vehicleSearch,
  }
];

@NgModule({
  imports: [
    TableModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,ToastModule,InputTextModule,ButtonModule,RippleModule
  ],
  exports: [RouterModule],
  declarations: [vehicleSearch]
})
export class vehicleSearchModule {}
