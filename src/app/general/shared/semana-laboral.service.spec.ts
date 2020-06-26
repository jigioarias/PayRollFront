import { TestBed } from '@angular/core/testing';

import { SemanaLaboralService } from './semana-laboral.service';

describe('SemanaLaboralService', () => {
  let service: SemanaLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemanaLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
