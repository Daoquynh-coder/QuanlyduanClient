import { Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ElementRef, Renderer, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'dropdown-box',
  templateUrl: './dropdown-box.component.html',
  styleUrls: ['./dropdown-box.component.scss'],
})
export class DropdownBoxComponent implements OnInit, OnChanges {
  @Input() optionTexts: any[] = null;
  @Input() selectedIndex: number = -1;
  @Input() selectedItem: any;
  @Input() disabled: any;
  @Input() width: string = '100%';
  @Input() firstBlank: boolean = false;
  @Input() popupSetting: any = {
    enable: false,
    title: '',
    content:''
  };

  @Output() eventOptionSelected: EventEmitter<any>= new EventEmitter();
  @ViewChild('container', {static: false}) optionBox: ElementRef;
  @ViewChild('dropdownBox', {static: false}) dropdownBox: ElementRef;
  constructor(private renderer: Renderer,
  private translate: TranslateService) { }
  
  defaultText: string = 'Please select item';
  selectedText: string = '';
  focusedIndex: number = -1;
  optionShowed: boolean = false;
  isFirstTimeShowed: boolean = true;

  _nxtSelectedIndex: number = -1;

  ngOnInit() {

    this.renderer.listen('document', 'click', (event:any) => {
      if (!this.isInside(event.target, this.optionBox.nativeElement)) {
        this.optionShowed = false;
      }
    })
    this.renderer.listen('document','keydown', (event:any) => {
      if (!this.isInside(event.target, this.optionBox.nativeElement)) {
        return;
      }
      //console.log(event.target);

      switch (event.keyCode) {
        case 9: //Tab key
          this.optionShowed = false;
          break;
        case 40: // Arrow down
          if (this.optionShowed) {
            if (this.focusedIndex < this.optionTexts.length - 1 ) {
              this.focusedIndex += 1;
            }
            let focusedElement = this.dropdownBox.nativeElement.children[this.focusedIndex];

            //console.log('focuselementtop:' + focusedElement.offsetTop);
            //console.log('dropdow:' + this.dropdownBox.nativeElement.offsetTop);
            if (this.dropdownBox.nativeElement.scrollTop + 167 <= focusedElement.offsetTop) {
              this.dropdownBox.nativeElement.scrollTop += 41;
            }
            
            //this.dropdownBox.nativeElement.animate({scrollTop: focusedElement.offset().top}, 2000);
            event.preventDefault();
          }
          break;
        case 38: // Arrow up
          if (this.optionShowed) {
            if (this.focusedIndex > 0 ) {
              this.focusedIndex -= 1;
            }

            let focusedElement = this.dropdownBox.nativeElement.children[this.focusedIndex];

            if (this.dropdownBox.nativeElement.scrollTop > focusedElement.offsetTop) {
              this.dropdownBox.nativeElement.scrollTop -= 41;
            }

            event.preventDefault();
          }
          break;
        case 13: //Enter key
          if (this.optionShowed) {
            if (this.focusedIndex >= 0 && this.focusedIndex < this.optionTexts.length) {
              this._setSelItem(this.focusedIndex);
              this.optionShowed = false;
            }
            event.preventDefault();
          }
      }
    });
  } 

  isInside (findElement: any, inElement: any) {
    if (findElement === inElement) return true;
    if (inElement.children.length >= 0) {
      for (var i = 0; i < inElement.children.length; i++)  {
        if (this.isInside(findElement, inElement.children[i])) return true;
      }
    }
    return false;
  }

  onOptionClicked(selectedId: number): void {
    if (this.selectedIndex != selectedId) {
      this._setSelItem(selectedId);
    }
    
    this.optionShowed = false;
  }

  onOptionShow(): void {
    this.optionShowed = true;
    if (this.isFirstTimeShowed) {
      this.isFirstTimeShowed = false;
      setTimeout(() => {
        if (this.selectedIndex >= 0)
        {
          let focusedElement = this.dropdownBox.nativeElement.children[this.selectedIndex];
          if (focusedElement.offsetTop - 82 >= 0) {
            this.dropdownBox.nativeElement.scrollTop = focusedElement.offsetTop - 82;
          }
        }
      }, 10);
      
      
    }
  }

  ngOnChanges(changes: SimpleChanges): any {
    if (changes.selectedIndex) {
      if (changes.selectedIndex.currentValue && changes.selectedIndex.currentValue < 0) {
        this.selectedText = this.defaultText;
      }
    }

    if (changes.optionTexts) {
      if (this.selectedIndex >= 0 && this.selectedIndex < changes.optionTexts.currentValue.length) {
        this.selectedText = changes.optionTexts.currentValue[this.selectedIndex].text;
      }

      if (changes.optionTexts.currentValue.length <= 0) {
        this._setSelItem(-1);
      }
      if (this.firstBlank) {
        this.optionTexts.unshift({id: -1, text: " "});
      }
    }

    if (changes.selectedItem && changes.selectedItem.currentValue) {
       
      if (this.optionTexts.length) {
        var index =  this.optionTexts.findIndex((item: any) => item.id == changes.selectedItem.currentValue.id);
        if (index >= 0) {
          this._setSelItem(index, false);
        }
      }
    }
  }

  _setSelItem(index: any, isFiringEvent:boolean = true) : any {
    if (index >= 0 && index < this.optionTexts.length) {
      this.selectedIndex = index;
      this.focusedIndex = index;
      if (this.firstBlank && index == 0) {
        this.selectedText = this.defaultText;
      }
      else {
        this.selectedText = this.optionTexts[index].text;
      }
      this.selectedItem = this.optionTexts[index];
      if (this.eventOptionSelected && isFiringEvent)
      {
        this.eventOptionSelected.emit( this.optionTexts[index].id);
      }
    }
    else {
      this.selectedText = this.defaultText;
      this.selectedIndex = -1;
      this.selectedItem = null;
    }
  }
}
