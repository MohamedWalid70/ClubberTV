import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../../Interfaces/Match';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  getUserPlaylistItems() : Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.baseUrl}/playlists/user-playlist`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  addMatchToPlaylist(matchInfo: Match) : Observable<any> {

    return this.http.post<any>(`${environment.baseUrl}/playlists/addition`,  matchInfo ,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        observe: 'response'
      }
    );
  }

  removeMatchFromPlaylist(matchId: string) : Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/playlists/user-playlist-item/${matchId}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }
}
