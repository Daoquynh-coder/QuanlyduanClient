import { Component,Input,Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeadlinesCreate } from '../../../core/models/deadlinesCreate';
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deadlines-add-table',
  templateUrl: './deadlines-add-table.component.html',
  styleUrls: ['./deadlines-add-table.component.scss']
})
export class DeadlinesAddTableComponent implements OnInit {
  @Input() projectId: any;
  status:[] =[];
  deadlines = new DeadlinesCreate();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<DeadlinesAddTableComponent>
    ,public dialog: MatDialog,
    private Http: HttpClient,
    private toastrService: ToastrService,
    private getProjectViewService: GetProjectViewService,
  ) { }

  ngOnInit() {

    this.onLoad();
  }
  onLoad(){
    this.getProjectViewService.getProjectDeadlinesTable(this.status).subscribe((res: any) => {
      this.status = res.data;
      console.log(this.status);
    })
  }

  onSubmit(){
    this.deadlines.project_id = this.data.currentItem;
    if(!this.data.item.id){
    this.getProjectViewService.ProjectDeadlinesCreate(this.data.item).subscribe(
      (res : any) => {
      if(res.status ) {
          this.toastrService.info('Thêm mới thành công!', '');
          this.dialogRef.close();
          this.onLoad();
          // this.router.navigate(['/admin/danh-sach-du-an'])
        }
      },
      err => {
        this.toastrService.error(err.error.message, '');
      }
    )
    } else {
      this.getProjectViewService.ProjectDeadlinesUpdate(this.data.item).subscribe(
        (res : any) => {
        if(res.status ) {
            this.toastrService.info('Sửa thành công!', '');
            this.dialogRef.close();
            this.onLoad();
            // this.router.navigate(['/admin/danh-sach-du-an'])
          }
        },
        err => {
          this.toastrService.error(err.error.message, '');
        })
    }
  }

  close(){
    this.dialogRef.close()
  }

}
