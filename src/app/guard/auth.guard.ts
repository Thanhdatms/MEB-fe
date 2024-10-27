import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';

export const authGuard = () => {
  const router = inject(Router);
  const token = inject(ApiService).auth.getToken();

  if (!token) {
    router.navigate(['/auth']);
  }
  return !!token;
};

export const unAuthGuard = () => {
  const router = inject(Router);
  const token = inject(ApiService).auth.getToken();

  if (!!token) {
    router.navigate(['/']);
  }

  return !token;
};
