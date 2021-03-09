import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteComponent>,
    public dialog: MatDialog,
    private getProjectViewService: GetProjectViewService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close()
  }
  onSubmit(data: any){
    console.log('111,', data)
    this.getProjectViewService.DeleteStaff(data.item).subscribe((res: any)=>{
      console.log(res)
      if(res.status ) {
        this.toastrService.info('Xóa thành công!', '');
        this.close();
        // this.router.navigate(['/admin/danh-sach-du-an'])
      }
    },
    err => {
      this.toastrService.error('Xóa thất bại!', '');
    }
    );
  }
}
