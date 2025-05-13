import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecognizeService {

  constructor(private http: HttpClient) { }

  refresh() : Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/refresh`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    );
  }
}
