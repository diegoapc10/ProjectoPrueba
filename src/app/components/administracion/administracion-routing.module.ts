import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDocumentoIdentidadComponent } from './tipo-documento-identidad/tipo-documento-identidad.component';
import { RolComponent } from './rol/rol.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: 'usuarios', component: UsuarioComponent
  },
  {
    path: 'tiposDocumentoIdentidad', component: TipoDocumentoIdentidadComponent
  },
  {
    path: 'roles', component: RolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
