import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { dbProvider } from 'src/app/core/dbProvider';


@Component({
  selector: 'accountHistory',
  templateUrl: 'accountHistory.html',
  styleUrls: ['accountHistory.scss'],
})
export class accountHistory {
  public tableName = 'account'
  public vehicleTableName = 'vehicle'

  accountList=[];
  selectedVehicle;
    constructor(public dialogService: DialogService,public config: DynamicDialogConfig,public popoverController: PopoverController,private messageService: MessageService,private dbprovider:dbProvider) { 
      this.selectedVehicle = JSON.parse(JSON.stringify(config.data.vehicle)); 
      this.fetchAccounts()
    }

    fetchAccounts(){
      this.dbprovider.fetchChildDocsWithRelationshipByParentTypeAndId(this.tableName,this.vehicleTableName ,this.selectedVehicle.id,true,{'masterandlookupreference':['rentPlan']}).then(res => {
         console.log(res)
        if(res && res['status'] == "SUCCESS"){
          this.accountList = res['records']
        }
        else{
          this.messageService.add({ key:"accountHistory", severity: 'error', summary: res['message'], detail: ''});
        }
      })
    }
    
  
}
