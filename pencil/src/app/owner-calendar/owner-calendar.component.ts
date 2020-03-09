import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { BusinessService } from '../../services/business.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-owner-calendar',
  templateUrl: './owner-calendar.component.html',
  styleUrls: ['./owner-calendar.component.scss']
})
export class OwnerCalendarComponent implements OnInit {

  selectedOwnedBusiness = [];

  @ViewChild('calendar', {static: false}) CalendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.selectedOwnedBusiness.push(this.businessService.getBusiness());
  }
  
  addEvent(arg) {
    const titlePrompt = prompt('Who is this appointment for?');
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: titlePrompt,
      start: arg.date,
      allDay: arg.allDay
    });
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an appointment for ' + arg.dateStr + ' ?')) {
      this.addEvent(arg);
    }
  }
}
