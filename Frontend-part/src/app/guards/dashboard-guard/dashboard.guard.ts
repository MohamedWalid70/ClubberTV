import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';
import { SuperAdminAuthService } from '../../services/auth-services/super-admin-auth-service/super-admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class dashboardGuard implements CanActivate {

  private _adminAuthService = inject(AdminAuthService);
  private _superAdminAuthService = inject(SuperAdminAuthService);
  private router = inject(Router);
  private isAdminLoggedIn = false;
  private isSuperAdminLoggedIn = false;

  constructor() {
    this._adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    });
    this._superAdminAuthService.getIsSuperAdminLoggedIn().subscribe((isSuperAdminLoggedIn) => {
      this.isSuperAdminLoggedIn = isSuperAdminLoggedIn;
    });
  }

  canActivate(): boolean {
  
    if(!this.isAdminLoggedIn && !this.isSuperAdminLoggedIn) {
      this.router.navigate(['/not-found']);
    }
    return this.isAdminLoggedIn || this.isSuperAdminLoggedIn;
  }
}
