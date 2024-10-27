import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { UserAction } from './user.action';
import { tap } from 'rxjs';

export interface UserStateModel {
  users: any[];
  status: boolean;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    status: false,
  },
})
@Injectable()
export class UserState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static users({ users }: UserStateModel): any {
    return users;
  }

  @Selector()
  static status({ status }: UserStateModel): boolean {
    return status;
  }

  @Selector()
  static getUserById({ users }: UserStateModel) {
    return (id: string) => users.find((user) => user.id === id);
  }
}
