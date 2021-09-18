import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingController, PopoverController } from '@ionic/angular';
import { contactListAgainstCar } from '../contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleList } from '../alternateVehicleList/alternateVehicleList';
import { accountDetail } from '../accountDetail/accountDetail';
import { vehicleEntry } from '../vehicleEntry/vehicleEntry';
import { contactEntry } from '../contactEntry/contactEntry';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';
import { appUtility } from 'src/app/core/appUtility';

@Component({
  selector: 'contactListWithVehicleInfo',
  templateUrl: 'contactListWithVehicleInfo.html',
  styleUrls: ['contactListWithVehicleInfo.scss'],
})
export class contactListWithVehicleInfo {

  contactList = []
  vehicleList = []
  allContactList = []
  items: MenuItem[];
  active;
  queryText = "";
  appLanguage = 'ta'
  selectedContact;
  selectedVehicle;
  selectedVehicleAccount;
  contactTableName = 'contact'
  vehicleTableName = 'vehicle'
  accountTableName = 'account'
  alternateVehicleTableName = 'alternateVehicle'

  vehicleContactAssignmentTableName = 'vehicleContactAssignment'
  loading;


  constructor(public router: Router,public util:appUtility, public loadingController: LoadingController, public dialogService: DialogService, public popoverController: PopoverController, private location: Location, private translate: TranslateService, private dbprovider: dbProvider, private messageService: MessageService) {
    this.appLanguage = this.translate.getDefaultLang()
    this.presentLoading();
    setTimeout(() => {
      this.fetchContactList();
    }, 500);


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
        },
        {
          label: this.translate.instant('actions.whatsappmsg'),
          icon: 'pi pi-angle-right',
          command: () => {
            this.sendWhatsAppMsg();
          }
        }
      ]
    }
    ];
  }
 

    async presentLoading() {
       this.loading = await this.loadingController.create({
        message: 'Please wait...'
      });

    }
    dismissLoading(){
      if(this.loading){
        this.loading.dismiss();
      }
    }
  

  //Add edit methods
  editContact(contactObj) {
    console.log(contactObj)
    let contact = JSON.parse(JSON.stringify(contactObj));
    delete contact['selected']
    const ref = this.dialogService.open(contactEntry, {
      header: this.translate.instant('contactEntry.title'),
      width: '50%',
      data: { 'object': contactObj, 'mode': 'edit', 'contactType': 'Primary','vehicleId':'' }

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
      data: { 'object': '', 'mode': 'new', 'contactType': 'Primary','vehicleId':''  }

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
     this.loading.present();
    this.contactList=[];
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
          this.allContactList = [...this.contactList]

          if (this.contactList.length > 0) {
            this.selectedContact = this.contactList[0]
            this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
          }

        }else{
          this.dismissLoading()
        }
      }
      else {
        this.dismissLoading()
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
        this.dismissLoading()
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
            if(this.vehicleList.length == res['response'].length){
              this.dismissLoading()
            }
          })
        })

      }
      else {
        this.vehicleList = []
        this.dismissLoading()
      }
    }).catch(error => {
      this.vehicleList = []
      this.dismissLoading()
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
    taskList.push(this.fetchAdditionalContactInfoAgainstVehicle(vehicleId).then(res => {
      vehicleInfo['additionalContacts'] = res
    

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
    }).catch(error => {
      return null
    });
  }

  fetchAdditionalContactInfoAgainstVehicle(vehicleId) {
    return this.dbprovider.fetchDocsWithoutRelationshipUsingFindOption({ selector: { 'data.vehicle_lookup': vehicleId, 'data.type': this.vehicleContactAssignmentTableName }, sort: ['data.vehicle_lookup'] }).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['records'].length > 0) {
        let contactIds = res['records'].map(a => a.contact_lookup);
        const contactRelIds = contactIds.map(i => this.contactTableName + '_2_' + i)
        return this.fetchContactListAgainstVehicle(contactRelIds)

      } else {
          return []
      }
    }).catch(error => {
      return []
    });
  }
  fetchContactListAgainstVehicle(contactIds) {
    console.log(contactIds)
    var contactList = [];
    return this.dbprovider.fetchDocsWithDocIds(contactIds).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['response'].length > 0) {
        res['response'].forEach(element => {
          console.log(element)
          if (element.contactType == 'others') {
            contactList.push(element)
          }
        })
        return contactList
      }
      else {
        return []
      }
    }).catch(error => {
      return []
    });
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

  sendWhatsAppMsg(){
    var text = "";
    if(this.appLanguage == 'ta'){
      text = "அன்புள்ள "+this.selectedContact['contactName']+",%0D%0Aஉங்கள் வாகனத்("+this.selectedVehicle['vehicleNumber']+") தொகை விவரம் %0D%0Aமொத்த தொகை :"+this.selectedVehicleAccount['totalBillAmount']+" ரூ %0D%0Aசெலுத்திய தொகை :"+this.selectedVehicleAccount['receivedAmount']+" ரூ %0D%0Aநிலுவையில் உள்ள தொகை :"+ (this.selectedVehicleAccount['totalBillAmount']-this.selectedVehicleAccount['receivedAmount']) + " ரூ"
    }
    else{
     text = "Dear "+this.selectedContact['contactName']+",%0D%0AYour vehicle("+this.selectedVehicle['vehicleNumber']+") amount due detail below %0D%0AYour total bill amount :"+this.selectedVehicleAccount['totalBillAmount']+" Rs %0D%0APaid amount :"+this.selectedVehicleAccount['receivedAmount']+" Rs %0D%0APending amount :"+ (this.selectedVehicleAccount['totalBillAmount']-this.selectedVehicleAccount['receivedAmount']) + " Rs"

    }
    var mobile = '+91'+ this.selectedContact['contactMobile']

    window.open("https://api.whatsapp.com/send?phone="+mobile+"&text="+text, '_blank').focus();
  }


  //Other menu click actions

  menuClick(vehicle) {
    this.selectedVehicle = vehicle['vehicleInfo']
    this.selectedVehicleAccount = vehicle['accountInfo']
    console.log('menu click', this.selectedVehicle)

  }

  async showAlternateContactList() {
    console.log("alternate contact detail")

    const ref = this.dialogService.open(contactListAgainstCar, {
      header: this.translate.instant('contactList.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }


    });
    ref.onClose.subscribe(res => {
      this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
    });

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
    console.log("search",this.queryText)
    this.contactList = []
    if(this.queryText.length>0){
      this.allContactList.forEach(element => {
        if(element.contactName.toLowerCase().includes(this.queryText.toLowerCase()) || element.contactMobile.toString().toLowerCase().includes(this.queryText.toLowerCase()) ){
          this.contactList.push(element)
        }
      });
    }else{
      this.contactList = [...this.allContactList]
    }

    if (this.contactList.length > 0) {
      this.selectedContact = this.contactList[0]
      this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
    }
    

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    if(this.util.vehicleModified){
      this.util.vehicleModified = false;
      setTimeout(() => {
        this.fetchVehicleContactAssignemntAgainstContact(this.selectedContact.id)
      }, 500);
    }

  }

  // Navigation methods
  backButtonOnclick() {
    this.location.back();
  }

  vehicleDetail(vehicle) {
    this.router.navigate(['vehicleInfoDetail'], {
      queryParams: { 'vehicle': JSON.stringify(vehicle), 'selectedContactId': this.selectedContact.id, 'selectedContact':JSON.stringify(this.selectedContact) }
    });
  }
}
