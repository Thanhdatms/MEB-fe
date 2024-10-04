import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage/homepage.component';
import { ContentLayoutComponent } from './Components/page-layout/content-layout/content-layout.component';
import { BlogListComponent } from './Components/blog-list/blog-list/blog-list.component';
import { RegisterComponent } from './Components/register/register.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: 'blog',
        component: BlogListComponent
      }
      
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
