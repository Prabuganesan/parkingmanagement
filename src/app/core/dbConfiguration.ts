import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class dbConfiguration {

  constructor() {
  }

  public configuration = {
    databaseName: 'parking_management',
    remoteDbUrl:'',
    schema: [{
      "singular": "vehicle_only",
      "plural": "vehicles",
      "documentType": "vehicle"
    },
    {
      "singular": "vehicle",
      "plural": "vehicles",
      "relations": {
        "alternateVehicles": {
          "hasMany": {
            "type": "alternateVehicle",
            "options": {
              "queryInverse": "vehicle"
            }
          }
        },
        "accounts": {
          "hasMany": {
            "type": "account",
            "options": {
              "queryInverse": "vehicle"
            }
          }
        }
      }
    },
    {
      "singular": "alternateVehicle_only",
      "plural": "alternateVehicles",
      "documentType": "alternateVehicle"
    },
    {
      "singular": "alternateVehicle",
      "plural": "alternateVehicles",
      "relations": {
        "vehicle": {
          "belongsTo": {
            "type": "vehicle",
            "options": {
              "async": true
            }
          }
        }
      }
    },
    {
      "singular": "account_only",
      "plural": "accounts",
      "documentType": "account"
    },
    {
      "singular": "account",
      "plural": "accounts",
      "relations": {
        "vehicle": {
          "belongsTo": {
            "type": "vehicle",
            "options": {
              "async": true
            }
          }
        },
        "rentPlan": {
          "belongsTo": {
            "type": "rentPlan",
            "options": {
              "async": true
            }
          }
        },
        "vehicleEntrys": {
          "hasMany": {
            "type": "vehicleEntry",
            "options": {
              "queryInverse": "account"
            }
          }
        },
        "billDetails": {
          "hasMany": {
            "type": "billDetail",
            "options": {
              "queryInverse": "account"
            }
          }
        }
      }
    },
    {
      "singular": "rentPlan_only",
      "plural": "rentPlans",
      "documentType": "rentPlan"
    },
    {
      "singular": "rentPlan",
      "plural": "rentPlans"
    },
    {
      "singular": "applicationUser_only",
      "plural": "applicationUsers",
      "documentType": "applicationUser"
    },
    {
      "singular": "applicationUser",
      "plural": "applicationUsers",
      "relations": {
        "loginActivitiess": {
          "hasMany": {
            "type": "loginActivities",
            "options": {
              "queryInverse": "applicationUser"
            }
          }
        }
      }
    },
    {
      "singular": "loginActivities_only",
      "plural": "loginActivitiess",
      "documentType": "loginActivities"
    },
    {
      "singular": "loginActivities",
      "plural": "loginActivitiess",
      "relations": {
        "applicationUser": {
          "belongsTo": {
            "type": "applicationUser",
            "options": {
              "async": true
            }
          }
        }
      }
    },
    {
      "singular": "billDetail_only",
      "plural": "billDetails",
      "documentType": "billDetail"
    },
    {
      "singular": "billDetail",
      "plural": "billDetails",
      "relations": {
        "account": {
          "belongsTo": {
            "type": "account",
            "options": {
              "async": true
            }
          }
        },
        "transactions": {
          "hasMany": {
            "type": "transaction",
            "options": {
              "queryInverse": "billDetail"
            }
          }
        }
      }
    },
    {
      "singular": "transaction_only",
      "plural": "transactions",
      "documentType": "transaction"
    },
    {
      "singular": "transaction",
      "plural": "transactions",
      "relations": {
        "billDetail": {
          "belongsTo": {
            "type": "billDetail",
            "options": {
              "async": true
            }
          }
        }
      }
    },
    {
      "singular": "vehicleEntry_only",
      "plural": "vehicleEntrys",
      "documentType": "vehicleEntry"
    },
    {
      "singular": "vehicleEntry",
      "plural": "vehicleEntrys",
      "relations": {
        "account": {
          "belongsTo": {
            "type": "account",
            "options": {
              "async": true
            }
          }
        },
        "contact": {
          "belongsTo": {
            "type": "contact",
            "options": {
              "async": true
            }
          }
        }
      }
    },
    {
      "singular": "contact_only",
      "plural": "contacts",
      "documentType": "contact"
    },
    {
      "singular": "contact",
      "plural": "contacts"
    },
    {
      "singular": "vehicleContactAssignment_only",
      "plural": "vehicleContactAssignments",
      "documentType": "vehicleContactAssignment"
    },
    {
      "singular": "vehicleContactAssignment",
      "plural": "vehicleContactAssignments",
      "relations": {
        "vehicle": {
          "belongsTo": {
            "type": "vehicle",
            "options": {
              "async": true
            }
          }
        },
        "contact": {
          "belongsTo": {
            "type": "contact",
            "options": {
              "async": true
            }
          }
        }
      }
    }
    ],
    tableStructure: {
      "vehicle": {
        "vehicleType": null,
        "vehicleBrand": null,
        "vehicleModel": null,
        "vehicleColor": null,
        "vehicleNumber": null,
        "vehicleImage": null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null

      },
      "alternateVehicle": {
        "vehicleType": null,
        "vehicleBrand": null,
        "vehicleModel": null,
        "vehicleColor": null,
        "vehicleNumber": null,
        "vehicleImage": null,
        "vehicle":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "account": {
        "openDate": null,
        "closeDate": null,
        "totalBillAmount": null,
        "receivedAmount": null,
        "rentPlan_lookup":null,
        "vehicle":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "rentPlan": {
        "rentPlan": null,
        "rentAmount": null,
        "vehicleType": null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "applicationUser": {
        "userName": null,
        "mobile": null,
        "code": null,
        "userType":null,
        "password": null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "loginActivities": {
        "inTime": null,
        "outTime": null,
        "applicationUser":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "billDetail": {
        "totalAmount": null,
        "receivedAmount": null,
        "pendingAmount": null,
        "billMonth": null,
        "billYear": null,
        "account":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "transaction": {
        "transactionAmount": null,
        "transactionMode": null,
        "discountAmount": null,
        "transactionDate": null,
        "paidAmount": null,
        "billDetail":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "vehicleEntry": {
        "inTime": null,
        "outTime": null,
        "account":null,
        "contact_lookup":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "contact": {
        "contactName": null,
        "contactMobile": null,
        "contactNameInTamil": null,
        "contactType": null,
        "licenseNumber": null,
        "contactImage": null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      },
      "vehicleContactAssignment": {
        "vehicle_lookup":null,
        "contact_lookup":null,
        "lastmodifiedon": null,
        "createdon": null,
        "createdby": null,
        "lastmodifiedby": null
      }
    }
  };


}
