import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dbConfiguration } from 'src/app/core/dbConfiguration';
import { dbProvider } from 'src/app/core/dbProvider';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'applicationUserEntry',
  templateUrl: 'applicationUserEntry.html',
  styleUrls: ['applicationUserEntry.scss'],
})
export class applicationUserEntry {
  public applicationUserObj: any = {};
  public formGroup: FormGroup;
  public tableName = 'applicationUser'
  public savedSuccessMessage = 'Data saved successfully';

  constructor(public router: Router, private dbconfig: dbConfiguration, public formBuilder: FormBuilder, private dbprovider: dbProvider, private messageService: MessageService, public ref: DynamicDialogRef,public config: DynamicDialogConfig) {
    if(config.data.mode == 'edit'){
      this.applicationUserObj = JSON.parse(JSON.stringify(config.data.object)); 
      this.applicationUserObj['confirmPassword'] = config.data.object.password
    }
    else{
      this.initializeObjects(this.dbconfig.configuration.tableStructure)
    }
    this.createFormGroup();
  }

  initializeObjects(tableStructure) {
    this.applicationUserObj = JSON.parse(JSON.stringify(tableStructure[this.tableName]));
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      applicationUser: this.formBuilder.group({
        userName: ['', Validators.compose([Validators.maxLength(80), Validators.required])],
        mobile: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] , 
        code: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      })
    });
    // Update Date Field Value for Add Action
    // this.formGroup.patchValue({
    //     pfm126493: {
    //         openingdate: moment(new Date()).tz(this.appUtilityConfig.userTimeZone).format()
    //     }
    // });
  }
  saveAction() {
    this.formGroup.patchValue({
      applicationUser: {
        userName: this.applicationUserObj['userName'],
        mobile: this.applicationUserObj['mobile'],
        code: this.applicationUserObj['code'],
        password: this.applicationUserObj['password'],
        confirmPassword: this.applicationUserObj['confirmPassword'],
        userType: "Others"
      }
    });

    if (this.formGroup.valid) {

      if (this.applicationUserObj['confirmPassword'] != this.applicationUserObj['password']) {
        this.messageService.add({ key: "userEntry", severity: 'error', summary: "Password mismatch", detail: '', closable: true });
        return;
      }

      this.alreadyExistValidation().then(exist => {
        if (!exist) {
          delete this.applicationUserObj['confirmPassword']
          this.dbprovider.save(this.tableName, this.applicationUserObj).then(result => {
            if (result['status'] != 'SUCCESS') {
              this.messageService.add({ key: "userEntry", severity: 'error', summary: result['message'], detail: '', closable: true });
              return;
            }
            this.messageService.add({ key: "userEntry", severity: 'success', summary: this.savedSuccessMessage, detail: '' });
            setTimeout(() => this.ref.close('SUCCESS'), 1000);

          }).catch(error => {
            console.log(error)
            this.messageService.add({ key: "userEntry", severity: 'error', summary: error, detail: '' });

          });
        } else {
          this.messageService.add({ key: "userEntry", severity: 'error', summary: "Code already exist", detail: '', closable: true });
        }
      })

    }
    else{
      this.messageService.add({ key: "userEntry", severity: 'error', summary: "Fill all fields", detail: '', closable: true });
    }
  }

  alreadyExistValidation() {
    var alreadyExist = false;
    if(this.config.data.mode == 'edit' && this.applicationUserObj['code'] == this.config.data.object.code ){
      return Promise.resolve(alreadyExist) 
  }
    return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.code' : this.applicationUserObj['code'],'data.type':this.tableName }, sort: ['data.code'] }).then(res => {
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        alreadyExist = true;
      }
      return alreadyExist;
    })

  }


}
