import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

import { CustomerComponent } from './customer/customer.component';
import { FranchiseAdminComponent } from './franchise-admin/franchise-admin.component';
import { VendorAdminComponent } from './vendor-admin/vendor-admin.component';

const routes: Routes = [
  {
    path:'', 
    redirectTo:'/GrocerySOS/Home',
    pathMatch:'full'
  },
  {
    path:'GrocerySOS/Home',
    component:SignUpComponent
  },
  {
    path:'GrocerySOS/SuperAdmin',
    component:SuperAdminComponent
  },
  {
    path:'GrocerySOS/Customer',
    component:CustomerComponent
  },
  {
    path : 'GrocerySOS/FranchiseAdmin',
    component : FranchiseAdminComponent
  },
  {
    path : 'GrocerySOS/VendorAdmin',
    component : VendorAdminComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
