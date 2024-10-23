// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from '../../../service/api.service';
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
        blogByTag: []
    },
    
})
@Injectable()
export class TagsState {
    constructor(private apiService: ApiService) {}

    @Selector()
    static tags(state: TagsStateModel): Tags[] {
        return state?.tags || [];
    }
    @Selector()
    static status(state: TagsStateModel): boolean {
        return state.status;
    }
    @Selector()
    static getBlogByTag(state: TagsStateModel): Blog[] {
        return state.blogByTag;
    }

    
    @Action(TagsAction.GetTags)
    getTags(ctx: StateContext<TagsStateModel>) {
        this.apiService.tags.getTags().pipe(
        tap(
            (response: any) => {
                const tags: Tags[] = response.result; 
                ctx.patchState({ tags });
        }
    
    )
    ).subscribe();
    }
    
    @Action(TagsAction.CreateTag)
    createTag(ctx: StateContext<TagsStateModel>, action: TagsAction.CreateTag) {
    return this.apiService.tags.createTags(action.payload).pipe(
        tap((response) => 
            {
                if(response.status === 201) {
                ctx.patchState({ status: true });
                }
            }
        ),
        catchError((error) => {
            ctx.patchState({ status: false });
            return throwError(error);
        })
    );
    }

    @Action(TagsAction.GetBlogByTag)
    getBlogByTag(ctx: StateContext<TagsStateModel>, action: TagsAction.GetBlogByTag) {
        return this.apiService.tags.getBlogbyTag(action.payload).pipe(
            tap((response) => {
                const blogs: Blog[] = response.result.blogs;
                ctx.patchState({ blogByTag: blogs });
            })
        );
    }

}
