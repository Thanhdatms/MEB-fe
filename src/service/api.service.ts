// src/service/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getBlog(): Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs`); 
  }
  createBlog(blog: any): Observable<any> {
    console.log('blg', blog);
    return this.http.post(`${this.apiUrl}/blogs`, blog); 
  }
}