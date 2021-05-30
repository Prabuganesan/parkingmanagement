import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { applicationUserEntry } from './applicationUserEntry';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: applicationUserEntry,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,TranslateModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [applicationUserEntry]
})
export class applicationUserEntryModule {}
