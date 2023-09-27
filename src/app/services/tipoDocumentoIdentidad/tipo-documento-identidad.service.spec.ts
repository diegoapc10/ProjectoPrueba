import { TestBed } from '@angular/core/testing';

import { TipoDocumentoIdentidadService } from './tipo-documento-identidad.service';

describe('TipoDocumentoIdentidadService', () => {
  let service: TipoDocumentoIdentidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocumentoIdentidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
