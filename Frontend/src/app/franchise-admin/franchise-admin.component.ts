import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router,ActivatedRoute, ParamMap } from "@angular/router";
import {Vendor} from '../../models/vendor'
import {VendorsService
} from '../../services/vendor.service'
@Component({
  selector: 'app-franchise-admin',
  templateUrl: './franchise-admin.component.html',
  styleUrls: ['./franchise-admin.component.scss']
})
export class FranchiseAdminComponent implements OnInit {

  storeName = '';
  lname='';
  fname = '';
  careof='';
  doorno = '';
  addressline1='';
  City='';
  District='';
  pincode='';
  Country='';
  whatsappnumber;
  contactnumber;
  email='';
  deliveryWindow='';
  pickupWindow='';
  address=[];
  contact=[];
  private mode = "edit";
  private vendorId: string;
  constructor(public route: ActivatedRoute, public vendorservice: VendorsService,public router: Router) { }
  v: Vendor;
  vendor= [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has("VendorId")) {
        this.mode = "edit";
        this.vendorId = paramMap.get("VendorId");
        this.v=this.vendorservice.getVendor(this.vendorId);
        console.log(this.v);
        this.storeName=this.v.storeName;
        this.fname = this.v.fname;
        this.lname = this.v.lname;
        this.address=this.v.address;
        this.careof=this.v.address[0].careOf;
        this.doorno = this.v.address[0].doorNo;
        this.addressline1=this.v.address[0].addressLine1;
        this.City=this.v.address[0].city;
        this.District=this.v.address[0].district;
        this.pincode=this.v.address[0].pincode;
        this.Country=this.v.address[0].country;
        this.contact=this.v.contact;
        this.whatsappnumber = this.v.contact[0].whatsApp;
        this.contactnumber = this.v.contact[0].mobile;
        this.deliveryWindow=this.v.deliveryWindow;
        this.pickupWindow=this.v.pickupWindow;
      } else {
        this.mode = "create";
        this.vendorId = null;
      }
    });
  /*this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has("userId")) {
      this.user = paramMap.get("userId");
    }
  });*/
 }
  onAddVendor(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    if (this.mode === "create") {
    this.address.push({'careOf':form.value.careOf });
    this.address.push({'doorNo': form.value.doorNo});
    this.address.push({'addressLine1': form.value.addressLine1,});
    this.address.push({'city': form.value.city});
    this.address.push({'district':form.value.district});
    this.address.push({'pincode': form.value.pincode});
    this.address.push({'country': form.value.country});
    this.contact.push({'whatsApp':form.value.whatsApp},
        {'mobile':form.value.mobile});
      this.vendorservice.addVendor(form.value.storeName,
        form.value.fname,
        form.value.lname,
        this.address,this.contact,form.value.email,'franchiseId',form.value.deliveryWindow,form.value.pickupWindow);
      alert('Vendor Created');
      this.router.navigate(['/']);
      console.log(form.value.storeName,form.value.fname,
      form.value.lname,this.address,this.contact);
    } else {
      this.address.push({'careOf':form.value.careOf });
      this.address.push({'doorNo': form.value.doorNo});
      this.address.push({'addressLine1': form.value.addressLine1,});
      this.address.push({'city': form.value.city});
      this.address.push({'district':form.value.district});
      this.address.push({'pincode': form.value.pincode});
      this.address.push({'country': form.value.country});
      this.contact.push({'whatsApp':form.value.whatsApp},
        {'mobile':form.value.mobile});
      this.vendorservice.updatePost(this.vendorId,'123456',form.value.storeName,
        form.value.fname,
        form.value.lname,
        this.address,this.contact,form.value.email,'franchiseId',form.value.deliveryWindow,form.value.pickupWindow);
      alert('Vendor updated');
      console.log(form.value.storename,form.value.vendorchainname,
        form.value.vendorowner,form.value.careof,form.value.doorno,form.value.addressline1,
        form.value.City,form.value.District,form.value.Pincode,
        form.value.Country,form.value.whatsappnumber,
        form.value.contactnumber,form.value.email,this.address,this.contact);
    }
    form.resetForm();
  }  

}
