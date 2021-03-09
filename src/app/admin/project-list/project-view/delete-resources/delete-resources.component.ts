import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-resources',
  templateUrl: './delete-resources.component.html',
  styleUrls: ['./delete-resources.component.scss']
})
export class DeleteResourcesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteResourcesComponent>,
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
    this.getProjectViewService.DeleteResources(data.item).subscribe((res: any)=>{
      console.log(res)
      if(res.status ) {
        this.toastrService.info('Xóa thành công!', '');
        this.close();
        // this.router.navigate(['/admin/danh-sach-du-an'])
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
