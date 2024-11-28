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
import { NzMessageService } from 'ng-zorro-antd/message';

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
  userBlogId: string = '';
  userNameTag: string = '';
  userProfile$: Observable<User>;
  isFollow$: Observable<boolean>;
  user$: Observable<User>;
  isFollowing: boolean = false;
  followers: number = 0;
  following: number = 0;
  posts: number = 0;
  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _msg: NzMessageService,
  ) {
    this.userProfile$ = this._store.select(UserState.userProfile);
    this.userBlog$ = this._store.select(BlogState.userBlog);
    this.user$ = this._store.select(UserState.userProfile);
    this.isFollow$ = this._store.select(UserState.isFollow);
    _route.paramMap.subscribe((params) => {
      const nametag = params.get('nametag');
      if (nametag) {
        const payload = {
          nameTag: nametag,
          type: 'profile',
        };
        this._store.dispatch(new UserAction.getUserbyNameTag(payload));

        if (this.userBlogId)
          this._store.dispatch(new UserAction.isFollow(this.userBlogId));
      } else {
        this.userId = localStorage.getItem('userId') || '';
        const payload = {
          nameTag: localStorage.getItem('nameTag'),
          type: 'profile',
        };
        this._store.dispatch(new UserAction.getUserbyNameTag(payload));
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userId));
        // this._store.dispatch(new UserStatsAction.getUserStats(this.userId));
      }
    });
    this.userProfile$.subscribe((response) => {
      this.userBlogId = response.id;
      this.userName = response.username;
      this.userAvt = response.avatar;
      this.userNameTag = response.nameTag;
      this.userBio = response.bio;
      if (this.userBlogId) {
        this._store.dispatch(new BlogAction.GetBlogByUser(this.userBlogId));
        this._store.dispatch(new UserStatsAction.getUserStats(this.userBlogId));
      }
    });

    this._store.select(UserStatsState.userStats).subscribe((stats) => {
      this.followers = stats.followers;
      this.following = stats.following;
      this.posts = stats.posts;
    });
    this.isFollow$.subscribe((response) => {
      this.isFollowing = response;
      if (this.userBlogId) {
        this._store.dispatch(new UserStatsAction.getUserStats(this.userBlogId));
      }
    });
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.isProfile = data['isProfile'];
    });
  }
  onFollow() {
    if (!this.CheckLogin()) return;
    if (this.isFollowing) {
      this._store.dispatch(new UserAction.unfollow(this.userBlogId));
    } else {
      this._store.dispatch(new UserAction.follow(this.userBlogId));
    }
  }
  CheckLogin(): boolean {
    if (!localStorage.getItem('userId')) {
      this._msg.info('Please login to do action');
      return false;
    }
    return true;
  }
}
