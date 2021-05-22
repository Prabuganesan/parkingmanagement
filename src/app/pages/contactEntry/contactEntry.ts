import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contactEntry',
  templateUrl: 'contactEntry.html',
  styleUrls: ['contactEntry.scss'],
})
export class contactEntry {
  plantype = 'car';
  constructor(public router:Router) {}

}
