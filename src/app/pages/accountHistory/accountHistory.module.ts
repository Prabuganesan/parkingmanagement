import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { accountHistory } from './accountHistory';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import {DataViewModule} from 'primeng/dataview';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: accountHistory,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,ButtonModule,RippleModule,MenuModule,DataViewModule,DynamicDialogModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [accountHistory]
})
export class accountHistoryModule {}
