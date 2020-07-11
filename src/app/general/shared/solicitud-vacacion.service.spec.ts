import { TestBed } from '@angular/core/testing';

import { SolicitudVacacionService } from './solicitud-vacacion.service';

describe('SolicitudVacacionService', () => {
  let service: SolicitudVacacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudVacacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
