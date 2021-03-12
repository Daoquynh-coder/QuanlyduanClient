import { Routes } from '@angular/router';
import { DeadlinesCalendarComponent } from '@app/admin/deadlines-calendar/deadlines-calendar.component';
import { ProjectListComponent } from '@app/admin/project-list/project-list.component';
import { StaffsComponent } from '@app/admin/staffs/staffs.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'danh-sach-du-an',           component: ProjectListComponent },
    { path: 'deadlines',                 component: DeadlinesCalendarComponent },
    { path: 'danh-sach-nhan-vien',       component: StaffsComponent },
];
