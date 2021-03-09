import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LegalStatusService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getLegalStatusList() {
    const params = {

    };
    return this.http.get('master/master_legal_status', { params: params });
  }
}
