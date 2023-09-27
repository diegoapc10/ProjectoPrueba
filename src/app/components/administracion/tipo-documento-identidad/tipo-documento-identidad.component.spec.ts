import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoIdentidadComponent } from './tipo-documento-identidad.component';

describe('TipoDocumentoIdentidadComponent', () => {
  let component: TipoDocumentoIdentidadComponent;
  let fixture: ComponentFixture<TipoDocumentoIdentidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDocumentoIdentidadComponent]
    });
    fixture = TestBed.createComponent(TipoDocumentoIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
