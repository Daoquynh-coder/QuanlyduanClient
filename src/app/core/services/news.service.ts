import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getNewsList(param: any) {
    return this.http.get('news', { params: param });
  }
  getNewsById(param: any) {
    return this.http.get('news/' + param);
  }
  insertNews(param: any) {
    return this.http.post('news', param);
  }
  updateNews(param: any) {
    return this.http.put(`news/${param.id}`, {
      id: +param.id,
      category_id: +param.category_id,
      topic_id: +param.topic_id,
      title: param.title,
      description: param.description,
      content: param.content,
      picture: param.picture,
      approval: param.approval,
      status: param.status
    });
  }
  deleteNews(newsId: any) {
    return this.http.delete(`news/${newsId}`);
  }
  uploadFileCkeditor(data: any, title: any) {
    return this.http.post('files/ck-upload', { list_images: data, title: title });
  }
}
