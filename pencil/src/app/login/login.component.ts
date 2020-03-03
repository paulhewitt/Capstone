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
  constructor(private authService: AuthService, private userService: UserService, private homeService: HomeService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userService.setUser(user);
      this.userService.setLoggedIn(user != null);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo)
    }
    
    function displayLocationInfo (position) {
      var blockToInsert = document.createElement('iframe')
      var containerBlock
      const lng = position.coords.longitude
      const lat = position.coords.latitude
    
      blockToInsert.style.width = '100%'
      blockToInsert.style.height = '600px'
      blockToInsert.style.border = '0'
    
      blockToInsert.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBdffraumdcWacCqb2uot3eZ4DmizWRn8g&q=' + lat + ',' + lng
      containerBlock = document.getElementById('map')
      containerBlock.appendChild(blockToInsert)
      console.log(`longitude: ${lng} | latitude: ${lat}`)
      console.log(blockToInsert.src)
    }

    this.homeService.getMockData().subscribe(
      (businesses) => {
        this.businesses = businesses;
        console.log(businesses);
      }, (error) => {
        console.log(error);
      }
    );
  }

  signIn() {
    this.userService.signIn();
  }

}
