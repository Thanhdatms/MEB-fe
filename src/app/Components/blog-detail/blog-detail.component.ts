import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable, takeUntil } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateFormatter } from '../../utils/formatDate';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, NzIconModule, RouterLink, NzToolTipModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  providers: [DateFormatter],
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<Blog | null>;
  AuthorImage = '/sample-logo.jpg';
  blogContent: Text | undefined;
  UserName: string | null = null;
  UserId: string = '';
  sanitizedContent: SafeHtml = '';
  isBookmarked: boolean = false;
  suggestedBlogs: Blog[] = [];
  blogDate: string | null = null;

  @Input() blogId: string = '';
  @Input() isPopup: boolean = false;
  @Input() userId: string | null = null;
  @Input() userName: string | null = null;
  @Output() openPopup = new EventEmitter<Blog>();

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private formatDate: DateFormatter,
  ) {
    this.blog$ = this.store.select(BlogState.blog);
    this.store.select(BlogState.blogs).subscribe((response) => {
      this.suggestedBlogs = response;
    });
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
      this.userName = response?.user?.username ?? '';
      this.userId = response?.user?.id ?? '';
      this.sanitizedContent = this.sanitizeContent(String(this.blogContent));
      this.blogDate = this.formatDate.convertDate(String(response?.createdAt));
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

  onBookMark() {
    this.isBookmarked = !this.isBookmarked;
  }

  openBlogPopup(blog: Blog) {
    this.openPopup.emit(blog); // Emit the selected blog to the parent component
  }
}
