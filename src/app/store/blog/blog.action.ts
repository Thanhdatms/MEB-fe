export enum Actions{
    GET_BLOGS = '[Blog] get all blog',
    CREATE_BLOG = '[Blog] create blog'
}
export namespace BlogAction {
    export class GetBlogs{
        static type = Actions.GET_BLOGS;
    }
    export class CreateBlog{
        static type = Actions.CREATE_BLOG;
        constructor(public payload: any){}
    }
}