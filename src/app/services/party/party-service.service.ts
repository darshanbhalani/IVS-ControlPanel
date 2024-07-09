import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {

  constructor(private http: HttpClient,private userService : UserService) {}

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

  addNewParty(party: any): Observable<any> {
    party.append("createdBy",this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/AddNewParty`, party);
  }

  editParty(party : any) : Observable<any>{
    
  }
}
