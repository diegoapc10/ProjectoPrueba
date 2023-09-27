import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDocumentoIdentidadComponent } from './tipo-documento-identidad/tipo-documento-identidad.component';
import { PermisoGuard } from 'src/app/guard/permiso.guard';

const routes: Routes = [
  {
    path: 'tiposDocumentoIdentidad', component: TipoDocumentoIdentidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
