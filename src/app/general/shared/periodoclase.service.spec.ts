import { TestBed } from '@angular/core/testing';

import { PeriodoclaseService } from './periodoclase.service';

describe('PeriodoclaseService', () => {
  let service: PeriodoclaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodoclaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
