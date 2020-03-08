import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];
  constructor() { }

  ngOnInit() {
  }

  addEvent(arg){
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

  // modifyTitle(eventIndex, newTitle) {
  //   let calendarEvents = this.calendarEvents.slice(); // a clone
  //   let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
  //   singleEvent.title = newTitle;
  //   calendarEvents[eventIndex] = singleEvent;
  //   this.calendarEvents = calendarEvents; // reassign the array
  // }
}
