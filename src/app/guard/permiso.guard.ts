import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionUsuarioService } from '../services/compartido/sesion-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _sesionUsuario: SesionUsuarioService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let permisos: string[] = this._sesionUsuario.obtenerPermisos();
      let validarPermiso = permisos.includes(state.url);
    return validarPermiso;
  }
  
}
