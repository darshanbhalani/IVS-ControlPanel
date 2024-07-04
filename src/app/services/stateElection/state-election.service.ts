import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StateElectionService {

  constructor(private http: HttpClient,private userService : UserService) {}

  sheduleElection(){}

  getAllElections():Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Election/GetAllStateElections");
  }

  getAllUpcommingElections():Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Election/GetUpcommingElections");
  }

  getAllLiveElections():Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Election/GetAllLiveElections");
  }

  getAllCompletedElections():Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Election/GetCompletedElections");
  }

  
}
