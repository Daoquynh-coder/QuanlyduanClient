import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '@app/shared/user-controls/date-picker/ngb-date-fr-parser-formatter';
import { CustomDatepickerI18n, I18n } from '@app/shared/user-controls/date-picker/ngb-datetimepicker-i18n';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class DatePickerComponent implements OnInit {
    @Input() selectedDate: any = null;
    @Input() editable: any = true;
    completed: any;
    
    ngOnInit() {
    }
    @Output() eventDateSelected: EventEmitter<any> = new EventEmitter();

    onModelChange(value: any) {
        this.eventDateSelected.emit(value);
    }

    closeFix(event: any, datePicker: any) {
        if (event.target.offsetParent == null)
            datePicker.close();
        else if (event.target.offsetParent.nodeName != "NGB-DATEPICKER")
            datePicker.close();
    }
}