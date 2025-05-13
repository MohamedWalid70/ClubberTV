import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginEnableService {

  private loginEnabled = new BehaviorSubject<boolean>(false);

  constructor() { 
  }

  setLoginEnabled(enabled: boolean) {
    this.loginEnabled.next(enabled);
  }

  getLoginEnabled() {
    return this.loginEnabled.asObservable();
  }

}
