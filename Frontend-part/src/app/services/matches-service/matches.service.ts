import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Match, AddedMatch } from '../../Interfaces/Match';

@Injectable({
  providedIn: 'root'
})

export class MatchesService {

  constructor(private http: HttpClient) { }

  getMatches() : Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.baseUrl}/matches/all`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  addMatch(match: AddedMatch) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/matches/new`, match,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      })
      ,
      observe: 'response'
    });
  }

  getMatchById(id: string) : Observable<Match> {
    return this.http.get<Match>(`${environment.baseUrl}/matches/specific-match/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  updateMatch(match: Match) : Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/matches/specific-match`, match,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }

  deleteMatch(id: string) : Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/matches/specific-match/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }
}
