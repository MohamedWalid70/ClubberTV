import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phoneNumber: string;
  avatar: string;
}

interface Match {
  id: number;
  title: string;
  competition: string;
  dateTime: string;
  status: 'live' | 'replay' | 'upcoming';
  thumbnail: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      phoneNumber: '+1 (555) 123-4567',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      phoneNumber: '+1 (555) 987-6543',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
    }
  ];

  matches: Match[] = [
    {
      id: 1,
      title: 'Manchester United vs Liverpool',
      competition: 'Premier League',
      dateTime: '2024-03-20 15:00',
      status: 'live',
      thumbnail: 'https://picsum.photos/200/100'
    },
    {
      id: 2,
      title: 'Barcelona vs Real Madrid',
      competition: 'La Liga',
      dateTime: '2024-03-21 20:00',
      status: 'upcoming',
      thumbnail: 'https://picsum.photos/200/100'
    },
    {
      id: 3,
      title: 'Bayern Munich vs Dortmund',
      competition: 'Bundesliga',
      dateTime: '2024-03-19 18:30',
      status: 'replay',
      thumbnail: 'https://picsum.photos/200/100'
    }
  ];

  userSearchQuery: string = '';
  matchSearchQuery: string = '';

  constructor() {}

  ngOnInit(): void {}

  searchUsers(): void {
    // Implement user search logic
  }

  searchMatches(): void {
    // Implement match search logic
  }

  editUser(user: User): void {
    // Implement user edit logic
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    // Implement user delete logic
    console.log('Delete user:', user);
  }

  editMatch(match: Match): void {
    // Implement match edit logic
    console.log('Edit match:', match);
  }

  deleteMatch(match: Match): void {
    // Implement match delete logic
    console.log('Delete match:', match);
  }

  addUser(): void {
    // Implement user addition logic
    console.log('Add new user');
  }

  addMatch(): void {
    // Implement match addition logic
    console.log('Add new match');
  }
} 