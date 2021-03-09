import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,
  HttpHeaderResponse, HttpResponseBase, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfigService } from '@app/app-config.service';
/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class RequestResponseHandlerInterceptor implements HttpInterceptor {
  apiConfig: any = {}
  public pendingRequest: number = 0;
  public showLoading: boolean = false;

  constructor(private spinnerService: Ng4LoadingSpinnerService,
    public appConfigService: AppConfigService) {
    //this.apiConfig = this.appConfigService.getAppConfig().api;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequest++;
    return next.handle(request).do((res: any) => {
      // if ((request.url.indexOf("product-bulks") < 0 && request.url.indexOf("auto-complete") < 0 && request.url.indexOf("react") < 0)) {
      if ((request.url.indexOf("posts/es")) > 0 || (request.url.indexOf("admin/posts")) > 0 || (request.url.indexOf("api/projects?")) > 0) {
        this.turnOnModal();
      }
    }, (err: any) => {
      this.turnOffModal();
    }
    ).finally(() => {
      this.turnOffModal();
    });
  }

  turnOnModal() {
    if (!this.showLoading) {
      this.showLoading = true;
      this.spinnerService.show();
    }
    this.showLoading = true;
  }

  turnOffModal() {
    this.pendingRequest--;
    if (this.pendingRequest <= 0) {
      if (this.showLoading) {
        this.spinnerService.hide();
      }
      this.showLoading = false;
    }
  }

}
