import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { UserAction } from './user.action';
import { tap } from 'rxjs';

export interface User {
  id: string;
  username: string;
}

export interface UserStateModel {
  user: User;
  status: boolean;
  isFollow: boolean;
  isBookmark: boolean;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: {
      id: '',
      username: '',
    },
    status: false,
    isFollow: false,
    isBookmark: false,
  },
})
@Injectable()
export class UserState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static user({ user }: UserStateModel): any {
    return user;
  }

  @Selector()
  static status({ status }: UserStateModel): boolean {
    return status;
  }

  @Selector()
  static isFollow({ isFollow }: UserStateModel): boolean {
    return isFollow;
  }

  @Selector()
  static isBookmark({ isBookmark }: UserStateModel): boolean {
    return isBookmark;
  }

  @Action(UserAction.getMe)
  getMe(ctx: StateContext<UserStateModel>) {
    return this.apiService.user.getMe().pipe(
      tap((response) => {
        const user = response.result;
        ctx.patchState({ user: user });
      }),
    );
  }
  @Action(UserAction.getUserById)
  getUserbyId(
    ctx: StateContext<UserStateModel>,
    action: UserAction.getUserById,
  ) {
    return this.apiService.user.getUserById(action.payload).pipe(
      tap((response) => {
        console.log(response);
      }),
    );
  }

  @Action(UserAction.bookmark)
  bookmark(ctx: StateContext<UserStateModel>, action: UserAction.bookmark) {
    return this.apiService.user.bookmark(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isBookmark: true });
        }
      }),
    );
  }

  @Action(UserAction.unbookmark)
  unbookmark(ctx: StateContext<UserStateModel>, action: UserAction.unbookmark) {
    return this.apiService.user.unbookmark(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isBookmark: false });
        }
      }),
    );
  }

  @Action(UserAction.isFollow)
  isFollow(ctx: StateContext<UserStateModel>, action: UserAction.isFollow) {
    return this.apiService.user.checkFollow(action.payload).pipe(
      tap((response) => {
        ctx.patchState({ isFollow: response.result });
      }),
    );
  }

  @Action(UserAction.isBookmark)
  isBookmark(ctx: StateContext<UserStateModel>, action: UserAction.isBookmark) {
    return this.apiService.user.checkBookmark(action.payload).pipe(
      tap((response) => {
        ctx.patchState({ isBookmark: response.result });
      }),
    );
  }

  @Action(UserAction.follow)
  follow(ctx: StateContext<UserStateModel>, action: UserAction.follow) {
    return this.apiService.user.follow(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isFollow: true });
        }
      }),
    );
  }

  @Action(UserAction.unfollow)
  unfollow(ctx: StateContext<UserStateModel>, action: UserAction.unfollow) {
    return this.apiService.user.unfollow(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ isFollow: false });
        }
      }),
    );
  }
}
