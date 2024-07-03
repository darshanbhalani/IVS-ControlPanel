import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  constructor(private http: HttpClient) {}

  getAllStates(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/State/GetAllStates");
  }

  getAllAssemblyByState(stateid:any): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7013/Assembly/GetAllAssemblyByState?stateid="+stateid);
  }

  getAllAssemblyByDistrict(districtId:any): Observable<any> {
    return this.http.get("https://localhost:7013/Assembly/GetAllAssemblyByDistrict?districtid="+districtId);
  }

  getAllDistricts(stateId:any): Observable<any> {
    return this.http.get("https://localhost:7013/District/GetAllDistricts?stateid="+stateId);
  }
}
