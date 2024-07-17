import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import * as signalR from '@microsoft/signalr';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {
  public parties: any[] = [];

  private hubConnection: signalR.HubConnection;
  // public hubConnection:signalR.HubConnection = new signalR.HubConnectionBuilder()
  // .withUrl('https://localhost:7013/electionPartyHub') 
  // .build();
  private partiesList = new BehaviorSubject<any>(false);
  partiesList$ = this.partiesList.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7013/electionPartyHub') // Ensure this URL matches your SignalR hub endpoint
      .build();

    this.hubConnection.start()
    .then(()=> console.log("Connection started..."))
    .catch(err => console.error(err.toString()));
    
    this.hubConnection.on('Broadcast-Parties', (response: any) => {
      console.log(response);
      if(response.success){
        this.partiesList.next(response.body.data);
      }
    });

      this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllParties").subscribe((response:any) => {
          if(response.success){
            this.partiesList.next(response.body.data);
        }
      })
      
    
  }

  getAllParties():any {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllParties");
  }

  getAllVerifiedParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllVerifiedParties");
  }

  verifyParty(partyId: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/VerifyParty?partyid=${partyId}&verifiedby=${this.userService.getUserId()}`);
  }

  deleteParty(partyId: number): Observable<any> {
    return this.http.get(`https://localhost:7013/ElectionParty/DeleteParty?partyid=${partyId}&deletedby=${this.userService.getUserId()}`);
  }

  addNewParty(party: any): Observable<any> {
    party.append("createdBy", this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/AddNewParty`, party);
  }

  updateParty(party: any): Observable<any> {
    party.append("createdBy", this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/UpdateParty`, party);
  }
}
