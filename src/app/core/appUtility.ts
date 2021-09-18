import { Injectable, NgZone } from '@angular/core';
import { ToastController, PopoverController, NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class appUtility {

    public loggedUserObject: any;

    public _loggedUserInfo: any;
    public _loggedActivityInfo: any;

    private _isMobile: boolean = true;
  
    private _userId: number;
   public billGenerate = false;
   public vehicleModified = false;
  
    public hoursFormat = 'hh:mm a'; // hour format
    public userZoneOffsetValue = ''; // user timezone offset value. For eg: +0530, -0400
    public orgZoneOffsetValue = ''; // user timezone offset value. For eg: +0530, -0400
    public userDateTimeFormat = '';  // user profile datetime format
    public userZoneOffsetValueWithFormat = ''; // user timezone offset value. For eg: +05:30, -04:00
    public orgZoneOffsetValueWithFormat = ''; // user timezone offset value. For eg: +05:30, -04:00
    public userDatePickerFormat = ''; // Date picker format of user profile with uppercase
    public userDateTimePickerFormat = ''; // DateTime picker format of user profile
    public isAppSyncCompleted: boolean = false;
    public applicationName = '';
    private _isMobileResolution: boolean = true;
    public landingPageInfo = {
        path: "/menu/homepage",
        selector: "app-homepage"
    }

    // Will be set in Meta Validation class
    public loggedUserName = "";
    private homePageNodeFlag = true;
    homePageNode = {
        "homePageNodeName": "",
        "homePageNodepath": ""
    }
    eventSubscriptionObject = {}
    public notifications = []

    public profilePicSrc: string;

    constructor(
        public popoverController: PopoverController,
        public toastCtrl: ToastController, public datePipe: DatePipe,public navCtrl: NavController,
        public router: Router,public httpClient:HttpClient, public translateService: TranslateService,private zone: NgZone) {

    }
    get isMobile(): boolean {
        return this._isMobile;
    }
    set isMobile(ismobile: boolean) {
        this._isMobile = ismobile;
    }

     // getter setter for userId flag
     get userId(): number {
        return this._userId;
    }
    set userId(userid: number) {
        this._userId = userid;
    }

    get loggedUserInfo(): any {
        return this._loggedUserInfo;
    }
    set loggedUserInfo(loggedUserInfo){
        this._loggedUserInfo = loggedUserInfo;
    }

    get loggedUserActivityInfo(): any {
        return this._loggedActivityInfo;
    }
    set loggedUserActivityInfo(loggedUserActivityInfo){
        this._loggedActivityInfo = loggedUserActivityInfo;
    }


  /*  get orgTimeZone(): string {
        return this._orgTimeZone;
    }

    set orgTimeZone(orgTimezone: string){
        this._orgTimeZone = orgTimezone;
    }

    get userGroups(): any {
        return this._userGroups;
    }

    set userGroups(userGroupsInfo){
        this._userGroups = userGroupsInfo;
    }

    get userResponsibilities(): any {
        return this._userResponsibilities;
    }

    set userResponsibilities(userResponsibilitiesInfo){
        this._userResponsibilities = userResponsibilitiesInfo;
    }

    // getter setter for user timezone
    get userTimeZone(): string {
        return this._userTimeZone;
    }
    set userTimeZone(userTimezone: string) {
        this._userTimeZone = userTimezone;
    }

    // getter setter for user dateformat
    get userDateFormat(): string {
        return this._userDateFormat;
    }
    set userDateFormat(userDateformat: string) {
        this._userDateFormat = userDateformat;
    }

    // getter setter for isMobile flag
    get isEmbeddingEnabled(): boolean {
        return this._isEmbeddingEnabled;
    }
    set isEmbeddingEnabled(isEmbeddingEnabled: boolean) {
        this._isEmbeddingEnabled = isEmbeddingEnabled;
    }

    // getter setter for isMobile flag
    get isMobile(): boolean {
        return this._isMobile;
    }
    set isMobile(ismobile: boolean) {
        this._isMobile = ismobile;
    }

    get osType(): string {
        return this._osType;
    }
    set osType(value: string) {
        this._osType = value;
    }
    // getter setter for userId flag
    get userId(): number {
        return this._userId;
    }
    set userId(userid: number) {
        this._userId = userid;
    }

    // getter setter for roleId flag
    get roleId(): number {
        return this._roleId;
    }
    set roleId(roleId: number) {
        this._roleId = roleId;
    }
    get accessToken(): string {
        return this._accessToken;
    }
    set accessToken(accessToken: string) {
        this._accessToken = accessToken;
    }
    // // getter setter for version number
    // get versionNumber(): Number {
    //     return this._versionNumber;
    // }
    // set versionNumber(versionNumber: Number) {
    //     this._versionNumber = versionNumber;
    // }

    // getter setter for userId flag
    get orgId(): number {
        return this._orgId;
    }
    set orgId(orgid: number) {
        this._orgId = orgid;
    }

    get sessionId(): string {
        return this._sessionId;
    }
    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }
    get appBuilderURL(): string {
        return this._appBuilderURL;
    }
    set appBuilderURL(couchUrl: string) {
        this._appBuilderURL = couchUrl;
    }
    get isMobileResolution(): boolean {
        return this._isMobileResolution;
    }
    set isMobileResolution(isMobileResolution: boolean) {
        this._isMobileResolution = isMobileResolution;
    }
    //Socket server url
    get socketServerURL(): string {
        return this._socketServerURL;
    }
    set socketServerURL(Url: string) {
        this._socketServerURL = Url;
    }
    get loggedUserInfo(): any {
        return this._loggedUserInfo;
    }
    set loggedUserInfo(loggedUserInfo){
        this._loggedUserInfo = loggedUserInfo;
    }
    // getter setter for isTopHorizonatalMenu flag
    get isTopHorizonatalMenu(): boolean {
        return this._isTopHorizonatalMenu;
    }
    set isTopHorizonatalMenu(isTopHorizonatalMenu: boolean) {
        this._isTopHorizonatalMenu = isTopHorizonatalMenu;
    }
    // Date conversion
    displayDateConversionForList(dateFields, dataArray) {
        const docs = dataArray.map((row) => {
            return this.displayDateConversionForSingleObject(dateFields, row);
        });
        return docs;
    }
    dbDateConversionForSingleObject(dateFields, object) {
        dateFields.forEach(element => {
            object[element] = object[element].substring(0, 4) + object[element].substring(5, 7) + object[element].substring(8, 10);
        });
        return object;
    }
    displayDateConversionForSingleObject(dateFields, object) {
        dateFields.forEach(element => {
            object[element] = object[element].substring(0, 4) + '-' + object[element].substring(4, 6) + '-' + object[element].substring(6, 8);
        });
        return object;
    }

    // isMobile checking using platform.json file
    initialSetup() {
        // return this.http.get(this.platformJsonPath)
        //     .toPromise()
        //     .then((response) => {
        //         const resValue = response.json();
        //         if (resValue['platform'] === 'web') {
        //             this.isMobile = false;
        //         } else {
        //             this.isMobile = true;
        //             this.osType = resValue['os_type'];
        //         }
        //         this.getDeviceResolution();
        //         const taskList = [];
        //         taskList.push(this.fetchUserIdAndOrgIdFromPreference().then(userIdOrgIdRes => {
        //             return Promise.resolve(userIdOrgIdRes);
        //         }));

        //         const routes: Routes = this.router.config;
        //         taskList.push(this.setLandingPage(routes).then(res => {
        //             return res;
        //         }));
        //         return Promise.all(taskList).then(allRes => {
        //             return Promise.resolve(allRes[0]);
        //         })
        //     }).catch((err) => {
        //         console.log(err);
        //         return Promise.resolve('Invalid session');
        //     });

        this.isMobile = false;
        this.getDeviceResolution();
        const taskList = [];
        taskList.push(this.fetchUserIdAndOrgIdFromPreference().then(userIdOrgIdRes => {
            return Promise.resolve(userIdOrgIdRes);
        }));

        const routes: Routes = this.router.config;
        taskList.push(this.setLandingPage(routes).then(res => {
            return res;
        }));
        return Promise.all(taskList).then(allRes => {
            return Promise.resolve(allRes[0]);
        })
    }
    //isMobileResolution checking for list refresh for web using change listener
    getDeviceResolution() {
        const mediaQuery = window.matchMedia("(max-device-width: 480px)");
        if (mediaQuery.matches) {
            this.isMobileResolution = true
        } else {
            this.isMobileResolution = false
        }
    }

    setLandingPage(routes: Routes) {
        if (this.isMobile) {
            return this.appPreferences.fetch('login_response').then(res => {
                const assignedApps = JSON.parse(res);
                return this.assignLandingPage(assignedApps, routes);
            })
        } else {
            const assignedApps = JSON.parse(localStorage['assignedApps']);
            return this.assignLandingPage(assignedApps, routes);
        }
    }

    assignLandingPage(assignedApps, routes: Routes) {
        const currentApp = assignedApps.filter(assignedApp => {
            return assignedApp['appId'] == this.appConfig.configuration.appId;
        });
        if (currentApp && currentApp.length > 0) {
            if (currentApp[0]['landingPage'] && currentApp[0]['landingPage'] != 'cspfm_default_landing_page') {
                this.landingPageInfo.selector = currentApp[0]['landingPage'];
                this.landingPageInfo.path = "/menu/" + currentApp[0]['landingPage'];
            }
        }
        return Promise.resolve('Success');
    }

    fetchSelectedTheme() {
        if (this.isMobile) {
            this.appPreferences.fetch('selectedTheme').then((PreferenceFetchRes) => {
                console.log("selectedTheme fetch = ", PreferenceFetchRes);
                console.log("selectedTheme fetch JSON = ", JSON.stringify(PreferenceFetchRes));
                if (PreferenceFetchRes) {
                    const theme = JSON.parse(PreferenceFetchRes)
                    const primary = theme['primary'];
                    this.statusBar.backgroundColorByHexString(primary);
                    this.theme.changeTheme(PreferenceFetchRes);
                } else {
                    const defaultTheme = { "primary": "#ffdd67", "secondary": "#4d4d4d", "secondarylow": "#fde79a", "barbg": "#fbf8ec" };
                    this.statusBar.backgroundColorByHexString('#dabc56');
                    this.theme.changeTheme(JSON.stringify(defaultTheme));
                    this.appPreferences.store('selectedTheme', JSON.stringify(defaultTheme)).then(PreferenceStoreRes => {
                        console.log("selectedTheme success =", PreferenceStoreRes);
                    })
                }

            });
        } else {
            const selectedTheme = localStorage.getItem('selectedTheme');
            if (selectedTheme) {
                this.theme.changeTheme(selectedTheme);
            } else {
                const defaultTheme = { "primary": "#ffdd67", "secondary": "#4d4d4d", "secondarylow": "#fde79a", "barbg": "#fbf8ec" };
                this.theme.changeTheme(JSON.stringify(defaultTheme));
                localStorage.setItem('selectedTheme', JSON.stringify(defaultTheme))
            }
        }
    }

    fetchUserIdAndOrgIdFromPreference() {
        if (this.isMobile) {
            const taskList = [];
            taskList.push(this.appPreferences.fetch('userId').then((UserIdRes) => {
                return UserIdRes;
            }));

            taskList.push(this.appPreferences.fetch('orgId').then((OrgIdRes) => {
                return OrgIdRes;
            }));

            taskList.push(this.appPreferences.fetch('SessionId').then((SessionIdRes) => {
                return SessionIdRes;
            }));

            taskList.push(this.appPreferences.fetch('appBuilderURL').then((appBuilderRes) => {
                return appBuilderRes;
            }));

            taskList.push(this.appPreferences.fetch('userTimeZone').then((userTimeZoneRes) => {
                return userTimeZoneRes;
            }));

            taskList.push(this.appPreferences.fetch('userDateFormat').then((userDateFormatRes) => {
                return userDateFormatRes;
            }));

            taskList.push(this.appPreferences.fetch('dbname').then((dbNameRes) => {
                return dbNameRes;
            }));
            taskList.push(this.appPreferences.fetch('proxy_pass').then((proxypassRes) => {
                return proxypassRes;
            }));

            taskList.push(this.appPreferences.fetch('user_name').then((userNameRes) => {
                return userNameRes;
            }));

            taskList.push(this.appPreferences.fetch('password').then((passwordRes) => {
                return passwordRes;
            }));

            taskList.push(this.appPreferences.fetch('roleId').then((roleIdRes) => {
                return roleIdRes;
            }));
            taskList.push(this.appPreferences.fetch('accessToken').then((accessTokenRes) => {
                return accessTokenRes;
            }));
            // taskList.push(this.appPreferences.fetch('versionNumber').then((res) => {
            //     return res;
            // }));
            return Promise.all(taskList).then(res => {
                this.userId = res[0];
                this.orgId = res[1];
                this.sessionId = res[2];
                this.appBuilderURL = res[3];
                this.userTimeZone = res[4]; // assigning user profile timezone
                this.userDateFormat = res[5]; // assigning user profile date format
                //this.dbConfiguration.databaseName = res[6];

                //dbconfiguration assignment
                this.dbConfiguration.remoteDbUrl = "http://192.168.57.254:5984/";
                this.dbConfiguration.username = "datauser";
                this.dbConfiguration.password = "dtausr123";

                //attachment dbconfiguration assignment
                this.attachmentdbConfiguration.remoteDbUrl = "http://192.168.57.254:5984/";
                this.attachmentdbConfiguration.username = "datauser";
                this.attachmentdbConfiguration.password = "dtausr123";

                //cspfm execution dbconfiguration assigment
                this.cspfmexecutionPouchdbConfiguration.remoteDbUrl = "http://192.168.57.254:5984/";
                this.cspfmexecutionPouchdbConfiguration.username = "datauser";
                this.cspfmexecutionPouchdbConfiguration.password = "dtausr123";

                //formula dbconfiguration assignment
                this.formuladbConfiguration.remoteDbUrl = "http://192.168.57.254:5984/";
                this.formuladbConfiguration.username = "datauser";
                this.formuladbConfiguration.password = "dtausr123";

                //metadata dbconfiguration assigment
                this.metaDbConfig.remoteDbUrl = "http://192.168.57.254:5984/";
                this.metaDbConfig.username = "datauser";
                this.metaDbConfig.password = "dtausr123";
                this.roleId = res[10];
                this.accessToken = res[11];
                // this.versionNumber = res[11];
                this.profilePicSrc = this.getUserImageURL(this.userId)

                this.makeDateTimePickerFormatAndZoneValues();

                this.appPreferences.fetch('login_response').then(res => {
                    const assignedApps = JSON.parse(res);
                    if (assignedApps.length > 0) {
                        const currentAppId = this.appConfig.configuration.appId;
                        let currentObject = assignedApps.filter(app => app.appId == currentAppId);
                        this.applicationName = currentObject[0]['appDisplayName'];
                    }
                })
                return Promise.resolve('Success');
            });
        } else {
            this.userId = JSON.parse(localStorage['userId']);
            this.roleId = JSON.parse(localStorage['roleId']);
            this.orgId = JSON.parse(localStorage['orgId']);
            // this.versionNumber = JSON.parse(localStorage['versionNumber']);
            this.appBuilderURL = localStorage['appBuilderURL'];
            this.sessionId = localStorage['sessionId'];

            this.userTimeZone = localStorage['userTimeZone'];
            this.userDateFormat = localStorage['userDateFormat'];
            this.orgTimeZone = localStorage['orgTimeZone'];
            this.userGroups = JSON.parse(localStorage['userGroupsId'])
            this.userResponsibilities = JSON.parse(localStorage['userResponsibilitiesId'])
            this.profilePicSrc = this.getUserImageURL(this.userId)

            this.makeDateTimePickerFormatAndZoneValues();

            let assignedApps = JSON.parse(localStorage['assignedApps']);
            if (assignedApps.length > 0) {
                const currentAppId = this.appConfig.configuration.appId;
                let currentObject = assignedApps.filter(app => app.appId == currentAppId);
                this.applicationName = currentObject[0]['appDisplayName'];
            }

            if (localStorage['sessionId']) {
                return Promise.resolve(this.getAdditionalInfo(this.orgId, this.userId, this.sessionId));
            } else {// ****This block is especially for running appM Guide purpose. This block is not available in base app.
                this.dbConfiguration.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.dbConfiguration.username = 'datauser';
                this.dbConfiguration.password = 'dtausr123';

                //this.dbConfiguration.databaseName = couchInfo['dbname'];
                this.dbConfiguration.password = 'dtausr123';
                this.dbConfiguration.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.dbConfiguration.username = 'datauser';

                //attachment dbconfiguration assignment
                this.attachmentdbConfiguration.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.attachmentdbConfiguration.username = 'datauser';
                this.attachmentdbConfiguration.password = 'dtausr123';

                //cspfm execution dbconfiguration assigment
                this.cspfmexecutionPouchdbConfiguration.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.cspfmexecutionPouchdbConfiguration.username = 'datauser';
                this.cspfmexecutionPouchdbConfiguration.password = 'dtausr123';

                //formula dbconfiguration assignment
                this.formuladbConfiguration.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.formuladbConfiguration.username = 'datauser';
                this.formuladbConfiguration.password = 'dtausr123';

                //metadata dbconfiguration assigment
                this.metaDbConfig.remoteDbUrl = 'http://192.168.57.254:5984/';
                this.metaDbConfig.username = 'datauser';
                this.metaDbConfig.password = 'dtausr123';
                return Promise.resolve(this.checkAppId(this.isMobile));
            }
        }
    }

    makeDateTimePickerFormatAndZoneValues() {
        this.userDateTimeFormat = this.userDateFormat + ' ' + this.hoursFormat; // assigning user profile date time format
        this.userDatePickerFormat = this.userDateFormat.toUpperCase(); // assigning user profile date format with uppercase for date picker
        this.userDateTimePickerFormat = this.userDatePickerFormat + ' ' +
            this.hoursFormat; // assigning user profile date time format for date time picker

        this.userZoneOffsetValue = this.convertUserProfileOffsetToZoneNumber(this._userTimeZone); // Method calling to get user timezone offset value. For eg: +0530, -0400
        this.userZoneOffsetValueWithFormat = this.convertUserProfileOffsetToZoneNumberWithFormat(this._userTimeZone); // Method calling to get user timezone offset value. For eg: +05:30, -04:00

        this.orgZoneOffsetValue = this.convertUserProfileOffsetToZoneNumber(this._orgTimeZone); // Method calling to get user timezone offset value. For eg: +0530, -0400
        this.orgZoneOffsetValueWithFormat = this.convertUserProfileOffsetToZoneNumberWithFormat(this._orgTimeZone); // Method calling to get user timezone offset value. For eg: +05:30, -04:00
    }

    validateSailsSession() {
        return this.sessionvalidator.validateSessionWithOrgidandUserId().then(sessionValidRes => {
            if (sessionValidRes['status'] === 'success') {
                localStorage.setItem('sessionId', sessionValidRes['sessionId']);
                localStorage.setItem('appBuilderURL', sessionValidRes['appBuilderURL']);
                localStorage.setItem('roleId', sessionValidRes['userInfo']['personalInfo']['roleId']);
                localStorage.setItem('orgId', JSON.stringify(sessionValidRes['orgId']));
                localStorage.setItem('userId', JSON.stringify(sessionValidRes['userId']));
                localStorage.setItem('assignedApps', JSON.stringify(sessionValidRes['assignedApps']));
                localStorage.setItem('userTimeZone', sessionValidRes['userInfo']['profileInfo']['timeZoneId']);
                localStorage.setItem('userDateFormat', sessionValidRes['userInfo']['profileInfo']['dateFormat']);
                localStorage.setItem('orgTimeZone', JSON.stringify(sessionValidRes['orgTimeZone']));
                return Promise.resolve('SUCCESS');
            } else {
                return Promise.resolve(sessionValidRes['message']);
            }
        }).catch(error => {
            console.log('An error occurred', error);
            return Promise.resolve("Failure");
        });
    }

    getAdditionalInfo(orgId, userId, sessionId) {
        const postData = {
            "inputparams": {
                "userId": userId,
                "orgId": orgId,
                "appname": "appM",
                "processInfo": [{
                    "isCouchInfoRequired": "Y",
                    "isPushNotificationInfoRequired": "N"
                }]
            }
        }

        if (this.isMobile) {
            postData.inputparams['sessionToken'] = this.accessToken
            postData.inputparams['sessionType'] = "OAUTH"
        } else {
            postData.inputparams['sessionToken'] = sessionId
            postData.inputparams['sessionType'] = "NODEJS"
        }

        const serviceURl = '/apps/additionalInfoService';
        return this.http
            .post(serviceURl, JSON.stringify(postData))
            .toPromise().then(res => {
                const response = JSON.parse(res['_body']);
                if (response['status'] === 'SUCCESS') {
                    //Socket server url
                    this.socketServerURL = response['socketServerUrl']
                    const couchInfo = response['couchInfo'];
                    //this.dbConfiguration.databaseName = couchInfo['dbname'];
                    this.dbConfiguration.password = couchInfo['password'];
                    this.dbConfiguration.remoteDbUrl = couchInfo['proxy_pass'] + '/';
                    this.dbConfiguration.username = couchInfo['user_name'];

                    //attachment dbconfiguration assignment
                    this.attachmentdbConfiguration.remoteDbUrl = couchInfo['proxy_pass'] + '/';
                    this.attachmentdbConfiguration.username = couchInfo['user_name'];
                    this.attachmentdbConfiguration.password = couchInfo['password'];

                    //cspfm execution dbconfiguration assigment
                    this.cspfmexecutionPouchdbConfiguration.remoteDbUrl = couchInfo['proxy_pass'] + '/';
                    this.cspfmexecutionPouchdbConfiguration.username = couchInfo['user_name'];
                    this.cspfmexecutionPouchdbConfiguration.password = couchInfo['password'];

                    //formula dbconfiguration assignment
                    this.formuladbConfiguration.remoteDbUrl = couchInfo['proxy_pass'] + '/';
                    this.formuladbConfiguration.username = couchInfo['user_name'];
                    this.formuladbConfiguration.password = couchInfo['password'];

                    //metadata dbconfiguration assigment
                    this.metaDbConfig.remoteDbUrl = couchInfo['proxy_pass'] + '/';
                    this.metaDbConfig.username = couchInfo['user_name'];
                    this.metaDbConfig.password = couchInfo['password'];
                    this.initNotification();
                    return Promise.resolve(this.checkAppId(this.isMobile));
                } else {
                    if (response === "Session Expired") {
                        this.presentToast("Session Expired");
                        setTimeout(() => {
                            window.location.replace('/apps');
                        }, 1500);
                        return Promise.resolve(response);
                    } else {
                        return Promise.resolve('Server error');
                        // return Promise.resolve(response);
                    }
                }


            })
            .catch(error => {
                console.log('An error occurred', error);
                return Promise.resolve(error.message || 'Server connection failed');
            });
    }

    convertUserProfileOffsetToZoneNumber(timeZone) {
        const offsetValue = moment.tz(timeZone).utcOffset();
        let zoneString = '';
        let positiveNegativeValue = '';

        if (offsetValue >= 0) {
            positiveNegativeValue = '+';
        } else {
            positiveNegativeValue = '-';
        }

        const zoneOffset = Math.abs(offsetValue) / 60;

        const zoneValue = zoneOffset.toString();
        if (zoneValue.length === 1) {
            zoneString = positiveNegativeValue + '0' + zoneValue + '00';
        } else if (zoneValue.length === 2) {
            zoneString = positiveNegativeValue + zoneValue + '00';
        } else {
            const zoneValueSplitArray = zoneValue.split('.');
            const firstIndex = zoneValueSplitArray[0];
            const secondIndex = zoneValueSplitArray[1];

            const percentToHour = (Number(secondIndex) * 60 / 100).toString();

            let hourValue = '';
            if (percentToHour.length === 1) {
                hourValue = percentToHour + '0';
            } else {
                hourValue = percentToHour;
            }

            if (firstIndex.length === 1) {
                zoneString = positiveNegativeValue + '0' + firstIndex + hourValue;
            } else {
                zoneString = positiveNegativeValue + firstIndex + hourValue;
            }
        }
        return zoneString;
    }

    convertUserProfileOffsetToZoneNumberWithFormat(timeZone) {
        const offsetValue = moment.tz(timeZone).utcOffset();
        let zoneString = '';
        let positiveNegativeValue = '';

        if (offsetValue >= 0) {
            positiveNegativeValue = '+';
        } else {
            positiveNegativeValue = '-';
        }

        const zoneOffset = Math.abs(offsetValue) / 60;

        const zoneValue = zoneOffset.toString();
        if (zoneValue.length === 1) {
            zoneString = positiveNegativeValue + '0' + zoneValue + ':00';
        } else if (zoneValue.length === 2) {
            zoneString = positiveNegativeValue + zoneValue + ':00';
        } else {
            const zoneValueSplitArray = zoneValue.split('.');
            const firstIndex = zoneValueSplitArray[0];
            const secondIndex = zoneValueSplitArray[1];

            const percentToHour = (Number(secondIndex) * 60 / 100).toString();

            let hourValue = '';
            if (percentToHour.length === 1) {
                hourValue = percentToHour + '0';
            } else {
                hourValue = percentToHour;
            }

            if (firstIndex.length === 1) {
                zoneString = positiveNegativeValue + '0' + firstIndex + ':' + hourValue;
            } else {
                zoneString = positiveNegativeValue + firstIndex + ':' + hourValue;
            }
        }
        return zoneString;
    }

    checkAppId(isMobile) {
        if (!isMobile) {
            if (localStorage['assignedApps']) {
                const assignedApps = JSON.parse(localStorage['assignedApps']);

                const assignedAppIds = assignedApps.map(obj => obj.appId);

                if (assignedAppIds.indexOf(this.appConfig.configuration.appId) < 0) {
                    return Promise.resolve('This app not assigned to you!!!');
                } else {
                    return Promise.resolve('Success');
                }

            } else {
                return Promise.resolve('This app not assigned to you!!!');
            }
        } else {
            return Promise.resolve('Success');
        }
    }
    getMultiAndSinglePickerDisplayName(couchValue, jsonValue) {
        const result = [];
        let displayValue: string = '';
        for (const data of couchValue) {
            jsonValue.filter((item) => {
                const value = item[data];
                if (value !== undefined) {
                    result.push(value);
                }
            });
            displayValue = result.toString();
        }
        return displayValue;
    }
    validateWebUrl(weburl) {
        const regexp = new RegExp('^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$');
        if (!regexp.test(weburl)) {
            this.presentToast('URL is not valid');
        } else {
            window.open(weburl, '_system');
        }
    }
    presentToast(message): MatSnackBarRef<SimpleSnackBar> {
        // const toast = await this.toastCtrl.create({
        //     message: message,
        //     duration: 2000,
        //     position: 'bottom'
        // });
        // toast.dismiss(() => {
        //     console.log('Dismissed toast');
        // });
        // toast.present();
        return this.zone.run(() => {
            return this.snackBar.open(message, '', { duration: 2000 });
        });
    }

    async presentPopover(myEvent, items) {
        const popover = await this.popoverController.create({
            component: popoverpage,
            componentProps: { message: 'passed message', popoverController: items },
            event: myEvent,
            translucent: true
        });
        return await popover.present();
    }

    getApplicationName() {
        let appName = '';
        let assignedAppsInfo = JSON.parse(localStorage.getItem('assignedApps'));
        if (assignedAppsInfo.length == 0) {
            return appName;
        }

        assignedAppsInfo.forEach(assignedApp => {
            if (assignedApp['appId'] == this.appConfig.configuration.appId) {
                appName = assignedApp['appName'];
            }
        });

        return appName;
    }

    makeLogObjectWithRequiredValues(logContent, type) {
        if (this._isMobile) {
            return;
        }
        let messageObject = {}
        messageObject['user_id'] = localStorage.getItem('userId');
        messageObject['app_id'] = this.appConfig.configuration.appId;
        messageObject['org_id'] = localStorage.getItem('orgId');
        messageObject['app_name'] = this.getApplicationName();
        messageObject['system_time'] = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss.SSS');
        messageObject['log_content'] = logContent;
        this.writeLogToServer(messageObject, type);
    }

    writeLogToServer(messageObject, type) {
        var url = window.location.href
        var arr = url.split("/");
        var result = arr[0] + "//" + arr[2]
        var path = result.concat('/apps/api/write_log')

        let postParams = { 'type': type, 'message': messageObject };

        this.http.post(path, postParams)
            .subscribe(data => {
                let responseBody = JSON.parse(data['_body']);
                let status = responseBody['status'];
                console.log("Status : " + JSON.stringify(status));
            }, error => {
                console.log("Error : " + JSON.stringify(error));
            });
    }

    setDataRestrictionByRestrictionType(referenceDetail, options, layoutDataRestrictionSet) {

        if (referenceDetail['objectType'].toUpperCase() != 'PRIMARY') {
            return;
        }

        var userIDs = [];
        layoutDataRestrictionSet.forEach(element => {
            userIDs = userIDs.concat(element['restrictedDataUserIds'])
        })
        if (userIDs != undefined && userIDs.length != 0) {
            if (userIDs.length > 1) {
                options['selector']['data.createdby'] = {
                    $in: userIDs
                }
            } else {
                options['selector']['data.createdby'] = userIDs[0]
                console.log(options);
            }
        } else {
            console.log("User Id restriction is not set and objectType is : ", referenceDetail['objectType'].toUpperCase());
        }
    }

    setDataRestrictionByUsers(layoutDataRestrictionSet, objectHierarchyJSON) {
        if (layoutDataRestrictionSet.length > 0) {
            layoutDataRestrictionSet.forEach(dataRestriction => {
                if (dataRestriction['restrictionType'] == 'Owner') {//If the layout data restriction level is "Owner"
                    if (objectHierarchyJSON['options']) {
                        if (objectHierarchyJSON['options']['selector']) {
                            objectHierarchyJSON['options']['selector']['data.type'] = "pfm" + objectHierarchyJSON['objectId']
                            objectHierarchyJSON['options']['selector']['data.createdby'] = this.userId
                        }
                    } else {
                        objectHierarchyJSON['options'] = {
                            "selector": {
                                "data.type": "pfm" + objectHierarchyJSON['objectId'],
                                "data.createdby": this.userId
                            }
                        }
                    }
                }
            });
        }
        return objectHierarchyJSON;
    }
    setHomePageNode() {
        if (this.homePageNodeFlag) {
            // this.homePageNode['homePageNodeName'] = document.getElementsByTagName('ion-router-outlet')[1].childNodes[0].childNodes[0].textContent
            this.homePageNode['homePageNodeName'] = "Home"
            this.homePageNode['homePageNodepath'] = document.getElementsByTagName('ion-router-outlet')[1].children[0].tagName.toLowerCase()
            this.homePageNodeFlag = false
        }
    }
    getHomePageNode() {
        if (!this.homePageNodeFlag) {                               //this.homePageNodeFlag tells us if the setHomePageNode() is called or not.
            if (this.homePageNode.homePageNodeName === "") {
                this.homePageNode.homePageNodeName = "Home";
                return this.homePageNode
            }
            return this.homePageNode
        }
    }
    navigateToHomepage() {
        const queryParamsRouting = { "isFromMenu": true }
        this.navCtrl.navigateBack([this.landingPageInfo.path], { skipLocationChange: true, queryParams: queryParamsRouting })
    }
    setEventSubscriptionlayoutIds(tableName, layoutId, dataSource?) {
        if (this.eventSubscriptionObject[dataSource]) {
            if (this.eventSubscriptionObject[dataSource][tableName]) {
                this.eventSubscriptionObject[dataSource][tableName][layoutId] = "";
            } else {
                this.eventSubscriptionObject[dataSource][tableName] = {};
                this.eventSubscriptionObject[dataSource][tableName][layoutId] = "";
            }
        } else {
            this.eventSubscriptionObject[dataSource] = {};
            this.eventSubscriptionObject[dataSource][tableName] = {};
            this.eventSubscriptionObject[dataSource][tableName][layoutId] = "";
        }
        console.log("Set EventSubscriptionlayoutIds : ", this.eventSubscriptionObject)
    }
    getEventSubscriptionlayoutIds(dataSource, tableName) {
        if (this.eventSubscriptionObject[dataSource]) {
            if (this.eventSubscriptionObject[dataSource][tableName]) {
                return Object.keys(this.eventSubscriptionObject[dataSource][tableName])
            } else {
                return
            }
        } else {
            return
        }
    }
    checkPageAlreadyInStack(redirectUrl) {
        var stackArray = document.getElementsByTagName('ion-router-outlet')[1].children
        for (let i = 0; i < stackArray.length; i++) {
            if ("/menu/" + stackArray[i].tagName.toLowerCase() == redirectUrl.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    innerDependentObjectIdCheck(currentObject, pathArray, type, modified, providerType?, formulaAndRollupFieldInfo?) {
        var tempObject = currentObject;
        for (let i = 0; i < pathArray.length; i++) {
            tempObject = this.getObject(tempObject, pathArray[i])
            if (tempObject) {
                if (i == pathArray.length - 1) {
                    if (providerType) {
                        let isValueChanged = this.checkFormulaOrRollupColumnValuesChanged(modified, tempObject, formulaAndRollupFieldInfo)
                        return type + "_2_" + tempObject['id'] == modified['id'] && isValueChanged
                    } else {
                        return type + "_2_" + tempObject['id'] == modified['id']
                    }
                }
            } else {
                return false
            }
        }
    }
    getObject(object, key) {
        // Chcek for right key
        key = this.getCorrectKey(object, key)
        if (!key) {
            return false
        }
        // Check whether object is JSON or Array and return the inner object
        if (object[key]) {                                //if object is an object
            if (object[key][0]) {
                if (Object.keys(object[key][0]).length > 0) {
                    return object[key][0]
                } else {
                    return false
                }
            } else {
                if (Object.keys(object[key]).length > 0) {
                    return object[key]
                } else {
                    return false
                }
            }
        } else if (object[0]) {                      //if object is an array
            if (object[0][key]) {
                if (object[0][key][0]) {
                    if (Object.keys(object[0][key][0]).length > 0) {
                        return object[0][key][0]
                    } else {
                        return false
                    }
                } else {
                    if (Object.keys(object[0][key]).length > 0) {
                        return object[0][key]
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
    getCorrectKey(object, key) {
        // Chcek for right key
        if (object[key + "s"]) {
            return key + "s"
        } else if (object[key]) {
            return key
        } else if (object[0]) {
            if (object[0][key + "s"]) {
                return key + "s"
            }
            if (object[0][key]) {
                return key
            } else {
                return false
            }
        } else {
            return false
        }
    }
    getUserImageURL(userId) {
        return window.location.protocol + "//" + window.location.hostname + "/appdesigner/fscontroller/downloadfile?fileName=/dynaImages/" +
            this.orgId + "/user/" + userId + "_L_img.png&nodeGUID=" + this.appConfig.configuration['nodeGUID'];
    }

    makeRegexQuery(queryValue: string) {
        let regexQuery = queryValue.replace(/[!-/:-@[-`{-~]/g, '?').toLowerCase().split(' ').join('?') + "*";
        return regexQuery;
    }

    makeRegexQueryMultiSelect(queryValue: string) {
        let regexQuery = queryValue.replace(/[!-/:-@[-`{-~]/g, '?').toLowerCase().split(' ').join('?') + "*";
        return regexQuery;
    }

    checkFormulaOrRollupColumnValuesChanged(modified, object, formulaAndRollupFieldInfo){
        let isChangesOccurred = false;
        let objectType = modified['doc']['data']['type']
        if(formulaAndRollupFieldInfo[objectType] && formulaAndRollupFieldInfo[objectType].length > 0){
            formulaAndRollupFieldInfo[objectType].forEach(element => {
                let splittedField = element.split("__")
                let finalField = splittedField[0]
                if(modified['doc']['data'][finalField]){
                    if(object[element] != modified['doc']['data'][finalField]){
                        isChangesOccurred = true;
                    }
                }
            });
        }
        return isChangesOccurred;
    }

    webServiceCallForFieldTracking(data) {
        const serviceUrl = this.appBuilderURL + '/appmBuilderMapping';

        const params = {
            "session_id": this.sessionId,
            "user_id": this.userId,
            "org_id": this.orgId,
            "object_id": data['type'].replace('pfm', ''),
            "_id": data['type'] + '_' + 2 + '_' + data['id']
        }

        var dialogData;
        if (navigator.onLine) {
            return this.httpClient.post(serviceUrl, params)
                .toPromise()
                .then(res => {
                    console.log('res==>' + JSON.stringify(res));
                    if (res['status'] === 'Success') {
                        res['message'] = res['message'].replace(/'\'/g, '')
                        console.log('URL:', res['message']);
                        dialogData = {
                            url: res['message'],
                            type: "Audit",
                            parentContext: this
                        };
                        return dialogData;
                    } else {
                        dialogData = {
                            title: "Failed",
                            description: res['message'],
                            buttonInfo: [
                                {
                                    "name": "OK"
                                }
                            ],
                            type: "Alert",
                            parentContext: this
                        };
                        return dialogData;
                    }
                }).catch(error => {
                    console.log('error==>' + JSON.stringify(error));
                    dialogData = {
                        title: "Error",
                        description: "Service Unavailable please retry after sometime",
                        buttonInfo: [
                            {
                                "name": "OK"
                            }
                        ],
                        type: "Alert",
                        parentContext: this
                    };
                    return dialogData
                });
        } else {
            dialogData = {
                title: "Failed",
                description: "No network connection",
                buttonInfo: [
                    {
                        "name": "OK"
                    }
                ],
                type: "Alert",
                parentContext: this
            };
            return Promise.resolve(dialogData)
        }
    }
    setColumnWidth(columnDefinitions) {
        const maxWidth = 250;
        const minWidth = 80;
        columnDefinitions.forEach(columnDef => {
            var widthsArray = []
            widthsArray.push(columnDef['params']['columnWidth'] * 11)
            if (columnDef['params']['actionInfo']) {
                widthsArray.push(this.calculateButtonWidth(columnDef))
            }
            widthsArray.push(this.calculateNameKeyWidth(columnDef))
            let maxVal = Math.max(...widthsArray)
            columnDef['width'] = maxVal > maxWidth ? maxWidth : (maxVal < minWidth ? minWidth : maxVal)
        })
    }
    calculateButtonWidth(columnDef) {
        const padding = 12;
        var width = 0;
        if (columnDef['params']['actionInfo'].length === 1) {
            width = this.getButtonWidth(columnDef)
        } else {
            columnDef['params']['actionInfo'].forEach(actionInfo => {
                width += this.getButtonWidth(columnDef)
            })
        }
        return width + padding;
    }
    getButtonWidth(columnDef) {
        switch (columnDef['params']['actionInfo'][0]['actionDisplayType']) {
            case "Button":
                return this.calculateButtonLength(columnDef)
            case "IconandButton":
                return this.calculateButtonLength(columnDef)+50
            case "Icon":
                return 50
            default:
                return 80
        }
    }
    calculateButtonLength(columnDef) {
        return (columnDef['params']['actionInfo'][0]['actionLabel'].length * 11)
    }
    calculateNameKeyWidth(columnDef) {
        var title = "";
        if (columnDef['nameKey'].includes('.')) {
            title = this.translateService.instant(columnDef['nameKey'])
        } else {
            title = columnDef['nameKey']
        }
        return title.length * 11
    }

    initNotification(){
        this.notificationObj.initsocket(this.socketServerURL,{
            transports: ['websocket', 'xhr-polling'],
            'reconnection delay' : 2000,
            'force new connection' : true,
            query: 'userId=' + this.userId +'&orgId='+ this.orgId
        })
        this.subscribeNotifications()
        this.notificationObj.notificationRequest()
    }
    subscribeNotifications() {
        this.notificationObj
            .getMessages()
            .subscribe((notification: string) => {
                if (notification) {
                    var notifyArray = JSON.parse(notification);
                    if(notifyArray.constructor == Array && notifyArray.length > 0){
                        notifyArray.forEach(element => {
                            if(element['notificationRecipients']){
                                var notificationRecipients = element['notificationRecipients']
                                var loggeduserNotifyDetail = notificationRecipients.find(recipient => {
                                    return recipient.userId === this.userId
                                })
                                if(loggeduserNotifyDetail && loggeduserNotifyDetail['isSeen'] == 'N'){
                                    this.notifications.push(element)
                                }
                            }
                        });
                    }
                }
            });
    }

    public datetimeValidation(fieldValue) {
        if (fieldValue && !moment(fieldValue, this.userDateTimePickerFormat, true).isValid()) {
            return false;
        }
        return true;
    }
    public dateValidation(fieldValue) {
        if (fieldValue && !moment(fieldValue, this.userDatePickerFormat, true).isValid()) {
            return false;
        }
        return true;
    }

    couchListenerStopped(providerName: string, providerObject) {
        this.couchDbProviderList[providerName] = providerObject;
        providerObject.networkWithOutConnectivity()

        if (this.couchDbListenerStopped == false) {
            this.couchDbListenerStopped = true;
            this.couchServerCheckedCount = 0;
            this.checkCouchConnection();
        }
    }

    showListenerStopAlert(message) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = {
            title: message,
            buttonInfo: [
                {
                    "name": "OK",
                    "handler": () => {
                        let appUrl = '';
                        if (location.hostname.includes('uiqa')) {
                            appUrl='appm5'
                        }
                        if (location.protocol === "http:") {
                            window.location.href = `http://${location.hostname}:${location.port}/${appUrl}`;
                        } else {
                            window.location.href = `https://${location.hostname}/${appUrl}`;
                        }
                        this.couchDbListenerStopped = false;
                    }
                }
            ],
            parentContext: this,
            type: "Alert"
        };
        dialogConfig.autoFocus = false

        this.matDialog.open(cspfmAlertDialog, dialogConfig);
    }

    startCouchListener() {
        Object.keys(this.couchDbProviderList).forEach(providerName => {
            let providerObject = this.couchDbProviderList[providerName];
            providerObject.networkWithConnectivity()
        })
    }

    checkCouchConnection() {
        let url = this.dbConfiguration.remoteDbUrl + '_up'
        console.log("couch connection check started");
        this.httpClient.get(url).toPromise()
            .then(res => {
                console.log("couch connection up check res", res);
                if (res['status'] == 'ok') {
                    this.couchDbListenerStopped = false;
                    this.couchServerCheckedCount = 0;
                    this.startCouchListener();
                } else {
                    this.couchServerCheckedCount += 1;
                    if (this.couchServerCheckedCount < this.maxCouchServerCheckCount) {
                        this.checkCouchConnection()
                    } else {
                        this.couchServerCheckedCount = 0;
                        this.couchDbListenerStopped = false;
                        this.showListenerStopAlert('Database connection interrupted due to some technical issue. Application needs to reload')
                    }
                }
            }).catch(err => {
                this.couchServerCheckedCount += 1;
                console.log("couch connection up check error :", err);
                if (this.couchServerCheckedCount < this.maxCouchServerCheckCount) {
                    this.checkCouchConnection()
                } else {
                    this.couchServerCheckedCount = 0;
                    this.couchDbListenerStopped = false;
                    this.showListenerStopAlert('Database connection interrupted due to some technical issue. Application needs to reload')
                }
            })
    }
    getDependentObjectId(data, relationalObjectInfo) {
        if (relationalObjectInfo['fieldType'] == "MASTERDETAIL" || relationalObjectInfo['fieldType'] == "HEADER") {
            if (data[relationalObjectInfo['relationalObjectId']] && data[relationalObjectInfo['relationalObjectId']].length > 0) {
                if (relationalObjectInfo['child'] == "") {
                    return data[relationalObjectInfo["relationalObjectId"]][0]['id'];
                }
                else {
                    return this.getDependentObjectId(data[relationalObjectInfo["relationalObjectId"]][0], relationalObjectInfo["child"]);
                }
            }
        }
        else if(relationalObjectInfo['fieldType'] == "LOOKUP") {
            if (data[relationalObjectInfo['relationalObjectId']] && data[relationalObjectInfo['relationalObjectId']].length > 0) {
                if (relationalObjectInfo['child'] == "") {
                    return data[relationalObjectInfo["relationalObjectId"]];
                } else {
                    return this.getDependentObjectId(data[relationalObjectInfo['relationalObjectId']], relationalObjectInfo['child']);
                }
            }
        }
    }
    async showInfoAlert(info) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.data = {
            title: info,
            buttonInfo: [
                {
                    "name": "OK"
                }
            ],
            parentContext: this,
            type: "Alert"
        };
        dialogConfig.autoFocus = false

        this.matDialog.open(cspfmAlertDialog, dialogConfig);
    }
    navigationToComponent(actionInfo, dependantObjectId,redirectUrlForNav?) {
        let action = actionInfo['actionType'] === "EDIT" ? "Edit" : "View";
        redirectUrlForNav = redirectUrlForNav ? redirectUrlForNav : '/menu/' + actionInfo['navigationInfo']['redirectUrl'];
        let navigationParameters = {
            action: action,
            id: dependantObjectId
        };
        if (!this.checkPageAlreadyInStack('/menu/' + actionInfo['navigationInfo']['navigationUrl'])) {
            navigationParameters['redirectUrl'] = redirectUrlForNav;
        }
        this.router.navigate(['/menu/' + actionInfo['navigationInfo']['navigationUrl']], {
            queryParams: navigationParameters,
            skipLocationChange: true
        });
    }
    fetchLockedUserDetail(dataObject,workFlowMapping,cspfmMetaCouchDbProvider) {
        var systemAttributes = dataObject["systemAttributes"];
        var userId = systemAttributes["lockedBy"];
        var date = new Date(systemAttributes["lockedDate"]);
        const query = "type: " + this.metaDbConfig.corUsersObject + " AND " + "user_id: " + userId
        const corUsersObjectHierarchyJSON = {
            "objectId": this.metaDbConfig.corUsersObject,
            "objectName": this.metaDbConfig.corUsersObject,
            "fieldId": 0,
            "objectType": "PRIMARY",
            "relationShipType": null,
            "childObject": [
            ]
        };
        return cspfmMetaCouchDbProvider.fetchRecordsBySearchFilterPhrases(query,
            corUsersObjectHierarchyJSON).then(corUserResult => {
                if (corUserResult.status !== "SUCCESS" || (corUserResult.status == "SUCCESS" && corUserResult["records"].length == 0)) {
                    this.showInfoAlert( userId + "  has locked for " + workFlowMapping[dataObject["systemAttributes"]["fieldId"]] + " on " +
                        this.datePipe.transform(date, this.userDateTimeFormat));
                    return;
                }
                this.showInfoAlert(corUserResult["records"][0]["first_name"] + "  has locked for " +
                    workFlowMapping[dataObject["systemAttributes"]["fieldId"]] +" on " +
                    this.datePipe.transform(date, this.userDateTimeFormat));
            }).catch(err => {
                this.showInfoAlert(userId + "  has locked for " + workFlowMapping[dataObject
                ["systemAttributes"]["fieldId"]] +" on " + this.datePipe.transform(date, this.userDateTimeFormat));
            });
    }

    // Need to remove this method after moving all the layout's common codes to util file. Replace this method with 
        "deleteEventSubscriptionlayoutIds" method in all the layouts 
    removeEventSubscriptionlayoutIds(tableName: string, layoutId: string, dataSource?: string) {
        delete this.eventSubscriptionObject[dataSource][tableName][layoutId]
    }

    addEventSubscriptionlayoutIds(dependentObjectList: DependentObjectListType, layoutId: string, dataSource: string) {
        if (dependentObjectList['relationalObjects']) {
            Object.keys(dependentObjectList['relationalObjects']).forEach(dependentObjectName => {
                this.setEventSubscriptionlayoutIds(dependentObjectName, layoutId, dataSource)
            })
        }
        if (dependentObjectList['lookupObjects']) {
            Object.keys(dependentObjectList['lookupObjects']).forEach(dependentObjectName => {
                this.setEventSubscriptionlayoutIds(dependentObjectName, layoutId, dataSource)
            })
        }
    }

    deleteEventSubscriptionlayoutIds(dependentObjectList: DependentObjectListType, layoutId: string, dataSource: string) {
        if (dependentObjectList['relationalObjects']) {
            Object.keys(dependentObjectList['relationalObjects']).forEach(dependentObjectName => {
                delete this.eventSubscriptionObject[dataSource][dependentObjectName][layoutId];
            })
        }
        if (dependentObjectList['lookupObjects']) {
            Object.keys(dependentObjectList['lookupObjects']).forEach(dependentObjectName => {
                delete this.eventSubscriptionObject[dataSource][dependentObjectName][layoutId];
            })
        }
    }

    presentNoInternetToast(parent: object) {
        this.zone.run(() => {
            const snackBar = this.presentToast("No internet connection. Please check your internet connection and try again.");
            snackBar.afterDismissed().subscribe(observer => {
                if(parent['refreshData']) {
                    parent['refreshData']();
                }
            });
        });
    }

    backButtonOnclick(isPopUpEnabled: boolean, dialogRef: MatDialogRef<any, any>, redirectUrl: string) {
        if (isPopUpEnabled) {
            dialogRef.close();
        } else {
            this.router.navigate([redirectUrl], {
                skipLocationChange: true
            });
        }
    }

    closeDialog(isPopUpEnabled: boolean, dialogRef: MatDialogRef<any, any>) {
        if (isPopUpEnabled) {
            dialogRef.close();
        }
    }

    setRedirectUrl(isPopUpEnabled: boolean, urlObject: { redirectUrl: string, currentPageUrl: string, navPageUrl: string }): string | undefined {
        if (isPopUpEnabled) {
            return urlObject.redirectUrl;
        } else {
            return (!this.checkPageAlreadyInStack(urlObject.navPageUrl)) ? urlObject.currentPageUrl : undefined;
        }
    }

    showAlert(parent: object, message: string): MatDialogRef<cspfmAlertDialog, any> {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.data = {
            title: message,
            buttonInfo: [{
                "name": "OK"
            }],
            parentContext: parent,
            type: "Alert"
        };
        dialogConfig.autoFocus = false
        return this.dialog.open(cspfmAlertDialog, dialogConfig);
    }*/
}