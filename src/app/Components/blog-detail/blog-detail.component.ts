import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable, map, take, takeUntil } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogAction } from '../../store/blog/blog.action';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateFormatter } from '../../utils/formatDate';
import { environment } from '../../environment/environment';
import { UserAction } from '../../store/user/user.action';
import { User, UserState } from '../../store/user/user.state';
import { Tags } from '../../store/tags/tags.state';
import { Comment, CommentsState } from '../../store/comments/comments.state';
import { CommentsAction } from '../../store/comments/comments.action';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    RouterLink,
    NzToolTipModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  providers: [DateFormatter],
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<Blog | null>;
  AuthorImage = '/sample-logo.jpg';
  blogContent: Text | undefined;
  UserName: string | null = null;
  commentForm: FormGroup;
  sanitizedContent: SafeHtml = '';
  isBookmarked: boolean = false;
  suggestedBlogs: Blog[] = [];
  blogTags: Tags[] = [];
  blogDate: string | null = null;
  upVotes: number = 0;
  downVotes: number = 0;
  isUpvote: boolean = false;
  isDownvote: boolean = false;
  isFollowing: boolean = false;
  comments: Comment[] = [];
  isFollow$: Observable<boolean>;
  isBookmark$: Observable<boolean>;
  comments$: Observable<Comment[]>;
  isSelf: boolean = false;
  isLogin: boolean = false;
  userBlogid: string = '';
  userBlogName: string = '';
  editingCommentId: string | null = null;
  editCommentForm: FormGroup;

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
    private fb: FormBuilder,
  ) {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('name');
    if (this.userId !== '') {
      this.isLogin = true;
    }

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.editCommentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.blog$ = this.store.select(BlogState.blog);
    this.isFollow$ = this.store.select(UserState.isFollow);
    this.isBookmark$ = this.store.select(UserState.isBookmark);
    this.store.select(BlogState.blogs).subscribe((response) => {
      this.suggestedBlogs = response;
    });
    this.comments$ = this.store.select(CommentsState.comments);

    this.blog$.subscribe((response) => {
      this.blogId = response?.id ?? '';
      this.blogContent = response?.content;
      this.userBlogName = response?.user?.username ?? '';
      this.userBlogid = response?.user?.id ?? '';
      this.sanitizedContent = this.sanitizeContent(String(this.blogContent));
      this.blogDate = this.formatDate.convertDate(String(response?.createdAt));
      this.blogTags = response?.tags ?? [];
      this.upVotes = response?.votes?.upVote ?? 0;
      this.downVotes = response?.votes?.downVote ?? 0;
      if (this.isLogin) {
        if (this.userId !== '' && this.blogId !== '') {
          this.store.dispatch(new UserAction.isFollow(this.userId));
          this.store.dispatch(new UserAction.isBookmark(this.blogId));
          this.store.dispatch(new CommentsAction.GetComment(this.blogId));
          if (this.userBlogid === localStorage.getItem('userId')) {
            this.isSelf = true;
          } else {
            this.isSelf = false;
          }
        }
      }
    });
    this.isFollow$.subscribe((response) => {
      this.isFollowing = response;
    });
    this.isBookmark$.subscribe((response) => {
      this.isBookmarked = response;
    });
    this.comments$.subscribe((response) => {
      this.comments = response;
    });
  }
  CheckLogin(): boolean {
    if (!this.isLogin) {
      this.msg.info('Please login to do action');
      return false;
    }
    return true;
  }
  ngOnInit() {
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
  }
  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  copyToClipboard() {
    const url = `${environment.localURL}/blog/${this.blogId}`;
    navigator.clipboard.writeText(url).then(
      () => {
        this.msg.success('Link copied');
      },
      (err) => {
        this.msg.error('Failed to copy link');
      },
    );
  }

  onFollow() {
    if (!this.CheckLogin()) return;
    if (this.isFollowing) {
      this.store.dispatch(new UserAction.unfollow(this.userId));
    } else {
      this.store.dispatch(new UserAction.follow(this.userId));
    }
  }

  onBookMark() {
    if (!this.CheckLogin()) return;
    if (this.isBookmarked) {
      this.store.dispatch(new UserAction.unbookmark(this.blogId));
    } else {
      this.store.dispatch(new UserAction.bookmark(this.blogId));
    }
  }

  onComment(): void {
    if (!this.CheckLogin()) return;
    if (this.commentForm.valid) {
      const content = this.commentForm.value;
      const payload = {
        blogId: this.blogId,
        content: content.comment,
      };

      this.store.dispatch(new CommentsAction.CreateComment(payload));

      this.commentForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  updateComment(commentId: string): void {
    if (this.editCommentForm.valid) {
      const updatedContent = this.editCommentForm.value.content;

      const payload = {
        commentId,
        blogId: this.blogId,
        content: updatedContent,
      };

      this.store
        .dispatch(new CommentsAction.UpdateComment(payload))
        .subscribe(() => {
          // Update local state or fetch comments again
          const commentIndex = this.comments.findIndex(
            (c) => c.id === commentId,
          );
          if (commentIndex !== -1) {
            this.comments[commentIndex].content = updatedContent;
          }
          this.cancelEditing();
        });
    }
  }
  startEditing(commentId: string): void {
    this.editingCommentId = commentId;
    const commentToEdit = this.comments.find((c) => c.id === commentId);
    if (commentToEdit) {
      this.editCommentForm.patchValue({
        content: commentToEdit.content,
      });
    }
  }

  cancelEditing(): void {
    this.editingCommentId = null;
    this.editCommentForm.reset();
  }

  deleteComment(comment: Comment): void {
    const payload = {
      blogId: this.blogId,
      commentId: comment.id,
    };
    this.store.dispatch(new CommentsAction.DeleteComment(payload));
  }

  openBlogPopup(blog: Blog) {
    this.openPopup.emit(blog); // Emit the selected blog to the parent component
  }
}
