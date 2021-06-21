import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'rentPlanEntry',
  templateUrl: 'rentPlanEntry.html',
  styleUrls: ['rentPlanEntry.scss'],
})
export class rentPlanEntry {
  public rentPlanObj: any = {};
  public formGroup: FormGroup;
  public tableName = 'rentPlan'
  public savedSuccessMessage = 'Data saved sucessfully';
  constructor(public router: Router, private dbconfig: dbConfiguration, public formBuilder: FormBuilder, private dbprovider: dbProvider, private messageService: MessageService, public ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    if(config.data.mode == 'edit'){
      this.rentPlanObj = JSON.parse(JSON.stringify(config.data.object)); 
    }
    else{
      this.initializeObjects(this.dbconfig.configuration.tableStructure)
    }
    this.createFormGroup();
  }

  initializeObjects(tableStructure) {
    this.rentPlanObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
    this.rentPlanObj['vehicleType'] = 'car';
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      rentplan: this.formBuilder.group({
        rentPlan: ['', Validators.compose([Validators.maxLength(80), Validators.required])],
        rentAmount: ['',Validators.compose([Validators.required])],
        vehicleType: ['', Validators.compose([Validators.required])]
      })
    });
   
  }
  saveAction() {
    console.log(this.rentPlanObj)
    this.formGroup.patchValue({
      rentplan: {
        rentPlan: this.rentPlanObj['rentPlan'],
        rentAmount: this.rentPlanObj['rentAmount'],
        vehicleType: this.rentPlanObj['vehicleType']
      }
    });

    if (this.formGroup.valid) {
      this.alreadyExistValidation().then(exist => {
        if (!exist) {
          this.dbprovider.save(this.tableName, this.rentPlanObj).then(result => {
            if (result['status'] != 'SUCCESS') {
              this.messageService.add({ key: "rentplanEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
              return;
            }
            this.messageService.add({ key: "rentplanEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
            setTimeout(() => this.ref.close('SUCCESS'), 1000);

          }).catch(error => {
            console.log(error)
            this.messageService.add({ key: "rentplanEntry", severity: 'error', summary: error, detail: '' });

          });
        } else {
          this.messageService.add({ key: "rentplanEntry", severity: 'error', summary: "Plan already exist", detail: '', closable: true });
        }
      })

    }
    else{
      this.messageService.add({ key: "rentplanEntry", severity: 'error', summary: "Fill all fields", detail: '', closable: true });
    }
  }

  alreadyExistValidation() {
    var alreadyExist = false;

    if(this.config.data.mode == 'edit' && this.rentPlanObj['rentPlan'] == this.config.data.object.rentPlan ){
        return Promise.resolve(alreadyExist) 
    }
    return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.rentPlan' : this.rentPlanObj['rentPlan'],'data.type':this.tableName }, sort: ['data.rentPlan'] }).then(res => {
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        alreadyExist = true;
      }
      return alreadyExist;
    })

  }
}
