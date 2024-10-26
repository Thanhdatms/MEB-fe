import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiService } from '../../../../service/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-popup',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './blog-popup.component.html',
  styleUrl: './blog-popup.component.scss',
})
export class BlogPopupComponent implements OnInit {
  @Input() article: any;
  @Output() close = new EventEmitter<void>();

  AuthorImage = '/sample-logo.jpg';
  ContentImage = '/asset/temp/kda-gg.jpg';

  liked: boolean = false;
  disliked: boolean = false;
  isBookmarked: boolean = false;

  onLike() {
    this.liked = !this.liked;
    if (this.disliked) {
      this.disliked = false;
    }
  }
  onDislike() {
    this.disliked = !this.disliked;
    if (this.liked) {
      this.liked = false;
    }
  }
  onBookMark() {
    this.isBookmarked = !this.isBookmarked;
  }
  sanitizedContent!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
      this.article.content,
    );
  }

  onClose() {
    this.close.emit();
  }
}
