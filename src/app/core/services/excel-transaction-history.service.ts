import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelTransactionHistoryService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getExcelTransactionHistoryList(param: any) {
    let params = {
      transaction_type: param.transactionType,
      from_date: param.fromDate,
      to_date: param.toDate ? param.toDate + ' 23:59:59' : "",
    }
    return this.http.get('user/excel-transaction', { params: params, observe: 'response', responseType: 'blob' });
  }
}
