import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import * as signalR from '@microsoft/signalr';
import { response } from 'express';
import { process } from '@progress/kendo-data-query';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyServiceService {
  public parties: any[] = [];

  private hubConnection: signalR.HubConnection;
  private partiesList = new BehaviorSubject<any>(false);
  partiesList$ = this.partiesList.asObservable();
  private filteredList = new BehaviorSubject<any>(false);
  filteredList$ = this.filteredList.asObservable();
  private total = new BehaviorSubject<any>(0);
  total$ = this.total.asObservable();
  private verified = new BehaviorSubject<any>(0);
  verified$ = this.verified.asObservable();
  private unverified = new BehaviorSubject<any>(0);
  unverified$ = this.unverified.asObservable();
  private rejected = new BehaviorSubject<any>(0);
  rejected$ = this.rejected.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7013/electionPartyHub')
      .build();

    this.hubConnection.start()
      .then(() => console.log("Connection started..."))
      .catch(err => console.error(err.toString()));

    this.hubConnection.on('Broadcast-Parties', (response: any) => {
      console.log(response);
      if (response.success) {
        this.total.next(response.body.data.length);
        this.verified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "verified").length);
        this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "unverified").length);
        this.rejected.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "rejected").length);
        console.log(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "rejected").length);
        this.partiesList.next(response.body.data);
        this.parties = response.body.data;
      }
    });
  }

  filter(data:any){
    this.filteredList.next(process(this.parties, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "electionPartyName",
            operator: "contains",
            value: data,
          }
        ],
      },
    }).data);
  }
  showVerifiedParties(){
    this.filteredList.next(process(this.parties, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "verificationStatus",
            operator: "eq",
            value: 'Verified',
          }
        ],
      },
    }).data);
  }

  showUnverifiedParties(){
    this.filteredList.next(process(this.parties, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "verificationStatus",
            operator: "eq",
            value: 'Unverified',
          }
        ],
      },
    }).data);
  }

  showRejectedParties(){
    this.filteredList.next(process(this.parties, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "verificationStatus",
            operator: "eq",
            value: 'Rejected',
          }
        ],
      },
    }).data);
  }

  getAllParties(): any {
    this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllParties").subscribe(
      (response: any) => {
        if (response.success) {
          this.total.next(response.body.data.length);
          this.verified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "verified").length);
          this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "unverified").length);
          this.rejected.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "rejected").length);
          this.partiesList.next(response.body.data);
          this.parties = response.body.data;
        }
      }
    );
  }

  getAllVerifiedParties(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/ElectionParty/GetAllVerifiedParties");
  }

  verifyParty(partyId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/ElectionParty/VerifyParty?partyid=${partyId}&verifiedby=${this.userService.getUserId()}`);
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
