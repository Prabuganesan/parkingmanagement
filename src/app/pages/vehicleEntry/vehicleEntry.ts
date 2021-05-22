import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vehicleEntry',
  templateUrl: 'vehicleEntry.html',
  styleUrls: ['vehicleEntry.scss'],
})
export class vehicleEntry {
  plantype = 'car';
  constructor(public router:Router) {}

}
