import { TestBed } from '@angular/core/testing';

import { ConsultaApisService } from './consulta-apis.service';

describe('ConsultaApisService', () => {
  let service: ConsultaApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
