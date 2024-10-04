import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzIconModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  imagePath = '/sample-bg.png';

}
