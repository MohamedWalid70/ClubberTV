import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../Interfaces/User';
import { LoggedinUser } from '../../../Interfaces/LoggedinUser';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginResponse } from '../../../Interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor( private http: HttpClient) { }
  
  
  loginUser(user: LoggedinUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/user-in`, user, 
      {
        observe: 'response'
      }
    );
  }

  loginAdmin(user: LoggedinUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/admin-in`, user, 
      {
        observe: 'response'
      }
    );
  }

  loginSuperAdmin(user: LoggedinUser) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/super-admin-in`, user, 
      {
        observe: 'response'
      }
    );
  }


  // logout() {
  //   return this.http.post<User>('URL', {});
  // }
}
