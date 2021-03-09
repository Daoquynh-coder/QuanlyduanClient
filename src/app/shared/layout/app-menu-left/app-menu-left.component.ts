import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-menu-left',
  templateUrl: 'app-menu-left.component.html',
  styleUrls: ['./app-menu-left.component.scss'],
})

export class AppMenuLeftComponent implements OnInit {
  breadcrumbs: Array<Object> = [];

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location, private router: Router) {
  }

  ngOnInit() {
  }

}
