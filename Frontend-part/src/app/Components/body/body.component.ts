import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match, MatchStatus } from '../../Interfaces/Match';
import { MatchesService } from '../../services/matches-service/matches.service';
import { PlaylistService } from '../../services/playlist-items-service/playlist.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  matches: Match[] = [];
  MatchStatus = MatchStatus;

  
  constructor(
    private matchesService: MatchesService,
    private playlistService: PlaylistService,
  ) {}

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.matchesService.getMatches().subscribe({
      next: (matches) => {
        this.matches = matches;
      },
      error: (error) => {
        console.error('Error loading matches:', error);
      }
    });
  }

  addToPlaylist(matchInfo: Match) {
    this.playlistService.addMatchToPlaylist(matchInfo).subscribe({
      next: (response) => {
        if(response.status === 200) {
          alert('The match has been added to your playlist successfully!');
        }
        else if(response.status === 202) {
          alert('The match is already in the playlist');
        }
      },
      error: (error) => {
        console.error('Error adding match to playlist:', error);
        if(error.status === 401) {
          alert('You are not authorized to take this action');
        }
        else {
          alert('Failed to add match to playlist');
        }
      }
    });
  }

  watchMatch(matchId: string) {
    // Implement watch functionality
    console.log('Watching match:', matchId);
  }
}
