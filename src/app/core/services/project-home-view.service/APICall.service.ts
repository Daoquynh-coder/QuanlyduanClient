import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APICallService {

  constructor(private http: HttpClient) { }

  getProjectList(param:any){
    return this.http.get(`projects`,{params: {
        page: param.page,
        limit:  param.limit,
        sort_by: param.sort_by,
        sort:  param.sort,
        range_by:param.range_by,
        range: param.range,
        id_province: param.province,
        id_district: param.district,
        id_ward: param.ward,
        related: param.related,
        project_type: param.project_type,
        utilities: param.utilities
      }});
  }

}
