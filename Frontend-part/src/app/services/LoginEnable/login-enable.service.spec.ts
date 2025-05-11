import { TestBed } from '@angular/core/testing';

import { LoginEnableService } from './login-enable.service';

describe('LoginEnableService', () => {
  let service: LoginEnableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEnableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
