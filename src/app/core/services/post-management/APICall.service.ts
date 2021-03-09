import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APICallService {

  constructor(private http: HttpClient) { }

  getPostList(param:any){
    return this.http.get(`posts`,{params: {
        page: param.page,
        limit: param.limit,
        province: param.province,
        district: param.district,
        ward: param.ward,
        id_project: param.id_project,
        type_of_post: param.type_of_post,
        type_of_operation: param.type_of_operation,
        type_of_real_estate: param.type_of_real_estate,
        // status: param.status,
        match_by: param.match_by,
        match: param.match,
        sort_by: param.sort_by,
        sort: param.sort,
        from_date: param.from_date,
      }});
  }
  upDatePostStatus(param:any){
    return this.http.put(`${'posts/'+ param.postId +'/status'}`,null,{params: {
        status: param.status,
        user_id : JSON.parse(localStorage.credentials).id
      }});
  }

  deletePost(param:any){
    return this.http.delete(`${'posts/'+ param.postId}`,{params: {
        user_id : JSON.parse(localStorage.credentials).id
      }});
  }

  getUserInfo(){
    return this.http.get(`${'posts/statistics'}`);
  }

  getProjectList(){
    return this.http.get(`projects`);
  }

}
