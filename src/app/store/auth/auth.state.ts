import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../../../service/api.service';
import { tap } from 'rxjs';
import { AuthAction } from './auth.action';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface AuthStateModel {
  token: string;
  LoginStatus: boolean;
  RegisterStatus: boolean;
}
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: '',
    LoginStatus: false,
    RegisterStatus: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private apiService: ApiService,
    private msg: NzMessageService,
  ) {}

  @Selector()
  static token({ token }: AuthStateModel): string {
    return token;
  }

  @Selector()
  static LoginStatus({ LoginStatus }: AuthStateModel): boolean {
    return LoginStatus;
  }

  @Selector()
  static RegisterStatus({ RegisterStatus }: AuthStateModel): boolean {
    return RegisterStatus;
  }

  @Action(AuthAction.Login)
  Login(ctx: StateContext<AuthStateModel>, action: AuthAction.Login) {
    return this.apiService.auth.Login(action.payload).pipe(
      tap((response: any) => {
        if (response.code === 200) {
          return ctx.dispatch(new AuthAction.LoginSuccess(response));
        }
        return;
      }),
    );
  }

  @Action(AuthAction.LoginSuccess)
  LoginSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.LoginSuccess,
  ) {
    const token = action.payload.result;
    ctx.patchState({ token: token, LoginStatus: true });
    this.apiService.auth.setToken(token);
  }

  @Action(AuthAction.Register)
  Register(ctx: StateContext<AuthStateModel>, action: AuthAction.Register) {
    return this.apiService.auth.Register(action.payload).pipe(
      tap((response: any) => {
        if (response.code === 200) {
          return ctx.dispatch(new AuthAction.RegisterSuccess(response));
        }
        return;
      }),
    );
  }

  @Action(AuthAction.RegisterSuccess)
  RegisterSuccess(
    ctx: StateContext<AuthStateModel>,
    action: AuthAction.RegisterSuccess,
  ) {
    ctx.patchState({ RegisterStatus: true });
  }

  @Action(AuthAction.Logout)
  Logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ token: '', LoginStatus: false });
    return this.apiService.auth.Logout();
  }
}
