import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatSortModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    StaffsRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,



  ],
  exports: [
    MatIconModule,
    MatTableModule
  ],
  entryComponents:[


  ],schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class StaffsModule { }
