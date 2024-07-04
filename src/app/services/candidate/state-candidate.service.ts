import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StateCandidateService {

  constructor(private http: HttpClient,private userService : UserService) {}

  
  addNewCandidate(candidate: any): Observable<any> {
    console.log("Add Candidate...");
    return this.http.post(`https://localhost:7013/Candidate/AddCandidate`, candidate);
  }

  getAllCandidates(electionId: any): Observable<any> {
    return this.http.get("https://localhost:7013/Candidate/GetAllCandidates?electionid="+ electionId);
  }

  getAllCandidatesOfAssembly(electionId:any,AssemblyId: any): Observable<any> {
    return this.http.get(`https://localhost:7013/Candidate/GetAllCandidatesOfAssembly?electionid=${electionId}&assemblyId=${AssemblyId}` );
  }

}
