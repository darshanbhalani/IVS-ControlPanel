import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  constructor(private http: HttpClient) {}

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/State/GetAllStates`);
  }

  getAllAssemblyByState(stateId:any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/Assembly/GetAllAssemblyByState?stateid=${stateId}`);
  }

  getAllAssemblyByDistrict(districtId:any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Assembly/GetAllAssemblyByDistrict?districtid=${districtId}`);
  }

  getAllDistricts(stateId:any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/District/GetAllDistricts?stateid=${stateId}`);
  }
}
