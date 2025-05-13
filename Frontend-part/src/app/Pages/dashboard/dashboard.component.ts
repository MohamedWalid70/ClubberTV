import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModalComponent } from '../../Components/user-modal/user-modal.component';
import { UsersService } from '../../services/users-service/users.service';
import { CreatedUser, RegisteredUser, UpdatedUser, User } from '../../Interfaces/User';
import { Router, RouterModule } from '@angular/router';
import { AddedMatch, Match, MatchStatus } from '../../Interfaces/Match';
import { MatchesService } from '../../services/matches-service/matches.service';
import { MatchModalComponent } from '../../Components/match-modal/match-modal.component';
import { AdminAuthService } from '../../services/auth-services/admin-auth-service/admin-auth.service';
import { SuperAdminAuthService } from '../../services/auth-services/super-admin-auth-service/super-admin-auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, UserModalComponent, MatchModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[];

  matches: Match[];

  userSearchQuery: string = '';
  matchSearchQuery: string = '';
  staticAvatar: string;
  staticThumbnail: string;
  isModalOpen = false;
  isEditMode = false;
  userToRegister: RegisteredUser | null;
  userToEdit: UpdatedUser | null;
  loggedPrivilege: string | null;

  isMatchModalOpen = false;
  isMatchEditMode = false;
  matchToRegister: AddedMatch | null = null;
  matchToEdit: Match | null = null;

  constructor(private usersService: UsersService, private _router: Router,
     private _matchesService: MatchesService,
     private _adminAuthService: AdminAuthService,
     private _superAdminAuthService: SuperAdminAuthService
    ) {
    this.matches = [];
    this.users = [];
    this.staticAvatar = 'https://ui-avatars.com/api/?name=John+Doe';
    this.staticThumbnail = 'https://picsum.photos/200/100';
    this.userToRegister = null;
    this.userToEdit = null;
    this.loggedPrivilege = null;
  }

  ngOnInit(): void {

    this._matchesService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });

    this._adminAuthService.getIsAdminLoggedIn().subscribe((isAdminLoggedIn) => {
      // console.log("This from the dashboard is the admin logged in: ", isAdminLoggedIn);
      if(isAdminLoggedIn) {
        this.loggedPrivilege = 'Admin';
      }
    });

    this._superAdminAuthService.getIsSuperAdminLoggedIn().subscribe((isSuperAdminLoggedIn) => {
      if(isSuperAdminLoggedIn) {
        this.loggedPrivilege = 'SuperAdmin';
      }
    });

    console.log(this.loggedPrivilege);

    this.loadUsers();
  }

  loadUsers() {
    if(this.loggedPrivilege === 'SuperAdmin') {
      this.usersService.getAdminsAndUsers().subscribe({
        next: (users) => {
          this.users = users;
      },
      error: (error) => {
        alert("Error occurred while loading the users\nTry again later");
      }
    });
    } 
    else if(this.loggedPrivilege === 'Admin') {
      this.usersService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          alert("Error occurred while loading the users\nTry again later");
        }
      });
    }
  }

  addUser() {
    this.isEditMode = false;
    this.userToRegister = null;
    this.isModalOpen = true;
  }

  editUser(user: User) {
    let mappedUser : UpdatedUser ={
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: ""
    }
    this.isEditMode = true;
    this.userToEdit = mappedUser;
    this.isModalOpen = true;
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) { 
      if(this.loggedPrivilege === 'SuperAdmin') {
      this.usersService.deleteUserOrAdmin(user.id).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            alert("Selected account has been deleted successfully");
            this.users = this.users.filter(u => u.id !== user.id);
          }
        },
        error: (error) => {
          alert("Error occurred while deleting the user account\nTry again later");
        }
      });
    }
    else if(this.loggedPrivilege === 'Admin') {
      this.usersService.deleteUser(user.id).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            alert("User account has been deleted successfully");
            this.users = this.users.filter(u => u.id !== user.id);
          }
        },
        error: (error) => {
          alert("Error occurred while deleting the user account\nTry again later");
        }
      });
    }
  }
}

  handleEditUser(user: UpdatedUser) {
    if(this.loggedPrivilege === 'SuperAdmin') { 
      this.usersService.updateUserOrAdmin(user).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            alert("Account information has been updated successfully");
            this.loadUsers();
            this.isModalOpen = false;
          }
        },
        error: (error) => {
          alert("Error occurred while editing the user account\nTry again later");
        }
      });
    }
    else if(this.loggedPrivilege === 'Admin') {
      this.usersService.updateUser(user).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            alert("User information has been updated successfully");
            this.loadUsers();
            this.isModalOpen = false;
          }
        },
        error: (error) => { 
          alert("Error occurred while editing the user account\nTry again later");
        }
      });
    }
  }

handleAddUser(user: CreatedUser) {
  if(this.loggedPrivilege === 'SuperAdmin') {
      if(user.role === 'Admin') {
        this.usersService.signUpAdmin(user.registeredUser).subscribe({
        next: (response) => {
          if(response?.status === 201) {
            alert("New admin account has been created successfully");
            this.loadUsers();
            this.isModalOpen = false;
          }
        },
        error: (error) => { 
          alert("Error occurred while creating the user account\nTry again later");
        }
      });
    } 
    else if(user.role === 'User'){
        this.usersService.signUpUser(user.registeredUser).subscribe({
          next: (response) => {
            if(response?.status === 201) {
              alert("New user account has been created successfully");
              this.loadUsers();
              this.isModalOpen = false;
            }
          },
          error: (error) => {
            alert("Error occurred while creating the user account\nTry again later");
          }
      });
    }
  }
  else if(this.loggedPrivilege === 'Admin') {
    this.usersService.signUpUser(user.registeredUser).subscribe({
      next: (response) => {
        if(response?.status === 201) {
          alert("New user account has been created successfully");
          this.loadUsers()
          this.isModalOpen = false;
        }
      },
      error: (error) => { 
        alert("Error occurred while creating the user account\nTry again later");
      }
    });
  }
}


  closeModal() {
    this.isModalOpen = false;
    this.userToRegister = null;
    this.userToEdit = null;
    this.userToRegister = null;
  }

  searchUsers() {
    // Implement search logic
    if (this.userSearchQuery.trim()) {
      this.users = this.users.filter(user => 
        user.name.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.userSearchQuery.toLowerCase())
      );
    } else {
      this.loadUsers();
    }
  }

  searchMatches(): void {
    if (this.matchSearchQuery.trim()) {
      const query = this.matchSearchQuery.toLowerCase();
      this._matchesService.getMatches().subscribe(matches => {
        this.matches = matches.filter(match => 
          match.title.toLowerCase().includes(query) ||
          match.competition.toLowerCase().includes(query)
        );
      });
    } else {
      this._matchesService.getMatches().subscribe(matches => {
        this.matches = matches;
      });
    }
  }

  addMatch(): void {
    this.isMatchModalOpen = true;
    this.isMatchEditMode = false;
    this.matchToRegister = null;
  }

  editMatch(match: Match): void {
    this.isMatchModalOpen = true;
    this.isMatchEditMode = true;
    this.matchToEdit = { ...match };
  }

  deleteMatch(match: Match): void {
    if (confirm(`Are you sure you want to delete ${match.title}?`)) {
      this._matchesService.deleteMatch(match.id).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            alert("Selected match has been deleted successfully");
            this.matches = this.matches.filter(m => m.id !== match.id);
          }
        },
        error: (error) => {
          alert("Error occurred while deleting the match\nTry again later");
        }
      });
    }
  }

  closeMatchModal(): void {
    this.isMatchModalOpen = false;
    this.isMatchEditMode = false;
    this.matchToRegister = null;
    this.matchToEdit = null;
  }

  handleAddMatch(match: AddedMatch): void {
    if (!this.isMatchEditMode) {
      this._matchesService.addMatch(match).subscribe({
        next: (response) => {
          if(response?.status === 201) {
            alert("Match information has been added successfully");
            this._matchesService.getMatches().subscribe((matches) => {
              this.matches = matches;
            });
            this.closeMatchModal();
          }
        },
        error: (error) => {
          alert("Error occurred while creating the match\nTry again later");
        }
      });
    }
  }

  handleEditMatch(match: Match): void {
    if(this.isMatchEditMode) {
    this._matchesService.updateMatch(match).subscribe({
      next: (response) => {
        if(response?.status === 200) {
          alert("Selected match information has been updated successfully");
          this._matchesService.getMatches().subscribe((matches) => {
            this.matches = matches;
          });
          this.closeMatchModal();
        }
      },
      error: (error) => {
        alert("Error occurred while editing the match\nTry again later");
      }
    });
  }
  } 

} 