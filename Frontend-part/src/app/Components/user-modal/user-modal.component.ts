import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisteredUser, UpdatedUser, User, CreatedUser } from '../../Interfaces/User';
import { confirmPassValidator } from '../../Validators/passwordConfirmation.validator';
import { SuperAdminAuthService } from '../../services/auth-services/super-admin-auth-service/super-admin-auth.service';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';


@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
    @Input() isOpen = false;
    @Input() isEditMode = false;
    @Input() userToRegister: RegisteredUser | null;
    @Input() userToEdit: UpdatedUser | null;
    @Output() closeModal = new EventEmitter<void>();
    @Output() addUser = new EventEmitter<CreatedUser>();
    @Output() editUser = new EventEmitter<UpdatedUser>();

    userRoles: string[];
    role: string;

  userForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private _adminAuthService: AdminAuthService, private _superAdminAuthService: SuperAdminAuthService) {

    this.userRoles = ['User', 'Admin'];
    this.role = this.userRoles[0];



    this.userToRegister = null;
    this.userToEdit = null;
  }

  ngOnInit() {
    
    this._adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      this.userRoles = ['User'];
    });

    this._superAdminAuthService.getIsSuperAdminLoggedIn().subscribe((isSuperAdminLoggedIn) => {
      this.userRoles = isSuperAdminLoggedIn ? ['User','Admin'] : ['User'];
    });
  }


  ngOnChanges() {
    if (this.userToEdit && this.isEditMode) {
      
      this.userForm = this.fb.group({
        name: [this.userToEdit.name, [Validators.pattern("^[a-zA-Z ]{3,}$")]],
        email: [this.userToEdit.email, [Validators.email]],
        phoneNumber: [this.userToEdit.phoneNumber, [ Validators.pattern("^[0-9]{11,}$")]],
        password: [null, [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
        confirmPassword: [null],
      }, {
        validators: confirmPassValidator('password', 'confirmPassword')
      });

    } else {

      this.userForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.pattern("^[0-9]{11,}$")]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")]],
        confirmPassword: ['' , [Validators.required]],
        role: [this.userRoles[0], [Validators.required]]
      }, {
        validators: confirmPassValidator('password', 'confirmPassword')
      });


      // this.userForm.reset();
      // this.userForm.get('role')?.setValue(this.userRoles[0]);
      // this.userForm.get('password')?.setValidators([
      //   Validators.required, 
      //   Validators.minLength(6),
      //   Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$")
      // ]);
      // this.userForm.get('confirmPassword')?.setValidators([Validators.required]);
      // this.userForm.get('password')?.updateValueAndValidity();
      // this.userForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    // console.log(this.userForm);
    if (this.userForm.valid) {
        if(this.userToEdit && this.isEditMode) {

          if(this.userForm.get('password')?.value == "") {
            this.userForm.get('password')?.setValue(null);
            this.userForm.get('confirmPassword')?.setValue(null);
          }

          if(this.userToEdit.email == this.userForm.get('email')?.value && 
            this.userToEdit.name == this.userForm.get('name')?.value &&
            this.userToEdit.phoneNumber == this.userForm.get('phoneNumber')?.value  && 
            this.userForm.get('password')?.value == null ) {
            
              alert("No changes were made");
              this.closeModal.emit();
              return;
          }

          if(this.userForm.get('password')?.value == null && 
            this.userForm.get('email')?.value == "" && 
            this.userForm.get('name')?.value == "" && 
            this.userForm.get('phoneNumber')?.value == "") {
            
            alert("No changes were made");
            this.closeModal.emit();
            return;
          }

            const userData: UpdatedUser = {
                name: this.userForm.get('name')?.value,
                email: this.userForm.get('email')?.value,
                phoneNumber: this.userForm.get('phoneNumber')?.value,
                password: this.userForm.get('password')?.value,
                id: this.userToEdit.id,
            };

            // console.log(userData);
            this.editUser.emit(userData);
        } else {
            const userData: RegisteredUser = {
                name: this.userForm.get('name')?.value,
                email: this.userForm.get('email')?.value,
                phoneNumber: this.userForm.get('phoneNumber')?.value == "" ? null : this.userForm.get('phoneNumber')?.value,
                password: this.userForm.get('password')?.value,
                username: this.userForm.get('username')?.value,
            };

            const createdUser: CreatedUser = {
                registeredUser: userData,
                role: this.userForm.get('role')?.value,
            }
            this.addUser.emit(createdUser);
        }
    }
  }
} 