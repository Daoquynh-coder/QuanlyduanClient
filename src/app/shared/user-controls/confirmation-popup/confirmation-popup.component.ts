import {Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer2} from '@angular/core';

import {NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { Select2OptionData } from 'ng2-select2';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'confirmation-popup',
  templateUrl: 'confirmation-popup.component.html',
  styleUrls: ['confirmation-popup.component.scss']
})

export class ConfirmationPopupComponent implements OnInit {
  @Input() title: string;
  @Input() confirmButtonText: String = 'System.PIMS_LABEL_0169';
  @Input() cancelButtonText: String = 'System.PIMS_LABEL_0214';
  @Input() contentText1: string;
  @Input() contentText2: string;
  @Input() contentText3: string;
  @Input() contentText4: string;
  @Input() note: any = {className: '', title: '', text: ''};
  @ViewChild('content', {static: false}) content: any;
  @ViewChild('content2', {static: false}) content2: any;
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter(); //N11PIMS-3323
  modal: any;
  id: Number = 0; // > 0 popup del mapping
  selectedVendorObj: any;
  vendorObjects: Array<Object> = [];
  // public exampleData: Array<any>;
  selectOptions: {};
  isOpened: boolean = false;
  keyListener: Function;

  constructor(public modalService: NgbModal,
              private renderer: Renderer2,
              private location: PlatformLocation) {
  }

  ngOnInit(): void {
    this.eventKeyPopup();
    this.location.onPopState(() => {
      if (this.modal instanceof NgbModalRef) {
        this.modal.close();
      }
    });
  }

  eventKeyPopup(){
    this.keyListener = this.renderer.listen('document','keydown', event => {
      if (event.keyCode === 9) {
        var inputs = $(".modal-content :input");
        if (!event.shiftKey) {
          if (inputs[inputs.length - 1] === event.target) {
            event.preventDefault();
            inputs.first().focus();
          }
        }
        /*redirect first shift+tab to last input*/
        else {
          if (inputs[0] === event.target) {
            event.preventDefault();
            inputs.last().focus();
          }
        }
      }
    });
  }

  open(id: number = 0) {
    this.isOpened = true; 
    this.id = id;
    if (id > 0) {
      this.selectOptions = {
        minimumResultsForSearch: -1
      };
      this.title = 'System.PIMS_LABEL_0158';
      this.selectedVendorObj = this.vendorObjects[0];
      this.modal = this.modalService.open(this.content2,
        {windowClass: 'modal-middle mapping-modal', backdrop: 'static', keyboard: true}
      );
    } else {
      this.modal = this.modalService.open(this.content, {windowClass: 'modal-middle noselect confirm-modal', backdrop: 'static', keyboard: true});
    }

    this.modal.result.then((result: any) => {
      this.isOpened = false;
    });
    
  }

  onConfirmClick() {
    if (this.confirm) {
      this.modal.close();
      this.confirm.emit(this.id);
    }
  }

  // ++ N11PIMS-3323
  onCancelClick() {
    this.modal.close();
    this.cancel.emit();
  }
  // -- N11PIMS-3323

  onChangeObj(newObj: any) {
    this.selectedVendorObj = newObj.data[0];
  }

  close() {
    this.modal.close();
  }
}
