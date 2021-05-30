import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { alternateVehicleEntry } from './alternateVehicleEntry';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';


const routes: Routes = [
  {
    path: '',
    component: alternateVehicleEntry,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,InputTextModule,RadioButtonModule
  ],
  exports: [RouterModule],
  declarations: [alternateVehicleEntry]
})
export class alternateVehicleEntryModule {}
