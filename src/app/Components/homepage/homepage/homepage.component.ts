import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { BlogState } from '../../../store/blog/blog.state';
import { Observable } from 'rxjs';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { BlogPopupComponent } from '../../../UI/Blog/blog-popup/blog-popup.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../../store/blog/blog.state';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BlogCardComponent, BlogPopupComponent, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  headerImage = 'url("/asset/homepage/homepage-bg.png")';
  selectedArticle: any | null = null;

  blog$!: Observable<Blog[]>;
  loading: boolean = true;
  constructor(private store: Store) {}

  ngOnInit() {
    this.blog$ = this.store.select(BlogState.blogs);
    this.blog$.subscribe((articles: Blog[]) => {
      this.loading = false;
    });
  }

  openPopup(article: any) {
    this.selectedArticle = article;
  }

  closePopup() {
    this.selectedArticle = null;
  }
}
