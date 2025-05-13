import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginEnableService } from '../../services/auth-services/login-enable/login-enable.service';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';
import { SuperAdminAuthService } from '../../services/auth-services/super-admin-auth-service/super-admin-auth.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loginEnableService = inject(LoginEnableService);
  const adminAuthService = inject(AdminAuthService);
  const superAdminAuthService = inject(SuperAdminAuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // console.log("this an error", error);
      if(error.status === 401) {
        // alert('You are not authorized to take this action');
        loginEnableService.setLoginEnabled(false);
        adminAuthService.setIsAdminLoggedIn(false);
        superAdminAuthService.setIsSuperAdminLoggedIn(false);
      }
      return throwError(() => error);
    })
  );
};
