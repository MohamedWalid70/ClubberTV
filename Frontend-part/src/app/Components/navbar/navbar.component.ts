import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginEnableService } from '../../services/auth-services/login-enable/login-enable.service';
import { SigningService } from '../../services/auth-services/signing-service/signing.service';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';
import { SuperAdminAuthService } from '../../services/auth-services/super-admin-auth-service/super-admin-auth.service';
import { RecognizeService } from '../../services/auth-services/recognize-service/recognize.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  name : string | null = '';
  loginEnabled = false;
  isAdminLoggedIn = false;
  isSuperAdminLoggedIn = false;

  constructor(private loginEnableService: LoginEnableService,
     private adminAuthService: AdminAuthService,
      private superAdminAuthService: SuperAdminAuthService,
      private router: Router,
      private recognizeService: RecognizeService) {}

  ngOnInit() {

    this.recognizeService.refresh().subscribe({
      next: (response) => {
        console.log(response);
        this.name = response?.name;
        if(response?.role == 'Admin') {
          this.adminAuthService.setIsAdminLoggedIn(true);
        }
        else if(response?.role == 'SuperAdmin') {
          this.superAdminAuthService.setIsSuperAdminLoggedIn(true);
        }
        this.loginEnableService.setLoginEnabled(true);
      },
      error: (response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.loginEnableService.setLoginEnabled(false);
        this.loginEnabled = false;
        
        if(this.isAdminLoggedIn) {
          this.adminAuthService.setIsAdminLoggedIn(false);
        }
    
        if(this.isSuperAdminLoggedIn) {
          this.superAdminAuthService.setIsSuperAdminLoggedIn(false);
        }
      }
    });
  
    this.adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      
      this.isAdminLoggedIn = isAdminLoggedIn;
      console.log("This is the admin logged in: ", this.isAdminLoggedIn);
      if(this.isAdminLoggedIn) {
        this.loginEnabled = true;
        this.name = localStorage.getItem('name')?.split(' ')[0] ?? '';
      }
      else {
        this.loginEnabled = false;
      }
    });


    this.loginEnableService.getLoginEnabled().subscribe((enabled) => {
      this.loginEnabled = enabled;
      if(this.loginEnabled) {
          this.name = localStorage.getItem('name')?.split(' ')[0] ?? '';
      }
    });

    this.superAdminAuthService.getIsSuperAdminLoggedIn().subscribe((isSuperAdminLoggedIn) => {
      this.isSuperAdminLoggedIn = isSuperAdminLoggedIn;
      if(this.isSuperAdminLoggedIn) {
        this.loginEnabled = true;
        this.name = localStorage.getItem('name');
      }
      else {
        this.loginEnabled = false;
      }
    });

  }

  logout() : void {

    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.loginEnableService.setLoginEnabled(false);
    this.loginEnabled = false;
    
    if(this.isAdminLoggedIn) {
      this.adminAuthService.setIsAdminLoggedIn(false);
      this.router.navigate(['/admin-login']);
    }

    if(this.isSuperAdminLoggedIn) {
      this.superAdminAuthService.setIsSuperAdminLoggedIn(false);
      this.router.navigate(['/super-admin-login']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
