import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-franchise-admin',
  templateUrl: './franchise-admin.component.html',
  styleUrls: ['./franchise-admin.component.scss']
})
export class FranchiseAdminComponent implements OnInit {
  isAdmin: boolean;
  isVendor: boolean;
  isProfile: boolean;

  isNewAdmin: boolean;
  isEditAdmin: boolean;

  isNewVendor: boolean;
  isEditVendor: boolean;


  newAdmin = new FormGroup({
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null)
  });

  editAdmin = new FormGroup({
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    doorNo: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    pinCode: new FormControl(null),
    country: new FormControl(null),
    mobile: new FormControl(null)
  });


  newVendor = new FormGroup({
    storeName: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null)
  });

  editVendor = new FormGroup({
    storeName: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    doorNo: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    pinCode: new FormControl(null),
    country: new FormControl(null),
    mobile: new FormControl(null),
    deliveryWindow: new FormControl(null),
    pickupWindow: new FormControl(null)
  });


  constructor() {
    this.isAdmin = true;
  }

  ngOnInit() {
  }

  Admin() {
    this.isAdmin = true;
    this.isVendor = false;
    this.isProfile = false;
  }

  Vendor() {
    this.isAdmin = false;
    this.isVendor = true;
    this.isProfile = false;
  }

  Profile() {
    this.isAdmin = false;
    this.isVendor = false;
    this.isProfile = true;
  }

  NewAdmin() {
    this.isNewAdmin = !this.isNewAdmin;
  }

  EditAdmin() {
    this.isEditAdmin = !this.isEditAdmin;
  }

  NewVendor() {
    this.isNewVendor = !this.isNewVendor;
  }

  EditVendor() {
    this.isEditVendor = !this.isEditVendor;
  }

  newVendorSave() {

  }
}
