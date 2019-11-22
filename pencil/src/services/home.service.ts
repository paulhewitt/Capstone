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

  public getPlanets(): Observable<any> {
    const url = `https://swapi.co/api/planets/`;
    return this.http.get<any[]>(url);
  }
}
