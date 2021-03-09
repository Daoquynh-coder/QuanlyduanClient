import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApprovalService {

  constructor(private http: HttpClient) { }

  getProjectApprovalList(param: any) {
    return this.http.get(`admin/projects`, {
      params: {
        page: param.page,
        limit: param.limit,
        sort_by: param.order_by,
        sort: param.order,
        range_by: param.range_by,
        range: param.range,
        type_of_project: param.type_of_project,
        // type_of_real_estate: param.type_of_real_estate,
        // type_of_operation: param.type_of_operation,
        match_by: param.match_by,
        match: param.match,
        // status: param.status
      }
    });
  }

  changePostStatus(param: any) {
    return this.http.put(`${'admin/posts/' + param.postId + '/approval'}`, null, {
      params: {
        status: param.status,
        // user_id : JSON.parse(sessionStorage.credentials).id
      }
    });
  }

}
