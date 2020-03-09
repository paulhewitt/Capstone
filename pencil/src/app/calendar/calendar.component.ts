import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { BusinessService } from '../../services/business.service';
import { UserService } from '../../services/user.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  businesses = [];
  user: any;
  today = new Date();
  newDate = new Date(this.today.getUTCFullYear(), this.today.getMonth(), this.today.getDate(), 8, 0, 0);


  calendarEvents: EventInput[] = [
    { title: 'Paul Hewitt', start: this.newDate},
    { title: 'Ian Quach', start: this.newDate.getTime() + (1 * 60 * 60 * 1000)},
    { title: 'Tim Maciag', start: this.newDate.getTime() + (2 * 60 * 60 * 1000)},
    { title: 'Daris Lychuk', start: this.newDate.getTime() + (4 * 60 * 60 * 1000)},
    { title: 'Kegan Lavoy', start: this.newDate.getTime() + (5 * 60 * 60 * 1000)},
  ];

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarMinTime = '08:00';
  calendarMaxTime = '18:00';
  constructor(private businessService: BusinessService, private userService: UserService) { }

  ngOnInit() {
    this.businesses.push(this.businessService.getBusiness());
    this.user = this.userService.getUser();
  }

  addEvent(arg) {
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: this.user.name,
      start: arg.date,
      allDay: arg.allDay
    });
  }

  handleDateClick(arg) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (confirm('Would you like to add an appointment for ' + arg.date.toLocaleDateString(undefined, options) + ' at '
     + arg.date.toLocaleTimeString('en-US') + ' ?')) {
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
