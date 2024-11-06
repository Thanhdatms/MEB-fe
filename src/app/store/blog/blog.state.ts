// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BlogAction } from './blog.action';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User, UserStateModel } from '../user/user.state';

export interface Blog {
  id: string;
  title: string;
  status: boolean;
  content: Text;
  tags: string[];
  summary: Text;
  thumbnail: string;
  createdAt: Date;
  user?: User;
}

export interface Status {
  status: boolean;
  code: number;
}

export interface BlogStateModel {
  blogs: Blog[];
  blog: Blog | null;
  userBlog: Blog[];
  status: Status;
}

@State<BlogStateModel>({
  name: 'blogs',
  defaults: {
    blogs: [],
    userBlog: [],
    blog: null,
    status: {
      status: false,
      code: 0,
    },
  },
})
@Injectable()
export class BlogState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static blogs({ blogs }: BlogStateModel): Blog[] {
    return blogs;
  }
  @Selector()
  static userBlog({ userBlog }: BlogStateModel): Blog[] {
    return userBlog;
  }
  @Selector()
  static status({ status }: BlogStateModel): Status {
    return status;
  }
  @Selector()
  static blog({ blog }: BlogStateModel) {
    return blog;
  }

  @Action(BlogAction.GetBlogs)
  getBlogs(ctx: StateContext<BlogStateModel>) {
    this.apiService.blog
      .getBlogs()
      .pipe(
        tap((response: any) => {
          const blogs: Blog[] = response.result;
          ctx.patchState({ blogs: blogs, status: { status: false, code: 0 } });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.CreateBlog)
  createBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.CreateBlog) {
    return this.apiService.blog
      .createBlog(action.payload)
      .pipe(
        tap((response) => {
          if (response.code === 200) {
            ctx.patchState({ status: { status: true, code: 200 } });
          } else {
            ctx.patchState({ status: { status: false, code: response.code } });
          }
          return ctx.dispatch(new BlogAction.GetBlogs());
        }),
        catchError((error) => {
          return throwError(error);
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetBlogById)
  getBlogById(
    ctx: StateContext<BlogStateModel>,
    action: BlogAction.GetBlogById,
  ) {
    this.apiService.blog
      .getBlogById(action.payload)
      .pipe(
        tap((response: any) => {
          ctx.patchState({ blog: response.result });
        }),
      )
      .subscribe();
  }

  @Action(BlogAction.GetBlogByUser)
  getBlogbyUser(
    ctx: StateContext<BlogStateModel>,
    action: BlogAction.GetBlogByUser,
  ) {
    this.apiService.blog
      .getBlogByUser(action.payload)
      .pipe(
        tap((response: any) => {
          ctx.patchState({
            userBlog: response.result.blogs.map((blog: Blog) => ({
              id: blog.id,
              title: blog.title,
              status: blog.status,
              content: blog.content,
              tags: blog.tags,
              summary: blog.summary,
              thumbnail: blog.thumbnail,
              createdAt: blog.createdAt,
              user: {
                id: response.result.id,
                username: response.result.username,
              },
            })),
          });
        }),
      )
      .subscribe();
  }
}
