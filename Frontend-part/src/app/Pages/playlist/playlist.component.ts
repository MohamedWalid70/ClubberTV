import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Match, MatchStatus } from '../../Interfaces/Match';
import { PlaylistService } from '../../services/playlist-items-service/playlist.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  searchQuery: string = '';
  matches: Match[] = [];
  MatchStatus = MatchStatus;
  staticThumbnail = 'https://placehold.co/400x225?text=Match+1';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.loadPlaylist();
  }

  loadPlaylist() {
    this.playlistService.getUserPlaylistItems().subscribe({
      next: (matches) => {
        this.matches = matches;
      },
      error: (error) => {
        console.error('Error loading playlist:', error);
      }
    });
  }

  searchMatches() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.matches = this.matches.filter(match =>
        match.title.toLowerCase().includes(query) ||
        match.competition.toLowerCase().includes(query)
      );
    }
    else {
      this.loadPlaylist();
    }
  }

  removeFromPlaylist(matchId: string) {
    if (confirm('Are you sure you want to remove this match from your playlist?')) {
      this.playlistService.removeMatchFromPlaylist(matchId).subscribe({
        next: (response) => {
          if(response?.status === 200) {
            this.matches = this.matches.filter(match => match.id !== matchId);
          }
        },
        error: (error) => {
          alert("Error occurred while removing match from playlist\nTry again later");
        }
      });
    }
  }

  watchMatch(matchId: string) {
    // Implement navigation or player logic here
    alert('Watch match: ' + matchId);
  }
} 