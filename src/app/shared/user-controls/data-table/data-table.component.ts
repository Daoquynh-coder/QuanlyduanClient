import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IDataService } from '@app/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const COMPONENT_NAME = '[data-tables]';
const UNKNOWN_TITLE = '';

@Component({
  selector: 'data-tables',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})


export class DataTableComponent implements OnInit {
  @Input() tableSetting: any = null;
  @Input() converter: Function = null;
  @Input() searchParams: any = { sortColumn: "Col-Name", tuKhoa: "Key Search", pageSize: 20 };
  @Input() dataService: IDataService = null;
  @Input() method: any;
  @Input() displayItem: boolean = true;
  @Input() enableScrollBar: boolean = false;
  @Input() dataSource: any[] = [];
  @Input() columnTitles: string[] = [];
  @Input() columnDisplayFields: string[] = [];
  @Input() columnWidths: string[] = [];
  @Input() urlDataSource: string = "";
  @Input() actions = { edit: true, delete: true, view: true };
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onActionEdit: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<any> = new EventEmitter();
  @Input() searchControl = { enable: false, label: '', placeHolder: 'Enter text to here' };
  @Input() show = { page: true, record: true, detail: true };
  @Input() enableShowNumber: boolean = false;
  @Output() actionClickRow: EventEmitter<any> = new EventEmitter();
  @Input() displaySort: boolean = false;
  user = {
    employeeId: '',
    id: '',
    groupId: '',
    groupName: '',
    note: '',
    fullName: '',
    password: ''
  }

  itemsCount: number = 0;
  isError: boolean = false;
  numberItemsPerPageOptions: any[];

  selectedRow: number;
  setClickedRow: Function;

  // private parameter
  private _currentSortedColumn = 0;
  //# internal member
  paginationSettings: any = {
    numberItemPerPage: 20,
    totalPages: 10,
    currentPage: 1,
    centerDisplayedPage: 2,
  }
  internalTableSetting = {
    column: {
      titles: ['col1', 'col2', 'col3', 'col4'],
      displayedFields: ['field1', 'field2', 'field3', 'field4'],
      widths: ['120px', '120px', '120px', '120px'],
    },
    sortable: true,
    selectable: false,
    paginationEnable: true,
    dropdownEnable: true,
  }
  // sortStates item's value is one of following values:
  // -1 : no sorting
  // 0  : sort acsending
  // 1  : sort descending
  sortStates: number[] = [];
  internalDataSource: any[] = [];
  internalColumnTitles: string[] = [];
  public selectOptions: Select2Options = { minimumResultsForSearch: 50 };

  constructor(private httpService: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private translate: TranslateService) {
  }

  ngOnInit(): void {
    this._initPaginationLayout()
    this.internalTableSetting.column.displayedFields = this.columnDisplayFields
    this.initNumberPage();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initNumberPage();
    });
    if (this._validateInputs()) {
      this._initColumnTitleLayout();

      if (this.dataSource && this.dataSource.length > 0) {
        this.internalDataSource = this.dataSource;
      } else {
        this._refreshDatasource(true);
      }
    }
    this.setClickedRow = function (index: any) {

      //console.log('row ' + index);
      // if (this.selectedRow == index) {
      //   this.selectedRow = -1;
      // }
      // else {
      //   this.selectedRow = index;
      // }

      // if (this.onSelectedCategory) {
      //   this.onSelectedCategory.emit(this.selectedRow);
      // }
      // //internalDataSource[this.selectedRow].categoryId
    }

  }

  loadData(dataSource: any) {
    this.dataSource = dataSource;
    this.internalDataSource = dataSource;
    this._initColumnTitleLayout();
  }


  initNumberPage() {
    this.numberItemsPerPageOptions = [
      { id: 5, text: this.translate.instant('5 bản ghi', { val01: 5 }) },
      { id: 10, text: this.translate.instant('10 bản ghi', { val01: 10 }) },
      { id: 20, text: this.translate.instant('20 bản ghi', { val01: 20 }) },
      { id: 30, text: this.translate.instant('30 bản ghi', { val01: 30 }) },
      { id: 50, text: this.translate.instant('50 bản ghi', { val01: 50 }) },
      { id: 100, text: this.translate.instant('100 bản ghi', { val01: 100 }) }];

    if (this.searchParams.pageSize != undefined)
      this.paginationSettings.numberItemPerPage = this.searchParams.pageSize;
  }

  // onNumberItemPerPageClicked(selectedValue: any): void {
  //   this.paginationSettings.currentPage = 1;
  //   this.paginationSettings.numberItemPerPage = selectedValue;
  //   this.selectedRow = -1;
  //   this._refreshDatasource(true);
  // }

  onPageLaunched(pageId: any): void {
    // console.log('page launch: ' + pageId);
    switch (pageId) {
      case 0: //first page launched
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

    // Calculate the center display page
    if (this.paginationSettings.currentPage <= 2) {
      this.paginationSettings.centerDisplayedPage = 2;
    } else if (this.paginationSettings.currentPage >= this.paginationSettings.totalPages - 1) {
      this.paginationSettings.centerDisplayedPage = this.paginationSettings.totalPages - 1;
    }
    else {
      this.paginationSettings.centerDisplayedPage = this.paginationSettings.currentPage;
    }
    this.selectedRow = -1;
    this._refreshDatasource(false);
  }

  onColumnSorted(id: number): void {
    this.searchParams.sort = this.sortStates[id] === 1? 'desc' : 'asc'
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
    this._refreshDatasource(false);
  }

  convertToClass(paginationId: number): string {
    // paginationId must has value as one of -1, 0 , 1
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

  _initColumnTitleLayout(): void {
    //Set value for title of columns to display in the data tables.
    this.internalColumnTitles = [];
    let sortDefault = this.searchParams.sortColumn != undefined ? this.searchParams.sortColumn : this.columnDisplayFields[0];
    for (var colCount = 0; colCount < this.columnDisplayFields.length; colCount++) {
      if (colCount < this.columnTitles.length) {
        this.internalColumnTitles.push(this.columnTitles[colCount]);
      }
      else {
        this.internalColumnTitles.push(UNKNOWN_TITLE);
      }
      if (sortDefault == this.columnDisplayFields[colCount]) {
        this._currentSortedColumn = colCount;
        this.sortStates.push(1);
      }
      else this.sortStates.push(-1);
    }
  }

  _initPaginationLayout() {
    this.paginationSettings.totalPages = Math.ceil(this.itemsCount / this.paginationSettings.numberItemPerPage);
    this.paginationSettings.currentPage = 1;
    this.paginationSettings.centerDisplayedPage = 2;

    this.selectedRow = -1;
  }

  _validateInputs(): boolean {
    let isPreconditionMet = true;

    //Check pre-condition before generate data of table
    if (!this.columnTitles || this.columnTitles.length <= 0) {
      console.log(COMPONENT_NAME + 'WARNING: The property [columnTitles] has not been set.')
    }

    if (!this.columnDisplayFields || this.columnDisplayFields.length <= 0) {
      console.log(COMPONENT_NAME + 'ERROR: The property [columnDisplayFields] has not been set.')
      isPreconditionMet = false;
    }
    else {
      if (this.columnDisplayFields.length != this.columnTitles.length) {
        console.log(COMPONENT_NAME + 'WARNING: Number of items in [columnTitles] is not equals to number of items in [columnDisplayFields].')
      }
      if ((!this.dataSource || this.dataSource.length <= 0) && (!this.urlDataSource || this.urlDataSource.length <= 0)) {
        console.log(COMPONENT_NAME + 'ERROR: The property [dataSource] or [urlDataSource] has not been set.')
        isPreconditionMet = false;
      }
      // else {
      //   let attributes = Object.getOwnPropertyNames( this.dataSource[0]);

      //   //console.log(this.attributes);
      //   this.columnDisplayFields.forEach(element => {
      //     if (attributes.indexOf(element) < 0) {
      //       console.log(COMPONENT_NAME + 'The field [' + element + '] is not existed in data source type.')
      //       isPreconditionMet = false;
      //       return isPreconditionMet;
      //     }
      //   });
      // }
    }
    //console.log(COMPONENT_NAME  + 'end validation.')
    return isPreconditionMet;
  }


  // _refreshDatasource(isRefreshPagination: boolean, isForSearching: boolean = false): void {
  //   //console.log("refreshed datasource!!")
  //   if (this.urlDataSource.length > 0) {
  //     if (this.httpService) {
  //     }
  //   }
  // }

  _refreshDatasource(isRefreshPagination: boolean, isSearch?: boolean, alwayReload: boolean = false): void {
    this.spinnerService.show();
    var sortColumnId = this.sortStates.findIndex((item: any) => item == 0 || item == 1);
    //console.log(this.dataService);
    this.searchParams.page = this.paginationSettings.currentPage;
    this.searchParams.limit = this.paginationSettings.numberItemPerPage
    if (this.dataService) {
      // console.log(this.searchParams);
      if (this.searchParams || alwayReload) {

        if (isSearch) {
          this.paginationSettings.currentPage = 1;
          this.searchParams.page = 1
        }
        var requestParams = this.searchParams;
        if (this.method == 'POST') {
          Object.assign(requestParams, {
            pageNumber: this.paginationSettings.currentPage,
            pageSize: this.paginationSettings.numberItemPerPage,
            sortColumn: this.internalTableSetting.column.displayedFields[sortColumnId],
            sortType: this.sortStates[sortColumnId],
          })
        }
        this.dataService.buildParam(requestParams);
        //this.internalDataSource = [];
        this.dataService.connect(this.method, this.urlDataSource, (response: any) => {
          if (response) {
            this.internalDataSource = response.data;
            this.itemsCount = response.total;
            if (isRefreshPagination) {
              this._initPaginationLayout();
            }
          }
          this.spinnerService.hide();
        });
      }
    }
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

  onDeleteItem(item: any) {
    this.onDelete.emit(item);
  }

  onEditItem(item: any) {
    this.onActionEdit.emit(item);
  }

  //Page History-active
  onViewItem(item: any) {
    this.onView.emit(item);
  }

  onActionClickItem(item: any) {
    this.actionClickRow.emit(item);
  }
}
