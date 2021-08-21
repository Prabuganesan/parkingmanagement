
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'transactionEntry',
  templateUrl: './transactionEntry.html',
  styleUrls: ['./transactionEntry.scss'],
})
export class transactionEntry implements OnInit {
  @Input("billdetail") billdetail;

  amount;
  totalPendingAmount = 0;
  monthName;
  discount = 0;
  totalPayable;
  paymentMode = 'cash';
  billdate;
  transactionObj;
  tableName = 'transaction'
  billTableName = 'billDetail'
  accountTableName = 'account'

  receivedFrom=''
  account;
  public savedSuccessMessage = 'Data saved successfully';

  // Lookup
  cspfmEditorType = '';
  constructor(private dbconfig: dbConfiguration,private dbprovider:dbProvider,public alertController: AlertController, private popoverController: PopoverController, private messageService: MessageService, private translate: TranslateService) {

  }


  ngOnInit() {
    console.log(this.billdetail)
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    this.billdate = localISOTime
    this.amount = this.billdetail.pendingAmount;
    this.totalPayable = this.amount - this.discount;
    this.monthName = this.billdetail.Month;
    this.totalPendingAmount = this.billdetail.totalAmount;
    this.fetchAccount(this.billdetail.account)
  }

  fetchAccount(accountId){
    this.dbprovider.fetchDocWithoutRelationshipByTypeAndId(this.accountTableName,accountId).then(res=>{
      console.log(res)
      if(res && res['status'] == "SUCCESS"){
        if(res['records'].length>0){
            this.account = res['records'][0]
        }
      }
    })
  }
  ngAfterViewInit() {

  }
  closePopover() {
    this.popoverController.dismiss()
  }
  onInputAmount(event) {
    this.totalPayable = event.target.value - this.discount;
    this.amount = event.target.value
  }
  onInputDiscount(event) {
    this.totalPayable = this.amount - event.target.value;
    this.discount = event.target.value
  }

  onInputReceivedFrom(event){
    this.receivedFrom = event.target.value

  }

  save() {

    console.log(this.transactionObj)
    if (this.billdetail.pendingAmount < this.amount) {
      this.presentAlert()
    }else{
      var tableStructure = this.dbconfig.configuration.tableStructure
      this.transactionObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
  
      this.transactionObj['transactionAmount'] = Number(this.amount)
      this.transactionObj['transactionMode'] = this.paymentMode
      this.transactionObj['discountAmount'] = Number(this.discount)
      this.transactionObj['transactionDate'] = new Date(this.billdate).getTime(); 
      this.transactionObj['paidAmount'] = Number(this.totalPayable)
      this.transactionObj['billDetail'] = this.billdetail['id']
      this.transactionObj['receivedFrom'] = this.receivedFrom

      this.dbprovider.save(this.tableName, this.transactionObj).then(result => {
        if (result['status'] != 'SUCCESS') {
          this.messageService.add({ key: "transactionEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
          return;
        }
        this.messageService.add({ key: "transactionEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
        this.saveBill()

      }).catch(error => {
        console.log(error)
        this.messageService.add({ key: "transactionEntry", severity: 'error', summary: error, detail: '' });

      });

    }
    
  }
  saveBill(){
    this.billdetail['receivedAmount'] = this.billdetail['receivedAmount'] + Number(this.amount);
    this.billdetail['pendingAmount'] = this.billdetail['pendingAmount'] - Number(this.amount);

    this.dbprovider.save(this.billTableName, this.billdetail).then(result => {
    console.log(result)
    if (result['status'] == 'SUCCESS') {
      this.billdetail['rev'] = result['rev']
    }
    this.saveAccount()
    }).catch(error => {
      this.popoverController.dismiss()
      console.log(error)
    });
  }
  saveAccount(){
    this.account['receivedAmount'] = this.account['receivedAmount'] + Number(this.amount);
    this.dbprovider.save(this.accountTableName, this.account).then(result => {
    console.log(result)
    this.popoverController.dismiss()

    }).catch(error => {
      this.popoverController.dismiss()
      console.log(error)
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Entered amount is greater than pending amount',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}

