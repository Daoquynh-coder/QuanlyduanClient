import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { staffCreate } from '../../../core/models/staff_create';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";


export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-staff-add',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  // staffAddNew: FormGroup;
  // submitted = false;
  user = new staffCreate();
  status:[]=[];
  skill:[]=[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'name'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  // ---------------------------------------------
  // ---------------------------------------------
  // ---------------------------------------------


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<AddStaffComponent>
    ,public dialog: MatDialog,
    private getProjectViewService: GetProjectViewService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    ) {
      // this.createForm();
    }

  ngOnInit() {
   this.onLoad()
  }

  onLoad(){
    this.getProjectViewService.getMasterStatusUser().subscribe((res: any) =>{
      this.status = res.data
      console.log(res.data)
     })

     this.getProjectViewService.getMasterSkillUser().subscribe((res: any) =>{
       this.skill = res.data
       console.log(res.data)
     })
     console.log(this.data.item.id)
  }
 onSubmit(){
  if(!this.data.item.id){
    console.log('123456',this.data.item)
    this.getProjectViewService.getUser(this.data.item).subscribe(
      (res : any) => {
        console.log('333',res)
        if(res.status) {
          this.toastrService.info('Thêm mới thành công', '');
          this.dialogRef.close()
          this.onLoad()
        }
      },
      err => {
        this.toastrService.error(err.error.message, '');
      }
    )
  } else {
    this.getProjectViewService.putStaffTable(this.data.item).subscribe(
      (res : any) => {
       if(res.status ) {
          this.toastrService.info('Sửa thành công!', '');
          this.dialogRef.close(true)
          this.onLoad()
        } else {
          this.toastrService.info(res.message, '');
        }
      },
      err => {
        this.toastrService.error(err.error.message, '');
      }
    )
  }
 }

 close(){
  this.dialogRef.close()
  }
}
