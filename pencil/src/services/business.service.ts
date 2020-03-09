import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class BusinessService {
    business: any;


  constructor() {

  }

  setBusiness(business) {
      this.business = business;
  }

  getBusiness() {
      return this.business;
  }

}
