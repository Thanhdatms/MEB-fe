// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Blog } from '../blog/blog.state';
import { TagsAction } from './tags.actions';

export interface Tags {
  id: string;
  name: string;
  description: string;
  blogs: Blog[];
}

export interface TagsStateModel {
  tags: Tags[];
  status: boolean;
  blogByTag: Blog[];
}

@State<TagsStateModel>({
  name: 'Tags',
  defaults: {
    tags: [],
    status: false,
    blogByTag: [],
  },
})
@Injectable()
export class TagsState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static tags({ tags }: TagsStateModel): Tags[] {
    return tags || [];
  }
  @Selector()
  static status({ status }: TagsStateModel): boolean {
    return status;
  }
  @Selector()
  static getBlogByTag({ blogByTag }: TagsStateModel): Blog[] {
    return blogByTag;
  }

  @Action(TagsAction.GetTags)
  getTags(ctx: StateContext<TagsStateModel>) {
    this.apiService.tags
      .getTags()
      .pipe(
        tap((response: any) => {
          const tags: Tags[] = response.result;
          ctx.patchState({ tags, status: false });
        }),
      )
      .subscribe();
  }

  @Action(TagsAction.CreateTag)
  createTag(ctx: StateContext<TagsStateModel>, action: TagsAction.CreateTag) {
    return this.apiService.tags.createTags(action.payload).pipe(
      tap((response) => {
        if (response.code === 200) {
          ctx.patchState({ status: true });
        }
      }),
      catchError((error) => {
        ctx.patchState({ status: false });
        return throwError(error);
      }),
    );
  }

  @Action(TagsAction.GetBlogByTag)
  getBlogByTag(
    ctx: StateContext<TagsStateModel>,
    action: TagsAction.GetBlogByTag,
  ) {
    return this.apiService.tags.getBlogbyTag(action.payload).pipe(
      tap((response) => {
        const blogs: Blog[] = response.result.blogs;
        ctx.patchState({ blogByTag: blogs });
      }),
    );
  }
}
