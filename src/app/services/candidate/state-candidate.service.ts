import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StateCandidateService {

  constructor(private http: HttpClient,private userService : UserService) {}

  addNewCandidate(party: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    party.append("createdBy",this.userService.getUserId());
    return this.http.post(`https://localhost:7013/ElectionParty/AddNewParty`, party);
  }

  getAllCandidates(electionId: any): Observable<any> {
    return this.http.get("https://localhost:7013/Candidate/GetAllCandidates?electionid="+ electionId);
  }

  getAllCandidatesOfAssembly(electionId:any,AssemblyId: any): Observable<any> {
    return this.http.get(`https://localhost:7013/Candidate/GetAllCandidatesOfAssembly?electionid=${electionId}&assemblyId=${AssemblyId}` );
  }

}
