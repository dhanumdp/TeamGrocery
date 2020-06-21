import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router'
import { UserService } from '../../services/user.service';
import {SadminService } from '../../services/super-admin.service';
import { Franchise } from '../../../../Backend/models/franchise.js';
import {User} from '../../../../Backend/models/users.js'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {


  LoggedIn : boolean;
  LocalStorageValue;

  isFranchise: boolean;
  isAdmin: boolean;
  isProfile: boolean;

  currentFranchiseId: string;
  currentAdminId: string;
  currentAdmin:string;

  franchise: Franchise[];
  admins: User[];
  


  isNewFranchise: boolean;
  isEditFranchise: boolean;

  isNewAdmin: boolean;
  isEditAdmin: boolean;

  newFranchise = new FormGroup({
    pinCode: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    country: new FormControl(null),
    franchiseName: new FormControl(null),
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email : new FormControl(null),
    password : new FormControl(null),
  });

  editFranchise = new FormGroup({
    pinCode: new FormControl(null),
    city: new FormControl(null),
    district: new FormControl(null),
    country: new FormControl(null),
    franchiseName: new FormControl(null),
    createdBy : new FormControl(null)
   
  });

  newAdmin = new FormGroup({
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsApp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null)
  });

  editAdmin = new FormGroup({
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsApp: new FormControl(null),
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


  constructor(private userService: UserService, private sadminService: SadminService, private router : Router) {
    this.Franchise();
    this.userService.setUserId('grocerysos@gmail.com');
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
        this.currentAdmin = localStorage.getItem('user').replace(/"/g,"");
      }

  }

  Franchise() {
    this.isFranchise = true;
    this.isAdmin = false;
    this.isProfile = false;
    return this.sadminService.fetchAllFranchise().subscribe((franchiseDoc: Franchise[]) => {
      this.franchise = franchiseDoc;
    });

  }

  Admin() {
    this.isFranchise = false;
    this.isAdmin = true;
    this.isProfile = false;
    return this.sadminService.fetchSuperAdmins().subscribe((adminDoc: User[]) => {
      this.admins = adminDoc;
      console.log(this.admins)
    });
  }

  Profile() {
    this.isFranchise = false;
    this.isAdmin = false;
    this.isProfile = true;
  }

  NewAdmin() {
    this.isNewAdmin = !this.isNewAdmin;
    this.newAdmin.reset();
  }

  EditAdminById(_id: string) {
    this.EditAdmin();
    this.currentAdminId = _id;
    return this.sadminService.fetchAdmin(_id).subscribe((adminDoc: any) => {
      console.log(adminDoc);
      if (adminDoc) {
        this.editAdmin.patchValue({
          'fname': adminDoc.fname,
          'lname': adminDoc.lname,
          'whatsApp': adminDoc.contact[0].whatsApp,
          'email': adminDoc.email,
          'password': adminDoc.password,
          //'doorNo': adminDoc.address[0].doorNo,
          //'addressLine1': adminDoc.address[0].addressLine1,
          //'addressLine2': adminDoc.address[0].addressLine2,
          //'city': adminDoc.address[0].city,
          //'district': adminDoc.address[0].district,
          //'pinCode': adminDoc.address[0].pinCode,
          //'country': adminDoc.address[0].country,
          'mobile': adminDoc.contact[0].mobile
        });
      }
    });
  }

  EditAdmin() {
    this.isEditAdmin = !this.isEditAdmin;
    this.editAdmin.reset();
    this.currentAdminId = null;
  }

  NewFranchise() {
    this.isNewFranchise = !this.isNewFranchise;
    this.newFranchise.reset();
  }

  EditFranchiseById(_id: string) {
    this.EditFranchise();
    this.currentFranchiseId = _id;
    return this.sadminService.fetchFranchise(_id).subscribe((franchiseDoc: any) => {
      if (franchiseDoc) {
        this.editFranchise.patchValue({
          'pinCode': franchiseDoc.pinCode,
          'city': franchiseDoc.city,
          'district': franchiseDoc.district,
          'country': franchiseDoc.country,
          'franchiseName': franchiseDoc.franchiseName,
          'createdBy':franchiseDoc.createdBy
        });
      }
    });
  }

  EditFranchise() {
    this.isEditFranchise = !this.isEditFranchise;
      this.editFranchise.reset();
      this.currentFranchiseId = null; 
  }

  newAdminSave() {
    return this.sadminService.newAdmin(this.newAdmin.value).subscribe((res: any) => {
      console.log(res);
      this.NewAdmin();
      this.Admin();
    });
  }

  editAdminSave() {
    return this.sadminService.editAdmin(this.editAdmin.value).subscribe((res: any) => {
      console.log(res);
      this.EditAdmin();
      this.Admin();
    });
  }

  newFranchiseSave() {
   
    this.sadminService.newFranchise(this.newFranchise.value).subscribe((res) => {
      console.log(res);
      this.NewFranchise();
      this.Franchise();
    });
  }

  editFranchiseSave() {
   
    this.editFranchise.get('createdBy').setValue(this.currentAdmin);
    return this.sadminService.editFranchise(this.editFranchise.value, this.currentFranchiseId).subscribe((res: any) => {
      console.log(res);
      this.EditFranchise();
    });
  }

  deleteAdmin()
  {
    return this.sadminService.deleteAdmin(this.editAdmin.get('email').value).subscribe((res)=>{
      console.log(res);
      this.EditAdmin();
      this.Admin();
    })
  }

  deleteFranchise()
  {
    console.log("hai")
    return this.sadminService.deleteFranchise(this.editFranchise.get('pinCode').value).subscribe((res)=>{
      console.log(res);
      this.EditFranchise();
      this.Franchise();
    })
  }


  Logout()
  {
      localStorage.clear();
      this.router.navigate(['/GrocerySOS/Home']);
  }

}
