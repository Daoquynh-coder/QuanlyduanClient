import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getCategoryList(params: any) {
    return this.http.get('master/master_news_categories', { params: params });
  }

  addNewCategory(params: any) {
    return this.http.post('admin/master/master_news_categories', params)
  }

  editCategory(params: any) {
    return this.http.put(`admin/master/master_news_categories/${params.id}`, params)
  }

}
