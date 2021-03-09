import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@app/core/authentication/admin.guard';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { ProjectListComponent } from './project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectViewComponent } from './project-view/project-view.component';


const routes: Routes = [
  { path: 'danh-sach-du-an', component: ProjectListComponent, data: { title: 'Quản lý dự án' },canActivate: [AuthenticationGuard]

},
  { path: 'projectNew', component: ProjectNewComponent, data: { title: 'Thêm mới dự án' } },
  { path: 'item/:itemId', component: ProjectViewComponent, data: { title: 'Chi tiết dự án' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectListRoutingModule { }
