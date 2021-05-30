import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { transactionHistory } from './transactionHistory';
import { RouterModule, Routes } from '@angular/router';

import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: transactionHistory,
  }
];

@NgModule({
  imports: [
    TableModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,ToastModule,RippleModule,ButtonModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [transactionHistory]
})
export class transactionHistoryModule {}
