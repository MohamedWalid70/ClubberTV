import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEnableService } from '../../services/auth-services/login-enable/login-enable.service';
import { SigningService } from '../../services/auth-services/signing-service/signing.service';
import { LoggedinUser } from '../../Interfaces/LoggedinUser';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  
  isLoading: boolean = false;
  loginForm: FormGroup;
  showPassword: boolean = false;
  

  constructor(
    private router: Router,
    private _LoginEnableService: LoginEnableService,
    private _signingService: SigningService,
    private fb: FormBuilder,
    private _adminAuthService: AdminAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
        this.isLoading = true;
  
        const loginAdmin: LoggedinUser = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
  
        this._signingService.loginAdmin(loginAdmin).subscribe({

          next: (response) => {
            if(response?.status === 200) {
              alert(`Welcome ${response?.body?.name}`);
              localStorage.setItem('token', response?.body?.token);
              localStorage.setItem('name', response?.body?.name);

              this._LoginEnableService.setLoginEnabled(true);
              setTimeout(() => {
                this.isLoading = false;
                this._adminAuthService.setIsAdminLoggedIn(true);
                this.router.navigate(['/dashboard']);
              }, 1000);
            }
          },
          error: (response) => {
            alert("Invalid Credentials");
            this.isLoading = false;
          }
        });
      }
  }
} 