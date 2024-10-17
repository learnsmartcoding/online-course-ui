import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(LoginService);
  const toastrService = inject(ToastrService);

  if (authService.isLoggedIn) {
    return true;
  } else {
    toastrService.info(
      'You need to login to access the feature.',
      'Login Required'
    );
    authService.login(); //This triggers ad b2c login flow.
    return false;
  }
};