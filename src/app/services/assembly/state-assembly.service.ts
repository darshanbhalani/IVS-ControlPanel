import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateAssemblyService {

  constructor(private http: HttpClient) {}
  
  getAllAssemblyByDistrict(districtId:any): Observable<any> {
    return this.http.get("https://localhost:7013/Assembly/GetAllAssemblyByDistrict?districtid="+districtId);
  }

  getAllAssemblyByState(stateId: any): Observable<any> {
    return this.http.get("https://localhost:7013/Assembly/GetAllAssemblyByState?stateid="+stateId);
  }

}
