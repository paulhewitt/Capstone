import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  swPlanets: any[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  search() {
    this.homeService.getPlanets().subscribe((planets) => {
      this.swPlanets.map = planets.results;
    }, (error) => {
      console.log(error);
    });
    console.log(this.swPlanets);
  }


}
