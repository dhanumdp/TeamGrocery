var mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
const {User} = require('../models/users');

const { Vendor } = require('../models/vendor');

/** ADD VENDOR ROUTE
 * uri: /franchiseAdmin/createVendor
 * purpose: used to create new vendor to the current franchise.
 */

 router.post('/createVendor', (req, res) => {
    let newVendor = new Vendor(req.body);

    newVendor.save().then(() => {
        res.send({
            'success': true,
            'message': "New vendor added successfully."
        });
    }).catch((err) => {
        res.send({
            'success': false,
            'message': "Error Occured while adding Vendor"
        });
        console.log(err);
    });
     
 });

/** EDIT VENDOR ROUTE
 * uri: /franchiseAdmin/:vendorId/edit
 * purpose: used to edit existing vendor in the current franchise.
 */

 router.post('/:vendorId/edit', (req, res) => {
    
    Vendor.count({ vendorId: req.params.vendorId }).then((cnt) => {
        if (cnt > 0) {
            Vendor.findOneAndUpdate({ vendorId: req.params.vendorId }, { $set: req.body }).then((updatedDoc) => {
                res.send({ success: true, message: 'Vendor details updated successfully.' });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.send({ success: false, message: 'Vendor is not exist.' });
        }
    }).catch((err) => {

    });

 });




module.exports=router;