import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit, Inject,} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstimationsCreate } from '../../../core/models/EstimationsServiceCreate';
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit {

  estimation = new EstimationsCreate();
  @Input() projectId: any;
  @Input() itemEst:[]=[];
  // @Output() estimationRequest = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<EstimationComponent>
    ,public dialog: MatDialog,
    private getProjectViewService: GetProjectViewService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('html,', this.itemEst)
  }


  onSubmit(){
    this.estimation.project_id = this.data.item.project_id;
    this.data.item.total = this.data.item.effort * this.data.item.unit_price;
    if(!this.data.item.id){
      console.log('456',this.data.item)
    this.getProjectViewService.getEstimations(this.data.item).subscribe(
      (res : any) => {
       if(res.status ) {
          this.toastrService.info('Thêm mới thành công!', '');
          this.dialogRef.close(true)
          // this.router.navigate(['/admin/danh-sach-du-an'])
        }
      },
      err => {
        this.toastrService.error(err.error.message, '');
      }
    )
    } else {
      this.getProjectViewService.putEstimations(this.data.item).subscribe(
        (res : any) => {
         if(res.status ) {
            this.toastrService.info('Sửa thành công!', '');
            this.dialogRef.close(true)
            // this.router.navigate(['/admin/danh-sach-du-an'])
          }
        },
        err => {
          this.toastrService.error(err.error.message, '');
        }
      )
    }
  }

  close(){
   this.dialogRef.close(false)
  }
}
