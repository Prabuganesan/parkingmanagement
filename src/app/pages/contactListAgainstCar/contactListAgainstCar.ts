import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { dbProvider } from 'src/app/core/dbProvider';
import { contactEntry } from '../contactEntry/contactEntry';

@Component({
  selector: 'contactListAgainstCar',
  templateUrl: 'contactListAgainstCar.html',
  styleUrls: ['contactListAgainstCar.scss']
})
export class contactListAgainstCar {
  contactList = []
  appLanguage = 'ta'
  selectedVehicle;
  contactTableName = 'contact'
  vehicleContactAssignmentTableName = 'vehicleContactAssignment'

  constructor(public router:Router,private translate: TranslateService,private messageService: MessageService,private dbprovider:dbProvider,public config: DynamicDialogConfig,public dialogService: DialogService) {
    this.appLanguage = this.translate.getDefaultLang()
    this.selectedVehicle = JSON.parse(JSON.stringify(config.data.vehicle)); 

    // this.contactList = [
    //   { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":1 },
    //   { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465","licenseNumber":"TN6958484848574", "securityName": "Security3","selected":0 }, 
    //   { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342", "licenseNumber":"TN6958484848574","securityName": "Security2","selected":0  },
    //   { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":0 },
    //   { "contactName": "Shunmu","contactNameInTamil":"ஷன்மு", "contactMobile": "8734645465", "licenseNumber":"TN6958484848574","securityName": "Security3","selected":0 },
    //   { "contactName": "Shunmugam","contactNameInTamil":"ஷன்முகம்", "contactMobile": "86465456342","licenseNumber":"TN6958484848574", "securityName": "Security2","selected":0 },
    //   { "contactName": "Prabuganesan","contactNameInTamil":"பிரபு கணேசன்", "contactMobile": "9842794262","licenseNumber":"TN6958484848574", "securityName": "Security1","selected":0 }
    // ]
    this.fetchAlternateContactList()
  }
  itemSelect(contact){

  }


  fetchAlternateContactList() {
    this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.vehicle_lookup': this.selectedVehicle.id, 'data.type': this.vehicleContactAssignmentTableName }, sort: ['data.vehicle_lookup'] }).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        // alreadyExist = true;
        let contactIds = res['records'].map(a => a.contact_lookup);
        const contactRelIds = contactIds.map(i => this.contactTableName + '_2_' + i)
        this.fetchContactListAgainstVehicle(contactRelIds)

      } else {
        this.messageService.add({ key: "alternateContactList", severity: 'error', summary: res['message'], detail: '' });

      }
    })
  }
  fetchContactListAgainstVehicle(contactIds) {
    console.log(contactIds)
    this.contactList = [];
    this.dbprovider.fetchDocsWithDocIds(contactIds).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['response'].length > 0) {
        res['response'].forEach(element => {
          console.log(element)
          if (element.contactType == 'others') {
            this.contactList.push(element)
          }
        })

      }
      else {
        this.contactList = []
      }
    }).catch(error => {
      this.contactList = []
    });
  }

  
  async createAlternateContact() {
    console.log("add contact")

    const ref = this.dialogService.open(contactEntry, {
      header: this.translate.instant('contactEntry.title'),
      width: '50%',
      data: { 'object': '', 'mode': 'new', 'contactType': 'Others','vehicleId':this.selectedVehicle.id }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchAlternateContactList();
      }
    });
  }

  editContact(contactObj) {
    console.log(contactObj)
    let contact = JSON.parse(JSON.stringify(contactObj));
    delete contact['selected']
    const ref = this.dialogService.open(contactEntry, {
      header: this.translate.instant('contactEntry.title'),
      width: '50%',
      data: { 'object': contactObj, 'mode': 'edit', 'contactType': 'Primary','vehicleId':this.selectedVehicle.id }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchAlternateContactList();
      }
    });
  }

}
