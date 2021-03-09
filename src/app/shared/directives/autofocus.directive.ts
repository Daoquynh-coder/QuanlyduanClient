import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    //++N11PIMS-2784
    // Author: TungNT2
    // Reset scroll top after set focus
    var scrollTop = $('body,html').scrollTop();
    this.el.nativeElement.focus();
    $('body,html').scrollTop(scrollTop);
    //--N11PIMS-2784
  }

}
