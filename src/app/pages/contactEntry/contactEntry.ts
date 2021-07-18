import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'contactEntry',
  templateUrl: 'contactEntry.html',
  styleUrls: ['contactEntry.scss'],
})
export class contactEntry {
  public contactObj: any = {};
  public formGroup: FormGroup;
  public tableName = 'contact'
  public savedSuccessMessage = 'Data saved successfully';
  public contactType = "";
  public vehicleandContactAssgObj: any = {};
  public assignmenttableName = 'vehicleContactAssignment'
  public vehicleId;
  public contactId;

  constructor(public router: Router, private dbconfig: dbConfiguration, public formBuilder: FormBuilder, private dbprovider: dbProvider, private messageService: MessageService, public ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    this.contactType = this.config.data.contactType;
    this.vehicleId = this.config.data.vehicleId;
    if(config.data.mode == 'edit'){
      this.contactObj = JSON.parse(JSON.stringify(config.data.object)); 
    }
    else{
      this.initializeObjects(this.dbconfig.configuration.tableStructure)
      this.initializeAssignmentObjects(this.dbconfig.configuration.tableStructure)
    }
    this.createFormGroup();
    }

    initializeAssignmentObjects(tableStructure) {
      this.vehicleandContactAssgObj = JSON.parse(JSON.stringify(tableStructure[this.assignmenttableName]));
    }
    initializeObjects(tableStructure) {
      this.contactObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
      if(this.contactType == 'Primary'){
        this.contactObj['contactType'] = 'owner';
      }
      else{
        this.contactObj['contactType'] = 'others';

      }
    }
  
    createFormGroup() {
      this.formGroup = this.formBuilder.group({
        contact: this.formBuilder.group({
          contactName: ['', Validators.compose([Validators.maxLength(80), Validators.required])],
          contactNameInTamil: [''],
          contactMobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] , 
          licenseNumber: [''],

        })
      });
     
    }

    saveAction() {
      console.log(this.contactObj)
      this.formGroup.patchValue({
        contact: {
          contactName: this.contactObj['contactName'],
          contactNameInTamil: this.contactObj['contactNameInTamil'],
          contactMobile: this.contactObj['contactMobile'],
          licenseNumber: this.contactObj['licenseNumber']

        }
      });
  
      if (this.formGroup.valid) {
        this.alreadyExistValidation().then(exist => {
          if (!exist) {
            this.dbprovider.save(this.tableName, this.contactObj).then(result => {
              if (result['status'] != 'SUCCESS') {
                this.messageService.add({ key: "contactEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
                return;
              }
              this.messageService.add({ key: "contactEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
              this.contactId = result['id'];
              if(this.config.data.mode != 'edit' && this.contactObj['contactType'] == 'others')
              {
                 this.saveContactAndVehicleAssignment()
              }else{
                setTimeout(() => this.ref.close('SUCCESS'), 1000);
              }
  
            }).catch(error => {
              console.log(error)
              this.messageService.add({ key: "contactEntry", severity: 'error', summary: error, detail: '' });
  
            });
          } else {
            this.messageService.add({ key: "contactEntry", severity: 'error', summary: "Mobile number already exist", detail: '', closable: true });
          }
        })
  
      }
      else{
        this.messageService.add({ key: "contactEntry", severity: 'error', summary: "Fill all fields", detail: '', closable: true });
      }
    }
  
    alreadyExistValidation() {
      var alreadyExist = false;
  
      if(this.config.data.mode == 'edit' && this.contactObj['contactMobile'] == this.config.data.object.contactMobile ){
          return Promise.resolve(alreadyExist) 
      }
      return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.contactMobile' : this.contactObj['contactMobile'],'data.type':this.tableName }, sort: ['data.contactMobile'] }).then(res => {
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
