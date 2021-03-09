import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TopicService } from '@app/core/services/topic.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Location } from '@angular/common';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatMenuTrigger } from '@angular/material/menu';
interface FoodNode {
  name: string;
  link: string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'menu-admin',
  templateUrl: './app-menu-admin.component.html',
  styleUrls: ['./app-menu-admin.component.scss']
})

export class AppMenuAdminComponent implements OnInit{
  showMenu: boolean = true;
  credentials: any;
  TREE_DATA: FoodNode[] = [
    {
      name: 'Dự án',
      link: '',
      children: [
        {
          name: 'Danh sách dự án', link: "/admin/danh-sach-du-an"
        },
        {
          name: 'Deadlines', link: "/admin/deadlines"
        },
      ]
    },
    {
      name: 'Nhân viên',
      link: '',
      children: [
        {
          name: 'Danh sách nhân viên', link: "/admin/danh-sach-nhan-vien"
        },
      ]
    },
  ];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  constructor(private router: Router, public authenticationService: AuthenticationService, public location: Location) {
    this.dataSource.data = this.TREE_DATA
  }

  ngOnInit() {
    this.authenticationService.onAuth$.subscribe(res => {
      if (res) {
        let tempCre = localStorage.getItem('credentials');
        if (tempCre) {
          this.credentials = JSON.parse(localStorage.getItem('credentials'));
        }
      }
    });
  }

  activeLink(e: any, link: any) {
    for (let index = 0; index < document.getElementsByClassName("routerLink").length; index++) {
      document.getElementsByClassName("routerLink")[index].classList.remove("active");
    }
    e.target.classList.add("active");
    this.router.navigate([link]).then(result => { });
  }

  signOut() {
    localStorage.removeItem("credentials");
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }

}
