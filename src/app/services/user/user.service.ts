import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userName = new BehaviorSubject<string>("");
  userName$ = this.userName.asObservable();
  private userRoleId = new BehaviorSubject<number>(0);
  userRoleId$ = this.userRoleId.asObservable();


  constructor(private http: HttpClient) { 
    if(this.getToken() != null){
      this.setUserData();
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/Account/Login?userName=${username}&password=${password}`)
    .pipe(
      tap((response: any) => {
        if (response.success) {
          this.setToken(response.body.loginToken);
          this.setUserData();
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  getUserProfile():Observable<any>{
    const decodedToken:any = jwtDecode(`${this.getToken()}`) as Object;
    return this.http.get(`${environment.apiBaseUrl}/Account/GetUserProfileDetails?userId=${decodedToken["employeeId"]}`);
  }

  setUserData():void{
    const decodedToken:any = jwtDecode(`${this.getToken()}`) as Object;
    this.userName.next(decodedToken["employeeName"]);
    this.userRoleId.next(Number(decodedToken["employeeRoleId"]));
  }

  getUserId():any{
    const decodedToken:any = jwtDecode(`${this.getToken()}`) as Object;
    return decodedToken["employeeId"];
  }

}
