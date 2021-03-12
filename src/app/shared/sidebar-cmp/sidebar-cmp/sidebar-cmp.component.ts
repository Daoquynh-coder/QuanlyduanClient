import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'admin/danh-sach-du-an',     title: 'danh sách dự án',         icon:'nc-paper',       class: '' },
    { path: 'admin/deadlines',         title: 'Deadlines',             icon:'nc-user-run',    class: '' },
    { path: 'admin/danh-sach-nhan-vien',          title: 'Danh sách nhân viên',              icon:'nc-tile-56',      class: '' },
];
@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: './sidebar-cmp.component.html',
  styleUrls: ['./sidebar-cmp.component.scss']
})
export class SidebarCmpComponent implements OnInit {

  public menuItems: any[];
  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
