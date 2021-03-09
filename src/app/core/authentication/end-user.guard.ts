import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreatePostService } from '../services/create-post.service';
import { AuthenticationService, AuthenticationService as AuthService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class EndUserGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public authenticationService: AuthenticationService, public createPostService: CreatePostService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');

    if (this.authenticationService.credentials && this.authenticationService.credentials.role_id == 1) {
      return false
    }

    return true;
  }
}
