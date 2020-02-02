import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  constructor(private userService: UserService, private authService: AuthService) { }
  user: SocialUser;
  loggedIn;

  ngOnInit() {
     this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
