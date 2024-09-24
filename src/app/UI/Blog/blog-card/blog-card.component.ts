import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() views: number = 0;
  @Input() downloads: number = 0;
  @Input() contentType: string = '';

  get cardBackground(): string {
    switch (this.contentType) {
      case 'js': return 'url("/asset/blog-card/js.webp")';
      case 'html': return 'url("/asset/blog-card/html.jpg")';
      case 'python': return 'url("/asset/blog-card/python.jpg")';
      default: return 'linear-gradient(135deg, var(--main-theme) 0%, var(--secondary-theme) 100%)';
    }
  }

  get contentTypeColor(): string {
    switch (this.contentType) {
      case 'js': return '#ca8a04'; // Darker amber
      case 'html': return '#ea580c'; // Darker orange
      case 'python': return '#2563eb'; // Darker blue
      default: return 'var(--main-theme)';
    }
  }

  @Output() cardClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }
}
