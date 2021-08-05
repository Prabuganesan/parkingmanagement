import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'rentPlanPopupList',
  templateUrl: 'rentPlanPopupList.html',
  styleUrls: ['rentPlanPopupList.scss']
})
export class rentPlanPopupList {
  public rentplans = []
  public tableName = 'rentPlan'
  public vehicleType;
  constructor(public router: Router,public config: DynamicDialogConfig,public ref: DynamicDialogRef,public popoverController: PopoverController,private translate: TranslateService,private dbprovider:dbProvider,private messageService: MessageService) {

    this.vehicleType = JSON.parse(JSON.stringify(config.data.vehicleType)); 

    this.fetchData()
  }
  backButtonOnclick(){
    this.popoverController.dismiss()
  }
  itemSelect(rentplan){
    this.ref.close(rentplan) 
   }


  fetchData(){
      this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.vehicleType': this.vehicleType, 'data.type': this.tableName }, sort: ['data.vehicleType'] }).then(res => {      if(res && res['status'] == "SUCCESS"){
        console.log(res)
        this.rentplans = res['records'];
      }
      else{
        this.messageService.add({ key:"rentPlanPopupList", severity: 'error', summary: res['message'], detail: ''});
      }
    })
  }

}
