import { TestBed } from '@angular/core/testing';

import { RecognizeService } from './recognize.service';

describe('RecognizeService', () => {
  let service: RecognizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
