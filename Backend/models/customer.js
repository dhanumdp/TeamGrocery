var mongoose = require('mongoose');




const Customer = mongoose.model('Customer',{

    customerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    preferredVendors: [{
        vendorId: {
            type: mongoose.Types.ObjectId, // vendorId
            required: true
        }
    }],
    bucket: [{
        productName: {
            type: String,
            required: true
        },
        productId: {
            type: String, // autoGen by Us.
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        MRP: {
            type: Number
        }
    }]


},'Customers')



module.exports={Customer}