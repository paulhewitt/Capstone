import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  business: any;
  businesses: any;


  constructor() {

  }

  setBusiness(business) {
    this.business = business;
  }

  getBusiness() {
    return this.business;
  }

  setBusinessArray(array) {
    this.businesses = array;
  }

  getBusinessArray() {
    return this.businesses;
  }

}
