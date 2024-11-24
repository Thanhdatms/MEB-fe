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

  updateBlog(id: any, blog: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, blog);
  }

  getBlogById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getBlogByUser(id: any): Observable<any> {
    return this.http.get(`${this.userApiUrl}/users/${id}/blogs`);
  }

  getBlogVote(blogId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${blogId}/user/is-voted`);
  }

  voteBlog(blogId: any, voteType: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${blogId}/user/votes?voteType=${voteType}`,
      {},
    );
  }

  unvoteBlog(blogId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${blogId}/user/votes`);
  }
}
