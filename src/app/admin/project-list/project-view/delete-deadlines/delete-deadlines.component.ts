import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-delete-deadlines',
  templateUrl: './delete-deadlines.component.html',
  styleUrls: ['./delete-deadlines.component.scss']
})
export class DeleteDeadlinesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteDeadlinesComponent>,
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
    console.log('222', data)
   this.getProjectViewService.DeleteDeadlines(data.item).subscribe((res: any)=>{
      console.log(res)
      if(res.status ) {
        this.toastrService.info('Xóa thành công!', '');
        // this.router.navigate(['/admin/danh-sach-du-an'])
        this.close();
      } else {
        this.toastrService.info(res.message, '');
      }
    },
    err => {
      this.toastrService.info('Xóa thất bại!', '');
    });
  }
}
