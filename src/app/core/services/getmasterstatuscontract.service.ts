import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetmasterstatuscontractService {

  constructor(private http: HttpClient) { }

  getMasterStatusContract(){
    return this.http.get('master/status-contract');
  }
}
