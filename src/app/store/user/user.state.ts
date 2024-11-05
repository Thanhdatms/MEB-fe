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
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: {
      id: '',
      username: '',
    },
    status: false,
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
        // const user = response.result;
        // ctx.patchState({ user: user });
      }),
    );
  }
}
