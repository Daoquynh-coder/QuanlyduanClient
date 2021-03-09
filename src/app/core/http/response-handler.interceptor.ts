import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
  HttpHeaderResponse, HttpResponseBase, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {Logger} from '../logger.service';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
const log = new Logger('ResponseHandlerInterceptor');
/**
 * Adds a default error handler to all requests.
 */
const API_TIMEOUT = 15000;

@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).timeoutWith(API_TIMEOUT, Observable.throw('ERROR_TIME_OUT')).pipe(
      tap(
      (data: any) => this.responseHandler(data)
    ));
  }

  // Customize the default error handler here if needed
  private responseHandler(response: HttpEvent<any>) {
    if (response instanceof HttpResponse
      && [200, 201].indexOf(+response.status) !== -1
      && response.body
    ) {
      // if (response.url.indexOf('products=') < 0) {
      //   for (const message of response.body.messages) {
      //     this.toastr.info(message.content, 'Info');
      //   }
      // }
    }
  }

}
