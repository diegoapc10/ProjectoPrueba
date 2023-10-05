import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { TipoDocumentoIdentidadComponent } from './tipo-documento-identidad/tipo-documento-identidad.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { RolComponent } from './rol/rol.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    TipoDocumentoIdentidadComponent,
    RolComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ]
})
export class AdministracionModule { }
