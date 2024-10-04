import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../UI/Blog/blog-card/blog-card.component';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,

],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  selectedArticle: any | null = null;
  contentTags = ['News', 'Tutorial', 'How-to', 'Review', 'Interview', 'Event', 'Announcement'];
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

  groups = [
    {
      name: "Group 1",
    },
    {
      name: "Group 2",
    },
    {
      name: "Group 3",
    },
    {
      name: "Group 4",
    },
  ];

}
