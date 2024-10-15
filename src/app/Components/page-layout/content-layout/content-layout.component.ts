import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ApiService } from '../../../../service/api.service';
import { Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import { CreateBlogComponent } from '../../../UI/createBlog/create-blog/create-blog.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzDropDownModule,
    CreateBlogComponent
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent {
  isCreatePopupVisible = false;

  navbarItems = [
    { icon: 'bell', path: '/noti' },
    { icon: 'user', path: '/account' },
  ];

  constructor(private apiService: ApiService, private store: Store) {
    this.store.dispatch(new BlogAction.GetBlogs); 
  }


  openCreatePopup() {
    this.isCreatePopupVisible = true;
  }
  closeCreatePopup() {
    this.isCreatePopupVisible = false;
  }
}
