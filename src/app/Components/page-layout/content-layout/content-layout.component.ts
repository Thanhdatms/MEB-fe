import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzDropDownModule
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent {
  navbarItems = [
    { icon: 'bell', path: '/noti' },
    { icon: 'user', path: '/account' },
  ];


}
