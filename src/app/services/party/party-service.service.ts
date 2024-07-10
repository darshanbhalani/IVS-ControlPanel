import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

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

  verifyParty(partyid: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/VefifyParty?partyid=${partyid}&verifiedby=${this.userService.getUserId()}`);
  }

  deleteParty(partyid: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/DeleteParty?partyid=${partyid}&deletedby=${this.userService.getUserId()}`);
  }

  addNewParty(party: any): Observable<any> {
    party.append("createdBy",this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/AddNewParty`, party);
  }

  updateParty(party : any) : Observable<any>{
    party.append("createdBy",this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/UpdateParty`, party);
  }
}
