import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    // this.toastr.info('Request initiated');
    
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //this.toastr.success('Request successful');
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        //this.toastr.error(`Request failed: ${error.message}`);
        return throwError(error);
      }),
      finalize(() => {        
        this.spinner.hide();
      })
    );
  }
}
