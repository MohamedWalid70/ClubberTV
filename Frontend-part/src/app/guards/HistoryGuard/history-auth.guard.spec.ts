import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { historyAuthGuard } from './history-auth.guard';

describe('historyAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => historyAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
