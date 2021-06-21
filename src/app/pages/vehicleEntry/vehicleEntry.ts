import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'vehicleEntry',
  templateUrl: 'vehicleEntry.html',
  styleUrls: ['vehicleEntry.scss'],
})
export class vehicleEntry {
  public vehicleObj: any = {};
  public vehicleandContactAssgObj: any = {};
  public contactId = "";
  public vehicleId = "";
  public formGroup: FormGroup;
  public tableName = 'vehicle'
  public assignmenttableName = 'vehicleContactAssignment'

  public savedSuccessMessage = 'Data saved sucessfully';

  constructor(public router: Router, private dbconfig: dbConfiguration, public formBuilder: FormBuilder, private dbprovider: dbProvider, private messageService: MessageService, public ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    if(config.data.mode == 'edit'){
      this.vehicleObj = JSON.parse(JSON.stringify(config.data.object)); 
    }
    else{
      this.initializeObjects(this.dbconfig.configuration.tableStructure)
      this.initializeAssignmentObjects(this.dbconfig.configuration.tableStructure)

    }
    this.createFormGroup();
    this.contactId = this.config.data.contactId;
    }
    initializeObjects(tableStructure) {
      this.vehicleObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
      this.vehicleObj['vehicleType'] = 'car';
    }
    initializeAssignmentObjects(tableStructure) {
      this.vehicleandContactAssgObj = JSON.parse(JSON.stringify(tableStructure[this.assignmenttableName]));
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
      console.log(this.vehicleObj)
      this.formGroup.patchValue({
        vehicle: {
          vehicleType: this.vehicleObj['vehicleType'],
          vehicleBrand: this.vehicleObj['vehicleBrand'],
          vehicleModel: this.vehicleObj['vehicleModel'],
          vehicleColor: this.vehicleObj['vehicleColor'],
          vehicleNumber: this.vehicleObj['vehicleNumber'].toUpperCase()

        }
      });
  
      if (this.formGroup.valid) {
        this.alreadyExistValidation().then(exist => {
          if (!exist) {
            this.dbprovider.save(this.tableName, this.vehicleObj).then(result => {
              if (result['status'] != 'SUCCESS') {
                this.messageService.add({ key: "vehicleEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
                return;
              }
              this.messageService.add({ key: "vehicleEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
              this.vehicleId = result['id'];
              this.saveContactAndVehicleAssignment()
  
            }).catch(error => {
              console.log(error)
              this.messageService.add({ key: "vehicleEntry", severity: 'error', summary: error, detail: '' });
  
            });
          } else {
            this.messageService.add({ key: "vehicleEntry", severity: 'error', summary: "Vehicle number already exist", detail: '', closable: true });
          }
        })
  
      }
      else{
        this.messageService.add({ key: "vehicleEntry", severity: 'error', summary: "Fill all fields", detail: '', closable: true });
      }
    }
  
    alreadyExistValidation() {
      var alreadyExist = false;
  
      if(this.config.data.mode == 'edit' && this.vehicleObj['vehicleNumber'].toUpperCase() == this.config.data.object.vehicleNumber.toUpperCase() ){
          return Promise.resolve(alreadyExist) 
      }
      return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.vehicleNumber' : this.vehicleObj['vehicleNumber'].toUpperCase(),'data.type':this.tableName }, sort: ['data.vehicleNumber'] }).then(res => {
        if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
          alreadyExist = true;
        }
        return alreadyExist;
      })
  
    }
    saveContactAndVehicleAssignment(){
      this.vehicleandContactAssgObj['contact_lookup'] = this.contactId
      this.vehicleandContactAssgObj['vehicle_lookup'] = this.vehicleId

      console.log(this.vehicleandContactAssgObj)
      this.dbprovider.save(this.assignmenttableName, this.vehicleandContactAssgObj).then(result => {
        console.log(result)
        if (result['status'] != 'SUCCESS'){
          console.log("Vehicle assignment save failed",result)
        }else{
          console.log("Vehicle assignment save Success")
        }
        setTimeout(() => this.ref.close('SUCCESS'), 1000);

      })
    }


}
