import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopicService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getTopicList(params: any, status: any) {
    return this.http.get(`master/master_news_topics?status=${status}`, { params: params });
  }

  addNewTopic(param: any) {
    return this.http.post(`admin/master/master_news_topics`, param);
  }

  editTopic(param: any) {
    return this.http.put(`admin/master/master_news_topics/${param.id}`, param);
  }
}
