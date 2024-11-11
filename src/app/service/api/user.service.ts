import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/users`;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getBookmarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks`);
  }

  bookmark(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookmarks/blog/${id}`, {});
  }

  unbookmark(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookmarks/blog/${id}`);
  }

  checkFollow(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/followers/user/${id}/is-following`);
  }

  checkBookmark(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookmarks/blog/${id}/is-bookmarked`);
  }

  follow(targetUserId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/followers/user`, { targetUserId });
  }

  unfollow(targetUserId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/followers/user`, {
      body: { targetUserId },
    });
  }
}
