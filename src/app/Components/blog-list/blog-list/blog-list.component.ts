import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { Blog, BlogState } from '../../../store/blog/blog.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Tags, TagsState } from '../../../store/tags/tags.state';
import { TagsAction } from '../../../store/tags/tags.actions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategorysAction } from '../../../store/category/category.actions';
import { CategoryState } from '../../../store/category/category.state';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent,
    NzSelectModule,
    FormsModule,
    NzIconModule,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  selectedArticle: any | null = null;
  selectedTag: Tags | null = null;

  blog$!: Observable<Blog[]>;
  tags$!: Observable<any>;
  blogsByTag$!: Observable<Blog[]>;
  blogsByCate$!: Observable<Blog[]>;
  loading: boolean = true;
  displayedBlog: Blog[] = [];
  isCategorySelected: boolean = false;
  cateSelected: string = '';
  constructor(private store: Store) {
    this.blog$ = this.store.select(BlogState.blogs);
    this.blogsByCate$ = this.store.select(CategoryState.getBlogByCategory);
    this.tags$ = this.store.select(TagsState.tags);
    this.blogsByTag$ = this.store.select(TagsState.getBlogByTag);
    this.blog$.subscribe((blogs: Blog[]) => {
      this.displayedBlog = blogs;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.store.dispatch(new TagsAction.GetTags());
  }
  onCategorySelected(cate: any) {
    this.isCategorySelected = true;
    this.cateSelected = cate.title;
    this.store.dispatch(new CategorysAction.GetBlogByCategory(cate.id));
    this.blogsByCate$.subscribe((blog: Blog[]) => {
      if (blog && blog.length > 0) {
        this.displayedBlog = blog;
      } else {
        this.displayedBlog = [];
      }
    });
  }

  filterByTag(tag: Tags | null) {
    if (tag) {
      this.selectedTag = tag;
      this.store.dispatch(new TagsAction.GetBlogByTag(tag.id));
      this.blogsByTag$.subscribe((blogs: Blog[]) => {
        if (blogs && blogs.length > 0) {
          this.displayedBlog = blogs;
        } else {
          this.displayedBlog = [];
        }
        this.loading = false;
      });
    } else {
      // If no tag is selected, display all blogs
      this.blog$.subscribe((blogs: Blog[]) => {
        this.displayedBlog = blogs;
        this.loading = false;
      });
    }
  }

  openPopup(article: any) {
    this.selectedArticle = article;
  }

  closePopup() {
    this.selectedArticle = null;
  }
}
