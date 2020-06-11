import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class FranchiseAdminService {

  constructor(private webReqService : WebRequestService) { }

  getFranchiseDetails(email : string)
  {
    return this.webReqService.post('franchiseAdmin/getFranchise', {email});
  }

  getAdminDetails(email : string)
  {
    return this.webReqService.post('franchiseAdmin/getAdminDetails', {email})
  }

  addNewAdmin(user)
  {
    return this.webReqService.post('franchiseAdmin/addFranchiseAdmin', user);
  }

  editAdmin(user)
  {
    return this.webReqService.post('franchiseAdmin/editFranchiseAdmin', user);
  }

  deleteAdmin(doc : object)
  {
    return this.webReqService.post('franchiseAdmin/deleteFranchiseAdmin', doc)
  }


  getVendors(pinCode:string)
  {
    return this.webReqService.post('franchiseAdmin/getVendors',{pinCode});
  }

  createVendor(vendor)
  {
    return this.webReqService.post('franchiseAdmin/createVendor',vendor);
  }

  editVendor(vendor)
  {
    return this.webReqService.post('franchiseAdmin/editVendor',vendor);
  }

  deleteVendor(vendorId:string)
  {
    return this.webReqService.post('franchiseAdmin/deleteVendor', {vendorId});
  }

}
