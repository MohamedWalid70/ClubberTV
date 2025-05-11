import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../../services/adminAuthService/admin-auth.service';


@Injectable({
  providedIn: 'root'
})
export class dashboardAuthGuard implements CanActivate {
  private _adminAuthService = inject(AdminAuthService);
  private router = inject(Router);
  private isAdminLoggedIn = false;

  constructor() {
    this._adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    });
  }

  canActivate(): boolean {
  
    if(!this.isAdminLoggedIn) {
      this.router.navigate(['/not-found']);
    }
    return this.isAdminLoggedIn;
  }
}
