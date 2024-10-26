import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from './api/blog.service';
import { TagsService } from './api/tags.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './api/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  public blog: BlogService;
  public tags: TagsService;
  public auth: AuthService;
  public user: UserService;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.blog = new BlogService(http, this.apiUrl);
    this.tags = new TagsService(http, this.apiUrl);
    this.auth = new AuthService(http, this.apiUrl, cookieService);
    this.user = new UserService(http, this.apiUrl);
  }
}
