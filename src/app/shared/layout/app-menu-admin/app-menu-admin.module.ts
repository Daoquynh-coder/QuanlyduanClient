import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './app-menu.routing';
import { ProjectListComponent } from '@app/admin/project-list/project-list.component';
import { DeadlinesCalendarComponent } from '@app/admin/deadlines-calendar/deadlines-calendar.component';
import { StaffsComponent } from '@app/admin/staffs/staffs.component';
import { IconComponent } from '@app/pages/icon/icon.component';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    ProjectListComponent,
    DeadlinesCalendarComponent,
    StaffsComponent,
    IconComponent
  ]
})
export class AppMenuAdminModule { }
