import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteredUser, User } from '../../../Interfaces/User';
import { UsersService } from '../../../services/users-service/users.service';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {
  
  isLoading: boolean = false;
  signupForm: FormGroup;
  showPassword: boolean = false;
  
  constructor(
    private router: Router,
    private _usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern("^[0-9]{11,}$")]],
    });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;

      const admin: RegisteredUser = {
        name: this.signupForm.value.name,
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber
      };

      this._usersService.signUpAdmin(admin).subscribe({
        next: (response) => {
          if(response?.status === 201) {
            alert("Account created successfully");
            setTimeout(() => {
            this.isLoading = false;
              this.router.navigate(['/admin-login']);
            }, 1500);
          }
        },
        error: (response) => {
          console.log(response);
          alert("Please, follow the known rules to create an admin account");
          this.isLoading = false;
        }
      });
    }
  }
}
