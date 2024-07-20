import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { process } from '@progress/kendo-data-query';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import * as signalR from '@microsoft/signalr';
import { response } from 'express';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateCandidateService {

  private candidates = [];
  private hubConnection: signalR.HubConnection;
  private candidateList = new BehaviorSubject<any>(false);
  candidateList$ = this.candidateList.asObservable();
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
      .withUrl(environment.hubUrl)
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log("Connection started...");
      })
      .catch(err => console.error(err.toString()));
  }

  private subscribeHub(electionId: any) {
    this.hubConnection.on(`Broadcast-Candidates-${electionId}`, (response: any) => {
      if (response.success) {
        console.log(response);
        this.total.next(response.body.data.length);
        this.verified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "verified").length);
        this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "unverified").length);
        this.rejected.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "rejected").length);
        this.candidateList.next(response.body.data);
        this.candidates = response.body.data;
      }
    });
    console.log(this.hubConnection.state);
  }

  filter(data: any) {
    this.filteredList.next(process(this.candidates, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "name",
            operator: "contains",
            value: data,
          },
          {
            field: "gender",
            operator: "contains",
            value: data,
          },
          {
            field: "partyName",
            operator: "contains",
            value: data,
          }, {
            field: "assemblyName",
            operator: "contains",
            value: data,
          }
        ],
      },
    }).data);
  }
  showVerifiedCandidates() {
    this.filteredList.next(process(this.candidates, {
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

  showUnverifiedCandidates() {
    this.filteredList.next(process(this.candidates, {
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

  showRejectedCandidates() {
    this.filteredList.next(process(this.candidates, {
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


  addNewCandidate(candidate: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/Candidate/AddCandidate`, candidate);
  }

  getAllCandidates(electionId: string) {
    this.subscribeHub(electionId);
    this.http.get(`${environment.apiBaseUrl}/Candidate/GetAllCandidates?electionid=` + electionId).subscribe(
      (response: any) => {
        if (response.success) {
          this.total.next(response.body.data.length);
          this.verified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "verified").length);
          this.unverified.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "unverified").length);
          this.rejected.next(response.body.data.filter((item: any) => item.verificationStatus.toLocaleLowerCase() === "rejected").length);
          this.candidateList.next(response.body.data);
          this.candidates = response.body.data;
        }
      }
    );
  }

  getAllCandidatesOfAssembly(electionId: any, AssemblyId: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Candidate/GetAllCandidatesOfAssembly?electionid=${electionId}&assemblyId=${AssemblyId}`);
  }

  updateCandidateDetails() {
  }

  deleteCandidate(candidateId: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Candidate/DeleteCandidate?candidateId=${candidateId}&deletedBy=${this.userService.getUserId()}`);
  }

  verifyCandidate(candidateId: any, electionId: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Candidate/VerifyCandidate?candidateId=${candidateId}&verifiedBy=${this.userService.getUserId()}&electionId=${1}`);
  }
}
