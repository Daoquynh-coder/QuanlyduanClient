import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { state, style, trigger, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('inactive => active', animate('100ms ease-in', keyframes([
        style({
          transform: 'translateY(100%)',
          opacity: 0.3,
        }),
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('50ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast implements OnInit {

  backgroundColor: String;
  icon: number;
  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
    if (this.title === 'Info') {
      // this.backgroundColor = "#4dc07d";
      this.icon = 1;
    }
    else if (this.title === 'Error') {
      // this.backgroundColor = "#ef3401";
      this.icon = 2;
    }
    else {
      // this.backgroundColor = "#d5b500";
      this.icon = 0;
    }
  }

  ngOnInit() {
  }

}
