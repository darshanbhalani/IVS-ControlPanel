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
    return this.http.get<any>("https://localhost:7013/Election/GetAllStateElections");
  }

  getAllUpcommingElections():Observable<any> {
    return this.http.get<any>("https://localhost:7013/Election/GetUpcommingElections");
  }

  getAllLiveElections():Observable<any> {
    return this.http.get<any>("https://localhost:7013/Election/GetAllLiveElections");
  }

  getAllCompletedElections():Observable<any> {
    return this.http.get<any>("https://localhost:7013/Election/GetCompletedElections");
  }

  sheduleElection(stateId:any,electionDate:any) : Observable<any>{
    var data={
      "electionDate": electionDate,
      "stateId": stateId,
      "actionBy": this.userService.getUserId()
    };
    return this.http.post(`https://localhost:7013/Election/SheduleStateElection`,data);
  }
  
}
