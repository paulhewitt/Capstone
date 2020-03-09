import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { BusinessService } from '../../services/business.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  businesses: any;
  rngBusiness: any;

  constructor(private authService: AuthService, private userService: UserService, private homeService: HomeService, 
    private businessService: BusinessService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userService.setUser(user);
      this.userService.setLoggedIn(user != null);
      this.businesses = this.businessService.getBusinessArray();
      console.log(this.businesses);
      this.rngNumber();
    });
  }

  signIn() {
    this.userService.signIn();
  }

  rngNumber() {
    const numOfBusiness = this.businesses.length;
    const rngID = Math.floor((Math.random() * numOfBusiness) + 1);
    this.rngBusiness = this.businesses[rngID];
    document.getElementById('businessName').innerHTML = '<p> Connect With ' + this.rngBusiness.name.S + '</p>';
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
    blockToInsert.src = `https://www.google.com/maps/embed/v1/place?key=${environment.apiGoogleMaps}&q=`
                        + this.rngBusiness.address.S + ',' + this.rngBusiness.city.S + '&zoom=16';
    // blockToInsert.src = `https://www.google.com/maps/embed/v1/place?key=${environment.apiGoogleMaps}&q=`
    // + this.rngBusiness.address.S + ',' + this.rngBusiness.city.S +
    // '&center=' + lat + ',' + lng
    // + '&zoom=13';
    console.log(blockToInsert.src);
    containerBlock.appendChild(blockToInsert);
  }
}
