
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'transactionEntry',
  templateUrl: './transactionEntry.html',
  styleUrls: ['./transactionEntry.scss'],
})
export class transactionEntry implements OnInit {


  amountDetail;
  amount;
  monthName;
  discount = 0;
  totalPayable;
  paymentMode = 'cash';
  billdate;
 
  // Lookup
  cspfmEditorType = '';
  constructor(private popoverController: PopoverController,private translate: TranslateService) {

  }


  ngOnInit() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    // document.getElementById("myLocalDate")['value'] = localISOTime;
    this.billdate = localISOTime
    this.amount = this.amountDetail.pendingAmount;
    this.totalPayable = this.amount - this.discount;
this.monthName = this.amountDetail.Month;
  }
  ngAfterViewInit() {

  }
  closePopover() {
    this.popoverController.dismiss()
  }
  onInputTime(event) {
    this.totalPayable = event.target.value - this.discount;
    this.amount = event.target.value
  }
  onInputTime1(event) {
    this.totalPayable = this.amount - event.target.value;
    this.discount = event.target.value
  }

  save(){

    console.log("Amount : ",this.amount, "Discount :",this.discount,"Payable :",this.totalPayable,"Mode :",this.paymentMode,"Bill date :",this.billdate)
  }
}

