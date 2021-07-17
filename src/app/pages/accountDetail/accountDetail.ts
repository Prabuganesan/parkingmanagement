import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { accountHistory } from '../accountHistory/accountHistory';
import { dbProvider } from 'src/app/core/dbProvider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { accountCreation } from '../accountCreation/accountCreation';
@Component({
  selector: 'accountDetail',
  templateUrl: 'accountDetail.html',
  styleUrls: ['accountDetail.scss'],
})
export class accountDetail {
  public tableName = 'account'
  public vehicleTableName = 'vehicle'

  selectedVehicle;
  selectedAccount;
  public savedSuccessMessage = 'Account closed successfully';

public accountList = []
  constructor(private confirmationService: ConfirmationService,public router:Router,public popoverController: PopoverController,private translate: TranslateService,public dialogService: DialogService,private messageService: MessageService,private dbprovider:dbProvider,public config: DynamicDialogConfig) {
    this.selectedVehicle = JSON.parse(JSON.stringify(config.data.vehicle)); 
    this.fetchAccounts()
  }
  async accountHistory(){
    console.log("history")

    const ref = this.dialogService.open(accountHistory, {
      header: this.translate.instant('accountHistory.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }
    });
  
  }

  createAccount(){
    console.log("account creation")

    const ref = this.dialogService.open(accountCreation, {
      header: this.translate.instant('accountCreation.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }
    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
         this.fetchAccounts();
      }
    });
  }
  closeAccount(){
    console.log('close call')

    this.confirmationService.confirm({
      message: 'Are you sure that you want to close this account?',
      accept: () => {          
          this.selectedAccount['closeDate'] = new Date().getTime();
          this.dbprovider.save(this.tableName, this.selectedAccount).then(result => {
            if (result['status'] != 'SUCCESS') {
              this.messageService.add({ key: "accountDetail", severity: 'error', summary: result['message'], detail: '', closable: true });
              return;
            }
            this.messageService.add({ key: "accountDetail", severity: 'success', summary: this.savedSuccessMessage, detail: '' });   
            this.fetchAccounts() 
          }).catch(error => {
            console.log(error)    
          });


      }
  });
  }


  fetchAccounts(){
    this.selectedAccount = null;
    this.dbprovider.fetchChildDocsWithRelationshipByParentTypeAndId(this.tableName,this.vehicleTableName ,this.selectedVehicle.id,true,{'masterandlookupreference':['rentPlan']}).then(res => {
      console.log(res)
      if(res && res['status'] == "SUCCESS"){
        if(res['records'].length>0)
        {
          res['records'].forEach(element => {
            if(!element.closeDate){
              this.selectedAccount = element;
            }
          });
        }
        this.accountList = res['records']
      }
      else{
        this.messageService.add({ key:"accountDetail", severity: 'error', summary: res['message'], detail: ''});
      }
    })
  }
}
