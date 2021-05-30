
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import { transactionEntry } from './transactionEntry';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [transactionEntry],
  imports: [
    CommonModule,CalendarModule,RadioButtonModule,FormsModule,ButtonModule,RippleModule,TranslateModule
  ],
  entryComponents: [transactionEntry],
  exports: [
    transactionEntry
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class transactionEntrymodule {

}