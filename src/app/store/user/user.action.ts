export enum Actions {
  GET_ALL_USER = '[User] Get all user',
  GET_USER_BY_ID = '[User] Get user by id',
  GET_ME = '[User] get user',
  BOOKMARK = '[User] bookmark',
  UNBOOKMARK = '[User] unbookmark',
  IS_FOLLOW = '[User] is follow',
  IS_BOOKMARK = '[User] is bookmark',
  FOLLOW = '[User] follow',
  UNFOLLOW = '[User] unfollow',
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

  export class bookmark {
    static type = Actions.BOOKMARK;
    constructor(public payload: any) {}
  }
  export class unbookmark {
    static type = Actions.UNBOOKMARK;
    constructor(public payload: any) {}
  }

  export class isFollow {
    static type = Actions.IS_FOLLOW;
    constructor(public payload: any) {}
  }

  export class isBookmark {
    static type = Actions.IS_BOOKMARK;
    constructor(public payload: any) {}
  }

  export class follow {
    static type = Actions.FOLLOW;
    constructor(public payload: any) {}
  }

  export class unfollow {
    static type = Actions.UNFOLLOW;
    constructor(public payload: any) {}
  }
}
