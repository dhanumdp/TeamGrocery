import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Vendor } from "../models/vendor";
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({ providedIn: "root" })
export class VendorsService {
  private vendors: Vendor[] = [];
  private vendorsUpdated = new Subject<Vendor []>();

  constructor(private http: HttpClient, private router: Router) {}
  
  getVendors() {
    this.http.get<{message: string, vendors: any}>
    ('http://localhost:3000/api/vendors')
    .pipe(map((vendorData) => {
      return vendorData.vendors.map(vendor => {
        return {
          storeName: vendor.storeName,
          fname: vendor.fname,
          lname: vendor.lname,
          address: vendor.address,
          contact:vendor.contact,
          franchiseid: vendor.franchiseid,
          deliveryWindow: vendor.deliveryWindow,
          pickupWindow: vendor.pickupWindow,
          vendorId: vendor._id
        };
      });
    }))
    .subscribe((transformedvendors) => {
     this.vendors = transformedvendors;
     this.vendorsUpdated.next([...this.vendors]);
   });
}
    
  getVendorUpdateListener(){
      return this.vendorsUpdated.asObservable();
   }

   getVendor(id: string){
    return {...this.vendors.find(q => q.vendorId === id)};
  }
  /*getVendor(id: string) {
    return this.http.get<{_id:string,vendorId:string,storeName:string,fname:string,lname:string,address:[],contact:[],createdBy:string,deliveryWindow:string,pickupWindow:string}>(
      "http://localhost:3000/api/vendors/" + id
    );
  }*/

  addVendor(storeName: string,fname:string ,lname:string,address,contact,email:string,franchiseid:string,deliveryWindow:string,pickupWindow:string) {
    
    const vendorData:Vendor={vendorId:'123456',storeName:storeName,fname:fname,lname:lname,address:address,contact:contact,createdBy:franchiseid,deliveryWindow:deliveryWindow,pickupWindow:pickupWindow }
    console.log("Iam at add post",vendorData.storeName,vendorData.fname,vendorData.lname,vendorData.address,vendorData.contact,);
    this.http
      .post<{ message: string;id: string }>(
        "http://localhost:3000/api/vendors",vendorData
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        console.log(responseData.id);
        vendorData.vendorId=responseData.id;
        this.vendors.push(vendorData);
      this.vendorsUpdated.next([...this.vendors]);
      });
  }

  updatePost(id: string,vendorId:string,storeName: string,fname:string ,lname:string,address,contact,email:string,franchiseid:string,deliveryWindow:string,pickupWindow:string) {
    let vendorData: Vendor | FormData;
    console.log(address);
    vendorData={vendorId:vendorId,storeName:storeName,fname:fname,lname:lname,address:address,contact:contact,createdBy:franchiseid,deliveryWindow:deliveryWindow,pickupWindow:pickupWindow }
    this.http
      .put("http://localhost:3000/api/vendors/" + id, vendorData)
      .subscribe(response => {
        const updatedVendors = [...this.vendors];
        const oldVendorIndex = updatedVendors.findIndex(p => p.vendorId === id);
        const vendor: Vendor = {
          storeName: storeName,
          fname: fname,
          lname: lname,
          address: address,
          contact:contact,
          createdBy:franchiseid,
          deliveryWindow: deliveryWindow,
          pickupWindow: pickupWindow,
          vendorId: id
        };
        updatedVendors[oldVendorIndex] = vendor;
        this.vendors = updatedVendors;
        this.vendorsUpdated.next([...this.vendors]);
        console.log(response);
        this.router.navigate(["/"]);
      });
  }

  /*deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }*/
}