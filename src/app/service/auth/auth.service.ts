import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  router = inject(Router);

  constructor(
    private http: HttpClient,
    @Inject(String) apiUrl: string,

    private cookieService: CookieService,
  ) {
    this.apiUrl = `${apiUrl}`;
  }

  Login(info: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, info);
  }
  Register(info: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, info);
  }

  setToken(token: string) {
    this.cookieService.set('authToken', token, 7, '/', '', true, 'Strict');
  }

  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  Logout() {
    this.cookieService.delete('authToken', '/');
    localStorage.setItem('name', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('avatar', '');
    localStorage.setItem('nameTag', '');
    localStorage.setItem('bio', '');
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
