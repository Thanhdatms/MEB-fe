// src/store/blogs.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BlogAction  } from './blog.action';
import { ApiService } from '../../../service/api.service';
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
}


@State<BlogStateModel>({
    name: 'blogs',
    defaults: {
    blogs: []
    }
})
@Injectable()
export class BlogState {
    constructor(private apiService: ApiService) {}

    @Selector()
    static blogs(state: BlogStateModel): Blog[] {
        return state.blogs;
    }
    
    @Action(BlogAction.GetBlogs)
    getBlogs(ctx: StateContext<BlogStateModel>) {
        this.apiService.getBlog().pipe(
        tap(
            (response: any) => {
                const blogs: Blog[] = response.result; 
                ctx.patchState({ blogs });
        })
    ).subscribe();
    }

    @Action(BlogAction.CreateBlog)
    createBlog(ctx: StateContext<BlogStateModel>, action: BlogAction.CreateBlog) {
    return this.apiService.createBlog(action.payload).pipe(
        tap(() => 
            {
                return ctx.dispatch(new BlogAction.GetBlogs());
            }
        ),
        catchError((error) => {
            console.error('Error creating blog:', error); // Log the error
            
            return throwError(error); 
        })
    ).subscribe();
}
}
