import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { transactionEntrymodule } from './components/transactionEntry/transactionEntry.module';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { accountCreation } from './pages/accountCreation/accountCreation';
import { accountDetail } from './pages/accountDetail/accountDetail';
import { accountHistory } from './pages/accountHistory/accountHistory';
import { rentPlanPopupList } from './pages/rentPlanPopupList/rentPlanPopupList';
import { MenuPage } from './menu/menu.page';
import { rentPlanEntry } from './pages/rentPlanEntry/rentPlanEntry';
import { applicationUserEntry } from './pages/applicationUserEntry/applicationUserEntry';
import { settingPage } from './pages/settingPage/settingPage';
import { vehicleEntry } from './pages/vehicleEntry/vehicleEntry';
import { contactEntry } from './pages/contactEntry/contactEntry';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { alternateVehicleEntry } from './pages/alternateVehicleEntry/alternateVehicleEntry';
import { dbConfiguration } from './core/dbConfiguration';
import { dbProvider } from './core/dbProvider';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {LogMonitorModule} from 'ngx-log-monitor';
import { billGenerate } from './pages/billGenerate/billGenerate';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,MenuPage,rentPlanEntry,settingPage,vehicleEntry,contactEntry,applicationUserEntry,contactAssignment,contactListAgainstCar,alternateVehicleAssignment,alternateVehicleList,accountCreation,accountDetail,accountHistory,rentPlanPopupList,alternateVehicleEntry,billGenerate],
  entryComponents: [],
  imports: [BrowserModule,DialogModule,CommonModule,HttpClientModule,OrderListModule,DynamicDialogModule, InputTextModule,FormsModule,RippleModule,ButtonModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, TableModule, transactionEntrymodule,DataViewModule, CalendarModule, ToastModule, RadioButtonModule,transactionHistoryModule,
    MenuModule,NgxPubSubModule,ReactiveFormsModule,DropdownModule,ConfirmDialogModule,LogMonitorModule,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }})
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MessageService,DialogService,dbConfiguration,dbProvider,DatePipe,FormBuilder,ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
