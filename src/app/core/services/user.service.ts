import { Injectable } from '@angular/core';
import { BaseDataService } from './dataservice.service';



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

  // getUser(userId: number): Observable<User> {
  //   const resource = typeof(userId) === undefined ? 'users' : `users/${userId}`;
  //   const request = this.http.get(resource)
  //   .pipe(
  //     map((body: any) => body.data)
  //   );
  //   return request;
  // }

  signinUser(param: any){
    return this.http.post("dkuser",param);
  }

  getListUsers(param:any){
    return this.http.post("user",param);
  }

  deleteUser(param:any){
    return this.http.delete("user/" + param);
  }

  editUser(param:any){
    return this.http.put("user/" + param.id,param);
  }

  getAllUsers(){
    return this.http.get("AllUser");
  }

  getUsers(param: any) {
    return this.http.get('user/' + param );
  }

}
