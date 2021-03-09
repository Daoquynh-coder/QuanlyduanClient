import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IDataService } from '@app/core';
@Component({
  selector: 'app-table',
  templateUrl: 'app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})

export class AppTableComponent implements OnInit {
  @Input() dataHeader: any = [];
  @Input() dataTable: any = [];
  @Input() actions: any;

  @Input() itemsCount: any;
  @Input() method: any;
  @Input() dataService: IDataService = null;
  @Input() searchParams: any;
  @Input() paginationSettings: any;
  @Input() show = { page: true, record: true, detail: true };
  @Input() urlDataSource: string = "";
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Output() onActionEdit: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  dataConvert: any = [];
  isError: boolean = false;
  selectedRow: number;
  private _currentSortedColumn = 0;
  sortStates: number[] = [];
  internalDataSource: any[] = [];
  // internalTableSetting = {
  //   column: {
  //     titles: ['col1', 'col2', 'col3', 'col4'],
  //     displayedFields: ['field1', 'field2', 'field3', 'field4'],
  //     widths: ['120px', '120px', '120px', '120px'],
  //   },
  //   sortable: true,
  //   selectable: true,
  //   paginationEnable: true,
  //   dropdownEnable: true,
  // }
  sortColumn: any = "";
  sortType: any = "";

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location, private router: Router) {
  }

  ngOnInit() {
    for (let index = 0; index < this.dataHeader.length; index++) {
      this.sortStates.push(-1)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataConvert = this.dataTable.map((item: any) => {
      return Object.values(item)
    })
    this._initPaginationLayout()
    // this.itemsCount = this.dataTable.length
  }

  onDeleteItem(item: any) {
    this.onAction.emit(item);
  }

  onEditItem(item: any) {
    this.onActionEdit.emit(item);
  }

  onViewItem(item: any) {
    this.onView.emit(item);
  }

  _initPaginationLayout() {
    this.paginationSettings.totalPages = Math.ceil(this.itemsCount / this.paginationSettings.numberItemPerPage);
    //   this.paginationSettings.currentPage = 1;
    //   this.paginationSettings.centerDisplayedPage = 2;

    //   this.selectedRow = -1;
  }

  onColumnSorted(id: number): void {
    if (this._currentSortedColumn == id) {
      if (this.sortStates[this._currentSortedColumn] >= 0) {
        this.sortStates[this._currentSortedColumn] = 1 - this.sortStates[this._currentSortedColumn];
      }
      else {
        this.sortStates[this._currentSortedColumn] = 0;
      }
    }
    else {
      this.sortStates[this._currentSortedColumn] = -1;
      this._currentSortedColumn = id;
      this.sortStates[this._currentSortedColumn] = 0;
    }

    this.selectedRow = -1;
    this._refreshDatasource();
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
    this.selectedRow = -1;
    this._refreshDatasource();
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

  _refreshDatasource(): void {
    var sortColumnId = this.sortStates.findIndex((item: any) => item == 0 || item == 1);

    this.sortColumn = sortColumnId !== null && sortColumnId !== undefined && this.dataHeader[sortColumnId] ? this.dataHeader[sortColumnId].value : ""
    this.sortType = sortColumnId !== null && sortColumnId !== undefined? this.sortStates[sortColumnId] : ""
    this.search.emit({ sortColumn: this.sortColumn, sortType: this.sortType })
  }
}
