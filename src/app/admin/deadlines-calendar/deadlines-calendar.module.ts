import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { Routes, RouterModule } from '@angular/router';
import { DeadlinesCalendarComponent } from './deadlines-calendar.component';
import { AuthenticationGuard } from '@app/core/authentication/authentication.guard';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

///////////////////////////////
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

const routes: Routes = [
  { path: 'deadlines', component: DeadlinesCalendarComponent, data: { title: 'Deadlines' },canActivate: [AuthenticationGuard] },
];
@NgModule({
  imports: [
    FullCalendarModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [RouterModule,],
  declarations: [DeadlinesCalendarComponent],
})
export class DeadlinesCalendarModule { }
