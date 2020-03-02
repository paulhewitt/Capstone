import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getMockData(): Observable<any> {
    return this.http.get('http://localhost:4200/assets/data.json');
  }

}
