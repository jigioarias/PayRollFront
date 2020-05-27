import { TestBed } from '@angular/core/testing';

import { NovedadNominaService } from './novedad-nomina.service';

describe('NovedadNominaService', () => {
  let service: NovedadNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
