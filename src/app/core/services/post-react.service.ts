import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostReactService {
  constructor(private http: HttpClient) { }

  postReact(param:any){
    return this.http.post('react', {
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      activity_id: param.activity_id,
      post_id: param.post_id,
      status: param.status,
      social_network: param.social_network ? param.social_network : '',
      description: param.description ? param.description : '',
      name: param.name ? param.name : ''
    });
  }

  updateReact(param:any){
    return this.http.put('react',{
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      activity_id: param.activity_id,
      post_id: param.post_id,
    })
  }
}
