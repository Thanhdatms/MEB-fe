// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BlogAction } from './blog.action';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export interface Blog {
  id: string;
  title: string;
  status: boolean;
  content: Text;
  tags: string[];
  summary: Text;
  thumbnail: string;
}

export interface BlogStateModel {
  blogs: Blog[];
  blog: Blog | null;
  status: boolean;
}

@State<BlogStateModel>({
  name: 'blogs',
  defaults: {
    blogs: [],
    blog: null,
    status: false,
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
  static status({ status }: BlogStateModel): boolean {
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
          ctx.patchState({ blogs });
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
          console.log(response);
          if (response.code === 200) {
            ctx.patchState({ status: true });
            console.log('patched');
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
}
