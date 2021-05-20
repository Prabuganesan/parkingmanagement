import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { transactionEntrymodule } from './components/transactionEntry/transactionEntry.module';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService, MenuItem } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { transactionHistoryModule } from './pages/transactionHistory/transactionHistory.module';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {OrderListModule} from 'primeng/orderlist';
import { contactAssignment } from './pages/contactAssignment/contactAssignment';
import { contactListAgainstCar } from './pages/contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleAssignment } from './pages/alternateVehicleAssignment/alternateVehicleAssignment';
import { alternateVehicleList } from './pages/alternateVehicleList/alternateVehicleList';

@NgModule({
  declarations: [AppComponent,contactAssignment,contactListAgainstCar,alternateVehicleAssignment,alternateVehicleList],
  entryComponents: [],
  imports: [BrowserModule,DialogModule,CommonModule,OrderListModule,DynamicDialogModule, InputTextModule,FormsModule,RippleModule,ButtonModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, TableModule, transactionEntrymodule,DataViewModule, CalendarModule, ToastModule, RadioButtonModule,transactionHistoryModule,MenuModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MessageService,DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
