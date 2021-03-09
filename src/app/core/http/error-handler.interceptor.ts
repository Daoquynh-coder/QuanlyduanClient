import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
const log = new Logger('ErrorHandlerInterceptor');
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TranslateService } from '@ngx-translate/core';
/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (response instanceof HttpErrorResponse &&
      [0].indexOf(+response.status) !== -1){
       this.router.navigate(['/login'], { replaceUrl: true });
      }
    if (response instanceof HttpErrorResponse &&
       [401, 403, 404, 452, 500].indexOf(+response.status) !== -1
    ) {
      if (response.error && response.error.messages) {
        let msgForceLogout = '';
        for (const error of response.error.messages) {
          if ([601, 602].indexOf(+error.code) !== -1) { // token error => force logout and redirect to login
            msgForceLogout = error.content;
            break;
          } else {
            this.toastr.error(error.content, 'Error');
          }
        }
        if (msgForceLogout.length > 0) {
          localStorage.setItem('msgForceLogout', msgForceLogout);
          this.router.navigate(['/login'], { replaceUrl: true });
          return of(null);
        }
      }
    } else if (response.toString() === 'ERROR_TIME_OUT') {
      this.spinnerService.hide();
      this.toastr.error('System timeout!', 'Error');
    }
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }

}
