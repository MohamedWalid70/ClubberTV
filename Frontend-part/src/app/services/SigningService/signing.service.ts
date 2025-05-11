import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Interfaces/User';
import { LoginUser } from '../../Interfaces/LoginUser';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResponse } from '../../Interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor( private http: HttpClient) { }

  signup(user: User) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/Auth/register`, user);
  }

  login(user: LoginUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/Auth/login`, user);
  }

  // logout() {
  //   return this.http.post<User>('URL', {});
  // }
}
