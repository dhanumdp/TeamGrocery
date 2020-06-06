import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webReqService: WebRequestService) { }

  authToken;
  user;

  signUp(data: Object) {
    return this.webReqService.post(`user/register`, data);
  }

  signIn(data: Object) {
    return this.webReqService.post('user/login', data);
  }
  
  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  deleteUserId() {
    localStorage.removeItem('userId');
  }


  storeUserData(token,user)
  {
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user=user;
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}