import { Directive, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { OnDestroy } from '@angular/core';
const TOOLTIP_WIDTH = 390;

export class TooltipService {
  private _toolTipElement: any = null;
  private _contentHeight: number = 0;
  public showTooltip(content: string, posX: number, posY: number, type: any = 'right'): any {
    if (this._toolTipElement) {
      document.body.removeChild(this._toolTipElement);
      this._toolTipElement = null;
      //this._toolTipElement.hidden = true;
    }
    
    var arrow = document.createElement("div");
    arrow.className = "kit-tooltip-arrow-" + type;

    var divcontent = document.createElement("div");
    divcontent.className = "kit-tooltip-content";
    divcontent.innerText = content;

    var tooltip = document.createElement("div");
    tooltip.className = "kit-tooltip";
    document.body.insertAdjacentElement("beforeend", tooltip );
    
    //tooltip.style.visibility = "hidden";
    switch (type) {
      case 'left':
        tooltip.insertAdjacentElement("beforeend", divcontent);  
        tooltip.insertAdjacentElement("beforeend", arrow);
        this._contentHeight = tooltip.clientHeight / 2; 
        break;
      case 'right':
        tooltip.insertAdjacentElement("beforeend", arrow);
        tooltip.insertAdjacentElement("beforeend", divcontent);
        this._contentHeight = tooltip.clientHeight / 2 ; 
        break;
      case 'top':
        tooltip.insertAdjacentElement("beforeend", divcontent);
        tooltip.insertAdjacentElement("beforeend", arrow);
        tooltip.className = "kit-tooltip-top";
        this._contentHeight = tooltip.clientHeight; 
        break;
    }
    
    this._toolTipElement = tooltip;
    
    var scrollTop = document.body.scrollTop;
    var scrollLeft = document.body.scrollLeft;
    if (scrollTop <= 0) scrollTop = $('body,html').scrollTop();
    if (scrollLeft <= 0) scrollLeft = $('body,html').scrollLeft();

    //console.log(scrollTop);
    //console.log(scrollLeft);

    this._toolTipElement.style.top = (posY + scrollTop - this._contentHeight).toString() + "px";
    this._toolTipElement.style.left = (posX + scrollLeft >= 0 ? posX + scrollLeft : 0 ).toString() + "px"; 
    this._toolTipElement.hidden = false;
  }

  public hideTooltip() {
    if (this._toolTipElement) {
      document.body.removeChild(this._toolTipElement);
      this._toolTipElement = null;
      //this._toolTipElement.hidden = true;
    }
  }
}

@Directive({
  selector: '[kitTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mouseleave)': 'onMouseLeave($event)',
    '(keyup)': 'onKeyUp($event)',
    
  },
  providers: [TooltipService]
})
export class TooltipDirective implements AfterViewInit, OnDestroy {

  constructor(private el: ElementRef, private tooltipService: TooltipService, private location: PlatformLocation) {
  }

  inputContent: any = null;
  ngAfterViewInit() {
    // var attrs = this.el.nativeElement.attributes;
    // if (attrs && attrs.length > 0) {
    //   for (var id = 0; id < attrs.length; id ++) {
    //     if (attrs[id].name == 'kittooltip') {
    //       this.inputContent = attrs[id].value;
    //       return;
    //     }
    //   }
    // }
    this.location.onPopState((event: any)=> {
      this.tooltipService.hideTooltip();
    })
  }

  // ++N11kit-1927
  ngOnDestroy() {
    this.tooltipService.hideTooltip();
  }
  // --N11kit-1927

  onKeyUp(event: any) {
    this.tooltipService.hideTooltip();
  }

  onMouseEnter(event: any) {
    var xPos = event.clientX - event.offsetX;
    var yPos = event.clientY - event.offsetY;// + (event.target.clientHeight / 2);
    var type = 'right';
    if (xPos + TOOLTIP_WIDTH + event.target.offsetWidth <= window.innerWidth) {
      type = 'right';
      xPos = xPos + event.target.offsetWidth;
      yPos = yPos + (event.target.clientHeight / 2);
    }
    else if (xPos >= TOOLTIP_WIDTH) {
      type = 'left';
      xPos = xPos - TOOLTIP_WIDTH;
      yPos = yPos + (event.target.clientHeight / 2);
    }
    else { //case top
      type = 'top';
      xPos = xPos + (event.target.clientWidth / 2) - TOOLTIP_WIDTH / 2;
    }
    

    var content = '';
    if (event.target.scrollWidth > event.target.offsetWidth) {
      content = event.target.innerText;
    } else if (this._isChildrenOverflow(event.target)) {
      content = event.target.innerText;
      xPos -= 15;
    }
    if (content.length > 0) {
      this.tooltipService.showTooltip(content,xPos, yPos, type);
    }
  }
  onMouseLeave(event: any) {
    //console.log("mouse leave");
    this.tooltipService.hideTooltip();
  }

  _isChildrenOverflow(element: any) {
    if (element.scrollWidth > element.offsetWidth) return true;
    if (element.children.length >= 0) {
      for (var i = 0; i < element.children.length; i++)  {
        if (this._isChildrenOverflow(element.children[i])) return true;
      }
    }
    return false;
  }
}
