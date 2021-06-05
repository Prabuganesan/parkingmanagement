import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contactListAgainstCar',
  templateUrl: 'contactListAgainstCar.html',
  styleUrls: ['contactListAgainstCar.scss']
})
export class contactListAgainstCar {
  contactList = []
  appLanguage = 'ta'

  constructor(public router:Router,private translate: TranslateService) {
    this.appLanguage = this.translate.getDefaultLang()

    this.contactList = [
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":1 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465","licenseNumber":"TN6958484848574", "securityName": "Security3","selected":0 }, 
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "licenseNumber":"TN6958484848574","securityName": "Security2","selected":0  },
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":0 },
      { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "licenseNumber":"TN6958484848574","securityName": "Security3","selected":0 },
      { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342","licenseNumber":"TN6958484848574", "securityName": "Security2","selected":0 },
      { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":0 }
    ]

  }
  itemSelect(contact){

  }

}
