import { Injectable, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  signIn(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
   }

   getUser() {
     return this.user;
   }

   setUser(user) {
     this.user = user;
   }

   setLoggedIn(loggedIn) {
     this.loggedIn = loggedIn;
   }

   isLoggedIn() {
     return this.loggedIn;
   }
}
