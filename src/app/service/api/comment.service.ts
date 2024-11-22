import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/blogs`;
  }

  getComment(blogId: string, page: number, size: number): Observable<any> {
    // Use Angular's HttpClient to send a GET request with the body
    return this.http.get(
      `${this.apiUrl}/${blogId}/comments?page=${page}&size=${size}`,
    );
  }
  createComment(blogId: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${blogId}/comments`, {
      content: content,
    });
  }

  updateComment(
    blogId: string,
    commentId: string,
    content: string,
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${blogId}/comments/${commentId}`, {
      content: content,
    });
  }
  deleteComment(blogId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${blogId}/comments/${commentId}`);
  }
}
