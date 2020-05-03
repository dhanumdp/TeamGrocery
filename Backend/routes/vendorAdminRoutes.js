var mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
const {User} = require('../models/users');
const {Inventory} = require('../models/inventory');


/** Create Inventory ROUTE
 * uri: /vendorAdmin/createInventory
 * purpose: used to create new Inventory to the current vendor.
 */


router.post('/createInventory',(req,res)=>{

    let newInventory = new Inventory(req.body);

    newInventory.save().then(()=>{
        res.send({
            'success': true,
            'message': "New Inventory Created"
        });
    }).catch((err)=>{
        res.send({
            'success': false,
            'message': "Error Occured while adding Inventory"
        });
        console.log(err);
    })
})




/** Update Inventory ROUTE
 * uri: /vendorAdmin/updateInventory
 * purpose: used to update the exisiting Inventory to the current vendor.
 */

router.post('/updateInventory',(req,res)=>{
    
Inventory.count({'vendorId':req.body.vendorId}).then((cnt)=>{
    if(cnt>0)
    {
        Inventory.findOneAndUpdate({'vendorId':req.body.vendorId},{$push:{'products' :req.body.products} },(error,doc)=>{
            if(!error)
            {
                res.send({
                    "success":true,
                    "message":"Inventory Updated",
                    
                })
            }
            else
            {
                res.send({
                    "success":false,
                    "message":"Error Occured while updating Inventory",
                    "Error ": error
                })
            }
                
            }
        )
      
        
    }
    else
    {
        res.send({
            "success":false,
            "message":"Vendor Not Found"
        })
    }
})
})


module.exports=router;