import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetProjectViewService } from '../../core/services/get-project-view.service';
import { ProjectNewComponent } from './project-new/project-new.component';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  items:[] =[];
  status:[] =[];
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
  resource: any;

  constructor(
    private getProjectViewService: GetProjectViewService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastrService: ToastrService,
  ) { }
  ngOnInit() {
    this.getProjectViewService.getProjectView(this.items).subscribe((res: any) => {
      this.items = res.data;
      console.log('ggg',this.items);

    })
  }
  projectNew(){
    let item:any={
      id:'',
      name: '',
      date:'',
      effort:'',
      unit_price:'',
      total:'',
    };
    const dialogRef = this.dialog.open(ProjectNewComponent, {
      data: { item },
      disableClose: true,
      height: '700px',
      width: '840px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.ngOnInit();
    })
  }
  }

