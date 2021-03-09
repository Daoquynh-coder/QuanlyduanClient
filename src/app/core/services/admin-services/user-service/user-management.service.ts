import { Injectable } from '@angular/core';
import { BaseDataService } from '../../dataservice.service';



/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
}
)
export class UserService extends BaseDataService{
  generateDummy(url: string) {

  }
  getDummyMode(): boolean {
    return false;
  }

  signinUser(param: any){
    return this.http.post("dkuser",param);
  }

  getListUsers(param:any){
    return this.http.post("user",param);
  }

  deleteUser(param:any){
    return this.http.post("admin/user/delete/" + param, {});
  }

  editUser(params:any){
    return this.http.put("admin/user/update-user-admin" , {
      id: params.id,
      name: params.name,
      username: params.username,
      email: params.email,
      // password: params.password,
      phone: params.phone,
      address: params.address,
      avatar: params.avatar,
      tax_number: params.tax_number,
      role_id: params.role_id,
    });
  }

  getAllUsers(){
    return this.http.get("admin/all-users");
  }

  getUserDetail(param: any) {
    return this.http.get('admin/user/' + param );
  }

  getUserActivityStatistic(params: any) {
    return this.http.get('user-activity/statistic' + '?userId=' + params );
  }

  getUserActivityList(params: any) {
    return this.http.get('user-activity/list' + '?userId=' + params );
  }

  // admin end user
  getAllAdminUsers(){
    return this.http.get("admin/user/all-end-user-admin");
  }

  // add admin user
  postAddAdminUsers(params: any) {
    return this.http.post('admin/user/create', {
      name: params.name,
      username: params.username,
      email: params.email,
      password: params.password,
      phone: params.phone,
      address: params.address,
      avatar: params.avatar,
      tax_number: params.tax_number,
      role_id: params.role_id,
    });
  }

  // User Information
  getUserInfo(param: any) {
    return this.http.get('admin/user/end-user-admin/' + param );
  }

  // update status user
  postStatusUser(params:any){
    return this.http.put('admin/user/update-status-end-user', params);
  }
}
