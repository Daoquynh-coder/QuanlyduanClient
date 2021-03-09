import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffsComponent } from './staffs.component';


const routes: Routes = [
  { path: 'danh-sach-nhan-vien', component: StaffsComponent, data: { title: 'Quản lý nhân viên' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
