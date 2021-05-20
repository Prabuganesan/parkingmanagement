import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { rentPlanPopupList } from './rentPlanPopupList';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BrowserModule } from '@angular/platform-browser';
import {OrderListModule} from 'primeng/orderlist';


const routes: Routes = [
  {
    path: '',
    component: rentPlanPopupList
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,RadioButtonModule,BrowserModule,OrderListModule
  ],
  exports: [RouterModule],
  declarations: [rentPlanPopupList]
})
export class rentPlanPopupListModule {}
