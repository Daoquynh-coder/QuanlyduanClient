import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials } from '../models/credentials';
import { LoginContext } from '../models/login-context';

export class MockAuthenticationService {

  // credentials: Credentials | null = {
  //   userName: 'test',
  //   token: '123'
  // };

  // login(context: LoginContext): Observable<Credentials> {
  //   return of({
  //     userName: context.employeeId,
  //     token: '123456'
  //   });
  // }

  // logout(): Observable<boolean> {
  //   this.credentials = null;
  //   return of(true);
  // }

  // isAuthenticated(): boolean {
  //   return !!this.credentials;
  // }

}
