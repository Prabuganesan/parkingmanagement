import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rentPlanEntry',
  templateUrl: 'rentPlanEntry.html',
  styleUrls: ['rentPlanEntry.scss'],
})
export class rentPlanEntry {
  plantype = 'car';
  constructor(public router:Router) {}

}
