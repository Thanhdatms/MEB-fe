import { Component } from '@angular/core';
import Iconify from '@iconify/tailwind';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Blog, BlogState } from '../../store/blog/blog.state';
import { ReportState } from '../../store/report/reports.state';
import { ReportAction } from '../../store/report/reports.action';
import { BlogAction } from '../../store/blog/blog.action';
import { ReportCardComponent } from '../../UI/report-card/report-card.component';

@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule, ReportCardComponent],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.scss',
})
export class AdminManagementComponent {
  reports$: Observable<any[]>;

  reports: any[] = [];
  constructor(private store: Store) {
    this.reports$ = this.store.select(ReportState.reports);
    this.store.dispatch(new ReportAction.GetReport());

    this.reports$.subscribe((reports) => {
      this.reports = reports;
    });
  }
}
