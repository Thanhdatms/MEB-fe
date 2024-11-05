import { Component } from '@angular/core';
import Iconify from '@iconify/tailwind';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [BlogCardComponent, CommonModule],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.scss',
})
export class AdminManagementComponent {
  pendingBlogs$: Observable<Blog[]>;
  constructor(private store: Store) {
    this.pendingBlogs$ = this.store.select(BlogState.blogs);
  }
}
