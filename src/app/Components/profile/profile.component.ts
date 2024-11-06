import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../UI/side-bar/side-bar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserAction } from '../../store/user/user.action';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, SideBarComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  // user$: Observable<any>;
  userId: string = '';
  userName: string | null = null;
  userBlog$: Observable<Blog[]>;
  isProfile: boolean = false;
  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
  ) {
    this.userBlog$ = this._store.select(BlogState.userBlog);
    this.userBlog$.subscribe((blogs) => {
      this.userName = blogs[0]?.user?.username ?? null;
    });
    _route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._store.dispatch(new BlogAction.GetBlogByUser(id));
      } else {
        this.userId = localStorage.getItem('userId') || '';
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userId));
      }
    });
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.isProfile = data['isProfile'];
    });
  }
}
