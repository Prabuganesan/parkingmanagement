import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { startup } from './startup';
import { RouterModule, Routes } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';


const routes: Routes = [
  {
    path: '',
    component: startup,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,DialogModule,ButtonModule,InputTextModule
  ],
  exports: [RouterModule],
  declarations: [startup]
})
export class startupModule {}
