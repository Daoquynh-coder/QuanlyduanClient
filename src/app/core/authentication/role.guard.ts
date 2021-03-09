import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationService as AuthService } from './authentication.service';
// import decode from 'jwt-decode';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    // const tokenPayload = decode(token);
    const tokenPayload = { role: ['ADMIN'] };
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    // check role here
    /*if (tokenPayload.role.indexOf(expectedRole) === -1) {
      this.router.navigate(['login']);
      return false;
    }*/
    return true;
  }
}
