import { TestBed } from '@angular/core/testing';

import { GenerateNominaService } from './generate-nomina.service';

describe('GenerateNominaService', () => {
  let service: GenerateNominaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateNominaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
