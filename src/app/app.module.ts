import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AppComponent } from './app.component';
import { Select2Module } from 'ng2-select2';
import { AppConfigService } from './app-config.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';
import { registerLocaleData } from '@angular/common';

 // a plugin
import localeVI from '@angular/common/locales/vi';
registerLocaleData(localeVI, 'vi-VN');


// import {AccumulationChartModule,PieSeriesService} from '@syncfusion/ej2-angular-charts';
// Import containers
import { FullLayoutComponent, SimpleLayoutComponent } from "./shared/containers";

const APP_CONTAINERS = [FullLayoutComponent, SimpleLayoutComponent];

// Import components common main-page-layout
import { AppFooterComponent } from "./shared/layout";
const APP_COMPONENTS = [AppFooterComponent];
const appConfigServiceInitFactory = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
// import { MatMenuModule } from "@angular/material/menu";
import { NguCarouselModule } from '@ngu/carousel';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    NguCarouselModule,
    ServiceWorkerModule.register("/ngsw-worker.js", { enabled: false }),
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    Ng4LoadingSpinnerModule.forRoot(),
    CoreModule,
    SharedModule,
    // ChartModule,
    MatDialogModule,
    AppRoutingModule,
    Select2Module,
    ReactiveFormsModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  declarations: [
    AppComponent,
    // HighchartsChartComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    DashboardComponent,
  ],
  exports: [...APP_COMPONENTS],
  providers: [
    AppConfigService,
    // PieSeriesService
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigServiceInitFactory,
      multi: true,
      deps: [AppConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
