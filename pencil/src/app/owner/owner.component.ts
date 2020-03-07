import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  ownedBusinesses = [];
  businesses: any;
  user: any;
  constructor(private homeService: HomeService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getBusinesses();
  }

  getBusinesses() {
    this.homeService.getAllBusinesses().subscribe(
      (businesses) => {
        this.businesses = businesses.Items;
        this.businesses.forEach(obj => {
          if (obj.userName.S === this.user.name) {
            this.ownedBusinesses.push(obj);
          }
        });
      }, (error) => {
        console.log(error);
      }
    );
  }

}
