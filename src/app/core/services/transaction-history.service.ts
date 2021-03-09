import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getTransactionHistoryList(param: any, panigation: any, sortColumn: any, sortType: any) {
    let params = {
      limit: panigation.numberItemPerPage,
      transaction_type: param.transactionType,
      from_date: param.fromDate,
      to_date: param.toDate ? param.toDate + ' 23:59:59' : "",
      page: panigation.currentPage,
      sort_column: sortColumn ? sortColumn : "",
      sort_type: sortType === 0 ? 'asc' : (sortType === 1 ? 'desc' : "")
    }
    return this.http.get('user/transaction', { params: params });
  }
}
