import { Component } from '@angular/core';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { BlogPopupComponent } from '../../../UI/Blog/blog-popup/blog-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BlogCardComponent,
    BlogPopupComponent,
    CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  headerImage = 'url("/asset/homepage/homepage-bg.png")';
  selectedArticle: any | null = null;

  articles = [
    {
      title: "JavaScript Basics",
      author: "John Doe",
      views: 20000000,
      downloads: 5000,
      contentType: "js",
      
    },
    {
      title: "HTML5 Fundamentals",
      author: "Jane Smith",
      views: 15000000,
      downloads: 4500,
      contentType: "html",
    },
    {
      title: "Python for Beginners",
      author: "Mike Johnson",
      views: 18000000,
      downloads: 6000,
      contentType: "python",
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      views: 12000000,
      downloads: 3800,
      contentType: "Others",
    }
  ];

  openPopup(article: any) {
    this.selectedArticle = article;
  }

  closePopup() {
    this.selectedArticle = null;
  }
}
