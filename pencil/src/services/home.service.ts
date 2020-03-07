import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected createHeaders(): object {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('content-type', 'application/json');
    return {
      headers
    };
  }

  public createBusiness(businessForm): Observable<any> {
    const url = `${environment.apiBaseUrl}businesses`;
    const headers = this.createHeaders();
    return this.http.post<any>(url, businessForm, headers);
  }

  public getBusiness(name): Observable<any> {
    const url = `${environment.apiBaseUrl}businesses?name=` + name;
    const headers = this.createHeaders();
    return this.http.get<any>(url, headers);
  }

  public getAllBusinesses(): Observable<any> {
    const url = `${environment.apiBaseUrl}business`;
    const headers = this.createHeaders();
    return this.http.get<any>(url, headers);
  }

  public getMockData(): Observable<any> {
    return this.http.get('http://localhost:4200/assets/data/data.json');
  }

}
