import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, findElements } from '@fullcalendar/core';
import { BusinessService } from '../../services/business.service';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';
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
  user: any;
  businessName: String;
  schedule: any;
  today = new Date();

  uniqueAppts: any[];

  public lineChartOptions = { // graph data is hard coded, could use the data stored in uniqueAppts
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels = ['2006', '2007', '2008', '2009'];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    {data: [1, 2, 3, 4], label: 'Paul Hewitt'},
    {data: [2, 3, 4, 1], label: 'Ian Quach'},
    {data: [3, 2, 1, 3], label: 'Elon Musk'},
  ];

  newDate = new Date(this.today.getUTCFullYear(), this.today.getMonth(), this.today.getDate(), 8, 0, 0);

  calendarEvents: EventInput[];

  @ViewChild('ownerCalendar', {static: false}) ownerCalendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = false;
  calendarMinTime = '08:00';
  calendarMaxTime = '18:00';

  constructor(private businessService: BusinessService, private userService: UserService, private homeService: HomeService) { }

  ngOnInit() {
    this.selectedOwnedBusiness.push(this.businessService.getBusiness());
    this.businessName = this.selectedOwnedBusiness[0].name.S;
    this.user = this.userService.getUser();
    this.getSchedule();
  }

  addEvent(arg) {
    const nameTitle = prompt('Who is this appointment for?');
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: nameTitle,
      start: arg.date,
      id: nameTitle + arg.date,
      allDay: arg.allDay
    });
    let struct = {name: this.businessName, events: this.calendarEvents};
    this.updateSchedule(struct);
  }

  handleDateClick(arg) {
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
        console.log(this.calendarEvents);
        const hash = [];
        for (let i = 0; i < schedule.events.length; i++) {
          if (!hash[this.calendarEvents[i]['title']]) { hash[this.calendarEvents[i]['title']] = []; }
          hash[this.calendarEvents[i]['title']].push(this.calendarEvents[i]);
        }
        this.uniqueAppts = hash;
        console.log(this.uniqueAppts);
        console.log(this.uniqueAppts["Paul Hewitt"]);
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

  deleteEvent(arg) {
    if (confirm('Would you like to cancel this appointment?')){
      console.log(arg.event.id);
      console.log(this.calendarEvents);
      const findID = this.calendarEvents.find(element => element.id === arg.event.id.toString());
      console.log(this.calendarEvents.indexOf(findID));

      this.calendarEvents.splice(this.calendarEvents.indexOf(findID), 1);

      let struct = {name: this.businessName, events: this.calendarEvents};
      this.updateSchedule(struct);
    }
  }
}
