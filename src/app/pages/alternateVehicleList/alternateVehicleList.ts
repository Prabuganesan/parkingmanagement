import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { dbProvider } from 'src/app/core/dbProvider';
import { alternateVehicleEntry } from '../alternateVehicleEntry/alternateVehicleEntry';

@Component({
  selector: 'alternateVehicleList',
  templateUrl: 'alternateVehicleList.html',
  styleUrls: ['alternateVehicleList.scss']
})
export class alternateVehicleList {
  vehicleList = []
  selectedVehicle;
  public tableName = 'alternateVehicle'
public vehicleTableName = 'vehicle'
  constructor(public router: Router,public popoverController: PopoverController,private translate: TranslateService,private messageService: MessageService,private dbprovider:dbProvider,public config: DynamicDialogConfig,public dialogService: DialogService) {
    this.selectedVehicle = JSON.parse(JSON.stringify(config.data.vehicle)); 
    this.fetchAlternateVehicles()
  }

  async createAlternateVehicle(){
      console.log("alternate vehicle detail")

      const ref = this.dialogService.open(alternateVehicleEntry, {
        header: this.translate.instant('alternateVehicle.title'),
        width: '50%',
        data: { 'vehicle': this.selectedVehicle,'object':'','mode':'new'}
  
  
      });
      ref.onClose.subscribe(res => {
           this.fetchAlternateVehicles()
      });
  }
  fetchAlternateVehicles(){
    this.dbprovider.fetchDocsWithoutRelationshipByParentTypeAndId(this.tableName,this.vehicleTableName ,this.selectedVehicle.id).then(res => {
      console.log(res)
      if(res && res['status'] == "SUCCESS"){
        this.vehicleList = res['records']
      }
      else{
        this.messageService.add({ key:"alternateVehicleList", severity: 'error', summary: res['message'], detail: ''});
      }
    })
  }

  itemSelect(vehicle){
    const ref = this.dialogService.open(alternateVehicleEntry, {
      header: this.translate.instant('alternateVehicle.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle,'object':vehicle,'mode':'edit'}


    });
    ref.onClose.subscribe(res => {
         this.fetchAlternateVehicles()
    });
  }

}
