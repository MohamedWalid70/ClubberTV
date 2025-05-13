import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthService {

  private _isSuperAdminLoggedIn : BehaviorSubject<boolean>;

  constructor() { 
    this._isSuperAdminLoggedIn = new BehaviorSubject<boolean>(false)
  }

  getIsSuperAdminLoggedIn() : Observable<boolean> {
    return this._isSuperAdminLoggedIn.asObservable();
  }

  setIsSuperAdminLoggedIn(isSuperAdminLoggedIn: boolean) : void {
    this._isSuperAdminLoggedIn.next(isSuperAdminLoggedIn);
  }
}
