import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../Components/page-not-found/page-not-found.component';
import { LoginComponent } from '../Components/login/login.component';

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  // {
  //   pathMatch: 'full',
  //   redirectTo: '/login'
  // }
];
