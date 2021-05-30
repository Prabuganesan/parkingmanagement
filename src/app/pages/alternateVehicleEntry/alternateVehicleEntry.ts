import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'alternateVehicleEntry',
  templateUrl: 'alternateVehicleEntry.html',
  styleUrls: ['alternateVehicleEntry.scss'],
})
export class alternateVehicleEntry {
  plantype = 'car';
  constructor(public router:Router) {}

}
