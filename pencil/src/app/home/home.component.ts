import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import * as data from '../../assets/data/mock_data.json';

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
   this.businesses = data.default;
   console.log(this.businesses);
  }


}
