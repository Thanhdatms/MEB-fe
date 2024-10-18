import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { Blog, BlogState } from '../../../store/blog/blog.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent
],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  selectedArticle: any | null = null;

  blog$!: Observable<Blog[]>; 
  loading: boolean = true;
  constructor(private store: Store) {}

  ngOnInit() {
    this.blog$ = this.store.select(BlogState.blogs); 
    this.blog$.subscribe((articles: Blog[]) => {
      this.loading = false; 
    })
  }

  openPopup(article: any) {
    this.selectedArticle = article;
  }

  closePopup() {
    this.selectedArticle = null;
  }

}
