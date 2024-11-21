import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/tags`;
  }

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createTags(tags: any): Observable<any> {
    return this.http.post(this.apiUrl, tags);
  }
  getBlogbyTag(tags: string[], tagid: string): Observable<any> {
    const body = { tags };

    // Use Angular's HttpClient to send a GET request with the body
    return this.http.request('GET', `${this.apiUrl}/blogs/${tagid}`, {
      body: body,
    });
  }
}
