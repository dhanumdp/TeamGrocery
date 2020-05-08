import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router'
import { empty } from 'rxjs';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signin: boolean;
  signup: boolean;
  validMail: boolean;
  validNo: boolean;
  validFname: boolean;
  validLname: boolean;
  validPass: boolean;

  signUpBtn: boolean;
  signInBtn: boolean;

  passwdStrength = {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
    EMPTY: 'empty'
  };

  notifyMsg: string;
  notifyFlag: boolean;
  notifyStatus: boolean;

  strength: string;


  signInForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  signUpForm = new FormGroup({
    fname: new FormControl(null),
    lname: new FormControl(null),
    whatsapp: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    confirm: new FormControl(null)
  });


  constructor(private userService: UserService, private router : Router) {
    this.signin = true;
  }

  ngOnInit() {
    this.strength = this.passwdStrength.EMPTY;
    this.signUpBtn = true;
    this.signInBtn = true;
  }

  onMailKeyUp(event: any, email: string) {
    const verifyEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === null || email === '') {
      this.validMail = undefined;
      return;
    }
    if (email.match(verifyEmail)) {
      this.validMail = true;
    } else {
      this.validMail = false;
    }
  }

  onLastNameKeyUp(event: any, lname: string) {
    const digits = /^\d+$/;
    if (lname === null) {
      this.validLname = true;
      return;
    }
    const len = lname.length;
    if (lname.length > 0) {
      if (lname.match(digits)) {
        this.signUpForm.get('lname').setValue(lname.substr(0, len - 1));
      }
    }
    if (lname.length >= 0) {
      this.validLname = true;
      return;
    }
  }

  onFirstNameKeyUp(event: any, fname: string) {
    const digits = /^\d+$/;
    if (fname === null || fname === '') {
      this.validFname = undefined;
      return;
    }
    const len = fname.length;
    if (fname.length > 0) {
      if (fname.match(digits)) {
        this.signUpForm.get('fname').setValue(fname.substr(0, len - 1));
      }
    }
    if (fname.length > 3) {
      this.validFname = true;
      return;
    }
    this.validFname = false;
    return;
  }


  onWhatsappKeyUp(event: any, whatsapp: string) {
    const digits = /^\d+$/;
    if (whatsapp === null || whatsapp === '') {
      this.validNo = undefined;
      return;
    }
    const len = whatsapp.length;
    if (whatsapp.length > 0) {
      if (!whatsapp.match(digits)) {
        this.signUpForm.get('whatsapp').setValue(whatsapp.substr(0, len - 1));
      }
    }
    const mobileRegex = /^[0]?[6789]\d{9}$/;
    if (whatsapp.match(mobileRegex)) {
      this.validNo = true;
    } else {
      this.validNo = false;
    }
  }

  onSigninPasswordKeyUp(event: any, passwd: string) {
    if (passwd === null || passwd === '') {
      this.strength = this.passwdStrength.EMPTY;
      return;
    }
    if (passwd.length >= 8) {
      this.strength = this.passwdStrength.STRONG;
      this.validPass = true;
      return;
    }
    this.strength = this.passwdStrength.WEAK;
    this.validPass = false;
    return;
  }

  onPasswordKeyUp(event: any, passwd: string) {
    const strongPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    const mediumPass = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    if (this.signUpForm.get('confirm').value !== null) {
      this.signUpForm.get('confirm').setValue(null);
      this.validPass = false;
    }
    if (passwd === null || passwd === '') {
      this.strength = this.passwdStrength.EMPTY;
      return;
    }
    if (passwd.length < 8) {
      this.strength = this.passwdStrength.WEAK;
      return;
    }
    if (strongPass.test(passwd)) {
      this.strength = this.passwdStrength.STRONG;
      return;
    }
    if (mediumPass.test(passwd)) {
      this.strength = this.passwdStrength.MEDIUM;
      return;
    }
    this.strength = this.passwdStrength.WEAK;
    return;
  }

  onPasswordConfirm(event: any) {
    if (this.strength === this.passwdStrength.EMPTY || this.strength === this.passwdStrength.WEAK) {
      this.signUpForm.get('confirm').setValue(null);
      return;
    }
    if (this.signUpForm.get('confirm').value === null || this.signInForm.value === '') {
      this.validPass = undefined;
      return;
    }
    const passwd = this.signUpForm.get('password').value;
    const confirm = this.signUpForm.get('confirm').value;
    if (passwd === confirm) {
      this.validPass = true;
      return;
    }
    this.validPass = false;
    return;
  }

  hasValue(value: string) {
    if (value !== null && value !== '') {
      return true;
    }
    return false;
  }

  validSignIn() {
    if (this.signInBtn && this.validMail && this.validPass) {
      return false;
    }
    return true;
  }

  validSignUp() {
    if (this.signUpBtn && this.validFname && (this.validLname || !this.validLname) && this.validMail && this.validNo && this.validPass) {
      return false;
    }
    return true;
  }

  signUp() {
    this.signup = true;
    this.signInForm.reset();
    this.validFname = undefined;
    this.validLname = undefined;
    this.validMail = undefined;
    this.validNo = undefined;
    this.validPass = undefined;
    this.strength = this.passwdStrength.EMPTY;
    this.signin = false;
  }

  signIn() {
    this.signin = true;
    this.signUpForm.reset();
    this.validFname = undefined;
    this.validLname = undefined;
    this.validMail = undefined;
    this.validNo = undefined;
    this.validPass = undefined;
    this.strength = this.passwdStrength.EMPTY;
    this.signup = false;
  }


  onSignIn() {
    this.signInBtn = false;
    return this.userService.signIn(this.signInForm.value).subscribe((res: any) => {
      if (res.success) {
        this.notifyFlag = true;
        this.notifyStatus = res.success;
        this.notifyMsg = res.message;

        this.userService.storeUserData(res.token, res.user);
        //based on the user's role, screens shoud be promoted
        if(res.role=="SuperAdmin")
        {
          this.router.navigate(['/GrocerySOS/SuperAdmin'])
        }
        else if(res.role == 'FranchiseAdmin')
        {
          this.router.navigate(['/GrocerySOS/FranchiseAdmin'])
        }
        else if(res.role == 'Customer')
        {
          this.router.navigate(['/GrocerySOS/Customer'])
        }


      } else {
        this.notifyFlag = true;
        this.notifyStatus = res.success;
        this.notifyMsg = res.message;
        if (res.reason === 'email') {
          this.signInForm.get('email').setValue('');
          this.signInForm.get('password').setValue('');
          this.validPass = false;
          this.strength = this.passwdStrength.EMPTY;
          this.validMail = false;
        } else if (res.reason === 'password') {
          this.signInForm.get('password').setValue('');
          this.strength = this.passwdStrength.WEAK;
          this.validPass = false;
        }
      }

      setTimeout(() => {
        this.notifyFlag = false;
        this.signInBtn = true;
      }, 5000);

    });
  }

  onSignUp() {
    this.signUpBtn = false;
    this.signUpForm.addControl('role', new FormControl(null));
    this.signUpForm.get('role').setValue('Customer');
    delete this.signUpForm.value.confirm;
    return this.userService.signUp(this.signUpForm.value).subscribe((res: any) => {
      if (res.success) {
        this.notifyFlag = true;
        this.notifyStatus = res.success;
        this.notifyMsg = res.message;
      } else {
        this.notifyFlag = true;
        this.validMail = false;

        this.signUpForm.get('email').setValue('');
        this.notifyStatus = res.success;
        this.notifyMsg = res.message;
      }

      setTimeout(() => {
        this.notifyFlag = false;
        this.signUpBtn = true;
      }, 5000);

    });
  }

}
