import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateElectionService {

  constructor(private http: HttpClient,private userService : UserService) {}


  getAllElections():Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Election/GetAllStateElections`);
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
  
}
