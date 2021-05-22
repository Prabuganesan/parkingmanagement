import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'settingPage',
  templateUrl: 'settingPage.html',
  styleUrls: ['settingPage.scss']
})
export class settingPage {
  loginActivity = []
  showLoggeduserDetail = true;
  constructor(public router: Router) {

    this.loginActivity = [
      {
        "securityName": "Security1",
        "inTime": "2021-01-26 10:51:50 AM",
        "outTime": "2021-01-26 5:51:50 PM"
      },
      {
        "securityName": "Security1",
        "inTime": "2021-01-27 10:51:50 AM",
        "outTime": "2021-01-27 5:51:50 PM"
      },
      {
        "securityName": "Security2",
        "inTime": "2021-01-28 10:51:50 AM",
        "outTime": "2021-01-28 5:51:50 PM"
      },
      {
        "securityName": "Security12",
        "inTime": "2021-01-29 10:51:50 AM",
        "outTime": "2021-01-29 5:51:50 PM"
      }
    ]
  }


  segmentChanged(event) {
    console.log('Segment changed', event.detail.value);
    if (event.detail.value == 'loggeduser') {
      this.showLoggeduserDetail = true;
    } else {
      this.showLoggeduserDetail = false;

    }

  }

}
