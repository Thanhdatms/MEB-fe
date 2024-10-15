import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-blog-popup',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule
  ],
  templateUrl: './blog-popup.component.html',
  styleUrl: './blog-popup.component.scss'
})
export class BlogPopupComponent {
  @Input() article: any; // Replace 'any' with your article interface
  @Output() close = new EventEmitter<void>();
  isBookmarked: boolean = true;

  AuthorImage = '/sample-logo.jpg';
  ContentImage = '/asset/temp/kda-gg.jpg';

  onClose() {
    this.close.emit();
  }
}
