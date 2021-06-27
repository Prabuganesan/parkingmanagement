import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'alternateVehicleEntry',
  templateUrl: 'alternateVehicleEntry.html',
  styleUrls: ['alternateVehicleEntry.scss'],
})
export class alternateVehicleEntry {
  public alternateVehicleObj: any = {};
  public vehicleObj: any = {};

  public contactId = "";
  public vehicleId = "";
  public formGroup: FormGroup;
  public tableName = 'alternateVehicle'

  public savedSuccessMessage = 'Data saved sucessfully';

  constructor(public router: Router, private dbconfig: dbConfiguration, public formBuilder: FormBuilder, private dbprovider: dbProvider, private messageService: MessageService, public ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    this.vehicleObj = JSON.parse(JSON.stringify(config.data.vehicle)); 

    if(config.data.mode == 'edit'){
      this.alternateVehicleObj = JSON.parse(JSON.stringify(config.data.object)); 
    }
    else{
      this.initializeObjects(this.dbconfig.configuration.tableStructure)

    }
    this.createFormGroup();
    this.contactId = this.config.data.contactId;
    }
    initializeObjects(tableStructure) {
      this.alternateVehicleObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
      this.alternateVehicleObj['vehicleType'] = 'bike';
    }
   
    createFormGroup() {
      this.formGroup = this.formBuilder.group({
        vehicle: this.formBuilder.group({
          vehicleType: ['', Validators.compose([Validators.required])],
          vehicleBrand: [''],
          vehicleModel: [''],
          vehicleColor: [''] , 
          vehicleNumber: ['',Validators.compose([Validators.required])],

        })
      });
     
    }

    saveAction() {
      console.log(this.alternateVehicleObj)
      this.formGroup.patchValue({
        vehicle: {
          vehicleType: this.alternateVehicleObj['vehicleType'],
          vehicleBrand: this.alternateVehicleObj['vehicleBrand'],
          vehicleModel: this.alternateVehicleObj['vehicleModel'],
          vehicleColor: this.alternateVehicleObj['vehicleColor'],
          vehicleNumber: this.alternateVehicleObj['vehicleNumber'].toUpperCase(),
        }
      });
  
      this.alternateVehicleObj['vehicle'] = this.vehicleObj['id']

      if (this.formGroup.valid) {
        this.alreadyExistValidation().then(exist => {
          if (!exist) {
            this.dbprovider.save(this.tableName, this.alternateVehicleObj).then(result => {
              if (result['status'] != 'SUCCESS') {
                this.messageService.add({ key: "alternateVehicleEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
                return;
              }
              this.messageService.add({ key: "alternateVehicleEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
              this.vehicleId = result['id'];
              setTimeout(() => this.ref.close('SUCCESS'), 1000);
  
            }).catch(error => {
              console.log(error)
              this.messageService.add({ key: "alternateVehicleEntry", severity: 'error', summary: error, detail: '' });
  
            });
          } else {
            this.messageService.add({ key: "alternateVehicleEntry", severity: 'error', summary: "Vehicle number already exist", detail: '', closable: true });
          }
        })
  
      }
      else{
        this.messageService.add({ key: "alternateVehicleEntry", severity: 'error', summary: "Fill all fields", detail: '', closable: true });
      }
    }
  
    alreadyExistValidation() {
      var alreadyExist = false;
  
      if(this.config.data.mode == 'edit' && this.alternateVehicleObj['vehicleNumber'].toUpperCase() == this.config.data.object.vehicleNumber.toUpperCase() ){
          return Promise.resolve(alreadyExist) 
      }
      return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.vehicleNumber' : this.alternateVehicleObj['vehicleNumber'].toUpperCase(),'data.type':this.tableName }, sort: ['data.vehicleNumber'] }).then(res => {
        if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
          alreadyExist = true;
        }
        return alreadyExist;
      })
  
    }

}
