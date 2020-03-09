import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { BusinessService } from '../../services/business.service';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';
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
  businessName: String;
  today = new Date();
  newDate = new Date(this.today.getUTCFullYear(), this.today.getMonth(), this.today.getDate(), 8, 0, 0);
  schedule: any;

  calendarEvents: EventInput[];

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarMinTime = '08:00';
  calendarMaxTime = '18:00';
  constructor(private businessService: BusinessService, private userService: UserService, private homeService: HomeService) { }

  ngOnInit() {
    this.businesses.push(this.businessService.getBusiness());
    this.businessName = this.businesses[0].name.S;
    this.user = this.userService.getUser();
    this.getSchedule();
  }

  addEvent(arg) {
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: this.user.name,
      start: arg.date,
      allDay: arg.allDay
    });
    let struct = {name: this.businessName, events: this.calendarEvents};
    this.updateSchedule(struct);
  }

  handleDateClick(arg) {
    console.log(arg);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (confirm('Would you like to add an appointment for ' + arg.date.toLocaleDateString(undefined, options) + ' at '
     + arg.date.toLocaleTimeString('en-US') + ' ?')) {
      this.addEvent(arg);
    }
  }

  getSchedule() {
    this.homeService.getSchedule(this.businessName).subscribe(
      (schedule) => {
        this.calendarEvents = schedule.events;
      }, (error) => {
        console.log(error);
      }
    );
  }

  updateSchedule(struct) {
    this.homeService.createSchedule(struct).subscribe(_ => {
    }, (err) => {
      console.log(err);
    });
  }

}
