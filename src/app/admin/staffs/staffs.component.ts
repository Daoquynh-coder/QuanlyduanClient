import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { GetProjectViewService } from '@app/core/services/get-project-view.service';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { DeleteComponent } from './delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';

// **
//  * @title Table with pagination
//  */

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {

  staff: any =[];
  length: any;
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
  actions: any = { edit: true, delete: true, view: false };
  itemsCount: any;
  paginationSettings: any = {
    numberItemPerPage: 5,
    totalPages: null,
    currentPage: 1,
    centerDisplayedPage: 2,
  };
  respondCloned: any[] = [];
  constructor(
    public dialog: MatDialog,
    private getProjectViewService: GetProjectViewService,
    private toastrService: ToastrService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName' , 'Tk', 'Họ và tên', 'joined_date','status', 'skills', 'join_projects', 'busy_rate', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,  { static: true }) sort: MatSort;
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.getProjectViewService.getAllUser().subscribe(
      (res: any) => {
        console.log(res.data)
        let array = res.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            username: item.username,
            joined_date: item.joined_date,
            status: item.status,
            skills: item.skills,
            join_projects: item.join_projects,
            busy_rate: item.busy_rate,
          };

        });
        this.listData = new MatTableDataSource(array);
        this.length = array.length;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      });
  }
  openAprrovalDialog() {
    let item:any={
      id:'',
      username: '',
      name:'',
      password:'',
      joined_date:'',
      status:'',
      skills:'',
      join_projects:'',
    };

    const dialogRef = this.dialog.open(AddStaffComponent, {
      data: { item },
      disableClose: true,
      height: '620px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }

  updateStaff(e: any) {
    console.log('111', e)
    let item:any={
      id:'',
      username: '',
      name:'',
      password:'',
      joined_date:'',
      status:'',
      skills:'',
      join_projects:'',
    };

      item.id = e.id
      item.username = e.username
      item.name = e.name
      item.password = e.password
      item.joined_date = e.joined_date
      item.status = e.status
      item.skills = e.skills
      item.join_projects = e.join_projects

    const dialogRef = this.dialog.open(AddStaffComponent, {
      data: { item },
      disableClose: true,
      height: '620px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  deleteStaff(item: any){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { item },
      disableClose: true,
      height: '150px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
}
