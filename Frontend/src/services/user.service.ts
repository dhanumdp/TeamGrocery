import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webReqService: WebRequestService) { }


  signUp(data: Object) {
    return this.webReqService.post(`user/register`, data);
  }

  signIn(data: Object) {
    return this.webReqService.post('user/login', data);
  }

}