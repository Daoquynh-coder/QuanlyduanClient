import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { projectViewModel } from '../core/models/projectView';
import { GetProjectViewService } from '../core/services/get-project-view.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
//

  constructor(
    // private http: HttpClient,
    // private getProjectViewService: GetProjectViewService,
  ) { }

  ngOnInit() {
    // this.getProjectViewService.getProjectView(this.items).subscribe((res: any) => {
    //   this.items = res.data;
    //   console.log('project',this.items);
    // })
  }
}
