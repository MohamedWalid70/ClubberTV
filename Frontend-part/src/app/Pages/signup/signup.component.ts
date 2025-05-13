import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisteredUser } from '../../Interfaces/User';
import { UsersService } from '../../services/users-service/users.service';
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
    private _usersService: UsersService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
      confirmPassword: ['', Validators.required],
      phoneNumber: [null, [Validators.pattern("^[0-9]{11,}$")]],
    }, {
      validators: confirmPassValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {

        this.isLoading = true;

        const user: RegisteredUser = {
            name: this.signupForm.value.name,
            username: this.signupForm.value.username,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
            phoneNumber: this.signupForm.value.phoneNumber==""? null : this.signupForm.value.phoneNumber
        };


        this._usersService.signUpUser(user).subscribe({
          next: (response) => {
            console.log(response);
            if(response?.status === 201) {
              alert("Account created successfully");
              setTimeout(() => {
                this.isLoading = false;
                this.router.navigate(['/login']);
              }, 1500);
            }
          },
          error: (response) => {
            console.log(response);
            alert("Incomplete operation\nPlease, follow the known rules to create an account");
            this.isLoading = false;
          }
          
        });
        
      }
  }
} 