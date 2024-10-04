import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  contentTags = ['News', 'Tutorial', 'How-to', 'Review', 'Interview', 'Event', 'Announcement'];
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
