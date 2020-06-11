import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { VadminService } from '../../services/vadmin.service';
import {Inventory} from '../../../../Backend/models/inventory.js'
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-admin',
  templateUrl: './vendor-admin.component.html',
  styleUrls: ['./vendor-admin.component.scss']
})
export class VendorAdminComponent implements OnInit {

  LoggedIn : boolean;
  LocalStorageValue;

  adminMail; //for getting currently login admin's mail id
  admins:any = []; // for getting current vendor's admins

  storeName;
  vendorId;

  isInventory: boolean;
  isProfile: boolean;

  isNewProduct: boolean;
  isEditProduct: boolean;

  currentProductId: string;

  vendorInventory: Inventory;

  newProduct = new FormGroup({
    productName: new FormControl(null),
    productCategory: new FormControl(null),
    unit: new FormControl(null),
    quantity: new FormControl(null),
    stockCnt: new FormControl(null),
    MRP: new FormControl(null)
  });

  editProduct = new FormGroup({
    productName: new FormControl(null),
    productCategory: new FormControl(null),
    unit: new FormControl(null),
    quantity: new FormControl(null),
    stockCnt: new FormControl(null),
    MRP: new FormControl(null)
  });

  constructor(private vadminService: VadminService, private userService : UserService, private router: Router) {
    this.Inventory();
   
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
      this.loadVendor();
      this.getInventory();
    }
  }

  loadVendor()
  {
    this.getInventory();
    this.vadminService.getVendorDetails(this.adminMail).subscribe((res)=>{
      // console.log(res);
      this.admins=res[0]['vendorAdmins']
      this.storeName = res[0]['storeName'];
      this.vendorId=res[0]['vendorId'];
    })
    
  }
  newProductSave() {
    console.log(this.newProduct.value);
    return this.vadminService.newProduct(this.vendorInventory._id, this.newProduct.value).subscribe((res: any) => {
      if (res) {
        console.log(res.message);
        this.getInventory();
        this.NewProduct();
      }
    });

  }

  editProductSave() {
    return this.vadminService.editProduct(this.vendorInventory._id, this.currentProductId, this.editProduct.value).subscribe((res: any) => {
      if (res.success) {
        console.log(res.message);
        this.getInventory();
        this.EditProduct(null);
      }
    });
  }

  deleteProduct() {
    return this.vadminService.deleteProduct(this.vendorInventory._id, this.currentProductId).subscribe((res: any) => {
      if (res.success) {
        console.log(res.message);
        this.getInventory();
        this.EditProduct(null);
      }
    });
  }

  Inventory() {
    this.isInventory = true;
    this.getInventory();
    this.isProfile = false;
  
  }

  Profile() {
    this.isInventory = false;
    this.isProfile = true;
    this.vendorInventory = undefined;
  }

  NewProduct() {
    this.getInventory();
    this.isNewProduct = !this.isNewProduct;
    this.newProduct.reset();
  }

  EditProduct(item: any) {
    this.isEditProduct = !this.isEditProduct;
    if (this.isEditProduct) {
      this.editProduct.patchValue({
        productName: item.productName,
        productCategory: item.productCategory,
        unit: item.unit,
        quantity: item.quantity,
        stockCnt: item.stockCnt,
        MRP: item.MRP
      });
      this.currentProductId = item._id;
    } else {
      this.editProduct.reset();
      this.currentProductId = undefined;
    }
  }


  getInventory() {
    this.vadminService.getInventory(this.vendorId).subscribe((res: any) => {
      
      if(res.doc)  // if there is inventory exists in the current vendor
      {
        if (res.success) {
        this.vendorInventory = res.doc;
        console.log(this.vendorInventory);
      } else {
        console.log(res.message);
      }
      }
      else
      {
           // if there is no inventory exists in the current vendor, we have to create it.  
          this.vadminService.createInventory(this.vendorId).subscribe((res:any)=>{
            if (res.success) {
              this.vendorInventory = res.doc;
              console.log(this.vendorInventory);
            } else {
              console.log(res.message);
            }
          })
      }
      
    });
  }

  LogOut()
  {
   this.userService.logout();
   this.router.navigate(['/GrocerySOS/Home']); 
  }

}
