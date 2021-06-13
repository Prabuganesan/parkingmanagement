import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { rentPlanEntry } from '../rentPlanEntry/rentPlanEntry';
import {Location} from '@angular/common'
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'rentPlanList',
  templateUrl: 'rentPlanList.html',
  styleUrls: ['rentPlanList.scss'],
})
export class rentPlanList {

  rentplans = [];
  public tableName = 'rentPlan'

  constructor(private router: Router, public dialogService: DialogService,private messageService: MessageService,private location : Location,private translate: TranslateService,private dbprovider:dbProvider) { 
    this.fetchData()

  }

  fetchData(){
    this.dbprovider.fetchDocsWithoutRelationshipByType(this.tableName).then(res=>{
      if(res && res['status'] == "SUCCESS"){
        console.log(res)
        this.rentplans = res['records'];
      }
      else{
        this.messageService.add({ key:"rentPlanList", severity: 'error', summary: res['message'], detail: ''});
      }
    })
  }

  backButtonOnclick() {
    this.location.back();

  }
  planAddClick() {
    // this.router.navigate(['applicationUserEntry'])

    console.log("user add")
    const ref = this.dialogService.open(rentPlanEntry, {
      header: this.translate.instant('rentPlanEntry.title'),
      width: '40%',
      data:{'object':'','mode':'new'}

    });

    ref.onClose.subscribe(res => {
      if (res && res =="SUCCESS")  {
        this.fetchData();
      }
    });
  }
  editaction(plan){
    console.log("edit",plan)
    const ref = this.dialogService.open(rentPlanEntry, {
      header: this.translate.instant('rentPlanEntry.title'),
      width: '40%',
      data:{'object':plan,'mode':'edit'}
    });

    ref.onClose.subscribe(res => {
      if (res && res =="SUCCESS")  {
        this.fetchData();
      }
    });
  }
}
