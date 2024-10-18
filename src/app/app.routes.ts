import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { HomepageComponent } from './Components/homepage/homepage/homepage.component';
import { ContentLayoutComponent } from './Components/page-layout/content-layout/content-layout.component';
import { BlogListComponent } from './Components/blog-list/blog-list/blog-list.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BlogState } from './store/blog/blog.state';
import { AboutComponent } from './Components/about/about.component';

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
      },
      {
        path: '**',
        redirectTo: 'login',
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
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path:'about',
        component: AboutComponent
      }
    ],
    providers: [
      importProvidersFrom(
        NgxsModule.forFeature([
          BlogState
        ])
      )
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
