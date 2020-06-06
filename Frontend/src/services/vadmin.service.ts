import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class VadminService {

  constructor(private webReqService: WebRequestService) { }

  setVendorId(vendorId: string) {
    localStorage.setItem('vendorId', vendorId);
  }

  getVendorId() {
    return localStorage.getItem('vendorId');
  }

  removeVendorId() {
    localStorage.removeItem('vendorId');
  }

  getInventory(vendorId: string) {
    return this.webReqService.post('vendorAdmin/getInventory', { vendorId });
  }

  newProduct(inventoryId: string, data: Object) {
    return this.webReqService.post(`vendorAdmin/inventory/${inventoryId}/product/new`, data);
  }

  editProduct(inventoryId: string, productId: string, data: object) {
    return this.webReqService.post(`vendorAdmin/inventory/${inventoryId}/product/${productId}/edit`, data);
  }

  deleteProduct(inventoryId: string, productId: string) {
    return this.webReqService.delete(`vendorAdmin/inventory/${inventoryId}/product/${productId}/delete`);
  }

}