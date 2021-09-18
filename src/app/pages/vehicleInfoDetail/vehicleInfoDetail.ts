import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { contactAssignment } from '../contactAssignment/contactAssignment';
import { PopoverController } from '@ionic/angular';
import { contactListAgainstCar } from '../contactListAgainstCar/contactListAgainstCar';
import { alternateVehicleList } from '../alternateVehicleList/alternateVehicleList';
import { accountDetail } from '../accountDetail/accountDetail';
import { vehicleEntry } from '../vehicleEntry/vehicleEntry';
import {Location} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { dbProvider } from 'src/app/core/dbProvider';
import { appUtility } from 'src/app/core/appUtility';

@Component({
  selector: 'vehicleInfoDetail',
  templateUrl: 'vehicleInfoDetail.html',
  styleUrls: ['vehicleInfoDetail.scss'],
})
export class vehicleInfoDetail {

  contactList = []
  vehicleList = []
  fullVehicleList = []
  vehicle;
  items: MenuItem[];
  active;
  queryText = "";
  appLanguage = 'ta'
  selectedVehicle;
  selectedContactId;
  contactTableName = 'contact'
  vehicleTableName = 'vehicle'
  accountTableName = 'account'
  alternateVehicleTableName = 'alternateVehicle'

  vehicleContactAssignmentTableName = 'vehicleContactAssignment'

  constructor(public router: Router,public util: appUtility, public activatRoute: ActivatedRoute,public dialogService: DialogService,public popoverController: PopoverController,private location : Location,private translate: TranslateService,private dbprovider: dbProvider, private messageService: MessageService) {
    this.appLanguage = this.translate.getDefaultLang()

    this.activatRoute.queryParams.subscribe(params => {
      console.log(params)
      if (params["vehicle"]) {
        this.vehicle = JSON.parse(params["vehicle"]);
        this.selectedContactId = params["selectedContactId"];
        console.log(this.vehicle)
    }
    });

   
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

  async vehicleEditAction() {
    console.log("edit vehicle")

    const ref = this.dialogService.open(vehicleEntry, {
      header: this.translate.instant('vehicleEntry.title'),
      width: '50%',
      data: { 'object': this.selectedVehicle, 'mode': 'edit', 'contactId': this.selectedContactId }

    });
    ref.onClose.subscribe(res => {
      if (res && res == "SUCCESS") {
        this.util.vehicleModified = true;
        this.fetchVehicle()
      }
    });
  }



  //Fetch methods

  fetchVehicle() {
    var vehicleId = this.vehicleTableName + '_2_' + this.vehicle['vehicleInfo']['id']
    console.log(vehicleIds)
    var vehicleIds = [vehicleId]
   this.vehicleList = []
    this.dbprovider.fetchDocsWithDocIds(vehicleIds).then(res => {
      console.log(res)
      if (res['status'] == 'SUCCESS' && res['response'].length > 0) {
        res['response'].forEach(element => {
          this.fetchAccountAndAdditionalContactInfo(element.id).then(result => {
            result['vehicleInfo'] = element
            console.log("result==>", result)
            this.vehicleList.push(result)
            if(this.vehicleList.length>0)
            {
              this.vehicle = this.vehicleList[0]
            }
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
      if(res)
      {
        vehicleInfo['rentPlanInfo'] = res['rentPlan_lookup']
        delete res['rentPlan_lookup']
        vehicleInfo['accountInfo'] = res
        console.log(res)
      }else{
        vehicleInfo['accountInfo'] = {  }
        vehicleInfo['rentPlanInfo'] = {  }
      }
     

    }))
    taskList.push(this.fetchAdditionalContactInfoAgainstVehicle(vehicleId).then(res => {
      vehicleInfo['additionalContacts'] = res

    }))

    taskList.push(this.fetchAlternateVehicleInfoAgainstVehicle(vehicleId).then(res => {
      if(res.length>0)
      {
        vehicleInfo['alternateVehicleInfo'] = res[0]

      }
      else{
        vehicleInfo['alternateVehicleInfo'] = {}

      }
    }))

    return Promise.all(taskList).then(result => {
      console.log(result)
      return vehicleInfo;
    })
  }
  fetchAccountInfoAgainstVehicle(vehicleId) {
    return this.dbprovider.fetchDocsWithRelationshipUsingFindOption({ selector: { 'data.vehicle': vehicleId, 'data.type': this.accountTableName }, sort: ['data.vehicle'] },true,{'masterandlookupreference':['rentPlan']}).then(res => {
        console.log(res)
        if(res && res['status'] == "SUCCESS"){
          if(res['records'].length>0)
          {
            let activeAccount = null;
            res['records'].forEach(element => {
              if(!element.closeDate){
                activeAccount = element;
              }
            });
            return activeAccount;
          }
        }
        else{
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

  fetchAlternateVehicleInfoAgainstVehicle(vehicleId){
    return this.dbprovider.fetchDocsWithoutRelationshipByParentTypeAndId(this.alternateVehicleTableName,this.vehicleTableName ,vehicleId).then(res => {
      console.log(res)
      if(res && res['status'] == "SUCCESS"){
        return res['records']
      }
      else{
        return null
      }
    })
  }


  //Other menu click actions

  menuClick(vehicle) {
    this.selectedVehicle = vehicle['vehicleInfo']
    console.log('menu click', this.selectedVehicle)

  }

  async alternateVehicleList() {


    console.log("alternate vehicle detail")

    const ref = this.dialogService.open(alternateVehicleList, {
      header: this.translate.instant('alternateVehicle.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle}


    });
    ref.onClose.subscribe(res => {
      this.util.vehicleModified = true;
        this.fetchVehicle()
    });
  }
  async accountDetail() {

    console.log("account detail")

    const ref = this.dialogService.open(accountDetail, {
      header: this.translate.instant('accountDetail.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle}


    });
    ref.onClose.subscribe(res => {
      this.util.vehicleModified = true;
        this.fetchVehicle()
    });


  }

  async showAlternateContactList() {
    console.log("alternate contact detail")

    const ref = this.dialogService.open(contactListAgainstCar, {
      header: this.translate.instant('contactList.title'),
      width: '50%',
      data: { 'vehicle': this.selectedVehicle }


    });
    ref.onClose.subscribe(res => {
      this.util.vehicleModified = true;
      this.fetchVehicle()
    });

  }

  // Navigation methods
  backButtonOnclick() {
    this.location.back();
  }


  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  // async assignContact(){

  //   const popover = await this.popoverController.create({
  //     component: contactAssignment,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();

  // //   console.log("user add")
  // //   const ref = this.dialogService.open(contactAssignment, {
  // //     header: 'Contact assignment',
  // //     width: '70%'
  // // });
  // }
  // async showContactList(){
  //   const popover = await this.popoverController.create({
  //     component: contactListAgainstCar,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  // }
  // async createAccount(){
  //   const popover = await this.popoverController.create({
  //     component: accountCreation,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  // }
  // async assignAlternateVehicle(){
  //   const popover = await this.popoverController.create({
  //     component: alternateVehicleAssignment,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
    
  // }
  // async alternateVehicleList(){

  //   const popover = await this.popoverController.create({
  //     component: alternateVehicleList,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
    

  // }
  // async accountDetail(){
  //   const popover = await this.popoverController.create({
  //     component: accountDetail,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
    

  // }

  // async contactAddButtonclick() {
  //   console.log("add contact")
  //   const popover = await this.popoverController.create({
  //     component: contactEntry,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  // }

  // backButtonOnclick() {
  //   this.location.back();
  // }
  // moreActionclick() {
  //   console.log("more")
  // }
  // searchByKeyword() {
  //   console.log("search")
  // }
  // async vehicleAddButtonclick() {
  //   console.log("add vehicle")
  //   const popover = await this.popoverController.create({
  //     component: vehicleEntry,
  //     translucent: true,
  //     mode:'md'
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  // }
}
