import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panigation',
  templateUrl: './panigation.component.html',
  styleUrls: ['./panigation.component.scss']
})
export class PanigationComponent implements OnInit {
  @Input() paginationSettings: any;
  @Input() itemsCount: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this._initPaginationLayout()
    // this.itemsCount = this.dataTable.length
  }

  isPaging(index: number): Boolean {
    if (this.paginationSettings.totalPages <= 1) {
      return false;
    }
    if (index - this.paginationSettings.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  _initPaginationLayout() {
    this.paginationSettings.totalPages = Math.ceil(this.itemsCount / this.paginationSettings.numberItemPerPage);
  }

  onPageLaunched(pageId: any): void {
    switch (pageId) {
      case 0:
        this.paginationSettings.currentPage = 1;
        break;
      case 1:
        if (this.paginationSettings.currentPage > 1) {
          this.paginationSettings.currentPage -= 1;
        }
        break;
      case 2:
      case 3:
      case 4:
        this.paginationSettings.currentPage = this.paginationSettings.centerDisplayedPage + pageId - 3;
        break;
      case 5:
        if (this.paginationSettings.currentPage < this.paginationSettings.totalPages) {
          this.paginationSettings.currentPage += 1;
        }
        break;
      case 6:
        this.paginationSettings.currentPage = this.paginationSettings.totalPages;
        break;

    }
    if (this.paginationSettings.currentPage <= 2) {
      this.paginationSettings.centerDisplayedPage = 2;
    } else if (this.paginationSettings.currentPage >= this.paginationSettings.totalPages - 1) {
      this.paginationSettings.centerDisplayedPage = this.paginationSettings.totalPages - 1;
    }
    else {
      this.paginationSettings.centerDisplayedPage = this.paginationSettings.currentPage;
    }
    this.search.emit()
  }
  convertToClass(paginationId: number): string {
    var className = "";
    if (paginationId < -1 || paginationId > 1) {
      className = "page-number";
    }
    else {
      className = this.paginationSettings.centerDisplayedPage + paginationId == this.paginationSettings.currentPage ?
        "page-number-active" : "page-number";
    }

    if (this.paginationSettings.totalPages < 3) {
      className += " display-none";
    }
    return className;
  }
}
