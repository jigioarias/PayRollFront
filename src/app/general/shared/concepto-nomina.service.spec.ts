import { TestBed } from '@angular/core/testing';

import { ConceptoNominaService } from './concepto-nomina.service';

describe('ConceptoNominaService', () => {
  let service: ConceptoNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptoNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
