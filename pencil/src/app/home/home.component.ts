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
    this.getBusinesses();
  }

  getBusinesses() {
    this.homeService.getAllBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses.Items;
        console.log(this.businesses);
      }, (error) => {
        console.log(error);
      }
    );
  }

  cardClicked(object) {
    console.log(object.city);
  }

  search() {
    console.log('search clicked');
  }
}
