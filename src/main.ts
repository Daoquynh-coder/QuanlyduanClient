import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { environment } from '@env/environment';
import { DeadlinesCalendarComponent } from '@app/admin/deadlines-calendar/deadlines-calendar.component';
import { DeadlinesCalendarModule } from '@app/admin/deadlines-calendar/deadlines-calendar.module';
import { AppModule } from '@app/app.module';



@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, DeadlinesCalendarModule],
  bootstrap: []
})
export class BootstrapModule {}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
