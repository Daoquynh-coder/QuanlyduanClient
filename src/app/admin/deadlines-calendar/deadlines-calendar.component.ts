import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { GetProjectViewService } from '@app/core/services/get-project-view.service';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
@Component({
  selector: 'app-deadlines-calendar',
  templateUrl: './deadlines-calendar.component.html',
  styleUrls: ['./deadlines-calendar.component.scss']
})
export class DeadlinesCalendarComponent implements OnInit  {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      // { title: 'event 1', date: '2020-06-27' },
      // { title: 'event 2', date: '2020-06-30' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  constructor( private getProjectViewService: GetProjectViewService) { }
  ngOnInit(){
    this.onload()
  }
  onload() {
    this.getProjectViewService.getDeadlines().subscribe((res: any) => {
     this.calendarOptions.events = res.data.map((item: any) => {
       return {
        title: (!item.project_code ? "null" : item.project_code) + " - "+ item.name  + " - "+ item.pic ,
        project_code: item.project_code,
        date: item.date,
       }
     });
     console.log('232',this.calendarOptions.events)
    })
  }
}
