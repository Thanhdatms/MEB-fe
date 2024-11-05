import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl: string;
  private userApiUrl: string;
  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/blogs`;
    this.userApiUrl = apiUrl;
  }

  getBlogs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createBlog(blog: any): Observable<any> {
    return this.http.post(this.apiUrl, blog);
  }

  getBlogById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getBlogByUser(id: any): Observable<any> {
    return this.http.get(`${this.userApiUrl}/users/${id}/blogs`);
  }
}
