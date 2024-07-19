import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateAssemblyService {

  constructor(private http: HttpClient) {}
  
  getAllAssemblyByDistrict(districtId:any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Assembly/GetAllAssemblyByDistrict?districtid=`+districtId);
  }

  getAllAssemblyByState(stateId: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Assembly/GetAllAssemblyByState?stateid=`+stateId);
  }

}
