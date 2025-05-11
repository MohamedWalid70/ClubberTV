import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../../services/adminAuthService/admin-auth.service';
import { LoginEnableService } from '../../services/LoginEnable/login-enable.service';

@Injectable({
  providedIn: 'root'
})
export class historyAuthGuard implements CanActivate {
  private _loginEnableService = inject(LoginEnableService);
  private _adminAuthService = inject(AdminAuthService);
  private isAdminLoggedIn = false;
  private router = inject(Router);
  private isLoggedIn = false;

  constructor() {
    this._adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    });
    this._loginEnableService.getLoginEnabled().subscribe((loginEnabled) => {
      this.isLoggedIn = loginEnabled;
    });
  }

  canActivate(): boolean {
  
    if(!this.isLoggedIn || this.isAdminLoggedIn) {
      this.router.navigate(['/login']);
    }
    return (this.isLoggedIn && !this.isAdminLoggedIn);
  }
}
