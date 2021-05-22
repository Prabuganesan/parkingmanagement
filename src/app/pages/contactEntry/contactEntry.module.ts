import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { contactEntry } from './contactEntry';
import { RouterModule, Routes } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';


const routes: Routes = [
  {
    path: '',
    component: contactEntry,
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
  declarations: [contactEntry]
})
export class contactEntryModule {}
