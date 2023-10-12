import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { TipoDocumentoIdentidadComponent } from './tipo-documento-identidad/tipo-documento-identidad.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { RolComponent } from './rol/rol.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AsignarRolComponent } from './asignar-rol/asignar-rol.component';


@NgModule({
  declarations: [
    TipoDocumentoIdentidadComponent,
    RolComponent,
    UsuarioComponent,
    AsignarRolComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    NgxSpinnerModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class AdministracionModule { }
