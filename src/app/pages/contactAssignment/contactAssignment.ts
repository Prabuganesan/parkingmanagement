import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'contactAssignment',
  templateUrl: 'contactAssignment.html',
  styleUrls: ['contactAssignment.scss']
})
export class contactAssignment {
  contactList = []
  constructor(public router:Router) {

    this.contactList = [
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":1 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 }, 
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0  },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam", "contactMobile": "86465456342", "securityName": "Security2","selected":0 }
    ]

  }
  itemSelect(contact){

  }

}
