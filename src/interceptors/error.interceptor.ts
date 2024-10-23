import { HttpInterceptorFn } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const messageService = inject(NzMessageService);

  return next(req).pipe(
     // Check for response body errors
    map((event: HttpEvent<any>): HttpEvent<any> => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (body && body.code === 9999) { // Check for specific error code
          const errorMessage = body.message || 'Unknown error occurred';
          messageService.error(errorMessage);
          // return throwError(() => new HttpErrorResponse({ error: errorMessage }));
        }
      }
      return event; // Ensure to return the event for other cases
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error.error || 'Unknown server error occurred';
      }

      // Display the error message globally using NzMessageService
      messageService.error(errorMessage);
      return throwError(() => errorMessage);
    })
  );
};
