import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { contactAssignment } from './contactAssignment';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BrowserModule } from '@angular/platform-browser';
import {OrderListModule} from 'primeng/orderlist';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: contactAssignment
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,RadioButtonModule,BrowserModule,OrderListModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [contactAssignment]
})
export class contactAssignmentModule {}
