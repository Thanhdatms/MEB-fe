import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from '../../store/auth/auth.action';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { UserState } from '../../store/user/user.state';
import { UserAction } from '../../store/user/user.action';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzIconModule,
    RouterModule ,
    NzFormModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  imagePath = '/sample-bg.png';
  loginForm: FormGroup

  token$: Observable<string>

  constructor(
    private fb: FormBuilder,
    private _store: Store
  ) { 
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
    this.token$ = this._store.select(AuthState.token);
  }

  onLogin() {
    const payload = { 
      username: this.loginForm.get('username')?.value, 
      password : this.loginForm.get('password')?.value
    } ;
    if (payload) {
      this._store.dispatch(new AuthAction.Login({ payload }));
    }
  }
}
