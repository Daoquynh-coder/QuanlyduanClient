import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, AuthenticationService as AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public authenticationService: AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    if (this.authenticationService.credentials && this.authenticationService.credentials.role_id == 3) {
      return false
    }
    return true;
  }
}
