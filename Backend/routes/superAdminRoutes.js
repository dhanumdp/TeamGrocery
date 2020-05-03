var mongoose = require('mongoose');

var express = require('express');

const {User} = require('../models/users');
const {Franchise} = require('../models/franchise');

var router = express.Router();

//create Franchise

/*

    This route will work only after the user logged in and that user shoud be a SuperAdmin.

    and these checkings will be done in FrontEnd by handling session.

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


// add Franchise Admin

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

            Franchise.find({'pincode':req.body.pincode}, (err,doc)=>{
                if(err)
                {
                    res.json({success:false, message : 'Error While Finding the Franchise'+err})
                }
                else
                {
                    Franchise.update({'pincode':req.body.pinCode},{ $set : {'managedBy': req.body.email}},(error)=>{
                        if(error)
                        {
                            console.json({success:false, message : 'Error While Adding the Managing Person'+error})
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




module.exports = router;
