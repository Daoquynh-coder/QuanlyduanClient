import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { EndUserGuard } from '@app/core/authentication/end-user.guard';
import { StaffGuard } from '@app/core/authentication/staff.guard';
import { LoginControlComponent } from '@app/shared';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { title: 'Trang chủ' }, // , expectedRole: 'ADMIN'
    canActivate: [EndUserGuard, StaffGuard],
  },
  // {
  //   path: '', component: LoginControlComponent,
  //   data: { title: 'Login page' }, // , expectedRole: 'ADMIN'
  //   canActivate: [AuthenticationGuard], // , RoleGuard
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
