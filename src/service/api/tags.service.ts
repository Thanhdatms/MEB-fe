import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl: string; 

  constructor(private http: HttpClient, @Inject(String) apiUrl: string) {
    this.apiUrl = `${apiUrl}/tags`; 
  }

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }
  createTags(tags: any): Observable<any> {
    return this.http.post(this.apiUrl, tags); 
  }
  getBlogbyTag(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs/${id}`); 
  }
}

