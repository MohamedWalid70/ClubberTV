import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private _isAdminLoggedIn;

  constructor() { 
    this._isAdminLoggedIn = new BehaviorSubject<boolean>(false)
  }

  getIsAdminLoggedIn() : Observable<boolean> {
    return this._isAdminLoggedIn.asObservable();
  }

  setIsAdminLoggedIn(isAdminLoggedIn: boolean) : void {
    this._isAdminLoggedIn.next(isAdminLoggedIn);
  }
  
}
