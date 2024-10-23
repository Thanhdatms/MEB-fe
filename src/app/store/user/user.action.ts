export enum Actions{
    GET_ALL_USER = '[User] Get all user',
}
export namespace UserAction {

    export class getAllUser{
        static type = Actions.GET_ALL_USER;
    
    }
}