import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BlogPopupComponent } from '../blog-popup/blog-popup.component';
import Iconify from '@iconify/tailwind';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateFormatter } from '../../../utils/formatDate';
import { User } from '../../../store/user/user.state';
@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, NzIconModule, BlogPopupComponent, NzToolTipModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
  providers: [DateFormatter],
})
export class BlogCardComponent implements OnInit {
  @Input() article: any;
  @Input() userId: string | null = null;
  @Input() userName: string | null = null;
  UserName: string = '';
  UserID: string = '';
  date: string = '';
  tags: string[] = [];
  isPopupVisible: boolean = false;
  isBookmarked: boolean = false;

  constructor(private formatDate: DateFormatter) {}
  ngOnInit(): void {
    this.date = this.formatDate.convertDate(this.article.createdAt);
    if (this.userId && this.userName) {
      this.UserName = this.userName;
      this.UserID = this.userId;
    } else {
      this.UserName = this.article.user.username;
      this.UserID = this.article.user.id;
    }
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
