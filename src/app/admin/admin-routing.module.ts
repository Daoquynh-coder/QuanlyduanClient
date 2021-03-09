import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@app/core/authentication/admin.guard';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent, data: { title: 'Quản lý' }, canActivate: [AdminGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
