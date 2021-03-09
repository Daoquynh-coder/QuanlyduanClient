import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  rootUrl = "react"

  postShare(params: any) {
    const paramsShare = {
      user_id: params.user_id,
      activity_id: params.activity_id,
      post_url: params.post_url,
      status: params.status,
      social_network: params.social_network,
      description: params.description,
      name: params.name,
    };

    return this.http.post(this.rootUrl, paramsShare);
  }
}
