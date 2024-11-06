import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-setting-profile',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule, NzIconModule],
  templateUrl: './setting-profile.component.html',
  styleUrl: './setting-profile.component.scss',
})
export class SettingProfileComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [''],
      nameTag: [''],
      bio: [''],
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
