import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, NzIconModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<Blog | null>;
  AuthorImage = '/sample-logo.jpg';
  blogContent: Text | undefined;
  sanitizedContent: SafeHtml = '';
  @Input() blogId: string = '';
  @Input() isPopup: boolean = false;
  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private msg: NzMessageService,
  ) {
    this.blog$ = this.store.select(BlogState.blog);
  }
  ngOnInit() {
    // Subscribe to route changes and fetch new blog data
    if (this.isPopup) {
      this.store.dispatch(new BlogAction.GetBlogById(this.blogId));
    } else {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(new BlogAction.GetBlogById(id));
        }
      });
    }

    // Update content when blog data changes
    this.blog$.subscribe((response) => {
      this.blogContent = response?.content;
      this.sanitizedContent = this.sanitizeContent(String(this.blogContent));
    });
  }
  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        this.msg.success('Link copied');
      },
      (err) => {
        this.msg.error('Failed to copy link');
      },
    );
  }
}
