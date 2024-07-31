import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:8080/api/country';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCountry(country: any): Observable<any> {
    return this.http.post(this.apiUrl, country);
  }

  updateCountry(countryId: number, country: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${countryId}`, country);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${countryId}`, { observe: 'response' });
  }

  getCountriesWithStateCount(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}


