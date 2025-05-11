import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEnableService } from '../../services/LoginEnable/login-enable.service';
import { SigningService } from '../../services/SigningService/signing.service';
import { LoginUser } from '../../Interfaces/LoginUser';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminAuthService } from '../../services/adminAuthService/admin-auth.service';

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
  
        const loginAdmin: LoginUser = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          rememberMe: this.loginForm.value.rememberMe
        };
  
        this._signingService.login(loginAdmin).subscribe({

          next: (response) => {
            alert(`Welcome ${response?.user?.username}`);
            localStorage.setItem('token', response?.token);
            localStorage.setItem('username', response?.user?.username);
            localStorage.setItem('userId', response?.user?.id);
            this._LoginEnableService.setLoginEnabled(true);
            setTimeout(() => {
              this.isLoading = false;
              this.router.navigate(['/dashboard']);
              this._adminAuthService.setIsAdminLoggedIn(true);
            }, 1000);
          },
          error: (response) => {
            alert("Invalid Credentials");
            this.isLoading = false;
          }
        });
      }
  }
} 