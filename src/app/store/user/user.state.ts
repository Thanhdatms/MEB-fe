import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "../../../service/api.service";
import { UserAction } from "./user.action";
import { tap } from "rxjs";

export interface UserStateModel {
    users: any[];
    status: boolean;
}
@State<UserStateModel>({
    name: 'user',
    defaults: {
        users: [],
        status: false
    }
})
@Injectable()
export class UserState {
    constructor(
        private apiService: ApiService
    ) {}

    @Selector()
    static users(state: UserStateModel): any {
        return state.users;
    }


    @Action(UserAction.getAllUser)
    Login(ctx: StateContext<UserStateModel>, action: any) {
        return this.apiService.user.getUsers().pipe(
            tap((response: any) => {
                console.log(action.payload);
                if(response.status === 200) {
                    ctx.patchState({ users: response.users, status: true });
                }
            })
        )
    
    }
}