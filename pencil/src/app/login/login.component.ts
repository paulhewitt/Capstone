import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  businesses: any;
  rngBusiness: any;

  constructor(private authService: AuthService, private userService: UserService, private homeService: HomeService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userService.setUser(user);
      this.userService.setLoggedIn(user != null);
      this.getBusinesses();
    });
  }

  getBusinesses() {
    this.homeService.getAllBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses.Items;
        console.log(this.businesses);
        this.rngNumber(businesses);
      }, (error) => {
        console.log(error);
      }
    );
  }

  signIn() {
    this.userService.signIn();
  }

  rngNumber(businesses){
    const numOfBusiness = Object.keys(this.businesses).length;
    console.log(numOfBusiness);
    const rngID = Math.floor((Math.random() * numOfBusiness) + 1);
    const genBusiness = this.businesses[rngID];
    console.log(genBusiness);
    this.rngBusiness = genBusiness;
    console.log(this.rngBusiness);
    document.getElementById('businessName').innerHTML = '<p> Connect With ' + this.rngBusiness.name + '</p>';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.displayLocationInfo(position);
      });
    }
  }

  displayLocationInfo(position) {
    const blockToInsert = document.createElement('iframe');
    const containerBlock = document.getElementById('map');
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    blockToInsert.style.width = '100%';
    blockToInsert.style.height = '600px';
    blockToInsert.style.border = '0';
    blockToInsert.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBdffraumdcWacCqb2uot3eZ4DmizWRn8g&q='
    + this.rngBusiness.address + ',' + this.rngBusiness.city +
    '&center=' + lat + ',' + lng
    + '&zoom=13';
    containerBlock.appendChild(blockToInsert);
  }
}
