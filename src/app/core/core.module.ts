import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
// import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { ResponseHandlerInterceptor } from '@app/core/http/response-handler.interceptor';
import { RequestResponseHandlerInterceptor } from '@app/core/http/request-response-handler.interceptor';
// import { CacheInterceptor } from './http/cache.interceptor';
import { CustomToastComponent } from '@app/core/shell/custom-toast/custom-toast.component';
import { DummyDataService } from '@app/core/services/dummydata.services';
import { UtilityService } from './services/utility.service';
import { MasterService } from './services/master.service';
import { WindowService } from './services/window.service';
import { HomeService } from './services/home.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      maxOpened: 1,
      autoDismiss: true,
      positionClass: 'toast-top-right',
      enableHtml: true,
      preventDuplicates: true,
      // toastComponent: CustomToastComponent,
    }), // ToastrModule added
  ],
  entryComponents: [CustomToastComponent],
  declarations: [
    HeaderComponent,
    ShellComponent,
    CustomToastComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    UtilityService,
    // HttpCacheService,
    DummyDataService,
    WindowService,
    // CacheInterceptor,
    MasterService,
    ErrorHandlerInterceptor,
    ApiPrefixInterceptor,
    ResponseHandlerInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestResponseHandlerInterceptor,
      multi: true
    },
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
