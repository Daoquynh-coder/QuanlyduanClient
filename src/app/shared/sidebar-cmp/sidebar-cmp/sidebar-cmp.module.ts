import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarCmpComponent } from './sidebar-cmp.component';


@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ SidebarCmpComponent ],
  exports: [ SidebarCmpComponent ]
})
export class SidebarCmpModule { }
