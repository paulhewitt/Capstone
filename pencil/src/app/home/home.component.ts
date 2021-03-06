import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { BusinessService } from '../../services/business.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  businesses: any;
  searchForm: FormGroup;
  business: any;

  constructor(private homeService: HomeService, private formBuilder: FormBuilder, private businessService: BusinessService,
              private router: Router) { }

  ngOnInit() {
    this.getBusinesses();
    this.searchForm = this.formBuilder.group({
      search: new FormControl('')
    });
  }

  getBusinesses() {
    this.homeService.getAllBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses.Items;
        this.businessService.setBusinessArray(this.businesses);
      }, (error) => {
        console.log(error);
      }
    );
  }

  cardClicked(object) {
    this.businessService.setBusiness(object);
    this.router.navigate(['calendar']);
  }

  search() {
    const searchForm = this.searchForm;
    this.homeService.getBusiness(searchForm.value.search).subscribe(
      (business) => {
        console.log(business);
        this.business = this.businesses[0];

        this.business.name.S = business.name;
        this.business.type.S = business.type;
        this.business.address.S = business.address;
        this.business.city.S = business.city;
        this.business.state.S = business.state;
        this.business.postalCode.S = business.postalCode;
        this.business.country.S = business.country;
        this.business.userName.S = business.userName;
        this.business.userId.S = business.userId;

        this.businesses = [];
        this.businesses.push(this.business);

      }, (error) => {
        console.log(error);
      }
    );
  }
}
