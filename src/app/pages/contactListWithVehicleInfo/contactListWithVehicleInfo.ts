import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { contactAssignment } from '../contactAssignment/contactAssignment';
import { PopoverController } from '@ionic/angular';
import { contactListAgainstCar } from '../contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleList } from '../alternateVehicleList/alternateVehicleList';
import { accountDetail } from '../accountDetail/accountDetail';
import { vehicleEntry } from '../vehicleEntry/vehicleEntry';
import { contactEntry } from '../contactEntry/contactEntry';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';

@Component({
  selector: 'contactListWithVehicleInfo',
  templateUrl: 'contactListWithVehicleInfo.html',
  styleUrls: ['contactListWithVehicleInfo.scss'],
})
export class contactListWithVehicleInfo {

  contactList = []
  vehicleList = []
  items: MenuItem[];
  active;
  queryText = "";
  appLanguage = 'ta'
  selectedContact;
  selectedVehicle;
  contactTableName = 'contact'
  vehicleTableName = 'vehicle'
  accountTableName = 'account'
  alternateVehicleTableName = 'alternateVehicle'

  vehicleContactAssignmentTableName = 'vehicleContactAssignment'


  constructor(public router: Router, public dialogService: DialogService, public popoverController: PopoverController, private location: Location, private translate: TranslateService, private dbprovider: dbProvider, private messageService: MessageService) {
    this.appLanguage = this.translate.getDefaultLang()
    this.fetchContactList();


    this.items = [{
      label: 'Actions',
      items: [
        {
          label: this.translate.instant('actions.editVehicle'),
          icon: 'pi pi-angle-right',
          command: () => {
            this.vehicleEditAction();
          }
        },
        {
          label: this.translate.instant('actions.contactList'),
          icon: 'pi pi-angle-right',
          command: () => {
            this.showAlternateContactList();
          }
        },
        {
          label: this.translate.instant('actions.alternateVehicleList'),
          icon: 'pi pi-angle-right',
          command: () => {
            this.alternateVehicleList();
          }
        },
        {
          label: this.translate.instant('actions.accountDetail'),
          icon: 'pi pi-angle-right',
          command: () => {
            this.accountDetail();
          }
        }
      ]
    }
    ];




  }

  //Add edit methods
  editContact(contactObj) {
    console.log(contactObj)
    let contact = JSON.parse(JSON.stringify(contactObj));
    delete contact['selected']
    const ref = this.dialogService.open(contactEntry, {
      header: this.translate.instant('contactEntry.title'),
      width: '50%',
      data: { 'object': contactObj, 'mode': 'edit', 'contactType': 'Primary' }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchContactList();
      }
    });
  }

  async contactAddButtonclick() {
    console.log("add contact")

    const ref = this.dialogService.open(contactEntry, {
      header: this.translate.instant('contactEntry.title'),
      width: '50%',
      data: { 'object': '', 'mode': 'new', 'contactType': 'Primary' }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchContactList();
      }
    });
  }

  async vehicleAddButtonclick() {
    console.log("add vehicle")

    const ref = this.dialogService.open(vehicleEntry, {
      header: this.translate.instant('vehicleEntry.title'),
      width: '50%',
      data: { 'object': '', 'mode': 'new', 'contactId': this.selectedContact.id }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
      }
    });
  }

  async vehicleEditAction() {
    console.log("edit vehicle")

    const ref = this.dialogService.open(vehicleEntry, {
      header: this.translate.instant('vehicleEntry.title'),
      width: '50%',
      data: { 'object': this.selectedVehicle, 'mode': 'edit', 'contactId': this.selectedContact.id }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
      }
    });
  }

  //Fetch methods


  fetchContactList() {

    this.dbprovider.fetchDocsWithoutRelationshipByType(this.contactTableName).then(res => {
      if (res && res['status'] == "SUCCESS") {
        console.log(res)

        if (res['records'].length > 0) {
          res['records'].forEach(element => {
            if (element.contactType == 'owner') {
              this.contactList.push(element)
            }
          });
          // this.contactList = res['records'];
          if (this.contactList.length > 0) {
            this.selectedContact = this.contactList[0]
            this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
          }

        }
      }
      else {
        this.messageService.add({ key: "contactList", severity: 'error', summary: res['message'], detail: '' });
      }
    })
  }

  fetchVehicleContactAssignemntAgainstContact(contactId) {
    this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.contact_lookup': contactId, 'data.type': this.vehicleContactAssignmentTableName }, sort: ['data.contact_lookup'] }).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        // alreadyExist = true;
        let vehicleIds = res['records'].map(a => a.vehicle_lookup);
        const vehicleRelIds = vehicleIds.map(i => this.vehicleTableName + '_2_' + i)
        this.fetchVehicleListAgainstContact(vehicleRelIds)

      } else {
        this.vehicleList = [];
        this.selectedVehicle = null;
      }
    })
  }
  fetchVehicleListAgainstContact(vehicleIds) {
    console.log(vehicleIds)
    this.vehicleList = [];
    this.dbprovider.fetchDocsWithDocIds(vehicleIds).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['response'].length > 0) {
        res['response'].forEach(element => {
          this.fetchAccountAndAdditionalContactInfo(element.id).then(result => {
            result['vehicleInfo'] = element
            console.log("result==>", result)
            this.vehicleList.push(result)
          })
        })

      }
      else {
        this.vehicleList = []
      }
    }).catch(error => {
      this.vehicleList = []
    });
  }
  fetchAccountAndAdditionalContactInfo(vehicleId) {
    let vehicleInfo = {}
    let taskList = [];
    taskList.push(this.fetchAccountInfoAgainstVehicle(vehicleId).then(res => {
      if (res) {
        vehicleInfo['rentPlanInfo'] = res['rentPlan_lookup']
        delete res['rentPlan_lookup']
        vehicleInfo['accountInfo'] = res
        console.log(res)
      } else {
        vehicleInfo['accountInfo'] = {}
        vehicleInfo['rentPlanInfo'] = {}
      }


    }))
    taskList.push(this.fetchAdditionalContactInfoAgainstVehicle().then(res => {
      vehicleInfo['additionalContacts'] = [{
        "contactName": "Shunmugam",
        "contactNameInTamil": "ஷன்மு123",
        "contactMobile": "1234567896"
      }]

    }))

    taskList.push(this.fetchAlternateVehicleInfoAgainstVehicle(vehicleId).then(res => {
      if (res.length > 0) {
        vehicleInfo['alternateVehicleInfo'] = res[0]

      }
      else {
        vehicleInfo['alternateVehicleInfo'] = {}

      }
    }))

    return Promise.all(taskList).then(result => {
      console.log(result)
      return vehicleInfo;
    })
  }
  fetchAccountInfoAgainstVehicle(vehicleId) {
    return this.dbprovider.fetchDocsWithRelationshipUsingFindOption({ selector: { 'data.vehicle': vehicleId, 'data.type': this.accountTableName }, sort: ['data.vehicle'] }, true, { 'masterandlookupreference': ['rentPlan'] }).then(res => {
      console.log(res)
      if (res && res['status'] == "SUCCESS") {
        if (res['records'].length > 0) {
          let activeAccount = null;
          res['records'].forEach(element => {
            if (!element.closeDate) {
              activeAccount = element;
            }
          });
          return activeAccount;
        }
      }
      else {
        return null
      }
    })
  }

  fetchAdditionalContactInfoAgainstVehicle() {
    return Promise.resolve("")
  }

  fetchAlternateVehicleInfoAgainstVehicle(vehicleId) {
    return this.dbprovider.fetchDocsWithoutRelationshipByParentTypeAndId(this.alternateVehicleTableName, this.vehicleTableName, vehicleId).then(res => {
      console.log(res)
      if (res && res['status'] == "SUCCESS") {
        return res['records']
      }
      else {
        return null
      }
    })
  }


  //Other menu click actions

  menuClick(vehicle) {
    this.selectedVehicle = vehicle['vehicleInfo']
    console.log('menu click', this.selectedVehicle)

  }

  async showAlternateContactList() {
    const popover = await this.popoverController.create({
      component: contactListAgainstCar,
      translucent: true,
      mode: 'md'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  async alternateVehicleList() {


    console.log("alternate vehicle detail")

    const ref = this.dialogService.open(alternateVehicleList, {
      header: this.translate.instant('alternateVehicle.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }


    });
    ref.onClose.subscribe(res => {
      this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
    });
  }
  async accountDetail() {

    console.log("account detail")

    const ref = this.dialogService.open(accountDetail, {
      header: this.translate.instant('accountDetail.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }


    });
    ref.onClose.subscribe(res => {
      this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
    });


  }

  //Other methods

  itemSelect(contact) {
    console.log(contact)
    contact.selected = 1;
    this.selectedContact = contact;
    this.fetchVehicleContactAssignemntAgainstContact(contact.id)
  }

  searchByKeyword() {
    console.log("search")
  }

  // Navigation methods
  backButtonOnclick() {
    this.location.back();
  }

  vehicleDetail(vehicle) {
    this.router.navigate(['vehicleInfoDetail'], {
      queryParams: { 'vehicle': JSON.stringify(vehicle), 'selectedContactId': this.selectedContact.id }
    });
  }
}
