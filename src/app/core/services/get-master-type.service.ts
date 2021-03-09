import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetMasterTypeService {

  constructor(private http: HttpClient) {}

  getMasterType(param: any){
    return this.http.get('master/types  ', param);
  }
}
