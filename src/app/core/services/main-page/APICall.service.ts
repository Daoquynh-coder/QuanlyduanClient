import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {HttpCacheService} from "@app/core";
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class APICallService {

  private _viewLikedPostSubject: BehaviorSubject<any> = new BehaviorSubject<any>('initial');
  viewLikedPost$: Observable<any> = this._viewLikedPostSubject.asObservable();

  constructor(
    private http: HttpClient
    , private httpCacheService: HttpCacheService
  ) { }

  getPostList(param:any){
    return this.http.get(`posts/es`,{params: {
        page: param.page,
        limit: param.limit,
        sort_by: param.sort_by,
        sort:param.sort,
        range_by: param.range_by,
        range: param.range,
        province: param.province,
        district:param.district,
        ward: param.ward,
        type_of_operation: param.type_of_operation,
        type_of_real_estate: param.type_of_real_estate,
        direction: param.direction,
        number_of_bedrooms: param.number_of_bedrooms,
        number_of_bathrooms: param.number_of_bathrooms,
        legal_status: param.legal_status,
        related: param.related,
        id_project: param.id_project,
        status: '1'
    }});
  }

  getLikedPostList(param:any){
    return this.http.get(`posts/list-like`,{params: {
        page: param.page,
        limit: param.limit,
        sort_by: param.sort_by,
        sort:param.sort,
        range_by: param.range_by,
        range: param.range,
        province: param.province,
        district:param.district,
        ward: param.ward,
        type_of_operation: param.type_of_operation,
        type_of_real_estate: param.type_of_real_estate,
        direction: param.direction,
        number_of_bedrooms: param.number_of_bedrooms,
        number_of_bathrooms: param.number_of_bathrooms,
        legal_status: param.legal_status,
        related: param.related,
        id_project: param.id_project,
      }});
  }

  getProjectList(){
    return this.http.get(`projects`);
  }

  getAutoComplete(filter: {inputText: string} = {inputText: ''}): Observable<any>{
    if(filter.inputText && filter.inputText.trim() !== ''){
      let existData = this.httpCacheService.getCacheData(`auto-complete/${filter.inputText.trim()}`);
      if(existData){
        return Observable.of(existData);
      }else{
        return this.http.get(`auto-complete/${filter.inputText.trim()}`).pipe(
          tap((response: any) => {
            // response.data = response.data.filter((item:any) => item.label.includes(filter.inputText));
            this.httpCacheService.setCacheData(`auto-complete/${filter.inputText.trim()}`,response);
            return response;
          })
        )
      }
    }else{
      // return this.http.get(`auto-complete/Hà Nội`)
      return Observable.of({data:[]});
    }
  }

  setViewLikedPost(status: any): void {
    this._viewLikedPostSubject.next(status);
  }

  getFooterSearch(param:any){
    return this.http.get(`posts/search/footer`,{params: {
        province: param.province,
        district:param.district,
        ward: param.ward,
        type_of_operation: param.type_of_operation,
        type_of_real_estate: param.type_of_real_estate,
      }});
  }

}
