export enum Actions {
  GET_ALL_USER = '[User] Get all user',
  GET_USER_BY_ID = '[User] Get user by id',
  GET_ME = '[User] get user',
}
export namespace UserAction {
  export class getAllUser {
    static type = Actions.GET_ALL_USER;
  }
  export class getUserById {
    static type = Actions.GET_USER_BY_ID;
    constructor(public payload: any) {}
  }

  export class getMe {
    static type = Actions.GET_ME;
  }
}
