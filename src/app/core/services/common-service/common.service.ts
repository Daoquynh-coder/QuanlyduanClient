import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  dataSearch: any;
  dataSearchHeader: any;
  public _status: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  statusSend$: Observable<any> = this._status.asObservable();
  
  public _statusHeader: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  statusHeaderSend$: Observable<any> = this._statusHeader.asObservable();

  constructor(private http: HttpClient) { }

  getProvinceList() {
    return this.http.get('master/master_provinces');
  }
  getDistrictList() {
    return this.http.get('master/master_districts');
  }
  getWardList() {
    return this.http.get('master/master_wards');
  }
  getOperationList() {
    return this.http.get('master/master_operations');
  }
  getRealEstateList() {
    return this.http.get('master/master_estates');
  }
  getLegalStatusList() {
    return this.http.get('master/master_legal_status');
  }
  getHouseDirectionList() {
    return this.http.get('master/master_direction');
  }
  getPostTypeList() {
    return this.http.get(`master/master_post_types`);
  }
  getBusinessModelList() {
    return this.http.get(`master/master_operations`);
  }
  getPostStatusList() {
    return this.http.get(`master/master_status`);
  }
  getUtilitiesList() {
    return this.http.get(`master/master_utilities`);
  }
  getProjectTypeList() {
    return this.http.get(`master/master_projects`);
  }
  getProjectList() {
    return this.http.get(`projects`);
  }
  updateDataSearch(newDataSearch: any) {
    this.dataSearch = newDataSearch;
    // this.dataSearch.type = type;
    this._status.next(true);
    // this._status.next(false);
  }
  updateDataSearchHeader(newDataSearch: any) {
    this.dataSearchHeader = newDataSearch;    
    this._statusHeader.next(true);    
  }
  getDataSearch() {
    return this.dataSearch;    
  }
  getDataSearchHeader() {
    return this.dataSearchHeader;    
  }
  // onDataNew= new BehaviorSubject(this.getDataSearch());
}
