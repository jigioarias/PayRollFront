import { TestBed } from '@angular/core/testing';

import { ClaseNominaService } from './clase-nomina.service';

describe('ClaseNominaService', () => {
  let service: ClaseNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
