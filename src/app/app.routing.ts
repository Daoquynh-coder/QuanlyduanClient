import { Routes } from '@angular/router';
import { AppMenuAdminComponent } from './shared/layout/app-menu-admin/app-menu-admin.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'danh-sach-du-an',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppMenuAdminComponent,
    children: [
        {
      path: '',
      loadChildren: './shared/layout/app-menu-admin/app-menu-admin.module#AppMenuAdminModule'
  }]},
  {
    path: '**',
    redirectTo: 'danh-sach-du-an'
  }
]
