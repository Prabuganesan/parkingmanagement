import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html',
  styleUrls: ['signup.scss'],
})
export class signup {
  value1 : Date;

  constructor(public router:Router) {}

}
