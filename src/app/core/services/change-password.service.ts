import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  postChangePassword(params: any) {
    return this.http.post('user/change-password', {
      current_password: params.current_password,
      new_password: params.new_password,
      confirm_password: params.confirm_password
    });
  }
  postCheckPassword(params: any) {
    return this.http.post('user/check-password', {
      current_password: params.current_password
    });
  }
}
