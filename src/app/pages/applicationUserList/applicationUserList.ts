import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { applicationUserEntry } from '../applicationUserEntry/applicationUserEntry';
import { Location } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'applicationUserList',
  templateUrl: 'applicationUserList.html',
  styleUrls: ['applicationUserList.scss'],
})
export class applicationUserList {

  users = [];


  sortOrder: number;

  sortField: string;

  constructor(private router: Router, public dialogService: DialogService, private location: Location, private translate: TranslateService) { }

  ngOnInit() {
    this.users = [{
      "userName": "Admin",
      "mobile": "7652437162",
      "userType": "Admin",
      "code": "1"
    },
    {
      "userName": "Security 1",
      "mobile": "9863427354",
      "userType": "Other",
      "code": "2"
    },
    {
      "userName": "Security 2",
      "mobile": "875364232",
      "userType": "Other",
      "code": "3"
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
  userAddClick() {
    // this.router.navigate(['applicationUserEntry'])

    console.log("user add")
    const ref = this.dialogService.open(applicationUserEntry, {
      header: this.translate.instant('applicationUserEntry.title'),
      width: '40%'
    });
  }
}
