import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  constructor(public router: Router) {}
  openMenu(id){
    console.log(id)
    if(id==1){
      this.router.navigate(["/vehicleSearch"], {
        skipLocationChange: true
    });
    }
    else if(id==2){
      this.router.navigate(["/contactlistwithvehicleinfo"], {
        skipLocationChange: true
    });
  }
    else if(id==3){
      this.router.navigate(["/rentPlanList"], {
        skipLocationChange: true
    });
    }
    else if(id==4){
      this.router.navigate(["/applicationUserList"], {
        skipLocationChange: true
    });
    }
   
    else{
      alert(id)
    }
  }
  
}
