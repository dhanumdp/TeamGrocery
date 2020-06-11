var mongoose = require('mongoose');

const User = mongoose.model('Users',{

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    role:{
        type : String,
        required:true
},
    address: [{
        careOf: {
            type: String,
            default: null
        },
        doorNo: {
            type: String,
           
            default: null
        },
        addressLine1: {
            type: String,
           
            default: null
        },
        addressLine2: {
            type: String,
            default: null
        },
        city: {
            type: String,
           
            default: null
        },
        district: {
            type: String,
          
            default: null
        },
        pinCode: {
            type: Number,
           
            default: null
        },
        country: {
            type: String,
            default: null
        }
    }],
    contact: [{
        whatsApp: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            default: null
        }
    }]
    
},'Users');



module.exports =  { User } ;