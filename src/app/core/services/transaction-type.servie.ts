import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getTransactionTypeList() {
    const params = {

    };
    return this.http.get('master/master_transaction_types', { params: params });
  }
}
