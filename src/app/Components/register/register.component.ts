import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from '../../store/auth/auth.action';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzIconModule,
    RouterModule,
    NzFormModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  imagePath = '/sample-bg.png';

  registerForm: FormGroup 

  constructor(
    private fb: FormBuilder,
    private _store: Store
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  onRegister() {
    const payload = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      hashpassword: this.registerForm.get('password')?.value
    }
    this._store.dispatch(new AuthAction.Register({ payload }));
  }
}
