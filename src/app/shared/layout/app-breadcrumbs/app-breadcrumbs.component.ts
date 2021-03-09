import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: 'app-breadcrumbs.component.html',
  styleUrls: ['./app-breadcrumbs.component.scss'],
})

export class AppBreadcrumbsComponent implements OnInit {
  @Input() breadCrumbs: any = [];
  @Output() filterWithBreadCrumbs = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location, private router: Router) {
  }

  ngOnInit() {
  }

}
