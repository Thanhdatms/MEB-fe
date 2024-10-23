export enum Actions{
    LOGIN = '[Auth] login',
    REGISTER = '[Auth] register',
}
export namespace AuthAction {

    export class Login{
        static type = Actions.LOGIN;
        constructor(public payload: any){}
    }
    export class Register{
        static type = Actions.REGISTER;
        constructor(public payload: any){}
    }
}