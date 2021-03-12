import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectListModule } from './project-list/project-list.module';
import { StaffsComponent } from './staffs/staffs.component';
import { StaffsModule } from './staffs/staffs.module';
import { AddStaffComponent } from './staffs/add-staff/add-staff.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog, MatSortModule} from '@angular/material';
import { DeleteComponent } from './staffs/delete/delete.component';
import { DeadlinesCalendarComponent } from './deadlines-calendar/deadlines-calendar.component';
import { DeadlinesCalendarModule } from './deadlines-calendar/deadlines-calendar.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ChartsModule,
    MatSelectModule,
    StaffsModule,
    DeadlinesCalendarModule,
    ProjectListModule,
    AdminRoutingModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AdminComponent,
    ProjectListComponent,
    AddStaffComponent,
    StaffsComponent,
    DeleteComponent,
    // DeadlinesCalendarComponent,
  ],
  entryComponents:[
    AddStaffComponent,
    DeleteComponent,
  ],
  providers: [
    ThemeService,
  ]
})
export class AdminModule { }
