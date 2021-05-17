import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'startup',
  templateUrl: 'startup.html',
  styleUrls: ['startup.scss'],
})
export class startup {

  display: boolean = false;
    
  constructor(public router:Router) {}

  public users = [{
    "userName":"Admin"
  },
  {
    "userName":"Security1"
  },
  {
    "userName":"Security2"
  }]

  openMenu(item){
    console.log(item)
    this.display = true;

    // if(item.userName == "Security1")
    // {
    //   this.display = true;

    // }else{
    //   this.router.navigate(['/menu'])

    // }
    // this.router.navigate(['menu'], { skipLocationChange: true });


  }
  login(){
    this.display = false;
    setTimeout(() =>       this.router.navigate(['/menu']), 300);

    
  }

}
