var mongoose = require('mongoose');




const Inventory = mongoose.model('Inventory',{

    vendorId: {
        type: String,
        required: true
    },

    storeName : {
        type : String,
       
    },

    products: [{
        productId: {
            type: String, // autoGen by Us.
           
            default: 'Prod - 100'
        },
        productName: {
            type: String,
            
        },
      
        productCategory:{
            type:String,
            
        },
        unit: {
            type: String,
            
        },
        quantity: {
            type: Number,
            
        },
        stockCnt: {
            type: Number,
          
        },
        MRP: {
            type: Number
        }
    }]

},'Inventory')

module.exports = { Inventory };