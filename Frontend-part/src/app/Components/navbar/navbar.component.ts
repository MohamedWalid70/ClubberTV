import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginEnableService } from '../../services/LoginEnable/login-enable.service';
import { SigningService } from '../../services/SigningService/signing.service';
import { AdminAuthService } from '../../services/adminAuthService/admin-auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username : string | null = '';
  loginEnabled = false;
  isAdminLoggedIn = false;

  constructor(private loginEnableService: LoginEnableService, private adminAuthService: AdminAuthService, private router: Router) {}

  ngOnInit() {

    if(localStorage.getItem('token') != null && localStorage.getItem('username') != null && 
      localStorage.getItem('userId') != null) {

        this.loginEnableService.setLoginEnabled(true);
        if(localStorage.getItem('username') == 'admin'){
          this.adminAuthService.setIsAdminLoggedIn(true);
        }
    }

    this.adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
      console.log(this.isAdminLoggedIn);
      if(this.isAdminLoggedIn) {
        this.loginEnabled = true;
        this.username = localStorage.getItem('username');
      }
      else {
        this.loginEnabled = false;
      }
    });


    this.loginEnableService.getLoginEnabled().subscribe((enabled) => {
      this.loginEnabled = enabled;
      if(this.loginEnabled) {
          this.username = localStorage.getItem('username');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.loginEnableService.setLoginEnabled(false);
    this.loginEnabled = false;
    
    if(this.isAdminLoggedIn) {
      this.adminAuthService.setIsAdminLoggedIn(false);
      this.router.navigate(['/admin-login']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
