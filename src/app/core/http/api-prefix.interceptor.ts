import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/core/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from '../../app-config.service';
import { AppConfig } from '../../app.config';
import {throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  apiConfig: any = {};

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    public appConfigService: AppConfigService,
    private router: Router
  ) {
    //this.apiConfig = this.appConfigService.getAppConfig().api;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('assets/app-config.json') < 0) {
      const apiConfig = (this.appConfigService.getAppConfig() || ({} as AppConfig)).api;
      let headersConfig: any = null
      // in case upload image, set content type is multipart/form-data
      if (request.url.indexOf('files/upload') >= 0) {
        headersConfig = {};
      } else {
        headersConfig = { 'Content-Type': 'application/json' };
      }
      headersConfig['Accept-Language'] = this.translate.currentLang;
      if (this.authenticationService.isAuthenticated()) {
        const credentials = this.authenticationService.credentials.token;
        headersConfig['Authorization'] = 'Bearer ' + credentials;
      }
      request = request.clone({
        url: apiConfig.baseUrl + request.url,
        setHeaders: headersConfig
      });
    }
    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401){
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        this.authenticationService.logout();

      }else{
        return throwError(error)
      }
    }));
  }
}
