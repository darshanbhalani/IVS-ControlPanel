import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {

  constructor(private http: HttpClient) {}

  GetAllStates(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/State/GetAllStates");
  }

  GetAllAssemblyByState(stateid:any): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Assembly/GetAllAssemblyByState?stateid="+stateid);
  }
}
