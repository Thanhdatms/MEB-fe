import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { UserState } from '../../../store/user/user.state';
import { UserAction } from '../../../store/user/user.action';

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
  existingBlog?: Blog;

  isLogin = false;
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  searching = false;
  userName: string | null = null;

  navbarItems = [
    { icon: 'bell', path: '/noti' },
    { icon: 'user', path: '/account' },
  ];

  constructor(
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
    if (token) {
      setTimeout(() => {
        this.userName = localStorage.getItem('name') || '';
      }, 1000);
      this.isLogin = true;
    }
  }

  openCreatePopup() {
    this.isCreatePopupVisible = true;
  }
  closeCreatePopup() {
    this.isCreatePopupVisible = false;
    this.existingBlog = undefined;
  }

  onEditBlog(blog: Blog) {
    this.existingBlog = blog;
    this.openCreatePopup();
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
    localStorage.clear();
  }

  selectBlog(blog: Blog) {
    this.router.navigate(['/blog', blog.id]);
    this.searchTerm = '';
  }
}
