import { TestBed } from '@angular/core/testing';

import { GrupoEmpresaService } from './grupo-empresa.service';

describe('GrupoEmpresaService', () => {
  let service: GrupoEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
