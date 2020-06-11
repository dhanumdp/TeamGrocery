import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FranchiseAdminService } from 'src/services/franchise-admin.service';
import {Franchise} from '../../../../Backend/models/franchise.js'
import {User} from '../../../../Backend/models/users.js'

import { Vendor } from 'src/models/vendor.js';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service.js';



@Component({
  selector: 'app-franchise-admin',
  templateUrl: './franchise-admin.component.html',
  styleUrls: ['./franchise-admin.component.scss']
})
export class FranchiseAdminComponent implements OnInit {

  LoggedIn : boolean;
  LocalStorageValue;

  adminMail; //for getting currently login admin's mail id
  admins:any = []; // for getting current franchise admins
  adminDetail; //for getting admins' details who are in current franchise

  vendors : any=[] ; // for getting current franchise vendors
  franchiseName; //for getting current franchise name
  franchisePinCode; //current franchise pincode

  isAdmin: boolean;
  isVendor: boolean;
  isProfile: boolean;

  notifyFlag :boolean;
  notifyStatus;
  notifyMsg;

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
    vendorId : new FormControl(null),
    storeName: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email : new FormControl(null),
    password : new FormControl(null)
  });

  editVendor = new FormGroup({
    vendorId : new FormControl(null),
    storeName: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    doorNo: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    pinCode: new FormControl(null),
    country: new FormControl(null),
    mobile: new FormControl(null),
    deliveryWindow: new FormControl(null),
    pickupWindow: new FormControl(null),
    createdBy : new FormControl(null)
    
  });


  constructor(private franchiseAdminService : FranchiseAdminService, private router : Router,private userService : UserService) {
    this.isAdmin = true;
  }

  ngOnInit() {

    this.LocalStorageValue = localStorage.getItem('user');
    if(this.LocalStorageValue==null)
    {
      this.LoggedIn=false;
    }
    else
    {
      this.LoggedIn=true;
      this.adminMail = localStorage.getItem('user').replace(/"/g,"");
      this.loadFranchise();
    }
   
    
  }

  Admin() {
    this.loadFranchise();
    this.isAdmin = true;
    this.isVendor = false;
    this.isProfile = false;
  }

  Vendor() {
    this.loadVendors();
    this.isAdmin = false;
    this.isVendor = true;
    this.isProfile = false;
  }

  Profile() {
    this.isAdmin = false;
    this.isVendor = false;
    this.isProfile = true;
  }

  LogOut()
  {
    this.userService.logout();
    this.router.navigate(['/GrocerySOS/Home']);
  }


  loadFranchise()
  {
    this.franchiseAdminService.getFranchiseDetails(this.adminMail).subscribe((res : Franchise)=>{
      //  console.log(res[0])

      //for displaying admins except currently loggedIn admin
        this.admins=res[0]['franchiseAdmins']
        this.franchiseName = res[0]['franchiseName'];
        this.franchisePinCode=res[0]['pinCode']
     })
  }


  EditAdmin(admin : string) {
    this.isEditAdmin = !this.isEditAdmin;
    this.franchiseAdminService.getAdminDetails(admin).subscribe((res:User[])=>{
        this.adminDetail=res[0];
      //  console.log(this.adminDetail)
      
       if(this.isEditAdmin)
       {
        
         if(this.adminDetail['address']['length']>=1)
         {
          this.editAdmin.patchValue({
          
            fname: this.adminDetail['fname'],
            lname: this.adminDetail['lname'],
            whatsapp:this.adminDetail['contact'][0]['whatsApp'],
            email:this.adminDetail['email'],
            password : this.adminDetail['password'],
            doorNo : this.adminDetail['address'][0]['doorNo'],
            addressLine1:this.adminDetail['address'][0]['addressLine1'],
            addressLine2:this.adminDetail['address'][0]['addressLine2'],
            city : this.adminDetail['address'][0]['city'],
            district:this.adminDetail['address'][0]['district'],
            pinCode:this.adminDetail['address'][0]['pinCode'],
            country:this.adminDetail['address'][0]['country'],
            mobile : this.adminDetail['contact'][0]['mobile']
          })
         }
         else
         {
          this.editAdmin.patchValue({
            fname: this.adminDetail['fname'],
            lname: this.adminDetail['lname'],
            whatsapp:this.adminDetail['contact'][0]['whatsApp'],
            email:this.adminDetail['email'],
            password : this.adminDetail['password'],
          })
         }
        
       }
       else
      {
        this.editAdmin.reset()
      }
    })
  }

  editAdminSave()
  {
    let editAdminDoc = {
      fname : this.editAdmin.get('fname').value,
      lname : this.editAdmin.get('lname').value,
      email : this.editAdmin.get('email').value,
      password : this.editAdmin.get('password').value,
      contact : {
        whatsApp : this.editAdmin.get('whatsapp').value,
        mobile : this.editAdmin.get('mobile').value
      },
      address : {
             doorNo : this.editAdmin.get('doorNo').value,
            addressLine1:this.editAdmin.get('addressLine1').value,
            addressLine2:this.editAdmin.get('addressLine2').value,
            city : this.editAdmin.get('city').value,
            district:this.editAdmin.get('district').value,
            pinCode:this.editAdmin.get('pinCode').value,
            country:this.editAdmin.get('country').value,
      },
      pinCode: this.franchisePinCode
    }
    

    this.franchiseAdminService.editAdmin(editAdminDoc).subscribe((res)=>{
     
      if(res['success'])
      {
        
          this.isEditAdmin= !this.isEditAdmin
          this.notifyFlag=false;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
          this.loadFranchise();
                 
      }
      else
      {
        this.notifyFlag = true;
        this.notifyStatus = res['success'];
        this.notifyMsg = res['message'];
      }
    })
    
  }

  
  NewAdmin() {
    this.isNewAdmin = !this.isNewAdmin;
  }

  newAdminSave()
  {
    
    let newAdminDoc = {
      fname : this.newAdmin.get('fname').value,
      lname : this.newAdmin.get('lname').value,
      email : this.newAdmin.get('email').value,
      password : this.newAdmin.get('password').value,
      contact : {
        whatsApp : this.newAdmin.get('whatsapp').value
      },
      pinCode : this.franchisePinCode
    }
    this.franchiseAdminService.addNewAdmin(newAdminDoc).subscribe((res)=>{
      if(res['success'])
      {
      
          this.isNewAdmin= !this.isNewAdmin
          this.notifyFlag=false;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
         this.loadFranchise();
         this.newAdmin.reset();
       
      }
      else
      {
        this.notifyFlag = true;
        this.notifyStatus = res['success'];
        this.notifyMsg = res['message'];
      }
    })
    
  }

  deleteAdmin()
  {
    // console.log(this.adminDetail);
    let deleteAdminDoc={
      email : this.adminDetail['email'],
      pinCode : this.franchisePinCode
    }
    this.franchiseAdminService.deleteAdmin(deleteAdminDoc).subscribe((res)=>{
      console.log(res)

      if(res['success'])
      {
      
          this.isEditAdmin= !this.isEditAdmin
          this.notifyFlag=false;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
          this.ngOnInit();
       
      }
      else
      {
        this.notifyFlag = true;
        this.notifyStatus = res['success'];
        this.notifyMsg = res['message'];
      }
    })
  }

  loadVendors()
  {
      this.franchiseAdminService.getVendors(this.franchisePinCode).subscribe((res)=>{
        this.vendors=res;
      
      })
  }

  NewVendor() {
    this.isNewVendor = !this.isNewVendor;
  }

  newVendorSave() {
    let newVendorDoc={
      vendorId:this.newVendor.get('vendorId').value,
      storeName : this.newVendor.get('storeName').value,
      fname : this.newVendor.get('fname').value,
      lname : this.newVendor.get('lname').value,
      email : this.newVendor.get('email').value,
      password : this.newVendor.get('password').value,
      createdBy : this.adminMail,
      address :{
          pinCode : this.franchisePinCode
      },
      contact :{
        whatsApp : this.newVendor.get('whatsapp').value,
      }
     
    }
    // console.log(newVendorDoc)
    this.franchiseAdminService.createVendor(newVendorDoc).subscribe((res)=>{
      if(res['success'])
      {
      
          this.isNewVendor= !this.isNewVendor
          this.notifyFlag=false;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
          this.loadVendors();
          this.newVendor.reset()
       
      }
      else
      {
        this.notifyFlag = true;
        this.notifyStatus = res['success'];
        this.notifyMsg = res['message'];
      }

    })
  }

  EditVendor(vendor :any) {
    this.isEditVendor = !this.isEditVendor;
      
    if(this.isEditVendor)
    {
        this.editVendor.patchValue({
          vendorId : vendor['vendorId'],
          createdBy:vendor['createdBy'],
          storeName:vendor['storeName'],
          fname: vendor['fname'],
          lname:vendor['lname'],
          whatsapp:vendor['contact'][0]['whatsApp'],
          email:vendor['email'],
          doorNo : vendor['address'][0]['doorNo'],
          addressLine1:vendor['address'][0]['addressLine1'],
          addressLine2:vendor['address'][0]['addressLine2'],
          city : vendor['address'][0]['city'],
          district:vendor['address'][0]['district'],
          pinCode:vendor['address'][0]['pinCode'],
          country:vendor['address'][0]['country'],
          mobile : vendor['contact'][0]['mobile'],
          deliveryWindow:vendor['deliveryWindow'],
          pickupWindow:vendor['pickupWindow']
        })
    }
    else{
        this.editVendor.reset();
    }
  }

  editVendorSave()
  {
      let editVendorDoc={
        vendorId:this.editVendor.get('vendorId').value,
        storeName:this.editVendor.get('storeName').value,
        fname : this.editVendor.get('fname').value,
        lname : this.editVendor.get('lname').value,
        createdBy : this.editVendor.get('createdBy').value,
        deliveryWindow : this.editVendor.get('deliveryWindow').value,
        pickupWindow : this.editVendor.get('pickupWindow').value,
        contact : {
          whatsApp : this.editVendor.get('whatsapp').value,
          mobile :this.editVendor.get('mobile').value
        },
        address:{
          doorNo:this.editVendor.get('doorNo').value,
          addressLine1:this.editVendor.get('addressLine1').value,
          addressLine2:this.editVendor.get('addressLine2').value,
          city : this.editVendor.get('city').value,
          district:this.editVendor.get('district').value,
          pinCode:this.editVendor.get('pinCode').value,
          country:this.editVendor.get('country').value,
        }
      }

      this.franchiseAdminService.editVendor(editVendorDoc).subscribe((res)=>{
        if(res['success'])
        {
        
            this.isEditVendor= !this.isEditVendor
            this.notifyFlag=false;
            this.notifyStatus = res['success'];
            this.notifyMsg = res['message'];
            this.loadVendors();
            this.newVendor.reset()
         
        }
        else
        {
          this.notifyFlag = true;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
        }

      })


  }
  deleteVendor()
  {
    this.franchiseAdminService.deleteVendor(this.editVendor.get('vendorId').value).subscribe((res)=>{
      if(res['success'])
      {
      
          this.isEditVendor= !this.isEditVendor
          this.notifyFlag=false;
          this.notifyStatus = res['success'];
          this.notifyMsg = res['message'];
         this.loadVendors();
         this.editAdmin.reset();
       
      }
      else
      {
        this.notifyFlag = true;
        this.notifyStatus = res['success'];
        this.notifyMsg = res['message'];
        this.loadVendors();
      }
    })
  }

 


}
