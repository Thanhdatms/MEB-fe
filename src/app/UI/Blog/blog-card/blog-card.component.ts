import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,

  ],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() upvotes: number = 0;
  @Input() date: string = '';
  @Input() tags: string[] = [];

  get cardBackground(): string {
    switch (this.tags[0]) {
      case 'js': return 'url("/asset/blog-card/js.webp")';
      case 'html': return 'url("/asset/blog-card/html.jpg")';
      case 'python': return 'url("/asset/blog-card/python.jpg")';
      default: return 'url("/asset/blog-card/default.png")';
    }
  }

  contentTypeColor(tag: string): string {
    switch (tag) {
      case 'js': return '#ca8a04'; // Darker amber
      case 'html': return '#ea580c'; // Darker orange
      case 'python': return '#2563eb'; // Darker blue
      case 'css': return '#0ea5e9'; // Darker blue
      default: return 'var(--main-theme)';
    }
  }

  @Output() cardClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }
}
