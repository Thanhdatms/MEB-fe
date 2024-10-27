import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string; 

  constructor(private http: HttpClient, @Inject(String) apiUrl: string) {
    this.apiUrl = `${apiUrl}/users`; 
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }
}

