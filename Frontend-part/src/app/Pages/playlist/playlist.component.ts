import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Match {
  id: number;
  title: string;
  league: string;
  status: 'Live' | 'Replay';
  thumbnail: string;
  dateTime: string;
}

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  searchQuery: string = '';
  matches = [
    {
      id: 1,
      title: 'Team A vs Team B',
      league: 'Premier League',
      status: 'Live',
      thumbnail: 'https://placehold.co/400x225?text=Match+1',
      dateTime: '2024-03-20 15:00'
    },
    {
      id: 2,
      title: 'Team C vs Team D',
      league: 'Champions League',
      status: 'Replay',
      thumbnail: 'https://placehold.co/400x225?text=Match+2',
      dateTime: '2024-03-19 18:30'
    },
    {
      id: 3,
      title: 'Team E vs Team F',
      league: 'La Liga',
      status: 'Live',
      thumbnail: 'https://placehold.co/400x225?text=Match+3',
      dateTime: '2024-03-21 20:00'
    }
  ];

  searchMatches() {
    // Implement search functionality
  }

  removeFromPlaylist(id: number) {
    // Implement remove functionality
  }

  watchMatch(id: number) {
    // Implement watch functionality
  }
} 