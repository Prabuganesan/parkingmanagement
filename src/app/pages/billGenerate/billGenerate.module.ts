import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { billGenerate } from './billGenerate';
import { RouterModule, Routes } from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { LogMonitorModule } from 'ngx-log-monitor';


const routes: Routes = [
  {
    path: '',
    component: billGenerate,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,DialogModule,ButtonModule,InputTextModule,ToastModule,TranslateModule,LogMonitorModule
  ],
  exports: [RouterModule],
  declarations: [billGenerate]
})
export class billGenerateModule {}
