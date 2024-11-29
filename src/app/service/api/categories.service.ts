import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl: string;
  private httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,
  ) {
    this.apiUrl = `${apiUrl}/categories`;
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions);
  }

  createCategory(tags: any): Observable<any> {
    return this.http.post(this.apiUrl, tags, this.httpOptions);
  }

  getBlogbyCategory(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
