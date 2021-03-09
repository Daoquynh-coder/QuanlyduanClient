import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  getStatisticsPost() {
    return this.http.get('statistic/posts');
  }
  getStatisticsUser() {
    return this.http.get('statistic/users');
  }
  getStatisticsCoin() {
    return this.http.get('statistic/coins');
  }
  getStatisticsReaction() {
    return this.http.get('statistic/reactions');
  }
}
