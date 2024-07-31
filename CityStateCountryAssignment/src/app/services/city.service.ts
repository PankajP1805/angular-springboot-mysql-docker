import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'http://localhost:8080/api/city';

  constructor(private http: HttpClient) { }

  getCities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCity(city: any): Observable<any> {
    return this.http.post(this.apiUrl, city);
  }

  updateCity(cityId: number, city: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cityId}`, city);
  }

  deleteCity(cityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cityId}`);
  }
}
