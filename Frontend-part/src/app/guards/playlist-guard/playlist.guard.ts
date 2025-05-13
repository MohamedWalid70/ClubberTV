import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginEnableService } from '../../services/auth-services/login-enable/login-enable.service';

@Injectable({
  providedIn: 'root'
})
export class playlistGuard implements CanActivate {
  
  private _loginEnableService = inject(LoginEnableService);
  private router = inject(Router);
  private isLoggedIn = false;

  constructor() {
    this._loginEnableService.getLoginEnabled().subscribe((loginEnabled) => {
      this.isLoggedIn = loginEnabled;
    });
  }

  canActivate(): boolean {
  
    if(!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return (this.isLoggedIn);
  }
}
