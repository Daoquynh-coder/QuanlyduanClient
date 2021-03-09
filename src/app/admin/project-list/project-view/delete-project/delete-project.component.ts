import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreateNewService } from '@app/core/services/create-new.service';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteProjectComponent>,
    public dialog: MatDialog,
    private createNewService: CreateNewService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close()
  }
  onSubmit(data: any){
    this.createNewService.DeleteProject(data.item).subscribe((res: any)=>{
      console.log(res)
      if(res.status ) {
        this.toastrService.info('Xóa thành công!', '');
        this.close();
        // this.router.navigate(['/#/admin/danh-sach-du-an'])
      } else {
        this.toastrService.info(res.message, '');
      }
    },
    err => {
      this.toastrService.info('Xóa thất bại!', '');
    }
    );
  }
}
