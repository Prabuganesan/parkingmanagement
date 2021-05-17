import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,DialogModule,DynamicDialogModule, InputTextModule,FormsModule,RippleModule,ButtonModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, TableModule, transactionEntrymodule,DataViewModule, CalendarModule, ToastModule, RadioButtonModule,transactionHistoryModule,MenuModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MessageService,DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
