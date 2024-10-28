import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BlogPopupComponent } from '../blog-popup/blog-popup.component';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, NzIconModule, BlogPopupComponent],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent implements OnInit {
  @Input() article: any;
  title: string = '';
  author: string = '';
  upvotes: number = 0;
  date: string = '';
  tags: string[] = [];
  isPopupVisible: boolean = false;
  isBookmarked: boolean = true;

  ngOnInit(): void {
    this.title = this.article.title;
  }

  get cardBackground(): string {
    return 'url("/asset/blog-card/default.png")';
  }

  contentTypeColor(tag: string): string {
    switch (tag) {
      case 'js':
        return '#ca8a04'; // Darker amber
      case 'html':
        return '#ea580c'; // Darker orange
      case 'python':
        return '#2563eb'; // Darker blue
      case 'css':
        return '#0ea5e9'; // Darker blue
      default:
        return 'var(--main-theme)';
    }
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
