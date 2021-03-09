import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-errors',
  template: `
  <span *ngFor="let e of errors" class="text-danger font-italic">
    <!-- {{ e.error }} -->
  </span>
  `
})
export class FieldErrorsComponent implements OnInit {

  @Input() errors: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

}
