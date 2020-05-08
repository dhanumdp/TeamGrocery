import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component'


import { CustomerComponent } from './customer/customer.component';
import { FranchiseAdminComponent } from './franchise-admin/franchise-admin.component';
import { VendorAdminComponent } from './vendor-admin/vendor-admin.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SuperAdminComponent,

    CustomerComponent,

    FranchiseAdminComponent,

    VendorAdminComponent,

   
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }