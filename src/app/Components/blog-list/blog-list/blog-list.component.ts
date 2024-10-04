import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent
],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  selectedArticle: any | null = null;
  articles = [
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
    {
      title: "Web Development Best Practices",
      author: "Sarah Williams",
      date: "20/12/2024",
      upvotes: 100,
      tags: ["others"],
    },
  ];


}
