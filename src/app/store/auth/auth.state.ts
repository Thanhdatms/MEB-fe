import { Injectable } from "@angular/core";
import {  Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../../service/api.service";
import { tap } from "rxjs";
import { AuthAction } from "./auth.action";

export interface AuthStateModel {
    token: string;
    // status: boolean;
}
@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: '',
        // status: false
    }
})
@Injectable()
export class AuthState {
    constructor(
        private apiService: ApiService
    ) {}

    @Selector()
    static token(state: AuthStateModel): string {
        return state.token;
    }


    @Action(AuthAction.Login)
    Login(ctx: StateContext<AuthStateModel>, action: AuthAction.Login) {
        return this.apiService.auth.Login(action.payload).pipe(
            tap((response: any) => {
                if(response.status === 200) {
                    ctx.patchState({ token: response.token });
                }
            })
        )
    }

    @Action(AuthAction.Register)
    Register(ctx: StateContext<AuthStateModel>, action: AuthAction.Register) {
        return this.apiService.auth.Register(action.payload).pipe(
            tap((response: any) => {
                if(response.status === 200) {
                    // ctx.patchState({ token: response.token });
                }
            })
        )
    }
}