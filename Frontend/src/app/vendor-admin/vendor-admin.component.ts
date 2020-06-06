import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { VadminService } from '../../services/vadmin.service';
import {Inventory} from '../../../../Backend/models/inventory.js'

@Component({
  selector: 'app-vendor-admin',
  templateUrl: './vendor-admin.component.html',
  styleUrls: ['./vendor-admin.component.scss']
})
export class VendorAdminComponent implements OnInit {
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

  constructor(private vadminService: VadminService) {
    this.Inventory();
    this.vadminService.setVendorId('VR-100');
  }

  ngOnInit() {
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
    this.isProfile = false;
    this.getInventory();
  }

  Profile() {
    this.isInventory = false;
    this.isProfile = true;
    this.vendorInventory = undefined;
  }

  NewProduct() {
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
    this.vadminService.getInventory(this.vadminService.getVendorId()).subscribe((res: any) => {
      if (res.success) {
        this.vendorInventory = res.doc;
        console.log(this.vendorInventory);
      } else {
        console.log(res.message);
      }
    });
  }

}
