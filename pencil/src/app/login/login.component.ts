import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userService.setUser(user);
      this.userService.setLoggedIn(user != null);
    });
  }

  signIn() {
    this.userService.signIn();
  }
}
