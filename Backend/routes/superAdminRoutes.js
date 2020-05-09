var mongoose = require('mongoose');

var express = require('express');

const {User} = require('../models/users');
const {Franchise} = require('../models/franchise');

var router = express.Router();

/** Create Franchise ROUTE
 * uri: /superAdmin/createFranchise
 * purpose: used to create Franchise
 */

router.post('/createFranchise',(req,res)=>{
     let franchise = new Franchise({
        franchiseId : req.body.franchiseId,
        pinCode : req.body.pinCode,
        city: req.body.city,
        district : req.body.district,
        country : req.body.country,
        franchiseName : req.body.franchiseName,
        createdBy : req.body.createdBy, // In front end it comes through session variable,
        managedBy:req.body.managedBy,
        franchiseAdmins : req.body.franchiseAdmins
    })

   Franchise.find({'pinCode': req.body.pinCode}).count((err,num)=>{
       if(num != 0)
       {
        res.json({success:false, message:'Franchise Exists'})
       }
       else
       {
           franchise.save((error,doc)=>{
            if(error)
            {
                res.json({success:false, message : 'Franchise Creation Failed '+error})
            }
            else
            {
                res.json({success:true, message : 'Franchise Created Successfully'})
            }
        })
       }
   })
})


/** Add Franchise Admin ROUTE
 * uri: /superAdmin/addFranchiseAdmin
 * purpose: used to add Franchise Admin to the existing Franchise
 */

router.post('/addFranchiseAdmin',(req,res)=>{


    const user = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password,
        role : "Franchise Admin",
        address : req.body.address,
        contact : req.body.contact
    })

    User.find({'email': req.body.email}).count((err,num)=>{
        if(num != 0)
        {
         res.json({success:false, message:'Mail Id Exists. This user already registered.'})
        }
        else
        {
            user.save((err,doc)=>{
                if(err)
                {
                    res.json({success:false, message : 'Registration Failed '+err})
                }
                else
                {
                    console.log({success:true, message : 'User Registered Successfully'})
                }
            });

            Franchise.find({'pinCode':req.body.pincode}, (err,doc)=>{
                if(err)
                {
                    res.json({success:false, message : 'Error While Finding the Franchise'+err})
                }
                else
                {
                    Franchise.update({'pinCode':req.body.pincode},{ $push : {'franchiseAdmins': req.body.email}},(error)=>{
                        if(error)
                        {
                            console.json({success:false, message : 'Error While Adding the Franchise Admin'+error})
                        }
                        else
                        {
                            res.json({success:true, message : 'Franchise Admin Added Successfully'})
                        }
                    })
                }
            })
            
        }
    })
});




/** Edit Franchise ROUTE
 * uri: /superAdmin/editFranchise/:pincode
 * purpose: used to edit existing franchise.
 */

router.post('/editFranchise/:pincode', (req, res) => {
    
    Franchise.count({ pinCode: req.params.pincode }).then((cnt) => {
        if (cnt > 0) {
            Franchise.findOneAndUpdate({ pinCode: req.params.pincode }, { $set: req.body }).then((updatedDoc) => {
                res.send({ success: true, message: 'Franchise Details updated successfully.' });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.send({ success: false, message: 'Franchise Not Found.' });
        }
    }).catch((err) => {

    });

 });



 /** Delete Franchise ROUTE
 * uri: /superAdmin/deleteFranchise/:pincode
 * purpose: used to delete existing franchise.
 */

router.post('/deleteFranchise/:pincode', (req, res) => {
    
    Franchise.count({ pinCode: req.params.pincode }).then((cnt) => {
        if (cnt > 0) {
            
                Franchise.find({pinCode:req.params.pincode}).then((doc)=>{
                        doc[0].franchiseAdmins.forEach(element => {
                            User.findOneAndDelete({email:element}).then(()=>{
                                console.log('User '+element+' Deleted')
                            }).catch((err)=>{
                                console.log('Error While removing '+element)
                            })
                        });
                 Franchise.findOneAndDelete({pinCode:req.params.pincode}).then(()=>{
                            res.send({success : true, message : 'Franchise Deleted Successfully'})
                 }).catch((err)=>{
                     res.send({success:false, message:'Error occured while deleting Franchise'})
                 })      

                    
                }).catch((err)=>{
                    res.send({success:false, message:'Error occured while finding franchise'})
                })

        } else {
            res.send({ success: false, message: 'Franchise Not Found.' });
        }
    }).catch((err) => {

    });

 });



 /** Get Franchise ID ROUTE
 * uri: /superAdmin/getFranchiseIds
 * purpose: used to fetch existing Franchise Ids.
 */

router.get('/getFranchiseIds',(req,res)=>{
    ids=[]
    Franchise.find({}).then((doc)=>{
          
           doc.forEach(element => {
               ids.push(element.franchiseId)
           });
           res.send(ids)

    }).catch((err)=>{
        res.send({Error : err})
    })
})



module.exports = router;
