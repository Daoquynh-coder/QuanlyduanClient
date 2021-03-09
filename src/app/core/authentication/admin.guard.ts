import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthenticationService as AuthService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public authenticationService: AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    if ((this.authenticationService.credentials && (this.authenticationService.credentials.role_id !== 1&&this.authenticationService.credentials.role_id !== 3)) || !this.authenticationService.credentials) {
      return false
    }

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
