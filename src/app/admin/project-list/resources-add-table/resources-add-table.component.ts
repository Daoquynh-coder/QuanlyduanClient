import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit, Inject,} from '@angular/core';
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ResourcesCreate } from '@app/core/models/resourcesCreate';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resources-add-table',
  templateUrl: './resources-add-table.component.html',
  styleUrls: ['./resources-add-table.component.scss']
})
export class ResourcesAddTableComponent implements OnInit {
  resources = new ResourcesCreate();
  name:[] = [];
  status:[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<ResourcesAddTableComponent>
    ,public dialog: MatDialog
    ,private getProjectViewService: GetProjectViewService
    ,private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.getProjectViewService.getAllUser().subscribe((res: any) =>{
      this.name = res.data;
    })
    this.getProjectViewService.getStatusResources().subscribe((res: any) =>{
      this.status = res.data;
       console.log(res.data)
    })
  }
  close(){
    this.dialogRef.close()
   }
   onSubmit(){
      this.resources.project_id = this.data.currentItem;
      if(!this.data.item.id){
        this.getProjectViewService.getResourcesTableCreate(this.data.item).subscribe(
          (res : any) => {
           if(res.status ) {
              this.toastrService.info('Thêm mới thành công!', '');
              this.dialogRef.close()
              // this.router.navigate(['/admin/danh-sach-du-an'])
            }
          },
          err => {
            this.toastrService.error(err.error.message, '');
          })
      }else{
        this.getProjectViewService.putResourcesTableUpdate(this.data.item).subscribe(
          (res : any) => {
           if(res.status ) {
              this.toastrService.info('Sửa thành công!', '');
              this.dialogRef.close()
              // this.router.navigate(['/admin/danh-sach-du-an'])
            }
          },
          err => {
            this.toastrService.error(err.error.message, '');
          })
      }

    }
}
