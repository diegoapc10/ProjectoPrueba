import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { InicioComponent } from './components/compartido/inicio/inicio.component';
import { AuthGuard } from './guard/auth.guard';
import { PermisoGuard } from './guard/permiso.guard';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: InicioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'administracion', loadChildren: () => import('./components/administracion/administracion.module').then(m => m.AdministracionModule),
        canActivate: [AuthGuard,PermisoGuard]
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
