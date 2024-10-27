export enum Actions {
  GET_ALL_USER = '[User] Get all user',
  GET_USER_BY_ID = '[User] Get user by id',
}
export namespace UserAction {
  export class getAllUser {
    static type = Actions.GET_ALL_USER;
  }
  export class getUserById {
    static type = Actions.GET_USER_BY_ID;
    constructor(public payload: any) {}
  }
}
