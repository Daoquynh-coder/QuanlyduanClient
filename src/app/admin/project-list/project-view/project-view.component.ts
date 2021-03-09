import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {formatNumber} from '@angular/common';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { projectViewModel } from '../../../core/models/projectView';
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
import { EstimationComponent } from '../estimation/estimation.component';
import { DeadlinesAddTableComponent } from '../deadlines-add-table/deadlines-add-table.component';
import { ResourcesAddTableComponent } from '../resources-add-table/resources-add-table.component';
import { ToastrService } from 'ngx-toastr';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DeleteEstimationComponent } from './delete-estimation/delete-estimation.component';
import { DeleteDeadlinesComponent } from './delete-deadlines/delete-deadlines.component';
import { DeleteResourcesComponent } from './delete-resources/delete-resources.component';
import { ProjectNewComponent } from '../project-new/project-new.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})

export class ProjectViewComponent implements OnInit {
  currentItem:any ;

  item:[] =[];
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    ];
  formatNumber:any;

  estimation:[] =[];
  lengthEstimation: number;
  deadlines:[] =[];
  resources:[] =[];
  lengthResources: number;
  lengthDeadlines: number;
  indexDeadlines:[]= [];

  constructor(
    private route: ActivatedRoute,
    private getProjectViewService: GetProjectViewService,
    public dialog: MatDialog,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(){

    this.loadData();
  }
  loadData(){
     // First get the product id from the current route.
     const routeParams = this.route.snapshot.paramMap;
     const itemIdFromRoute = Number(routeParams.get('itemId'));

     // Find the product that correspond with the id provided in route.
    this.getProjectViewService.getProjectItem(itemIdFromRoute).subscribe((res: any) => {
      this.item = res.data;
    //  this.id = item.id;
    this.currentItem = res.data.id;

    this.estimation = res.data.estimations;
    console.log('123,',this.estimation )
    this.lengthEstimation = this.estimation.length;
    this.deadlines = res.data.deadlines;
    this.resources = res.data.resources;
    console.log( this.resources)
    this.lengthResources = this.resources.length;
    this.lengthDeadlines = this.deadlines.length;
    })
  }
  updateProject(item: any){
    console.log('444,', item)
    const dialogRef = this.dialog.open(ProjectNewComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '840px',
    });
    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  deleteProject(item: any){
    console.log(item)
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: { item },
      disableClose: true,
      height: '150px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  openEstimation(){
    let item:any={
      id:'',
      name: '',
      date:'',
      effort:'',
      unit_price:'',
      total:'',
      project_id: this.currentItem,
    };
    const dialogRef = this.dialog.open(EstimationComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  updateEstimation(item: any) {
    // let item:any={
    //   id:'',
    //   name: '',
    //   date:'',
    //   effort:'',
    //   unit_price:'',
    //   total:'',
    //   project_id: this.currentItem,
    // };
    // if(items.id){
    //   item.name = items.name
    //   item.date = items.date
    //   item.effort = items.effort
    //   item.unit_price = items.unit_price
    //   item.total = items.total
      item.project_id = this.currentItem
    // }

    const dialogRef = this.dialog.open(EstimationComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }

  openDeadlines(){
    let item:any={
      id:'',
      name: '',
      date:'',
      effort:'',
      unit_price:'',
      total:'',
      project_id: this.currentItem,
    };
    const dialogRef = this.dialog.open(DeadlinesAddTableComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }

  updateDeadlines(items: any) {
    let item:any={
      id:'',
      name: '',
      date:'',
      status:'',
      pic:'',
      project_id: this.currentItem,
    };
    if(items.id){
      item.id = items.id
      item.name = items.name
      item.date = items.date
      item.status = items.status
      item.pic = items.pic
      item.project_id = this.currentItem
    }

    const dialogRef = this.dialog.open(DeadlinesAddTableComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  deleteRow(item: any){
    const dialogRef = this.dialog.open(DeleteEstimationComponent, {
      data: { item },
      disableClose: true,
      height: '150px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })

  }
  deleteDeadlinesRow(item: any){
    const dialogRef = this.dialog.open(DeleteDeadlinesComponent, {
      data: { item },
      disableClose: true,
      height: '150px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })

  }
  deleteRecourcesRow(item: any){
    const dialogRef = this.dialog.open(DeleteResourcesComponent, {
      data: { item },
      disableClose: true,
      height: '150px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();
    })
  }
  openRecources(){
    let item:any={
      id:'',
      user_id:'',
      start_date:'',
      status:'',
      end_date:'',
      busy_rate:'',
      project_id: this.currentItem,
    };
    const dialogRef = this.dialog.open(ResourcesAddTableComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();

    })
  }
  updateRecources(items: any) {
    let item:any={
      id:'',
      user_id:'',
      start_date:'',
      status:'',
      end_date:'',
      busy_rate:'',
      project_id: this.currentItem,
    };
    if(items.user_id){
      item.id = items.id
      item.user_id = items.user_id
      item.start_date = items.start_date
      item.status = items.status
      item.end_date = items.end_date
      item.busy_rate = items.busy_rate
      item.project_id = this.currentItem
    }
    const dialogRef = this.dialog.open(ResourcesAddTableComponent, {
      data: { item },
      disableClose: true,
      height: '525px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(response => {
      this.loadData();

    })
  }
}
