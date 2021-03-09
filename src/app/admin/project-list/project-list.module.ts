import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';
import { DeadlinesAddTableComponent } from './deadlines-add-table/deadlines-add-table.component';
import { EstimationComponent } from './estimation/estimation.component';
import { ResourcesAddTableComponent } from './resources-add-table/resources-add-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { ProjectNewComponent } from './project-new/project-new.component';
import { DeleteEstimationComponent } from './project-view/delete-estimation/delete-estimation.component';
import { DeleteDeadlinesComponent } from './project-view/delete-deadlines/delete-deadlines.component';
import { DeleteResourcesComponent } from './project-view/delete-resources/delete-resources.component';
import { DeleteProjectComponent } from './project-view/delete-project/delete-project.component';




@NgModule({
  declarations: [ProjectViewComponent, DeadlinesAddTableComponent, EstimationComponent, ResourcesAddTableComponent, ProjectNewComponent, DeleteEstimationComponent, DeleteDeadlinesComponent, DeleteResourcesComponent, DeleteProjectComponent],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    ProjectListRoutingModule,
    MatMenuModule
  ],
  entryComponents:[
    EstimationComponent,
    DeadlinesAddTableComponent,
    ResourcesAddTableComponent,
    ProjectNewComponent,
    DeleteEstimationComponent,
    DeleteDeadlinesComponent,
    DeleteResourcesComponent,
    DeleteProjectComponent

  ],
})
export class ProjectListModule { }
