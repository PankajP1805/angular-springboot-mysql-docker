import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private apiUrl = 'http://localhost:8080/api/state';

  constructor(private http: HttpClient) { }

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addState(state: any): Observable<any> {
    return this.http.post(this.apiUrl, state);
  }

  updateState(stateId: number, state: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${stateId}`, state);
  }

  deleteState(stateId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${stateId}`, { observe: 'response' });
  }

  loadStates(countryId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${countryId}`);
  }

  getStatesWithCityCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/city-count`);
  }
  loadCountry(stateId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/load-country/${stateId}`);
  }
}
