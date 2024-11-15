import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.warning('Resource not found');
        }
        else if (error.status === 400) {
            this.toastr.warning('Something wrong with the request, please correct it and send it again.');
          }
           else if (error.status === 500) {
          this.toastr.error('Server error');
        } else {
          this.toastr.error('An unexpected error occurred');
        }
          // Updated throwError to pass a function
          return throwError(() => new Error(error.message));
      })
    );
  }
}
