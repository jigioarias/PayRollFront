import { TestBed } from '@angular/core/testing';

import { ImagenColeccionService } from './imagen-coleccion.service';

describe('ImagenColeccionService', () => {
  let service: ImagenColeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenColeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
