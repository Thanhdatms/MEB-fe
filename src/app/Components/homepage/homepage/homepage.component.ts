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
      date: "20/12/2024",
      upvotes: 100,
      tags: ["js", "html", "css"],  
    },
    {
      title: "HTML5 Fundamentals",
      author: "Jane Smith",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["html", "css","scss"],
    },
    {
      title: "Python for Beginners",
      author: "Mike Johnson",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["python"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    }
  ];

  openPopup(article: any) {
    this.selectedArticle = article;
  }

  closePopup() {
    this.selectedArticle = null;
  }
}
