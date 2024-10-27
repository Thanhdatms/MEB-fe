export enum Actions {
  GET_BLOGS = '[Blog] get all blog',
  CREATE_BLOG = '[Blog] create blog',
  GET_BLOG_BY_ID = '[Blog] get blog by id',
}
export namespace BlogAction {
  export class GetBlogs {
    static type = Actions.GET_BLOGS;
  }
  export class CreateBlog {
    static type = Actions.CREATE_BLOG;
    constructor(public payload: any) {}
  }
  export class GetBlogById {
    static type = Actions.GET_BLOG_BY_ID;
    constructor(public payload: any) {}
  }
}
