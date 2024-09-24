import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          // Extract only the data field and pass it forward
          const modifiedBody = event.body?.data || event.body;
          return event.clone({ body: modifiedBody });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error responses and pass it to the error handling service
        // this.apiErrorHandlingService.handleError(error);
        // Optionally rethrow the error if you want the component to handle it as well
        return throwError(error);
      })
    );
  }
}
