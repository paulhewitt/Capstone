import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  businesses: any;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  search() {
    this.homeService.getMockData().subscribe(
      (businesses) => {
        this.businesses = businesses;
        console.log(businesses);
      }, (error) => {
        console.log(error);
      }
    );
  }

  cardClicked(object) {
    console.log(object.city);
  }
}
