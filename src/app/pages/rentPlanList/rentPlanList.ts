import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { rentPlanEntry } from '../rentPlanEntry/rentPlanEntry';
import {Location} from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'rentPlanList',
  templateUrl: 'rentPlanList.html',
  styleUrls: ['rentPlanList.scss'],
})
export class rentPlanList {

  rentplans = [];


  sortOrder: number;

  sortField: string;

  constructor(private router: Router, public dialogService: DialogService,private location : Location,private translate: TranslateService) { }

  ngOnInit() {
    this.rentplans = [{
      "rentPlan": "Car Plan 1",
      "rentAmount": 500,
      "vehicleType": "Car"
    },
    {
      "rentPlan": " Car Plan 2",
      "rentAmount": 400,
      "vehicleType": "Car"
    },
    {
      "rentPlan": "Car Plan 3",
      "rentAmount": 600,
      "vehicleType": "Car"
    },
    {
      "rentPlan": "Auto Plan 1",
      "rentAmount": 400,
      "vehicleType": "Auto"
    },
    {
      "rentPlan": "Auto Plan 2",
      "rentAmount": 600,
      "vehicleType": "Auto"
    }]
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


  backButtonOnclick() {
    this.location.back();

  }
  planAddClick() {
    // this.router.navigate(['applicationUserEntry'])

    console.log("user add")
    const ref = this.dialogService.open(rentPlanEntry, {
      header: this.translate.instant('rentPlanEntry.title'),
      width: '40%'
    });
  }
}
