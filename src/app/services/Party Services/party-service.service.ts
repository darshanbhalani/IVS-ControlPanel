import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {

  constructor(private http: HttpClient) {}

  GetAllParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllParties");
  }

  GetAllVerifiedParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllVerifiedParties");
  }
}
