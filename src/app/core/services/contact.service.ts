import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  rootUrl = "contact"

  postContact(params: any) {
    const paramsContact = {
      user_id: params.user_id,
      post_url: params.post_url,
      name: params.name,
      email: params.email,
      phone: params.phone,
      message: params.message,
      scheduled_date: params.scheduled_date,
      type: params.type
    };

    return this.http.post(this.rootUrl, paramsContact);
  }
}
