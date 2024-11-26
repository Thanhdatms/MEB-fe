import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-report-blog',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule],
  templateUrl: './report-blog.component.html',
  styleUrl: './report-blog.component.scss',
})
export class ReportBlogComponent {
  @Input() form = new FormGroup<any>({});
}
