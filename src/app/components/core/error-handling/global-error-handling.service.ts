import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const toastr = this.injector.get(ToastrService);
    console.error('Global error caught:', error);
    toastr.error('An unexpected error occurred. Please try again later.');
  }
}
