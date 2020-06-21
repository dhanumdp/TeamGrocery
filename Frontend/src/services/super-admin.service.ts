import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SadminService {

  constructor(private webReqService: WebRequestService) { }


  newFranchise(data: Object) {
    return this.webReqService.post(`superAdmin/createFranchise`, data);
  }

  editFranchise(data: Object, _id: string) {
    return this.webReqService.post(`superAdmin/editFranchise/${_id}`, data);
  }

  fetchAllFranchise() {
    return this.webReqService.get(`superAdmin/franchise/fetch/all`);
  }

  fetchFranchise(_id: string) {
    return this.webReqService.get(`superAdmin/franchise/fetch/${_id}`);
  }

  newAdmin(data: Object) {
    return this.webReqService.post('superAdmin/addSuperAdmin', data);
  }

  editAdmin(data: Object) {
    return this.webReqService.post(`superAdmin/editSuperAdmin`, data);
  }

  fetchAllAdmins() {
    return this.webReqService.get(`superAdmin/franchiseAdmin/fetch/all`);
  }

  fetchSuperAdmins()
  {
    return this.webReqService.get('superAdmin/getSuperAdmins');
  }

  fetchAdmin(_id: string) {
    return this.webReqService.get(`superAdmin/franchiseAdmin/fetch/${_id}`);
  }


  deleteAdmin(email : string)
  {
    return this.webReqService.post('superAdmin/deleteSuperAdmin', {email});
  }

  deleteFranchise(pincode : string)
  {
    return this.webReqService.post(`superAdmin/deleteFranchise/${pincode}`, {});
  }
}

