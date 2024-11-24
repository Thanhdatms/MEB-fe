import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../UI/side-bar/side-bar.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { User, UserState } from '../../store/user/user.state';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserAction } from '../../store/user/user.action';
import { UserStats, UserStatsAction, UserStatsState } from '../../store';

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
  userBio: string = '';
  userAvt: string = '';
  userNameTag: string = '';
  userProfile$: Observable<User>;
  followers: number = 0;
  following: number = 0;
  posts: number = 0;
  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
  ) {
    this.userProfile$ = this._store.select(UserState.userProfile);
    this.userBlog$ = this._store.select(BlogState.userBlog);
    _route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._store.dispatch(new BlogAction.GetBlogByUser(id));
      } else {
        this.userId = localStorage.getItem('userId') || '';
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userId));
      }
    });
    this.userProfile$.subscribe((response) => {
      this.userName = response.username || localStorage.getItem('name') || '';
      this.userAvt = response.avatar || localStorage.getItem('avatar') || '';
      this.userNameTag =
        response.nameTag || localStorage.getItem('nameTag') || '';
      this.userBio = response.bio || localStorage.getItem('bio') || '';
    });
    this._store.dispatch(new UserStatsAction.getUserStats(this.userId));
    this._store.select(UserStatsState.userStats).subscribe((stats) => {
      this.followers = stats.followers;
      this.following = stats.following;
      this.posts = stats.pots;
    });
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.isProfile = data['isProfile'];
    });
  }
}
