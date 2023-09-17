import { TestBed } from '@angular/core/testing';

import { SesionUsuarioService } from './sesion-usuario.service';

describe('SesionUsuarioService', () => {
  let service: SesionUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
