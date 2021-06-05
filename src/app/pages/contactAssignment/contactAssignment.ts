import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contactAssignment',
  templateUrl: 'contactAssignment.html',
  styleUrls: ['contactAssignment.scss']
})
export class contactAssignment {
  contactList = []
  appLanguage = 'ta'

  constructor(public router:Router,private translate: TranslateService) {
    this.appLanguage = this.translate.getDefaultLang()

    this.contactList = [
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்","contactMobile": "9842794262", "securityName": "Security1","selected":1 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "securityName": "Security3","selected":0 }, 
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "securityName": "Security2","selected":0  },
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "securityName": "Security2","selected":0 }
    ]

  }
  itemSelect(contact){

  }

}
