import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlogCardComponent } from '../../UI/Blog/blog-card/blog-card.component';
import { SideBarComponent } from '../../UI/side-bar/side-bar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    BlogCardComponent,
    SideBarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

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
