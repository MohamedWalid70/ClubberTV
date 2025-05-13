import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User, SelfUser, RegisteredUser, UpdatedUser } from '../../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  signUpUser(user: RegisteredUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/new-user`, user, {
      observe: 'response'
    });
  }

  signUpAdmin(user: RegisteredUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/new-admin`, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }
  

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users/all-users`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  getAdminsAndUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users/all-admins-and-users`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  getUserById(id: string) : Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/specific-user/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  updateUser(user: UpdatedUser) : Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/users/specific-user`, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }

  updateUserOrAdmin(user: UpdatedUser) : Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/users/specific-user-or-admin`, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }

  updateSelf(user: SelfUser) : Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/users/self-user`, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }

  deleteUser(id: string) : Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/users/specific-user/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }

  deleteUserOrAdmin(id: string) : Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/users/specific-admin-or-user/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      observe: 'response'
    });
  }


}
