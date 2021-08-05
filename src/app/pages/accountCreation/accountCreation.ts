import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';
import { rentPlanPopupList } from '../rentPlanPopupList/rentPlanPopupList';

@Component({
  selector: 'accountCreation',
  templateUrl: 'accountCreation.html',
  styleUrls: ['accountCreation.scss'],
})
export class accountCreation {
  openDate;
  closeDate;
  selectedRentPlan;
  accountObj;
  public tableName = 'account'
  selectedVehicle;
  public savedSuccessMessage = 'Data saved successfully';


  constructor(public router:Router,private dbconfig: dbConfiguration, private messageService: MessageService,private dbprovider:dbProvider,public popoverController: PopoverController,public dialogService: DialogService,private translate: TranslateService,public config: DynamicDialogConfig,public ref: DynamicDialogRef) {
    this.selectedVehicle = JSON.parse(JSON.stringify(config.data.vehicle)); 
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    this.openDate = localISOTime

    this.initializeObjects(this.dbconfig.configuration.tableStructure)

  }

  initializeObjects(tableStructure) {
    this.accountObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
  }
  async openRentPlanList(){


    const ref = this.dialogService.open(rentPlanPopupList, {
      header: this.translate.instant('rentPlanList.title'),
      width: '50%',
      data: { 'vehicleType': this.selectedVehicle.vehicleType }


    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.selectedRentPlan = res;
      }
    });

  }

  saveAction(){
    if(this.selectedRentPlan)
    {
      this.accountObj['openDate'] = new Date(this.openDate).getTime();
      this.accountObj['rentPlan_lookup'] = this.selectedRentPlan.id
      this.accountObj['vehicle'] = this.selectedVehicle['id']
      console.log( this.accountObj)
      this.dbprovider.save(this.tableName, this.accountObj).then(result => {
        if (result['status'] != 'SUCCESS') {
          this.messageService.add({ key: "accCreation", severity: 'error', summary: result['message'], detail: '', closable: true });
          return;
        }
        this.messageService.add({ key: "accCreation", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
        setTimeout(() => this.ref.close('SUCCESS'), 1000);

      }).catch(error => {
        console.log(error)
        this.messageService.add({ key: "accCreation", severity: 'error', summary: error, detail: '' });

      });
    }
    else
    {
      this.messageService.add({ key: "accCreation", severity: 'error', summary: "Choose rent plan", detail: '', closable: true });

    }
   
  }
}
