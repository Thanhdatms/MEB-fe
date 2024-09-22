import { Component } from '@angular/core';
import { BlogCardComponent } from '../../../UI/blog-card/blog-card/blog-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BlogCardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  headerImage = 'url("/asset/homepage/homepage-bg.png")';
}
