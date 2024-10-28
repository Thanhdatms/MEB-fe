import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ApiService } from '../../../service/api.service';
import { Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import { CreateBlogComponent } from '../../../UI/createBlog/create-blog/create-blog.component';
import { AuthAction } from '../../../store/auth/auth.action';
import { Observable, combineLatest, map } from 'rxjs';
import { AuthState } from '../../../store/auth/auth.state';
import { CookieService } from 'ngx-cookie-service';
import { Blog, BlogState } from '../../../store/blog/blog.state';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzDropDownModule,
    CreateBlogComponent,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent {
  isCreatePopupVisible = false;

  isLogin = false;
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  searching = false;

  navbarItems = [
    { icon: 'bell', path: '/noti' },
    { icon: 'user', path: '/account' },
  ];

  constructor(
    private apiService: ApiService,
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.store.select(BlogState.blogs).subscribe((blogs) => {
      this.blogs = blogs;
      this.filteredBlogs = blogs;
    });
    this.store.dispatch(new BlogAction.GetBlogs());
    const token = this.cookieService.get('authToken');
    if (token) this.isLogin = true;
  }

  openCreatePopup() {
    this.isCreatePopupVisible = true;
  }
  closeCreatePopup() {
    this.isCreatePopupVisible = false;
  }

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.filteredBlogs = this.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
    this.router.navigate(['/auth']);
  }

  selectBlog(blog: Blog) {
    this.router.navigate(['/blog', blog.id]);
    this.searchTerm = '';
  }
}
