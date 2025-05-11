import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../Interfaces/User';
import { SigningService } from '../../services/SigningService/signing.service';
import { confirmPassValidator } from '../../Validators/passwordConfirmation.validator';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, NgIf, RouterLink]
})

export class SignupComponent {

  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signingService: SigningService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: confirmPassValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {

        const user: User = {
            username: this.signupForm.value.username,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            confirmPassword: this.signupForm.value.confirmPassword,
            role: 'user',
            phoneNumber: '1234567890'
        };


        this.signingService.signup(user).subscribe({

          next: (response) => {
            console.log(response);
            alert(response.message);
            setTimeout(() => {
              this.isLoading = false;
              this.router.navigate(['/login']);
            }, 1500);
          },
          error: (response) => {
            console.log(response);
            alert("Please, follow the known rules to create an account");
          }
          
        });
        
      }
  }
} 