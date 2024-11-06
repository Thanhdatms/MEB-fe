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
import { SettingLayoutComponent } from './Components/setting/setting-layout/setting-layout.component';
import { SettingProfileComponent } from './Components/setting/setting-profile/setting-profile.component';
import { SettingSecurityComponent } from './Components/setting/setting-security/setting-security.component';
import { TagsState } from './store/tags/tags.state';
import { AuthState } from './store/auth/auth.state';
import { UserState } from './store/user/user.state';
import { authGuard, unAuthGuard } from './guard/auth.guard';
import { BlogDetailComponent } from './Components/blog-detail/blog-detail.component';
import { AdminManagementComponent } from './Components/admin-management/admin-management.component';
import { UserIdMatchResolver } from './resolver/matchId.resolver';
import { CategoryState } from './store/category/category.state';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [unAuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
    providers: [
      importProvidersFrom(NgxsModule.forFeature([AuthState, UserState])),
    ],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'admin-management',
        component: AdminManagementComponent,
      },
      {
        path: 'blog',
        children: [
          {
            path: '',
            component: BlogListComponent,
          },
          {
            path: ':id',
            component: BlogDetailComponent,
          },
        ],
      },
      {
        path: 'user/:id',
        component: ProfileComponent,
        resolve: {
          userIdMatch: UserIdMatchResolver,
        },
        data: {
          isProfile: false,
        },
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent,
        data: {
          isProfile: true,
        },
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'setting',
        canActivateChild: [authGuard],
        component: SettingLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'profile',
            component: SettingProfileComponent,
          },
          {
            path: 'security',
            component: SettingSecurityComponent,
          },
        ],
      },
    ],
    providers: [
      importProvidersFrom(
        NgxsModule.forFeature([
          BlogState,
          TagsState,
          AuthState,
          UserState,
          CategoryState,
        ]),
      ),
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
