import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl: string; 

  constructor(private http: HttpClient, @Inject(String) apiUrl: string) {
    this.apiUrl = `${apiUrl}/blogs`; // Append the specific endpoint
  }

  getBlogs(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  createBlog(blog: any): Observable<any> {
    return this.http.post(this.apiUrl, blog); 
  }
}
