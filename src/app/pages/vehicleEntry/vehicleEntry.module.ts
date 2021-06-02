import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { vehicleEntry } from './vehicleEntry';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: vehicleEntry,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,RadioButtonModule,TranslateModule
  ],
  exports: [RouterModule],
  declarations: [vehicleEntry]
})
export class vehicleEntryModule {}
