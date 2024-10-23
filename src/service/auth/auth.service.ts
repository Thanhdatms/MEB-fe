import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string; 

  constructor(private http: HttpClient, @Inject(String) apiUrl: string) {
    this.apiUrl = `${apiUrl}`; 
  }


  Login(info: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, info); 
  }
  Register(info: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, info);
  }

}

