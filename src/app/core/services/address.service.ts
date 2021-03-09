import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getProvinceList() {
    const params = {

    };
    return this.http.get('master/master_provinces', { params: params });
  }
  getDistrictList() {
    const params = {

    };
    return this.http.get('master/master_districts', { params: params });
  }
  getWardList() {
    const params = {

    };
    return this.http.get('master/master_wards', { params: params });
  }

  // processedPostList(userId:string, page:string, limit:string){
  //
  // }
}
