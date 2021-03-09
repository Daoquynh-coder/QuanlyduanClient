import { Component,Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNewService } from '../../../core/services/create-new.service';
import { ProjectCreate } from '../../../core/models/projectsCreat';
import { GetMasterTypeService } from '../../../core/services/get-master-type.service';
import { GetmasterstatuscontractService } from '../../../core/services/getmasterstatuscontract.service';
import { Observable } from 'rxjs';
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {

  project = new ProjectCreate();
  value:[] = [];
  types:[] =[];
  status:[] =[];
  fileToUpload: File = null;
  listImageName: any = [];
  listImage: any = [];
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router : Router,
    private createNewService: CreateNewService,
    private getMasterTypeService: GetMasterTypeService,
    private getmasterstatuscontractService : GetmasterstatuscontractService,
    private getProjectViewService : GetProjectViewService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectNewComponent>,
    public dialog: MatDialog,

    ) {
    }

    ngOnInit() {

      this.myForm = this.formBuilder.group({
        file: ['']
      });

    this.getMasterTypeService.getMasterType(this.types).subscribe((res: any) => {
      this.types = res.data;
    })

    this.getmasterstatuscontractService.getMasterStatusContract().subscribe((res: any) => {
      this.status = res.data;
    })
    }
    close(){
      this.dialogRef.close(false)
     }
    uploadImage(inputFileImage: any) {
      let file = inputFileImage.files[0];
      const formData = new FormData();
      formData.append('file', file);
    }
    onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    console.log(formData)
    if(!this.data.item.id) {
      this.createNewService.getPostProjectNew(this.data.item).subscribe(
        (res : any) => {
          if(res.status ) {
            this.toastrService.info('Thêm mới thành công!', '');
            this.dialogRef.close(true)
          } else {
            this.toastrService.error(res.message, '');
          }
        },
        err => {
          this.toastrService.error('Thêm mới thất bại!', '');
        }
      )
    } else {
      this.createNewService.putProject(this.data.item).subscribe(
        (res : any) => {
          if(res.status ) {
            this.toastrService.info('Sửa thành công!', '');
            this.dialogRef.close(true)
          } else {
            this.toastrService.error(res.message, '');
          }
        },
        err => {
          this.toastrService.error('Sửa mới thất bại!', '');
        }
      )
    }

  }


}
