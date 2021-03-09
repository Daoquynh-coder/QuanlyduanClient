import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportNewsService {

  constructor(private http: HttpClient) { }

  rootUrl = "react/report-error"

  postReport(params: any) {
    const paramsReport = {
      user_id: params.user_id,
      activity_id: params.activity_id,
      post_url: params.post_url,
      description: params.description,
    };

    return this.http.post(this.rootUrl, paramsReport);
  }
}
