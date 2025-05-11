import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginUser } from '../../Interfaces/LoginUser';
import { SigningService } from '../../services/SigningService/signing.service';
import { LoginResponse } from '../../Interfaces/LoginResponse';
import { LoginEnableService } from '../../services/LoginEnable/login-enable.service';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  subscription: Subscription = new Subscription();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signingService : SigningService,
    private loginEnableService : LoginEnableService
  ) 
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/main-page']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const loginUser: LoginUser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe
      };
      
      if(this.subscription) {
        this.subscription.unsubscribe();
      }

      if(loginUser.email.toLowerCase() != 'admin@solvesmart.com') {

        this.subscription = this.signingService.login(loginUser).subscribe({
          next: (response) => {
            alert(`Welcome ${response?.user?.username}`);
            localStorage.setItem('token', response?.token);
            localStorage.setItem('username', response?.user?.username);
            localStorage.setItem('userId', response?.user?.id);
            this.loginEnableService.setLoginEnabled(true);
            setTimeout(() => {
              this.isLoading = false;
              this.router.navigate(['/main-page']);
            }, 1000);
          },
          error: (response) => {
            alert("Invalid Username or password");
            this.isLoading = false;
          }
        });
     }
     else{
        alert("Invalid Username or password");
        this.isLoading = false;
     }

    }
  }
} 