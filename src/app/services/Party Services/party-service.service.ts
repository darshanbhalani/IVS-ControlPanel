import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {

  constructor(private http: HttpClient) {}

  getAllParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllParties");
  }

  getAllVerifiedParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllVerifiedParties");
  }

  verifyParty(partyid: number, actionby: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/VefifyParty?partyid=${partyid}&verifiedby=${actionby}`);
  }

  deleteParty(partyid: number, actionby: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/VefifyParty?partyid=${partyid}&verifiedby=${actionby}`);
  }

  addParty(partyid: number, actionby: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/VefifyParty?partyid=${partyid}&verifiedby=${actionby}`);
  }
}
