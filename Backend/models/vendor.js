var mongoose = require('mongoose');


const Vendor = mongoose.model('Vendor',{

    vendorId: {
        type: String, // autoGen by Us.
        // required: true
    },
    vendorAdmins: [{
        type:  String //addedBy franchise admin
    }],
    storeName : {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String
    },
    address: [{
        careOf: {
            type: String
        },
        doorNo: {
            type: String,
           
        },
        addressLine1: {
            type: String,
           
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            
        },
        district: {
            type: String,
            
        },
        pinCode: {
            type: String,
           
        },
        country: {
            type: String,
           
        }
    }],
    contact: [{
        whatsApp: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number
        }
    }],
    createdBy: {
        type: String, // franchiseAdmin name who creates it or vendor name
        required: true
    },
    deliveryWindow: {
        type: String,
      
    },
    pickupWindow: {
        type: String,
       
    }

},'Vendors')




module.exports = { Vendor };