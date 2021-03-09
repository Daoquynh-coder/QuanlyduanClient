import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  rootUrl = "admin/all-users"

  getAdminUsers(params: any) {
    const paramsAdminUsers = {
      name: params.name,
      user_name: params.user_name,
      email: params.email,
      phone: params.phone,
      address: params.address,
      avatar: params.avatar,
      tax_number: params.tax_number,
      role_id: params.role_id,
      role_name: params.role_name
    };

    return this.http.get(this.rootUrl, {params:paramsAdminUsers});
  }
}
