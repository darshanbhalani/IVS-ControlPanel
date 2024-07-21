import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { process } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class StateElectionService {

  public elections: any[] = [];

  private hubConnection: signalR.HubConnection;
  private electionList = new BehaviorSubject<any>(false);
  electionList$ = this.electionList.asObservable();
  private filteredList = new BehaviorSubject<any>(false);
  filteredList$ = this.filteredList.asObservable();
  private total = new BehaviorSubject<any>(0);
  total$ = this.total.asObservable();
  private verified = new BehaviorSubject<any>(0);
  verified$ = this.verified.asObservable();
  private unverified = new BehaviorSubject<any>(0);
  unverified$ = this.unverified.asObservable();
  private locked = new BehaviorSubject<any>(0);
  locked$ = this.locked.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .build();

    this.hubConnection.start()
      .then(() => console.log("Connection started..."))
      .catch(err => console.error(err.toString()));

    this.hubConnection.on('Broadcast-StateElections', (response: any) => {
      console.log(response);
      if (response.success) {
        this.total.next(response.body.data.length);
        this.verified.next(response.body.data.filter((item: any) => item.verificationStatus == 2).length);
        this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus == 1).length);
        this.locked.next(response.body.data.filter((item: any) => item.verificationStatus == 3).length);
        this.electionList.next(response.body.data);
        this.elections = response.body.data;
        this.filteredList.next(response.body.data);
      }
    });
  }

  getAllElections() {
    this.http.get<any>(`${environment.apiBaseUrl}/Election/GetAllStateElections`).subscribe(
      (response:any) => {
        this.total.next(response.body.data.length);
        this.verified.next(response.body.data.filter((item: any) => item.verificationStatus == 2).length);
        this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus == 1).length);
        this.locked.next(response.body.data.filter((item: any) => item.verificationStatus == 3).length);
        this.electionList.next(response.body.data);
        this.elections = response.body.data;
      });
  }

  getAllUpcommingElections():Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Election/GetUpcommingElections`);
  }

  getAllLiveElections():Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Election/GetAllLiveElections`);
  }

  getAllCompletedElections():Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Election/GetCompletedElections`);
  }

  sheduleElection(stateId:any,electionDate:any) : Observable<any>{
    var data={
      "electionDate": electionDate,
      "stateId": stateId,
      "actionBy": this.userService.getUserId()
    };
    return this.http.post(`${environment.apiBaseUrl}/Election/SheduleStateElection`,data);
  }
  
  showVerifiedElections(){
    this.filteredList.next(process(this.elections, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "verificationStatus",
            operator: "eq",
            value: 2,
          }
        ],
      },
    }).data);
  }

  showUnverifiedElections(){
    this.filteredList.next(process(this.elections, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "verificationStatus",
            operator: "eq",
            value: 1,
          }
        ],
      },
    }).data);
  }

  showLockedElections(){
    this.filteredList.next(process(this.elections, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "lock",
            operator: "eq",
            value: 'true',
          }
        ],
      },
    }).data);
  }
}
